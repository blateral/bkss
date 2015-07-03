/* jshint loopfunc: true */
(function(d) {

    var links = d.querySelectorAll('[data-kss-link-ref]'),
        root = d.querySelector('[data-kss-ref]'),
        sections = d.querySelectorAll('[data-bkss-section]'),
        children = d.getElementById('js-menu-children'),
        scrollMonitor = require("scrollMonitor");

    for (var i = 0; i < links.length; i++) {
        var current = links[i].getAttribute('data-kss-link-ref'),
            parent;

        if(current === root.getAttribute('data-kss-ref')) {
            links[i].classList.add('is-active');
        }
    }

    for (var j = 0; j < sections.length; j++) {
        initScrollMonitor(sections[j]);
    }

    if(children) {
        d.querySelector('a.is-active').parentNode.appendChild(children);
    }

    function initScrollMonitor(section) {
        var watcher = scrollMonitor.create(section);

        watcher.enterViewport(function() {

            var section = watcher.watchItem.getAttribute('data-bkss-section'),
                link = d.querySelector('[data-bkss-section-ref="'+section+'"]');

            if(link) {
                link.classList.add('is-active');
            }
        });

        watcher.exitViewport(function() {

            var section = watcher.watchItem.getAttribute('data-bkss-section'),
                link = d.querySelector('[data-bkss-section-ref="'+section+'"]');

            if(link) {
                link.classList.remove('is-active');
            }
        });
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
