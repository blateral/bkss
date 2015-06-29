(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint loopfunc: true */
(function(d) {

    var links = d.querySelectorAll('[data-kss-link-ref]'),
        root = d.querySelector('[data-kss-ref]'),
        children = d.getElementById('js-menu-children');

    for (var i = 0; i < links.length; i++) {
        var current = links[i].getAttribute('data-kss-link-ref'),
            parent;

        if(current === root.getAttribute('data-kss-ref')) {
            links[i].classList.add('is-active');
        }
    }

    if(children) {
        d.querySelector('a.is-active').parentNode.appendChild(children);
    }

})(document);

(function() {
  var KssStateGenerator;

  KssStateGenerator = (function() {

    function KssStateGenerator() {
      var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
      pseudos = /(\:hover|\:disabled|\:active|\:visited|\:focus)/g;
      // try {
        _ref = document.styleSheets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          stylesheet = _ref[_i];
          idxs = [];
          _ref2 = stylesheet.cssRules || [];
          for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
            rule = _ref2[idx];
            if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
              replaceRule = function(matched, stuff) {
                return ".pseudo-class-" + matched.replace(':', '');
              };
              this.insertRule(rule.cssText.replace(pseudos, replaceRule));
            }
          }
        }
      // } catch (_error) {console.log(_error.message);}
    }

    KssStateGenerator.prototype.insertRule = function(rule) {
      var headEl, styleEl;
      headEl = document.getElementsByTagName('head')[0];
      styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = rule;
      } else {
        styleEl.appendChild(document.createTextNode(rule));
      }
      return headEl.appendChild(styleEl);
    };

    return KssStateGenerator;

  })();

  new KssStateGenerator();

}).call(this);

},{}],2:[function(require,module,exports){
/**
 * A little template parser
 * http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
 *
 * Usage:
 * var template = require('./modules/Template');
 * template.render("Hello {who}!", { who: "JavaScript" });
 */
module.exports = (function(){
    'use strict';

    function render(s, d) {
        for(var p in d) {
            s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
            return s;
        }
    }

    return {
        render: render
    };

})();

},{}]},{},[2,1]);
