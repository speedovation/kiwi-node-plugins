var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/evaluateMath');

     
	var run = function(content) {
			if (content) {
				editor.replaceContent(content);
			}
			return action.evaluateMathAction(editor);
		};

		
