var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/incrementDecrement');

var c =  function() {
	var run = function(value) {
		return action.incrementNumber(editor, value);
	};

}
