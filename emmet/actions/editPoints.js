var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/editPoints');

	var content = '<a href="">\n\t<b></b>\n\t\n</a>';

		editor.replaceContent(content);
		editor.setCaretPos(0);
		var run = function() {
			return action.nextEditPointAction(editor);
		};

		editor.replaceContent(content);
		editor.setCaretPos(content.length);
		var run = function() {
			return action.previousEditPointAction(editor);
		};
