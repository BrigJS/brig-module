
var BrigModule = module.exports = function() {
	this.importPaths = [];
	this.types = [];
};

BrigModule.TypePrototype = require('./lib/type_prototype');

BrigModule.prototype.addImportPath = function(importPath) {
	this.importPaths.push(importPath);
};

BrigModule.prototype.addType = function(typePrototype) {
	this.types.push(typePrototype);
};
