var assert = require('assert');
var editor = require('../stubs/editor');
var parser = require('../../lib/parser/abbreviation');
var action = require('../../lib/action/wrapWithAbbreviation');
var utils  = require('../../lib/utils/common');

var c = function() {
	var run = function(abbr, content) {
		if (abbr && content) {
			content = utils.escapeText(content);
			return parser.expand(abbr, {
				pastedContent: content, 
				syntax: 'html', 
				profile: 'plain'
			});
		}

		editor.setPromptOutput(abbr);
		action.wrapWithAbbreviationAction(editor);
	};

}
