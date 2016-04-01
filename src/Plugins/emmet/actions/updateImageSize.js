var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/updateImageSize');

var c = function() {
	var run = function(content) {
		if (content) {
			editor.replaceContent(content);
		}
		action.updateImageSizeAction(editor);
	};

	}
