# OOPS.js #

----------


This vanilla JS script enables you to use a very simple "**O**bject **O**riented **P**rogramming-**S**tructured" class system. It supports extending classes, overrides, constructors, type checking, and static methods. I've included a sample script called oops-examples.js that demonstrates its use. Check out how the code is used in `examples.js` and load up `examples.htm` in your web browser to see it in action.

## Instructions ##

The setup for OOPS.js is similar to most other JavaScript class libraries, however it is designed to be as simple as possible to set up. All you have to do is create definitions by extending the global `OOPS` object.

### Defining Classes ### 

To create classes you can start out be extending OOPS.js:

```javascript
//Define the class
var MyClass = OOPS.extend({});
var myinstance = new MyClass();
```

The above example just created a class definition called `MyClass` with no properties or methods. An instance is then created by calling `new MyClass()`. 

### Defining Classes w/ Properties and Functions ###

Let's start over and take the above example a step further:

```javascript
//Define the class with some methods and properties
var MyClass = OOPS.extend({
	foo: 0, //<-Will take on this initial value
	_constructor_: function(foo) {
		//Use 'this' to refer to the object properties
		this.foo = foo;
	},
	toString: function () {
		return "Foo is " + this.foo;
	}
});
var myinstance = new MyClass(42);
console.log(myinstance.toString()); //Prints "Foo is 42"
console.log(myinstance.foo); //Prints "42"
```
Now we've created a class with some data. Notice the `_constructor_` function has a special functionality, allowing you to specify parameters for the `new` operator. Whenever `new MyClass()` is called, it will expect a value for `foo` to be provided.

### Extending Class Definitions ###

Now let's try extending `MyClass` with a new definition:

```javascript
//Define the class
var MyClassChild = MyClass.extend({
	bar: "^_^",
	_constructor_: function(foo) {
 		//Pass foo up to the parent constructor (kind of like a super() command in traditional OOP)
		MyClass.prototype._constructor_.call(this, foo);
	}
});
var myinstancechild = new MyClassChild(999);
console.log(myinstancechild.bar); //Prints "^_^"
console.log(myinstance.toString()); //Prints "Foo is 999"
```
In the above example, `MyClass` was extended by a new class called `MyClassChild` and given a new property called `bar`. By binding `this` to the `MyClass` prototype functions, we simulate the traditional OOP super() command. The parent function is called but within the context of `this` (where `this` is the instance of `MyClassChild`). And you can see we have direct access to the parent's `toString()` since it was automatically passed down by OOPS.js.

(Note: For super calls that only go up one level, you may call them without the class name like so:  `this._super_.prototype.myMethod.call(this, arg1, arg2...)`. Unfortunately `_super_` which is provided by OOPS.js can only traverse upward one level, since the context of `this._super_` becomes invalid after the first call)

### Static Properties and Methods ###

Class definitions can also have static properties and methods by defining the reserved `_statics_` object:

```javascript
//Define the class
var MyStaticClass = OOPS.extend({
	_statics_: {
		message: "Hello Static World!",
		getMessage: function() {
			return MyClass.message + " ~toString";
		}
	}
	/* Other normal class properties can also be added if desired */
});
//No need to instantiate anything in this case since we are only accessing statics
console.log(MyStaticClass.getMessage()); //Prints "Hello Static World! ~toString"
console.log(MyStaticClass.message; //Prints "Hello Static World!"
```
Statics are a great way to create singletons to act as global objects when you know you won't need to create multiple instances.


## Extra Functions ##

OOPS.js comes with a couple of extra built in functions that you  can use:

`OOPS.typeMatch(class1, class2)` - Provided two class definitions or instances of a class, returns `true` if they are of the same type. Returns `false` otherwise.

`OOPS.descendantOf(child, parent);` - Tests to see if the `child` is a descendant of `parent`. The values provided can either be class definitions, or instances of the class.

And of course OOPS.js naturally supports the `instanceof` operator!

## Terms of Use ##

Free to use in any projects without notifying me, nor is credit needed (though it'd be much appreciated!). Just do not re-distribute it under anyone else's name and be sure to retain the copyright notice in the source!

## Version History ##

**1.1.0**

- Greatly simplified the setup structure by using standard JS practices
- Replaced _parent_ property with _super_
- No longer a need to specific the name of the parent class to call its constructor

(95% backwards compatible with 1.0.0, just update your _super_ calls)

**1.0.0**

- Initial release

 
----------

Copyrighted © 2013 by Greg McLeod

GitHub: [https://github.com/cleod9](https://github.com/cleod9)