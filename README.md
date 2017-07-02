# brig-module

Module framework for brig, to let developer implement own module for brig easily.

[![NPM](https://nodei.co/npm/brig-module.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/brig-module/)
[![NPM](https://nodei.co/npm-dl/brig-module.png?months=9&height=2)](https://nodei.co/npm/brig-module/)

## Installation

Install module via NPM
```shell
npm install brig-module
```

## Create Your NPM module for brig

With `brig-module`, you can create useful brig module which can be packaged and published to NPM server.

### First Step

The first step is making preparation for your own NPM package. Create a project which includes structure:

* types/
  * MyItem.js
* index.js
* package.json
* README.md

Note that: If you don't know how to package a NPM module, please go to NPM official website to learn more.

### Second Step

The entry of this NPM module is `index.js`, it should contains:

__index.js__

```javascript
var BrigModule = require('brig-module');

var brigModule = new BrigModule();

brigModule.addType(require('./types/MyItem'));

module.export = brigModule;
```

### Third Step: Create customized type

Implement your QML type by using `BrigModule.TypePrototype`.

__types/MyItem.js__

```javascript
var BrigModule = require('brig-module');

// Create prototype of type named MyItem
var proto = module.exports = new BrigModule.TypePrototype('MyItem');

// This type has a property named msg, which has default value.
proto.defineProperty('msg', 'hello');

// This type has a method named sum, which has two parameters
proto.defineMethod('sum(a,b)', function(a, b) {
	return a + b;
});

// instance of type was created
proto.on('instance-created', function(instance) {

	instance.on('msgChanged', function() {
    console.log('msg was changed, new value is ' + insntace.getProperty('msg'));
	});

});
```

### Fourth Step: Package and publish your module

Now you can package your brig module which contains your customized type. Using NPM command to make a link or upload package to NPM server.

```shell
npm publish
```

### Fifth Step: Using your module and customized QML type in your application

Load your module in your brig application:

__app.js__

```javascript
const Brig = require('brig');
const brigMyItem = require('brig-myitem');

const brig = new Brig();

brig.on('ready', (brig) => {

  // Load your module
  brig.loadModule(brigMyItem);
  
  brig.open('Application.qml', (err, window) => {
    // You have a window here
  });
});
```

Then your customized QML type can be used in QML enviromnet:

__Application.js__

```qml
import QtQuick 2.3
import QtQuick.Controls 2.0
import Brig.MyItem 1.0

ApplicationWindow {
	visible: true;
	color: 'black';
	title: 'My Application';
	width: 1280;
	height: 768;

	MyItem {
		id: myItem;
		msg: 'new msg';
	}
  
	Component.onCompleted: {
		var ret = myItem.sum(1, 2);
		console.log(ret);
	}
}
```

## License

Licensed under the MIT License

## Authors

Copyright(c) 2017 Fred Chien <<cfsghost@gmail.com>>
