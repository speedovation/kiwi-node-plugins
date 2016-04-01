var assert = require('assert');
var editor = require('../stubs/editor');
var parser = require('../../lib/parser/abbreviation');
var action = require('../../lib/action/updateTag');
var utils  = require('../../lib/utils/common');

var c =  function() {
	var run = function(abbr) {
		editor.setPromptOutput(abbr);
		action.updateTagAction(editor);
	};

	
}
