---
title: "Introduction to Async Django"
date: 2021-01-21T00:43:47+05:30
draft: false
categories: ["django", "python"]
---

This is a written version of the talk I presented to my colleagues. This is a basic introduction to asynchronous programming in django.  
So the async support for django came with [django 3.1](https://docs.djangoproject.com/en/3.1/topics/async/) in august 2020, a great leap in the history of Django. still, it lacks support in certain areas like ORM, and cache layer, but it will be available soon. The effort for implementing async support in django was done by [Andrew Godwin](https://twitter.com/andrewgodwin) :clap:  
Now let's look into how this async django works...

- **Synchronous v/s Asynchronous Execution**  
  Simply speaking, synchronous execution is sequential execution. And if there is any blocking code that comes in between like DB lookup, and API fetching the whole system gets blocked for it. our only built-in option for running code in parallel in the same process threads. while asynchronous execution is happening inside an event loop. where the event loop is a central execution point where you can run multiple [coroutines](#coroutines) at once, coroutines will be executed synchronously until an await syntax is reached and then they pause, give up control to the event loop, and something else can happen

- **Thread, Task, Process in python**  
  All the terms refereed in this section are the same name given to programs that run concurrently. Some common things that can be seen in these three modes of execution are that they can be stopped at any point and switched to a different one. the state of each is saved and can be started from where it stopped

  - **Threading**  
    Threading in python is done with the help of the [threading](https://docs.python.org/3/library/threading.html) module, Threads are managed by the Operating system, Threads are lightweight compared to process and they share the same resources. Even if multiple processors are available execution takes place only in a single one. All control of threads is with an operating system, which means the operating system can decide when to switch the thread, how many resources should allocate...etc. So thread-based execution is also called [Preemptive multitasking](https://en.wikipedia.org/wiki/Preemption_%28computing%29#Preemptive_multitasking)
  - **Task**  
    [AsyncIO](https://docs.python.org/3/library/asyncio.html) module uses Tasks for achieving concurrency. Tasks are being run in the event loop. Task work is just the opposite of Threads, like all the control is in the hands of the program itself, the program itself will give control back to the event loop when the execution gets blocked and the event loop check for any other program/task/coroutine available in the loop so that it can be run in event loop in the meantime. Here also execution happens in a single process. and resource sharing will be the same as that of threads
  - **Process**  
    The process helps to achieve multiprocessing in python. and it can be programmed through a [multiprocessing](https://docs.python.org/3/library/multiprocessing.html) module. In multiprocessing, python creates a new process. It's almost the same as running copies of the individual program, each of them having independent resources. And the main advantage of this is that, unlike threads and tasks, if it's a multicore system, the process can run on each core at the same time. the ultimate parallelism. but there is some complication in the communication of the process.

  so by understanding this you can select the use cases where you need to select Thread, Task, Process. for [I/O bound](https://en.wikipedia.org/wiki/I/O_bound) problems threading and task are useful. while for tasks that rely on a heavy CPU cycle [(CPU bound)](https://en.wikipedia.org/wiki/CPU-bound), Multiprocessing will be good. And Remember wrong choices can get you into big technical debts later.

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

    First I called sync view and it took about `3 seconds` to execute the view you can see the view executed synchronously and let's see how the async view was executed, it took only `1 second` to execute the async view. the magic lies in the `asyncio.gather()` function its gather/group tasks and send to the event loop. so here when it executes the first `async_count()` function and reaches `await asyncio`.sleep(1)` the execution gets blocked for 1 second, so the event loop goes to the next task and so on... thats why the printing order in both the views are different

- **Conclusion**  
  From my viewpoint, it's always synchronous views that are safe to write, but you have to pay the performance cost. In async views there is no ordering guarantee or even no guarantee for that piece of code will be executed. also beware of, for what purpose you are writing these async views. async views will slower response if it's processing some CPU-bound task.  
   **But remember programming world and pythonistas are moving more to async**

##### Notes

- ###### **coroutines:**
  coroutines are special types of functions that deliberate _yield_ control over to the caller, but does not end its context in the process but maintain its idle state. They benefit from the ability to keep their data throughout their lifetime and, unlike functions can have several entry points for suspending and resuming execution

##### Further Reads

- [proposal for async python into django](https://github.com/django/deps/blob/master/accepted/0009-async.rst)
- [More on python concurrency](https://realpython.com/python-concurrency/)
