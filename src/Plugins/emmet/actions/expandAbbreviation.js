var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/expandAbbreviation');

function run(content) {
	if (typeof content !== 'undefined') {
		editor.replaceContent(content);
	}
	action.expandAbbreviationAction(editor);
};

