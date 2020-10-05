---
title: "Errors and Exceptions In Python"
date: 2020-10-03T17:46:27+05:30
draft: true
categories: ["python"]
---

This blog is about How to manage Exceptions in python, this post can be divide like

- why raising an exception ?
- what is happening while an exception is raised ?
- Handling exceptions
- The exception hierarchy
- Defining our own exceptions

#### Why raising an exception ?

All the programs out there dont always output a valid result always, errors can happen, like it's not possible to
divide by zero, or to access the eighth item in a five-item list.  
Want to see some error ? Thw easiest way to cause an exception is this.

```python
>>> print "hello world"
File "<stdin>", line 1
print "hello world"
^
SyntaxError: invalid syntax
```

This is print statement in python 2, when we try to run this in python 3 interpreter, we get this syntax error.
So exceptions are indicators of something wrong in our program, You may have noticed all the preceding built-in exceptions end with the name
Error . In Python, the words error and exception are used almost interchangeably.
Errors are sometimes considered more dire than exceptions, but they are dealt with
in exactly the same way. Indeed, all the error classes in the preceding example have
Exception (which extends BaseException ) as their superclass

#### What's happening while an exception is raised ?

When an exception is raised, the program execution is stopped, everything supposed to run after the exception will not run, if exception is not managed correctly the program will exit with the error message  
Take a look at this simple function:

```python
def no_return():
    print("I am about to raise an exception")
    raise Exception("This is always raised")
    print("This line will never execute")
    return "I won't be returned"
```

If we execute this function, we see that the first print call is executed and then the
exception is raised. The second print statement is never executed, and the return
statement never executes either

```python
>>> no_return()
I am about to raise an exception
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
File "exception_quits.py", line 3, in no_return
raise Exception("This is always raised")
Exception: This is always raised
```

#### Handling exceptions

Even though if the program raise some exception, we can recover from it, by wrapping the code in try ... except clause, any code block that might throw an exception can be put inside the try block and thing that we want to do while an exception raise can be put inside the except block

```python
try:
    no_return()
except:
    print("I caught an exception")
    print("executed after the exception")
#output
I am about to raise an exception
I caught an exception
executed after the exception
```

The problem with the preceding code is that it will catch any type of exception.
What if we were writing some code that could raise both a TypeError and a
ZeroDivisionError ? We might want to catch the ZeroDivisionError , but
let the TypeError propagate to the console

```python
def funny_division(divider):
    try:
        return 100 / divider
    except ZeroDivisionError:
        return "Zero is not a good idea!"
print(funny_division(0))
print(funny_division(50.0))
print(funny_division("hello"))
#output
Zero is not a good idea!
2.0
Traceback (most recent call last):
File "catch_specific_exception.py", line 9, in <module>
print(funny_division("hello"))
File "catch_specific_exception.py", line 3, in funny_division
return 100 / anumber
TypeError: unsupported operand type(s) for /: 'int' and 'str'.
```

So in the above code the we are avoiding all ZeroDivisionError but catching and printing all TypeError

##### keywords, finally and else

```python
import random
some_exceptions = [ValueError, TypeError, IndexError, None]
try:
    choice = random.choice(some_exceptions)
    print("raising {}".format(choice))
if choice:
    raise choice("An error")
except ValueError:
    print("Caught a ValueError")
except TypeError:
    print("Caught a TypeError")
except Exception as e:
    print("Caught some other error: %s" %
    ( e.__class__.__name__))
else:
    print("This code called if there is no exception")
finally:
    print("This cleanup code is always called")
```

If we run this example—which illustrates almost every conceivable exception
handling scenario—a few times, we'll get different output each time, depending
on which exception random chooses. Here are some example runs:

```shell
$ python finally_and_else.py
raising None
This code called if there is no exception
This cleanup code is always called
$ python finally_and_else.py
raising <class 'TypeError'>
Caught a TypeError
This cleanup code is always called
$ python finally_and_else.py
raising <class 'IndexError'>
Caught some other error: IndexError
This cleanup code is always called
$ python finally_and_else.py
raising <class 'ValueError'>
Caught a ValueError
This cleanup code is always called
```

Note how the print statement in the finally clause is executed no matter what
happens. This is extremely useful when we need to perform certain tasks after
our code has finished running (even if an exception has occurred). Some common
examples include:
- Cleaning up an open database connection
- Closing an open file
- Sending a closing handshake over the network  

The finally clause is also very important when we execute a return statement
from inside a try clause. The finally handle will still be executed before the
value is returned
