---
title: "Introduction to Async Django"
date: 2021-01-21T00:43:47+05:30
draft: false
categories: ["django", "python"]
---

This is basically a written version of talk I presented among my collegues.
This is a basic introduction to asynchronous programming in django.  
So the async support for django came with [django 3.1](https://docs.djangoproject.com/en/3.1/topics/async/) in august 2020, a great leap in history of Django. still it lack support in certain areas like ORM, cache layer, but it will be available soon. The effort for implementing async support in django was done by [Andrew Godwin](https://twitter.com/andrewgodwin) :clap:  
Now let's have look into how this async django works....

- **Synchronous v/s Asynchronous Execution**  
  Simply speaking, synchronous execution is sequential execution. And if there is any blocking code comes in between like db lookup, api fetching the whole system get blocked for it. our only built in option for running code in parallel in the same process is threads. while asynchronous execution is happening inside a event loop. where event loop is central execution point where you can run multiple \*\*[coroutines](#coroutines)
  at ones, coroutines will be executed synchronously until an await syntax is reached and then they pause, give up control to the event loop, and something else can happen

- **Thread, Task, Process in python**  
  All the terms refereed in this section are same name given to programs that run concurrently. Some common things that can be seen in this three modes of execution is that they can be stopped at any point and switch to different one. the state of each is saved and can be started from where it stopped  
  - **Threading**  
  Threading in python is done with the help of [threading](https://docs.python.org/3/library/threading.html) module, Threads are managed by Operating system, Threads are light weight compared to process and they share same resources. Even multiple processors are available execution take place only in a single one. All control of threads is with operating system, means operating system can decide when to switch the thread, how much resource should allocate...etc. So thread based execution is also called as [Preemptive multitasking](https://en.wikipedia.org/wiki/Preemption_%28computing%29#Preemptive_multitasking)  
  - **Task**  
  [AsyncIO](https://docs.python.org/3/library/asyncio.html) module uses Tasks for achieving concurrency.Task are being run in event loop. Task work just opposite of Threads, like all the control is in the hands of program itself, the program itself will give control back to the event loop when the execution get blocked and event loop check for any other program/task/coroutine available in loop so that it can be run in  event loop in the mean time. Here also execution happens in single process. and resource sharing will be same as that of threads
  - **Process**  
  Process help to achieve multiprocessing in python. and it can be programmed through [multiprocessing  ](https://docs.python.org/3/library/multiprocessing.html) module. In multiprocessing python create new process. its almost same as running copy's of individual program, each of them having independent resources. And main advantage of this is that, unlike threads and task, if it's a multicore system, process can run on each core at same time. the ultimate parallelism. but there are some complication in between the communication of process.

  so by understanding this you can select the use cases where you need to select Thread, Task, Process. for [I/O bound](https://en.wikipedia.org/wiki/I/O_bound) problems threading and task are useful. while for task that rely on heavy cpu cycle [(cpu bound)](https://en.wikipedia.org/wiki/CPU-bound), Multiprocessing will be good. And Remember wrong choosing can get you into big technical debts later.  
- **Examples**  
  - **Notorious sleep example:**  
    consider an async view in django.
    ```python
    async def view(request):
      await asyncio.sleep(0.5)
      return HttpResponse("hello async world")
    ```
    here the `asyncio.sleep(0.5)` doesn't make any sense than `time.sleep(0.5)`. what we need to understand from the examples of sleep in async django view is that, they represent some blocking functionality. which when get blocked, event loop will execute some other task in que rather than waiting for the blocking functionality  
  - **More understandable example:**
    {{< more python expand >}} 
    from django.http import HttpResponse
    import time
    import asyncio


    def count():
        print("One")
        time.sleep(1)
        print("Two")


    async def async_count():
        print("One")
        await asyncio.sleep(1)
        print("Two")

    def home_view(request):
        return HttpResponse('Hello world')


    def main_view(request):
        start_time = time.time()
        count()
        count()
        count()
        total = (time.time()-start_time)
        print('total: ', total)
        return HttpResponse('sync time = {}'.format(total))


    async def main_view_async(request):
        start_time = time.time()
        await asyncio.gather(async_count(), async_count(), async_count())
        total = (time.time()-start_time)
        print('total: ', total)
        return HttpResponse('async time = {}'.format(total))
    {{< /more >}} 
  
    Here in this view, I have written two views one is async and other is normal synchronous one, but both of them doing same thing. print string one and two in a time gap of 1 second for 3 times.  
    let execute this code and see the output
    ```shell
    One
    Two
    One
    Two
    One
    Two
    total:  3.0027403831481934
    [29/Jan/2021 20:35:51] "GET /sync/ HTTP/1.1" 200 30
    Not Found: /favicon.ico
    [29/Jan/2021 20:35:51] "GET /favicon.ico HTTP/1.1" 404 2352
    One
    One
    One
    Two
    Two
    Two
    total:  1.002244234085083
    [29/Jan/2021 20:36:11] "GET /async/ HTTP/1.1" 200 30
    ```
    First I called sync view and its took about `3 seconds` to execute the view and you can see the view executed in a synchronous manner and let see how the async view executed, it  took only `1 second` to execute the async view. magic lies in the `asyncio.gather()` function its gather/group tasks and send to event loop. so here when it execute the first `async_count()` function and reach `await asyncio.sleep(1)` the execution get blocked for 1 second, so the event loop go to next task and so on... thats why the printing order in both the views are different  
- **Conclusion**  
  From my view point its always synchronous views are safe to write, but you have you to pay the performance cost. In async views there is no ordering guarantee or even no guarantee for that piece of code will be executed. also beware of, for what purpose you are writing this async views. async views will slower response if its processing some cpu bound task.  
  **But remember programming world and pythonistas are moving more to async**


##### Notes  
- ###### **coroutines:**
    coroutines are special types of functions that deliberate _yield_ control over to the caller, but does not end its context in the process but maintain its idle state. They benefit from the ability to keep their data throughout their lifetime and, unlike functions can have several entry points for suspending and resuming execution 

##### Further Reads

- [proposal for async python into django](https://github.com/django/deps/blob/master/accepted/0009-async.rst)  
- [More on python concurrency](https://realpython.com/python-concurrency/)