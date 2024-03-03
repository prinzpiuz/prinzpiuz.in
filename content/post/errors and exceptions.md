---
title: "Errors and Exceptions In Python"
date: 2020-10-03T17:46:27+05:30
draft: false
categories: ["python"]
---

This blog is about How to manage Exceptions in python, this is more like notes I took while reading [Dusty Phillips](https://dusty.phillips.codes/)'s [Python 3 Object-oriented Programming](https://www.packtpub.com/product/python-3-object-oriented-programming-third-edition/9781789615852),
This post can be divided into

- why raise an exception?
- what is happening when an exception is raised?
- Handling exceptions
- The exception hierarchy
- Defining our exceptions

#### Why raise an exception?

All the programs out there don't always output a valid result, errors can happen like it's not possible to
divide by zero, or to access the eighth item in a five-item list.
Want to see some errors? The easiest way to cause an exception is this.

```shell
>>> print "hello world"
print "hello world"
^
SyntaxError: invalid syntax
```

This is a print statement in python 2, when we try to run this in the python 3 interpreter, we get this syntax error.
So exceptions are indicators of something wrong in our program, You may have noticed all the preceding built-in exceptions end with the name Error. In Python, the words error and exception are used almost interchangeably.
Errors are sometimes considered direr than exceptions, but they are dealt with in the same way. Indeed, all the error classes in the preceding example have
Exception (which extends BaseException ) as their superclass

#### What's happening while an exception is raised?

When an exception is raised, the program execution is stopped, and everything supposed to run after the exception will not run, if the exception is not managed correctly the program will exit with the error message
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
raise Exception("This is always raised")
Exception: This is always raised
```

#### Handling exceptions

Even though if the program raises some exception, we can recover from it, by wrapping the code in a try ... except clause, any code block that might throw an exception can be put inside the try block and thing that we want to do while an exception raise can be put inside the except block

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
What if we were writing some code that could raise both a TypeError and a ZeroDivisionError? We might want to catch the ZeroDivisionError, but let the TypeError propagate to the console

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
print(funny_division("hello"))
return 100 / divider
TypeError: unsupported operand type(s) for /: 'int' and 'str'.
```

So in the above code, we are avoiding all ZeroDivisionError but catching and printing all TypeError

##### keywords, finally, and else

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

Note how the print statement in the `finally` clause is executed no matter what
happens. This is extremely useful when we need to perform certain tasks after
our code has finished running (even if an exception has occurred). Some common
examples include:

- Cleaning up an open database connection
- Closing an open file
- Sending a closing handshake over the network

The `finally` clause is also very important when we execute a return statement
from inside a try clause. The `finally` handle will still be executed before the
value is returned

#### The exception hierarchy

Most exceptions are a subclass of the Exception class, but this is not fully true. The exception itself inherits from a class called BaseException. All exceptions must extend the BaseException class or one of its subclasses.
When we use the `except` clause without specifying any type of exception, it will
catch all subclasses of `BaseException` which is to say, it will catch all exceptions,
including the two special ones. Since we almost always want these to get special
treatment, it is unwise to use the `except` statement without arguments. If you want
to catch all exceptions other than SystemExit and KeyboardInterrupt, explicitly catch Exception.
Furthermore, if you do want to catch all exceptions, I suggest using the syntax
except BaseException: instead of a raw `except`. This helps explicitly tell future
readers of your code that you are intentionally handling the special case exceptions.

#### Defining our own exceptions

All we have to do is inherit from the Exception class. We don't even have to add any
content to the class! We can, of course, extend BaseException directly, but then it
will not be caught by generic except Exception clauses.
Here's a simple exception we might use in a banking application:

```python
class InvalidWithdrawal(Exception):
    pass
raise InvalidWithdrawal("You don't have $50 in your account")
```

The last line shows how to call that exception
The Exception. \_\_init** method is designed to accept any arguments and store them
as a tuple in an attribute named args . This makes exceptions easier to define without
needing to override init**.
So a more custom version of the above exception is like

```python
class InvalidWithdrawal(Exception):
    def __init__(self, balance, amount):
        super().__init__("account doesn't have ${}".format(amount))
        self.amount = amount
        self.balance = balance
    def overage(self):
        return self.amount - self.balance
```

Here's how we would handle an InvalidWithdrawal exception if one was raised:

```python
try:
    raise InvalidWithdrawal(25, 50)
except InvalidWithdrawal as e:
    print("I'm sorry, but your withdrawal is "
    "more than your balance by "
    "${}".format(e.overage()))
```

#### Conclusion

while researching for this, I doubted like there is if..else then why try...except, and I got this to [read](https://docs.python.org/3/glossary.html#term-eafp). Python programmers tend to follow a model of Ask forgiveness rather than permission,
which is to say, they execute code and then deal with anything that goes wrong. The
alternative, to look before you leap, is generally frowned upon. There are a few reasons
for this, but the main one is that it shouldn't be necessary to burn CPU cycles looking
for an unusual situation that is not going to arise in the normal path through the
code. Therefore, it is wise to use exceptions for exceptional circumstances, even if
those circumstances are only a little bit exceptional. Taking this argument further,
we can see that the exception syntax is also effective for flow control. Like an, if statement, exceptions can be used for decision making, branching, and
message passing

###### **Further reads**

[Built-in Exceptions in python](https://docs.python.org/3/library/exceptions.html#bltin-exceptions)
[User-defined Exceptions](https://docs.python.org/3/tutorial/errors.html#tut-userexceptions)
