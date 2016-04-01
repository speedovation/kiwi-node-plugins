var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/selectLine');

var c =function() {
	var run = function(content) {
		if (content) {
			editor.replaceContent(content);
		}
		action.selectLineAction(editor);
	};

}
