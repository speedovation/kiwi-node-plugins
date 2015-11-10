var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/reflectCSSValue');
var prefs  = require('../../lib/assets/preferences');

var c = function() {
	var run = function(content) {
		if (content) {
			editor.replaceContent(content);
		}
		action.reflectCSSValueAction(editor);
	};

}
