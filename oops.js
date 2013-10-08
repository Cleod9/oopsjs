/*******************************
	OOPS Version 1.0.0
	
    A very simple "Object Oriented Programming Structured" class system for JavaScript
	
    Copyright (c) 2013 Greg McLeod  (Email: cleod9{at}gmail.com)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	It is requested that you maintain all or part of this copyright notice even in the minified version.
*******************************/
var OOPS = 
{
	_ID_: 0, //Unique ID for doing Class type checks (comparable via typeCheck function)
    _props_: {}, //A registry of all property names available in this Class (Required for extension)
	_parent_: null, //A reference to the parent Class
	disallowedTerms: ['_props_', '_parent_', '_statics_', '_definition_'], //Prevent override of these names (would break the functionality)
    extend: function (params) //Performs the actual Class creation
    {   
        var p = null; //Temporary foreach loop var
        
        //Create a new empty function to populate (This is the Class that will be returned, direct descendant of OOPS)
        var cls = function()
        { 
            //If arguments are passed to the function and a _constructor_ method is provided, those arguments will be passed to _constructor_
			if(typeof this._constructor_ == 'function')
                this._constructor_.apply(this, arguments); //Apply arguments to the provided constructor
            if(arguments)
				this._constructor_ = function() {}; //No constructor provided, create a dummy constructor
        };
		
		//Grant unique class ID
		cls.prototype._ID_ = (++OOPS._ID_);
	
		//Provide other prototypes to the class
        cls.prototype._props_ = {}; //Gives this new Class access to properties without using individual standard JavaScript prototype overrides
        cls.prototype._parent_ = this; //Gives new class direct access to the parent
		
        //Inherit parent info
        for(p in this._props_)
            if(!params[p])
                params[p] = this._props_[p]; //Only overwrite if it doesn't exist in the new parameters list
        
        //For each item in the updated params list
        for(p in params)
        {
            //If the term is not banned
            if(OOPS.disallowedTerms.indexOf(p) < 0)
            {
                //Add the parameter to this new Class instance's prototype
				cls.prototype[p] = params[p];
				//Saving all the props in case we need for later, such as binding the functions to a  class itself when we instantiate
				cls.prototype._props_[p] = params[p];
            }
        }
		
		//Prep variables for future class extension
		cls._ID_ = (OOPS._ID_); //Use the ID that was created in the earlier prototype
        cls.extend = this.extend; //Inherit the extend method from OOPS
        cls._props_ = params; //Remember all of the properties inherited so far
		cls._parent_ = this; //Set the class parent to this
        
		//Add static content to class, binding functions as needed
        if(typeof params._statics_ == 'object')
		{
			//If a param called _statics_ was provided, it will treat this as a list of static properties for the object
			for(p in params._statics_)
			{
				//As long as the property name is not disallowed
				if(OOPS.disallowedTerms.indexOf(p) < 0)
				{
					//Set the static property onto the Class itself
					cls[p] = params._statics_[p];
					//If the property was a function, bind the function to the Class itself
					if(typeof cls[p] == 'function')
						cls[p] = cls[p].bind(cls);
				}
			}
		}
		//Return the class
        return cls;
    }, typeMatch: function (class1, class2)
	{
		//If the classes have matching _ID_ fields they are of the same type
		return (class1._ID_ == class2._ID_);
	}, descendantOf: function (class1, class2)
	{
		//Recursively traverse back up until we find a valid ancestor
		if(class1._parent_)
		{
			if(class1._parent_._ID_ == class2._ID_)
				return true;
			else
				return OOPS.descendantOf(class1._parent_, class2); 
		}
		else
			return false;
	}
};