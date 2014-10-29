(function (Utils, undefined) {
  'use strict';

  // Javascript utilities
  // --------------------

  Utils.pad = function (text, slice) {
    if (typeof slice === 'undefined') {
      slice = -2;
    }
    return ('0' + text).slice(slice);
  };

  Utils.extend = function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  };

  Utils.addClass = function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  Utils.removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  Utils.hasClass = function (el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  };

  Utils.createElement = function (html) {
    var el = document.createElement('div');
    el.innerHTML = html;

    return el.childNodes[0];
  };

  Utils.getAttributes = function (element) {
    var attributes = element.attributes;
    var out = {};

    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr) && attributes[attr].name && attributes[attr].name.indexOf('data-') > -1) {
        var camelCaseName = _camelCase(attributes[attr].name.split('data-')[1]);
        var data = attributes[attr].value;
        if (typeof data === 'string') {
          // Try to cast all main types or leave string if all casts fail
          try {
            data = data === 'true' ? true : data === 'false' ? false :
                data === 'null' ? null : +data + '' === data ? +data : data;
          } catch (e) {
          }
        } else {
          data = undefined;
        }
        out[camelCaseName] = data;
      }
    }
    return out;
  };

  Utils.index = function (child) {
    var parent = child.parentNode;
    return Array.prototype.indexOf.call(parent.children, child);
  };

  Utils.offset = function (el) {
    var rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  };

  /**
   * Updates given Date() object with new hours/minutes
   * @param date
   * @param hours
   * @param minutes
   * @param [seconds]
   */
  Utils.updateDate = function (date, hours, minutes, seconds) {
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);

    return date;
  };

  // Internal helpers
  // ----------------

  var _SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var _MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var _camelCase = function (name) {
    return name.
      replace(_SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(_MOZ_HACK_REGEXP, 'Moz$1');
  };

})(Planner.Utils = Planner.Utils || {});
