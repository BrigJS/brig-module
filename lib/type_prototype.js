var util = require('util');
var events = require('events');

var TypePrototype = module.exports = function(typeName) {

	this.name = typeName;

	/// Definitions
	this.properties = {};
	this.methods = {};
	this.signals = [];
};

util.inherits(TypePrototype, events.EventEmitter);

TypePrototype.prototype.defineProperty = function(propName, defValue) {
	this.properties[propName] = defValue;
};

TypePrototype.prototype.defineMethod = function(signature, handler) {
	this.methods[signature] = handler;
};

TypePrototype.prototype.defineSignal = function(signature) {
	this.signals.push(signature);
};
