var events = require('events');
var reqex = require('require-regexp');

module.exports = loadPlugins;

function loadPlugins(names, paths, initFnName, options) {
	var eventEmitter = new events.EventEmitter();
	
	initFnName = initFnName || 'init';
	var plugins = reqex(names, paths);
	var pluginNames = Object.keys(plugins);
	var initializedPlugins = {};
	
	pluginNames.filter(function (name) {
		return plugins[name].hasOwnProperty(initFnName);
	}).forEach(function (name) {
		var plugin = plugins[name];
		initializedPlugins[name] = plugin[initFnName](eventEmitter, options) || plugin;
	});
	
	return {
		emitter : eventEmitter,
		plugins : initializedPlugins
	};
}