var reqex = require('require-regexp');

module.exports = loadPlugins;

function loadPlugins(names, paths, options) {
	var plugins = reqex(names, paths);
	var pluginNames = Object.keys(plugins);
	var initializedPlugins = {};

	var filter = options.filter || function () {return true;};
	var init = options.init || function () {};

	pluginNames.filter(function (name) {
		return filter(name, plugins[name]);
	}).forEach(function (name) {
		var plugin = plugins[name];
		initializedPlugins[name] = init(name, plugin) || plugin;
	});
	
	return {
		plugins : initializedPlugins
	};
}