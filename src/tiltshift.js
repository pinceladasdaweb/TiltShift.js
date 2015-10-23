/*jslint browser: true*/
/*global define, module, exports*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('tiltshift', factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.TiltShift = factory();
    }
}(this, function () {
    "use strict";

    var TiltShift = function () {
        if (!this || !(this instanceof TiltShift)) {
            return new TiltShift();
        }

        this.frames   = document.querySelectorAll('.tiltshift');
        this.defaults = {};

        this.run();
    };

    TiltShift.prototype = {
        run: function () {
            Array.prototype.forEach.call(this.frames, function (frame) {
                this.config(frame);
                this.wrap(frame);
                this.appendEls(frame);
                this.effects(frame);
            }.bind(this));
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        config: function (els) {
            this.defaults = {
                s_position: els.dataset.position,
                s_blur: els.dataset.blur,
                s_focus: els.dataset.focus,
                s_falloff: els.dataset.falloff,
                s_direction: els.dataset.direction
            };

            return this.defaults;
        },
        wrap: function (toWrap, wrapper) {
            wrapper = wrapper || this.create('div', {className: 'tiltshift-wrap'});
            if (toWrap.nextSibling) {
                toWrap.parentNode.insertBefore(wrapper, toWrap.nextSibling);
            } else {
                toWrap.parentNode.appendChild(wrapper);
            }
            return wrapper.appendChild(toWrap);
        },
        appendEls: function (els) {
            var tiltshiftBefore = this.create('div', {className: 'tiltshift-before tiltshift-layer'}),
                tiltshiftAfter  = this.create('div', {className: 'tiltshift-after tiltshift-layer'}),
                imagePrefix     = els.getAttribute('src');

            tiltshiftBefore.style.backgroundImage = 'url(' + imagePrefix + ')';
            tiltshiftAfter.style.backgroundImage = 'url(' + imagePrefix + ')';

            els.parentNode.appendChild(tiltshiftBefore);
            els.parentNode.appendChild(tiltshiftAfter);
        },
        effects: function (els) {
            var layers     = els.parentNode.querySelectorAll('.tiltshift-layer'),
                beforeEnd  = (this.defaults.s_position - (this.defaults.s_focus / 2)) / 100,
                afterEnd   = ((100 - this.defaults.s_position) - (this.defaults.s_focus / 2)) / 100,
                beforeFall = ((beforeEnd - (this.defaults.s_falloff / 100)) * 100).toFixed(2),
                afterFall  = ((afterEnd - (this.defaults.s_falloff / 100)) * 100).toFixed(2),
                beforeDirection,
                afterDirection,
                angle;

            beforeEnd *= 100;
            afterEnd *= 100;

            if (this.defaults.s_direction === 'y') {
                beforeDirection = '270deg';
                afterDirection = '90deg';
            } else if (this.defaults.s_direction === 'x') {
                beforeDirection = '180deg';
                afterDirection = '0deg';
            } else {
                angle = this.defaults.s_direction % 360;

                beforeDirection = (angle + 180) + 'deg';
                afterDirection = angle + 'deg';
            }

            Array.prototype.forEach.call(layers, function (layer) {
                layer.style.webkitFilter = 'blur(' + this.defaults.s_blur + 'px) contrast(105%) saturate(105%)';

                if (layer.classList.contains('tiltshift-before')) {
                    layer.style.webkitMaskImage = '-webkit-linear-gradient(' + beforeDirection + ', rgba(0,0,0,1) 0, rgba(0,0,0,1) ' + beforeFall + '%, rgba(0,0,0,0) ' + beforeEnd + '%)';
                }

                if (layer.classList.contains('tiltshift-after')) {
                    layer.style.webkitMaskImage = '-webkit-linear-gradient(' + afterDirection + ', rgba(0,0,0,1) 0, rgba(0,0,0,1) ' + afterFall + '%, rgba(0,0,0,0) ' + afterEnd + '%)';
                }
            }.bind(this));
        }
    };

    return TiltShift;
}));