var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/toggleComment');

var C = function() {
	var run = function(content) {
		if (content) {
			editor.replaceContent(content);
		}
		action.toggleCommentAction(editor);
	};

}
