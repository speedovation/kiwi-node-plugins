var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/lineBreaks');

var c = function() {
	var run = function() {
		return action.insertLineBreakAction(editor);
	};

}
