# precise-copy • [![Code Climate](https://codeclimate.com/github/VsevolodTrofimov/precise-copy/badges/gpa.svg)](https://codeclimate.com/github/VsevolodTrofimov/precise-copy) [![Build Status](https://travis-ci.org/VsevolodTrofimov/precise-copy.svg?branch=master)](https://travis-ci.org/VsevolodTrofimov/precise-copy)

precise-copy is a tiny library that would only shallow copy values of specified keys keeping all others by reference(which is very preformant compared to deep copy). It can be used in pure functions that are operating big objects(like [redux reducers](http://redux.js.org/docs/basics/Reducers.html)).

In this example only values of the highlighted keys would be copied(shallowly)

*last line is example precise-copy call*

![Example](https://raw.githubusercontent.com/VsevolodTrofimov/precise-copy/master/readme.gif)

## Installation
```bash
$ npm install precise-copy --save
```

## Usage
precise-copy consists of 2 main parts: TypeList which tells it how to handle each type and copy function that actullay performs the precise copy


### TypeList Items
Each item in type list must follow this structure
```javascript
let typeListArrayItem = {
  type: Array,
  copy: (x) => x.slice()
}
```

Value of the `type` field must be the prototype elements would be matched with it using `instanceof`
Value of the `copy` should be function that takes instance as an argument and returns a shallow copy of it

**NOTE: most js types (Object, Array, Date, Set, Map) are already added to the lib**
You can access them this way
```javascript
let arrayType = require('precise-copy/typeLib/array') //equals to the typeListArrayItem in the previous example
```

### TypeList API
This is an example of basic type list that would allow Array, Date and Object copy
```javascript
const arrayType = require('precise-copy/typeLib/array')
const objectType = require('precise-copy/typeLib/object')
const dateType = require('precise-copy/typeLib/date')
const TypeList = require('precise-copy').TypeList

let myTypeList = new TypeList([dateType, arrayType, objectType])
```

You can add items to the existing type list
```javascript
let setType = require('precise-copy/typeLib/set')

myTypeList.add(setType)

//it is recommended to rearrange TypeList in this case to insure that element would not be matched with some parent type before it's children
myTypeList.arrange()
```

`.arrange()` changes type order so `instanceof` would always trigger on child types first for example it puts `myDate` that inherits from date in before `Date` and as all js complex types are childs of `Object` it goes after those.

*Other TypeList methods are for internal usage by precise-copy*

### Copy
Imagine this is a redux project your state is something like
```javascript
let state = {
  filters: {...}, //some filer data
  user: {...}, //some user date
  articles: []
}
```
And each article is something like
```javascript
{
  title: 'Title',
  content: '...', //some long text
  publishDate: new Date(),
  tags: {
    global: ['a', 'b', 'c'],
    personal: []
  }
}
```

And now, adding a tag is really painful, because we need to change `state.articles[index].tags.global` without affecting previous state

Let's use our `myTypeList` and `copy` here to precisely copy all the way to the global tags of the 3rd article
```javascript
let index = 2
let path = ['articles', index, 'tags', 'global'] //keys, which values would be shallow copied
let statePreciseCopy = preciseCopy.copy(myTypeList, source, path)

//as we intially wanted to push something there
statePreciseCopy.articles[index].tags.global.push("it's still pure!")
```

And that's it!  The most important thing is that `state.filters` every other `article` and even 3rd article's personal tags are still being passed by reference which saves a lot of CPU load and memory compared to deepCopy and a lot of your time compared to rewriting this copying each time.

### Tip
If you are using lodash this might be a good idea
*myPreciseCopy.js*
```javascript
const _ = require('lodash')
const arrayType = require('precise-copy/typeLib/array')
const objectType = require('precise-copy/typeLib/object')
const dateType = require('precise-copy/typeLib/date')
const preciseCopy = require('precise-copy')

let myTypeList = new preciseCopy.TypeList([dateType, arrayType, objectType])

module.exports = _.curry(preciseCopy.copy)(myTypeList)
```

*someReducer.js*
```javascript
const preciseCopy = require('./myPreciseCopy')

let newState = preciseCopy(state, path)
```
