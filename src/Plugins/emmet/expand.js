var assert = require('assert');
//var editor = require('./stubs/editor');
var parser = require('emmet/lib/parser/abbreviation');
var resources = require('emmet/lib/assets/resources');
var tabStops = require('emmet/lib/assets/tabStops');
var utils = require('emmet/lib/utils/common');
var actionUtils = require('emmet/lib/utils/action');
var editorUtils = require('emmet/lib/utils/editor');


var expandClass = function() {
    
    this.userSettings = {
        'html': {
            'abbreviations': {
                'jq': '<scr' + 'ipt type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></scr' + 'ipt>',
                'demo': '<div id="demo"></div>',
                'nav': 'ul.nav>li*>a',
                'al': '<a !href="http://|">',
                'f1|f2': '<demo>'
            },
            'snippets': {
                'dol': '\\$db->connect()\n\t\\$\\$\\$more dollaz$',
                'erb': '<%= |${child} %>'
            }
        },
        'xml': {
            'abbreviations': {
                'use': '<use xlink:href=""/>'
            }
        }
    };
    
    this.caret = utils.getCaretPlaceholder();
    
    this.expand = function (abbr, options) {
        options = utils.extend({profile: 'plain'}, options || {});
        return tabStops.processText(parser.expand(abbr, options), {
            escape: function(ch) {
                return ch;
            },
            
            tabstop: function(data) {
                return data.placeholder || '';
            }
        });
    }
    
    this.before = function() {
        utils.setCaretPlaceholder('|');
        resources.setVocabulary(this.userSettings, 'user');
    };
    
    this.after =function() {
        utils.setCaretPlaceholder(caret);
        resources.setVocabulary({}, 'user');
    };
    
}


module.exports = function () {
    
    return new expandClass();
    
}
