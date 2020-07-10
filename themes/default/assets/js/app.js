/*
    JDOM IS A SIMPLE DOM SELECTOR WITH FUNCTIONS!
    This is not finished! If you want to add something, just do it!
*/


class jdom {
    constructor(element, parent=undefined) {
        if (typeof parent=='undefined')
            parent = document;

        this.usign = "queryselector";
        if (element instanceof HTMLElement || element===document  || element===window) {
            this.elem = element;
            this.usign = "htmlelement";
        } else if (element instanceof jdom) {
            this.elem = element.elem;
            this.usign = "jdom";
        } else
            this.elem = parent.querySelectorAll(element);

        this.$ = function(element){
            if (typeof this.elem[0] !== 'undefined')
                return (new jdom(element, this.elem[0]));
            return (new jdom(element, this.elem));
        }
    }

    each(func) {
        if (this.usign == "htmlelement")
            func(this.elem);
        else
            [].forEach.call(this.elem, func);
    }

    getFirstElement() {
        if (this.usign == "htmlelement")
            return this.elem;
        else if (typeof this.elem[0] != 'undefined')
            return this.elem[0];
        return undefined;
    }


    html(html) {
        if (typeof html == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.innerHTML;
            return "";
        } else {
            this.each( function (element) { element.innerHTML = html; });
            return this;
        }
    }

    text(text) {
        if (typeof text == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.innerText;
            return "";
        } else {
            this.each( function (element) { element.innerText = text; });
            return this;
        }
    }

    css(css={}, alternativeValue=undefined) {
        if (typeof css == "string" && typeof alternativeValue == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element.style[css] !== 'undefined')
                return element.style[css];
            return "";
        } else
            this.each( function (element) {
                if (typeof css == "string" && typeof alternativeValue != 'undefined') {
                    element.style[css] = alternativeValue;
                } else {
                    for (var styleAttr in css)
                        element.style[styleAttr] = css[styleAttr];
                }
            });
        return this;
    }

    attr(attributes={}, alternativeValue=undefined) {
        if (typeof attributes == "string" && typeof alternativeValue == 'undefined') {
            var element = this.getFirstElement();

            if (typeof element !== 'undefined')
                return element.getAttribute(attributes);
        } else
            this.each( function (element) {
                if (typeof attributes == "string" && typeof alternativeValue != 'undefined') {
                    element.setAttribute(attributes, alternativeValue);
                } else {
                    for (var attribute in attributes)
                        element.setAttribute(attribute, attributes[attribute]);
                }
            });
        return this;
    }

    removeAttr(name) {
        this.each(function(element) {
            element.removeAttribute(name);
        });
        return this;
    }

    addClass(name) {
        this.each( function (element) {
            element.classList.add(name);
        });
        return this;
    }

    removeClass(name) {
        this.each( function (element) {
            element.classList.remove(name);
        });
        return this;
    }

    id(name) {
        if (typeof name == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.id;
        } else {
            this.each(function(element) {
                element.id = name;
            });
        }
        return this;
    }

    val(value) {
        if (typeof value == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.value;
        } else {
            this.each(function(element) {
                element.value = value;
            });
        }
        return this;
    }

    append(append) {
        if (append instanceof HTMLElement)
            this.each( function (element) {
                element.appendChild(append);
            });
        else if (append instanceof jdom)
            this.each( function (element) {
                element.appendChild(append.elem);
            });
        else {
            var outerThis = this;
            this.each( function (element) {
                outerThis.html(outerThis.html() + append);
            });
        }
        return this;
    }

    prepend(prepend) {
        if (prepend instanceof HTMLElement)
            this.each( function (element) {
                element.prepend(prepend);
            });
        else if (prepend instanceof jdom)
            this.each( function (element) {
                element.prepend(prepend.elem);
            });
        else {
            var outerThis = this;
            this.each( function (element) {
                outerThis.html(prepend+outerThis.html());
            });
        }
        return this;
    }


    getElem(){
        return this.elem;
    }

    on(what, func, option) {
        this.each( function(element){
            element.addEventListener(what,func);
        }, option);
        return this;
    }

    rmEvent(what, func) {
        this.each(function(element) {
            element.removeEventListener(what, func);
        });
    }

    bind(binds={}) {
        this.each( function(element){
            for (var bind in binds)
                element.addEventListener(bind, binds[bind]);
        });
        return this;
    }

    click(func){
        if (typeof func != 'undefined')
            this.on('click', func);
        else
            (this.getFirstElement()).click();

        return this;
    }

    contextmenu(func) { return this.on('contextmenu', func); }
    change(func) { return this.on('change', func); }
    mouseover(func) { return this.on('mouseover', func); }
    keypress(func) { return this.on('keypress', func); }
    keyup(func) { return this.on('keyup', func); }
    keydown(func) { return this.on('keydown', func); }
    dblclick(func) { return this.on('dblclick', func); }
    resize(func) { return this.on('resize', func); }

    timeupdate(func) { return this.on('timeupdate', func); }
    touchcancle(func) { return this.on('touchcancle', func); }
    touchend(func) { return this.on('touchend', func); }
    touchmove(func) { return this.on('touchmove', func); }
    touchstart(func) { return this.on('touchstart', func); }

    drag(func) { return this.on('drag', func); }
    dragenter(func) { return this.on('dragenter', func); }
    dragleave(func) { return this.on('dragleave', func); }
    dragover(func) { return this.on('dragover', func); }
    dragend(func) { return this.on('dragend', func); }
    dragstart(func) { return this.on('dragstart', func); }
    drop(func) { return this.on('drop', func); }

    focus(func) { return this.on('focus', func); }
    focusout(func) { return this.on('focusout', func); }
    focusin(func) { return this.on('focusin', func); }
    invalid(func) { return this.on('invalid', func); }
    popstate(func) { return this.on('popstate', func); }
    volumechange(func) { return this.on('volumechange', func); }
    unload(func) { return this.on('unload', func); }
    offline(func) { return this.on('offline', func); }
    online(func) { return this.on('online', func); }
    focus(func) { return this.on('focus', func); }

    ready(func) {
        this.on('DOMContentLoaded', func);
        return this;
    }

    hide() {
        this.each( function(element){
            element.style.display = "none";
        });
        return this;
    }

    show() {
        this.each( function(element){
            element.style.display = "";
        });
        return this;
    }

    toggle() {
        this.each( function(element){
            if (element.style.display == "none")
                element.style.display = "";
            else
                element.style.display = "none";
        });
        return this;

    }

    animate(css={}, duration=1000, then=function(){}) {
        this.css("transition", duration+"ms");
        this.css(css);
        setTimeout(function() {
            then();
        }, duration);
        return this;
    }

    animator(animations=[], async = false){
        var counting = 0;
        var outerThis = this;
        for (var animation in animations) {
            const css = typeof animations[animation].css != 'undefined' ? animations[animation].css : {};
            const then = typeof animations[animation].then != 'undefined' ? animations[animation].then : function () {};
            const duration = typeof animations[animation].duration != 'undefined' ? animations[animation].duration : 1000;
            setTimeout(function(){
                outerThis.animate(css, duration, then);
            }, counting);
            if (!async)
                counting += duration;
        }
        return this;
    }

    static noConflict() {
        var $ = _$beforeJdom;
        var $n = _$nBeforeJdom;
        var $$ = _$$beforeJdom;
    }

}

if (typeof $ != 'undefined')
    var _$beforeJdom  = $;
if (typeof $n != 'undefined')
    var _$nBeforeJdom = $n;
if (typeof $$ != 'undefined')
    var _$$beforeJdom = $$;

$jdomfn = function(name, func){
    jdom.prototype[name] = func;
}

$jdomGetter = function(varName){
    varNameArray = varName.split("");
    if (varNameArray[0] !== undefined)
        varNameArray[0] = varName[0].toUpperCase();
    var out = "";
    for (letter in varNameArray)
        out += varNameArray[letter];
    jdom.prototype["get"+out] = function(){
        return this.getFirstElement()[varName];
    }
}

$jdomSetter = function(varName){
    varNameArray = varName.split("");
    if (varNameArray[0] !== undefined)
        varNameArray[0] = varName[0].toUpperCase();
    var out = "";
    for (letter in varNameArray)
        out += varNameArray[letter];
    jdom.prototype["set"+out] = function(value){
        this.each(function(elem){
            elem[varName] = value;
        });
        return this;
    }
}

var $ = function(element){
    return (new jdom(element));
}

var $jdom = function(element){
    return (new jdom(element));
}

var $n = function(element="div"){
    return (new jdom(document.createElement(element)));
}

var $$ = function (element) {
    return document.querySelectorAll(element);
}


if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = $;
}

/*!
 * Waves v0.7.6
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window, factory) {
    'use strict';

    // AMD. Register as an anonymous module.  Wrap in function so we have access
    // to root via `this`.
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            window.Waves = factory.call(window);
            return window.Waves;
        });
    }

    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    else if (typeof exports === 'object') {
        module.exports = factory.call(window);
    }

    // Browser globals.
    else {
        window.Waves = factory.call(window);
    }
})(typeof global === 'object' ? global : this, function() {
    'use strict';

    var Waves            = Waves || {};
    var $$               = document.querySelectorAll.bind(document);
    var toString         = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;


    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function isObject(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }

    function isDOMNode(obj) {
        return isObject(obj) && obj.nodeType > 0;
    }

    function getWavesElements(nodes) {
        var stringRepr = toString.call(nodes);

        if (stringRepr === '[object String]') {
            return $$(nodes);
        } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
            return nodes;
        } else if (isDOMNode(nodes)) {
            return [nodes];
        }

        return [];
    }

    function offset(elem) {
        var docElem, win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(styleObj) {
        var style = '';

        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                style += (prop + ':' + styleObj[prop] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect duration
        duration: 700,

        // Effect delay (check for scroll before showing effect)
        delay: 200,

        show: function(e, element, velocity) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            element = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple waves-rippling';
            element.appendChild(ripple);

            // Get click coordinate and element width
            var pos       = offset(element);
            var relativeY = 0;
            var relativeX = 0;
            // Support for touch devices
            if('touches' in e && e.touches.length) {
                relativeY   = (e.touches[0].pageY - pos.top);
                relativeX   = (e.touches[0].pageX - pos.left);
            }
            //Normal case
            else {
                relativeY   = (e.pageY - pos.top);
                relativeX   = (e.pageX - pos.left);
            }
            // Support for synthetic events
            relativeX = relativeX >= 0 ? relativeX : 0;
            relativeY = relativeY >= 0 ? relativeY : 0;

            var scale     = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
            var translate = 'translate(0,0)';

            if (velocity) {
                translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-translate', translate);

            // Set ripple position
            var rippleStyle = {
                top: relativeY + 'px',
                left: relativeX + 'px'
            };

            ripple.classList.add('waves-notransition');
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.classList.remove('waves-notransition');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale + ' ' + translate;
            rippleStyle['-moz-transform'] = scale + ' ' + translate;
            rippleStyle['-ms-transform'] = scale + ' ' + translate;
            rippleStyle['-o-transform'] = scale + ' ' + translate;
            rippleStyle.transform = scale + ' ' + translate;
            rippleStyle.opacity = '1';

            var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
            rippleStyle['-webkit-transition-duration'] = duration + 'ms';
            rippleStyle['-moz-transition-duration']    = duration + 'ms';
            rippleStyle['-o-transition-duration']      = duration + 'ms';
            rippleStyle['transition-duration']         = duration + 'ms';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e, element) {
            element = element || this;

            var ripples = element.getElementsByClassName('waves-rippling');

            for (var i = 0, len = ripples.length; i < len; i++) {
                removeRipple(e, element, ripples[i]);
            }

            if (isTouchAvailable) {
                element.removeEventListener('touchend', Effect.hide);
                element.removeEventListener('touchcancel', Effect.hide);
            }

            element.removeEventListener('mouseup', Effect.hide);
            element.removeEventListener('mouseleave', Effect.hide);
        }
    };

    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
    var TagWrapper = {

        // Wrap <input> tag so it can perform the effect
        input: function(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element class and style to the specified parent
            var wrapper       = document.createElement('i');
            wrapper.className = element.className + ' waves-input-wrapper';
            element.className = 'waves-button-input';

            // Put element as child
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);

            // Apply element color and background color to wrapper
            var elementStyle    = window.getComputedStyle(element, null);
            var color           = elementStyle.color;
            var backgroundColor = elementStyle.backgroundColor;

            wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
            element.setAttribute('style', 'background-color:rgba(0,0,0,0);');

        },

        // Wrap <img> tag so it can perform the effect
        img: function(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element as child
            var wrapper  = document.createElement('i');
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);

        }
    };

    /**
     * Hide the effect and remove the ripple. Must be
     * a separate function to pass the JSLint...
     */
    function removeRipple(e, el, ripple) {

        // Check if the ripple still exist
        if (!ripple) {
            return;
        }

        ripple.classList.remove('waves-rippling');

        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale     = ripple.getAttribute('data-scale');
        var translate = ripple.getAttribute('data-translate');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
            delay = 0;
        }

        if (e.type === 'mousemove') {
            delay = 150;
        }

        // Fade out ripple after delay
        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

        setTimeout(function() {

            var style = {
                top: relativeY + 'px',
                left: relativeX + 'px',
                opacity: '0',

                // Duration
                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',
                '-webkit-transform': scale + ' ' + translate,
                '-moz-transform': scale + ' ' + translate,
                '-ms-transform': scale + ' ' + translate,
                '-o-transform': scale + ' ' + translate,
                'transform': scale + ' ' + translate
            };

            ripple.setAttribute('style', convertStyle(style));

            setTimeout(function() {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }, duration);

        }, delay);
    }


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {

        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,

        allowEvent: function(e) {

            var allow = true;

            if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
                allow = false;
            }

            return allow;
        },
        registerEvent: function(e) {
            var eType = e.type;

            if (eType === 'touchstart') {

                TouchHandler.touches += 1; // push

            } else if (/^(touchend|touchcancel)$/.test(eType)) {

                setTimeout(function() {
                    if (TouchHandler.touches) {
                        TouchHandler.touches -= 1; // pop after 500ms
                    }
                }, 500);

            }
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {

        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement) {
            if ( (!(target instanceof SVGElement)) && target.classList.contains('waves-effect')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {

        // Disable effect if element has "disabled" property on it
        // In some cases, the event is not triggered by the current element
        // if (e.target.getAttribute('disabled') !== null) {
        //     return;
        // }

        var element = getWavesEffectElement(e);

        if (element !== null) {

            // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
            if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
                return;
            }

            TouchHandler.registerEvent(e);

            if (e.type === 'touchstart' && Effect.delay) {

                var hidden = false;

                var timer = setTimeout(function () {
                    timer = null;
                    Effect.show(e, element);
                }, Effect.delay);

                var hideEffect = function(hideEvent) {

                    // if touch hasn't moved, and effect not yet started: start effect now
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                        Effect.show(e, element);
                    }
                    if (!hidden) {
                        hidden = true;
                        Effect.hide(hideEvent, element);
                    }

                    removeListeners();
                };

                var touchMove = function(moveEvent) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    hideEffect(moveEvent);

                    removeListeners();
                };

                element.addEventListener('touchmove', touchMove, false);
                element.addEventListener('touchend', hideEffect, false);
                element.addEventListener('touchcancel', hideEffect, false);

                var removeListeners = function() {
                    element.removeEventListener('touchmove', touchMove);
                    element.removeEventListener('touchend', hideEffect);
                    element.removeEventListener('touchcancel', hideEffect);
                };
            } else {

                Effect.show(e, element);

                if (isTouchAvailable) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }

                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
    }

    Waves.init = function(options) {
        var body = document.body;

        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        if ('delay' in options) {
            Effect.delay = options.delay;
        }

        if (isTouchAvailable) {
            body.addEventListener('touchstart', showEffect, false);
            body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
            body.addEventListener('touchend', TouchHandler.registerEvent, false);
        }

        body.addEventListener('mousedown', showEffect, false);
    };


    /**
     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
     * waves classes to a set of elements. Set drag to true if the ripple mouseover
     * or skimming effect should be applied to the elements.
     */
    Waves.attach = function(elements, classes) {

        elements = getWavesElements(elements);

        if (toString.call(classes) === '[object Array]') {
            classes = classes.join(' ');
        }

        classes = classes ? ' ' + classes : '';

        var element, tagName;

        for (var i = 0, len = elements.length; i < len; i++) {

            element = elements[i];
            tagName = element.tagName.toLowerCase();

            if (['input', 'img'].indexOf(tagName) !== -1) {
                TagWrapper[tagName](element);
                element = element.parentElement;
            }

            if (element.className.indexOf('waves-effect') === -1) {
                element.className += ' waves-effect' + classes;
            }
        }
    };


    /**
     * Cause a ripple to appear in an element via code.
     */
    Waves.ripple = function(elements, options) {
        elements = getWavesElements(elements);
        var elementsLen = elements.length;

        options          = options || {};
        options.wait     = options.wait || 0;
        options.position = options.position || null; // default = centre of element


        if (elementsLen) {
            var element, pos, off, centre = {}, i = 0;
            var mousedown = {
                type: 'mousedown',
                button: 1
            };
            var hideRipple = function(mouseup, element) {
                return function() {
                    Effect.hide(mouseup, element);
                };
            };

            for (; i < elementsLen; i++) {
                element = elements[i];
                pos = options.position || {
                    x: element.clientWidth / 2,
                    y: element.clientHeight / 2
                };

                off      = offset(element);
                centre.x = off.left + pos.x;
                centre.y = off.top + pos.y;

                mousedown.pageX = centre.x;
                mousedown.pageY = centre.y;

                Effect.show(mousedown, element);

                if (options.wait >= 0 && options.wait !== null) {
                    var mouseup = {
                        type: 'mouseup',
                        button: 1
                    };

                    setTimeout(hideRipple(mouseup, element), options.wait);
                }
            }
        }
    };

    /**
     * Remove all ripples from an element.
     */
    Waves.calm = function(elements) {
        elements = getWavesElements(elements);
        var mouseup = {
            type: 'mouseup',
            button: 1
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            Effect.hide(mouseup, elements[i]);
        }
    };

    /**
     * Deprecated API fallback
     */
    Waves.displayEffect = function(options) {
        console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
        Waves.init(options);
    };

    return Waves;
});

class CajaxRequest {
    constructor(url,method, data=null, options={}) {
        // INIT
        this.onResponseFunction = ()=>{};
        this.catchFunction = ()=>{};
        this.thenFunction = ()=>{};

        if (data != null) {
            var urlEncodedData = "";
            var urlEncodedDataPairs = [];
            var name;
            for(name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            this.data = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
        } else this.data = null;
        this.method = method;
        this.contenttype = (options.usinginput) ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";

        var xhr = new XMLHttpRequest();

        if (options != null)
            for (var options_key__cajax in options) {
                xhr[options_key__cajax] = options[options_key__cajax];
            }


        xhr.open(method, url+((this.method=="GET")? "?"+this.data : "" ));
        if (options.header != null) for (var requestheader_obj__cajax in options.header) {
            xhr.setRequestHeader(requestheader_obj__cajax, options.header[requestheader_obj__cajax]);
        }

        xhr.setRequestHeader('Content-type', this.contenttype);
        this.request = xhr;
        if (options.usinginput && data != null) this.data = JSON.stringify(data);
    }

    response (func) {
        this.onResponseFunction = func;
        return this;
    }

    then (func) {
        this.thenFunction = func;
        return this;
    }

    catch (func) {
        this.catchFunction = func;
        return this;
    }

    custom (func) {
        func(this.request);
        return this;
    }

    send () {

        (this.request).onload = () => {
            this.onResponseFunction(this.request);
            if ((this.request).readyState == 4 && ((this.request).status == "200" || (this.request).status == "201")) {
                this.thenFunction((this.request));
            } else {
                this.catchFunction((this.request));
            }
        };

        (this.request).send(this.data);
        return this;
    }
}

function PrajaxPromise(url,method, data=null, options={}) {
    return new Promise( (done, error)=>{

            var request = new CajaxRequest(url,method, data, options);
            request.then((resp)=>{
                done(resp);
            });

            request.catch((resp)=>{
                error(resp);
            });

            if (typeof options.cajax != 'undefined') {
                if (typeof options.cajax.custom != 'undefined')
                    request.cajax.custom(options.cajax.custom);

                if (typeof options.cajax.response != 'undefined')
                    request.cajax.response(options.cajax.response);
            }

            request.send();

        }
    )
}

class Cajax {

    static post(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "POST", data, options, usinginput);
    }

    static get(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "GET", data, options, usinginput);
    }

    static put(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "POST", data, options, usinginput);
    }

    static delete(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "DELETE", data, options, usinginput);
    }

    static trace(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "TRACE", data, options, usinginput);
    }

    static connect(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "CONNECT", data, options, usinginput);
    }

    static options(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "OPTIONS", data, options, usinginput);
    }

    static ajax (json) {
        return new CajaxRequest(
            ((json.url != null) ? json.url : false ),
            ((json.method != null) ? json.method : false ),
            ((json.options != null) ? json.options : false ),
            ((json.data != null) ? json.data : false ),
            ((json.input != null) ? json.input : false ));
    }
}


class Prajax {

    static post(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "POST", data, options, usinginput);
    }

    static get(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "GET", data, options, usinginput);
    }

    static put(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "POST", data, options, usinginput);
    }

    static delete(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "DELETE", data, options, usinginput);
    }

    static trace(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "TRACE", data, options, usinginput);
    }

    static connect(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "CONNECT", data, options, usinginput);
    }

    static options(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "OPTIONS", data, options, usinginput);
    }

    static ajax (json) {
        return PrajaxPromise(
            ((json.url != null) ? json.url : false ),
            ((json.method != null) ? json.method : false ),
            ((json.options != null) ? json.options : false ),
            ((json.data != null) ? json.data : false ),
            ((json.input != null) ? json.input : false ));
    }
}

// ENDLIBS

hljs.initHighlightingOnLoad();

function setDarkTheme(){
    document.documentElement.style.setProperty('--background', "#1a1e27");
    document.documentElement.style.setProperty('--block-background', "#1f232e");
    document.documentElement.style.setProperty('--block-background-opacity', "#212531BD");
    document.documentElement.style.setProperty('--text-color', "#FFFFFF");
    document.documentElement.style.setProperty('--link-color', "#FFFFFF");

    $("#darkmode").css({"background": "#1cad5a"});
    $("#darkmode span").text("Lightmode");
    $("#darkmode i").text("wb_sunny");
}


function setLightTheme(){
    document.documentElement.style.setProperty('--background', "#EEEEEE22");
    document.documentElement.style.setProperty('--block-background', "#FFFFFF");
    document.documentElement.style.setProperty('--block-background-opacity', "#FFFFFF77");
    document.documentElement.style.setProperty('--text-color', "#323232");
    document.documentElement.style.setProperty('--link-color', "#434343");

    $("#darkmode").css({"background": "#323232"});
    $("#darkmode span").text("Darkmode");
    $("#darkmode i").text("nights_stay");
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkTheme(){
   if (getCookie("colortheme") === "dark") {
        setDarkTheme();
   } else {
        setLightTheme();
   }
}

var snackBarTimeout;

function showSnackBar(text, color="#17fc2e", background="#1e212b") {
    var snackbar = document.querySelector('#snackbar');
    snackbar.textContent = text;
    snackbar.style.color = color;
    snackbar.style.backgroundColor = background;
    snackbar.classList.add('show');
    clearTimeout(snackBarTimeout);
    snackBarTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
    }, 1500);
}



$(window).on("online", function(){
    showSnackBar("You are online!");
});

$(window).on("offline", function(){
    showSnackBar("You are offline!", "#fa1121");
});


var sidenavOpened = false;

function openNav() {
    $(".sidenav").css({
        width:"270px",
        display: "block",
        top: "0",
        marginTop: "0px"
    });
    $("#behind_sidenav").css({
        width: "100%",
        background: "#32323250",
        position: "fixed",
        zIndex: "10000",
        top: "0"
    });
    sidenavOpened = true;
}

function closeNav() {
    $(".sidenav").css({
        width:"0px",
        display: "none",
        top: "0",
        paddingTop: "20px"
    });
    $("#behind_sidenav").css({
        background: "none",
        width: "0px"
    });
    sidenavOpened = false;
}

function checkResize() {
    if (window.innerWidth >= 720){
        $(".sidenav").css({
            width:"270px",
            display: "block",
            top: "65px",
            paddingTop: "20px"
        });

        $("#behind_sidenav").css({
            background: "none",
            width: "270px",
            paddingTop: "20px"
        });
    }
}

$(window).on("resize", function(){
    checkResize();
});



$(window).on("resize", function(){
    $("#behind_sidenav").css({
        width: "270px"
    });
    if (window.innerWidth <= 720){
        closeNav();
    }
});


function checkScroll() {

    if (window.pageYOffset > 1) {
        nav.style.boxShadow = " rgba(0, 0, 0, 0.55) 0px -45px 18px 34px";
    }
    else {
        nav.style.boxShadow = "0px 7px 17px -10px rgba(0,0,0,0)";
    }

}
$(document).ready(function() {
    var nav = $("#nav");
    var navmenu = document.getElementById("navmenu");
    checkScroll();
    window.onscroll = function() {
        checkScroll();
    };
    checkResize();
    if (window.innerWidth <= 720){
        closeNav();
    }

    $(".menubtn").click(function() {
        if (sidenavOpened)
            closeNav();
        else
            openNav();

    });

    $("#behind_sidenav").click(function() {
        if (sidenavOpened) closeNav();

    });

    $(".sidenav-submenu-opener").click(function(){
        if ($(this).$("i").css("transform") === "rotate(90deg)") {
            $(".sidenav-submenu[menu="+$(this).attr("menu")+"]").css("display", "");
            $(this).$("i").css("transform", "rotate(0deg)");
        } else {
            $(".sidenav-submenu[menu="+$(this).attr("menu")+"]").css("display", "block");
            $(this).$("i").css("transform", "rotate(90deg)");
        }
    });
    $("#darkmode").click(function(){
        if (getCookie("colortheme") === "dark") {
            setCookie("colortheme", "light", 365);
        } else {
            setCookie("colortheme", "dark", 365);
        }
        checkTheme();
    });
    checkTheme();
});


$(document).ready(function(){
    Waves.attach(".rippleeffect", ["waves-light"]);
    Waves.attach(".rippleeffect");
    Waves.init();
});