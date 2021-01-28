---
title: "Introduction to Async Django"
date: 2021-01-21T00:43:47+05:30
draft: true
categories: ["django", "python"]
---

This is basically a written version of talk I presented among my collegues.
This is a basic introduction to asynchronous programming in django.  
So the async support for django came with [django 3.1](https://docs.djangoproject.com/en/3.1/topics/async/) in august 2020, a great leap in history of Django. still it lack support in certain areas like ORM, cache layer, but it will be available soon. The effort for implementing async support in django was done by [Andrew Godwin](https://twitter.com/andrewgodwin) :clap:  
Now let's have look into how this async django works....

- **Synchronous v/s Asynchronous Execution**  
  Simply speaking, synchronous execution is sequential execution. And if there is any blocking code comes in between like db fetching, api fetching the whole system get blocked for it . our only built in option for running code in parallel in the same process is threads. while asynchronous execution is happening inside a event loop. where event loop is central execution point where you can run multiple \*\*[coroutines](#coroutines)
  at ones, coroutines are will be executed synchronously until an await syntax is reached and then they pause, give up control to the event loop, and something else can happen

- **Thread, Task, Process in python**  
  All the terms refereed in this section are same name given to programs that run concurrently.some common things can be seen this three type of execution is that they can be stopped at any point and switch to different one. the state of each is saved and can be started from it stopped  
  - **Threading**  
  Threading in python is done with the help of [threading](https://docs.python.org/3/library/threading.html) module, Threads are managed by Operating system, Threads are light weight compared to process and they share same resources. Even multiple processors available execution take place in a single one. All the control of threads is with operating system, means operating system can decide when to switch the thread, how much resource should allocate...etc.So thread based execution is also called as [Preemptive multitasking](https://en.wikipedia.org/wiki/Preemption_%28computing%29#Preemptive_multitasking)  
  - **Task**  
  [AsyncIO](https://docs.python.org/3/library/asyncio.html) module uses Tasks for achieving concurrency.Task are being run in event loop. Task work just opposite of Threads, like all the control is in the hands of program itself, the program itself will give control back to the event loop when the execution get blocked and event loop check for any other program/task/coroutine available in loop so that it can be run in  event loop in the mean time. here also execution happens in single process. and resource sharing will be same as that of threads
  - **Process**  
  Process help to achieve multiprocessing in python. and it can be programmed through [multiprocessing  ](https://docs.python.org/3/library/multiprocessing.html) module. In multiprocessing python create new process. its almost same as running copy's of individual program each of them having independent resources. And main advantage of this is that, unlike threads and task, if it's a multicore system, process can run on each core at same time. the ultimate parallelism. but there are some complication in between the communication of process.

so by understanding this you can select the use cases where you need to select Thread, Task, Process. for I/O bound task threading and task are useful. while for task that rely on heavy cpu cycle, Multiprocessing will be good. And Remember wrong choosing can get you into big technical debts later.


##### Notes  
- ###### coroutines:

##### Further Reads

- [propose for async python into django](https://github.com/django/deps/blob/master/accepted/0009-async.rst)