var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/selectItem');

var c = function() {
	
	var sel = function() {
		return editor.getSelectionRange();
	};

	var next = function() {
		action.selectNextItemAction(editor);
		return sel();
	};

	var prev = function() {
		action.selectPreviousItemAction(editor);
		return sel();
	};

	var r = function(start, end) {
		return {start: start, end: end};
	}


});
