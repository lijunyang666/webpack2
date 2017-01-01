/*!
 * Cropper v1.0.0
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2015 Fengyuan Chen and contributors
 * Released under the MIT license
 *
 * Date: 2015-10-10T02:10:08.624Z
 */
!
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
} (function(t) {
    "use strict";
    function i(t) {
        return "number" == typeof t && !isNaN(t)
    }
    function e(t) {
        return "undefined" == typeof t
    }
    function s(t, e) {
        var s = [];
        return i(e) && s.push(e),
        s.slice.apply(t, s)
    }
    function o(t, i) {
        var e = s(arguments, 2);
        return function() {
            return t.apply(i, e.concat(s(arguments)))
        }
    }
    function h(t) {
        var i = t.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);
        return i && (i[1] !== f.protocol || i[2] !== f.hostname || i[3] !== f.port)
    }
    function a(t) {
        var i = "timestamp=" + (new Date).getTime();
        return t + ( - 1 === t.indexOf("?") ? "?": "&") + i
    }
    function n(t) {
        return t ? ' crossOrigin="' + t + '"': ""
    }
    function r(t, i) {
        var e;
        return t.naturalWidth ? i(t.naturalWidth, t.naturalHeight) : (e = document.createElement("img"), e.onload = function() {
            i(this.width, this.height)
        },
        void(e.src = t.src))
    }
    function p(t) {
        var e = [],
        s = t.rotate,
        o = t.scaleX,
        h = t.scaleY;
        return i(s) && e.push("rotate(" + s + "deg)"),
        i(o) && i(h) && e.push("scale(" + o + "," + h + ")"),
        e.length ? e.join(" ") : "none"
    }
    function c(t, i) {
        var e, s, o = at(t.degree) % 180,
        h = (o > 90 ? 180 - o: o) * Math.PI / 180,
        a = nt(h),
        n = rt(h),
        r = t.width,
        p = t.height,
        c = t.aspectRatio;
        return i ? (e = r / (n + a / c), s = e / c) : (e = r * n + p * a, s = r * a + p * n),
        {
            width: e,
            height: s
        }
    }
    function d(e, s) {
        var o, h, a, n = t("<canvas>")[0],
        r = n.getContext("2d"),
        p = 0,
        d = 0,
        l = s.naturalWidth,
        g = s.naturalHeight,
        u = s.rotate,
        f = s.scaleX,
        m = s.scaleY,
        v = i(f) && i(m) && (1 !== f || 1 !== m),
        w = i(u) && 0 !== u,
        x = w || v,
        b = l,
        C = g;
        return v && (o = l / 2, h = g / 2),
        w && (a = c({
            width: l,
            height: g,
            degree: u
        }), b = a.width, C = a.height, o = a.width / 2, h = a.height / 2),
        n.width = b,
        n.height = C,
        x && (p = -l / 2, d = -g / 2, r.save(), r.translate(o, h)),
        w && r.rotate(u * Math.PI / 180),
        v && r.scale(f, m),
        r.drawImage(e, p, d, l, g),
        x && r.restore(),
        n
    }
    function l(i, e) {
        this.$element = t(i),
        this.options = t.extend({},
        l.DEFAULTS, t.isPlainObject(e) && e),
        this.ready = !1,
        this.built = !1,
        this.complete = !1,
        this.rotated = !1,
        this.cropped = !1,
        this.disabled = !1,
        this.replaced = !1,
        this.isImg = !1,
        this.originalUrl = "",
        this.crossOrigin = "",
        this.canvas = null,
        this.cropBox = null,
        this.init()
    }
    var g = t(window),
    u = t(document),
    f = window.location,
    m = "cropper",
    v = "cropper-modal",
    w = "cropper-hide",
    x = "cropper-hidden",
    b = "cropper-invisible",
    C = "cropper-move",
    y = "cropper-crop",
    B = "cropper-disabled",
    $ = "cropper-bg",
    D = "mousedown touchstart pointerdown MSPointerDown",
    Y = "mousemove touchmove pointermove MSPointerMove",
    X = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
    T = "wheel mousewheel DOMMouseScroll",
    k = "dblclick",
    M = "load." + m,
    W = "error." + m,
    L = "resize." + m,
    H = "build." + m,
    R = "built." + m,
    z = "cropstart." + m,
    I = "cropmove." + m,
    P = "cropend." + m,
    E = "crop." + m,
    F = "zoom." + m,
    O = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,
    S = "preview",
    j = "action",
    A = "e",
    N = "w",
    U = "s",
    Z = "n",
    _ = "se",
    q = "sw",
    K = "ne",
    Q = "nw",
    G = "all",
    J = "crop",
    V = "move",
    tt = "zoom",
    it = "none",
    et = t.isFunction(t("<canvas>")[0].getContext),
    st = Math.sqrt,
    ot = Math.min,
    ht = Math.max,
    at = Math.abs,
    nt = Math.sin,
    rt = Math.cos,
    pt = parseFloat,
    ct = {
        version: "1.0.0"
    };
    t.extend(ct, {
        init: function() {
            var t, i = this.$element;
            if (i.is("img")) {
                if (this.isImg = !0, this.originalUrl = t = i.attr("src"), !t) return;
                t = i.prop("src")
            } else i.is("canvas") && et && (t = i[0].toDataURL());
            this.load(t)
        },
        trigger: function(i, e) {
            var s = t.Event(i, e);
            return this.$element.trigger(s),
            s
        },
        load: function(i) {
            var e, s, o = this.options,
            r = this.$element,
            p = "";
            i && (this.url = i, r.one(H, o.build), this.trigger(H).isDefaultPrevented() || (o.checkImageOrigin && h(i) && (p = r.prop("crossOrigin"), p || (p = "anonymous", e = a(i)), this.crossOrigin = p), this.$clone = s = t("<img" + n(p) + ' src="' + (e || i) + '">'), this.isImg ? r[0].complete ? this.start() : r.one(M, t.proxy(this.start, this)) : s.one(M, t.proxy(this.start, this)).one(W, t.proxy(this.stop, this)).addClass(w).insertAfter(r)))
        },
        start: function() {
            var i = this.$element,
            e = this.$clone;
            this.isImg || (e.off(W, this.stop), i = e),
            r(i[0], t.proxy(function(t, i) {
                this.image = {
                    naturalWidth: t,
                    naturalHeight: i,
                    aspectRatio: t / i
                },
                this.ready = !0,
                this.build()
            },
            this))
        },
        stop: function() {
            this.$clone.remove(),
            this.$clone = null
        }
    }),
    t.extend(ct, {
        build: function() {
            var i, e, s, o = this.options,
            h = this.$element,
            a = this.$clone;
            this.ready && (this.built && this.unbuild(), this.$container = h.parent(), this.$cropper = i = t(l.TEMPLATE), this.$canvas = i.find(".cropper-canvas").append(a), this.$dragBox = i.find(".cropper-drag-box"), this.$cropBox = e = i.find(".cropper-crop-box"), this.$viewBox = i.find(".cropper-view-box"), this.$face = s = e.find(".cropper-face"), h.addClass(x).after(i), this.isImg || a.removeClass(w), this.initPreview(), this.bind(), o.aspectRatio = pt(o.aspectRatio) || NaN, o.autoCrop ? (this.cropped = !0, o.modal && this.$dragBox.addClass(v)) : e.addClass(x), o.guides || e.find(".cropper-dashed").addClass(x), o.center || e.find(".cropper-center").addClass(x), o.cropBoxMovable && s.addClass(C).data(j, G), o.highlight || s.addClass(b), o.background && i.addClass($), o.cropBoxResizable || e.find(".cropper-line, .cropper-point").addClass(x), this.setDragMode(o.dragCrop ? J: o.movable ? V: it), this.render(), this.built = !0, this.setData(o.data), h.one(R, o.built), setTimeout(t.proxy(function() {
                this.trigger(R),
                this.complete = !0
            },
            this), 0))
        },
        unbuild: function() {
            this.built && (this.built = !1, this.initialImage = null, this.initialCanvas = null, this.initialCropBox = null, this.container = null, this.canvas = null, this.cropBox = null, this.unbind(), this.resetPreview(), this.$preview = null, this.$viewBox = null, this.$cropBox = null, this.$dragBox = null, this.$canvas = null, this.$container = null, this.$cropper.remove(), this.$cropper = null)
        }
    }),
    t.extend(ct, {
        render: function() {
            this.initContainer(),
            this.initCanvas(),
            this.initCropBox(),
            this.renderCanvas(),
            this.cropped && this.renderCropBox()
        },
        initContainer: function() {
            var t = this.options,
            i = this.$element,
            e = this.$container,
            s = this.$cropper;
            s.addClass(x),
            i.removeClass(x),
            s.css(this.container = {
                width: ht(e.width(), pt(t.minContainerWidth) || 200),
                height: ht(e.height(), pt(t.minContainerHeight) || 100)
            }),
            i.addClass(x),
            s.removeClass(x)
        },
        initCanvas: function() {
            var i = this.container,
            e = i.width,
            s = i.height,
            o = this.image,
            h = o.aspectRatio,
            a = {
                aspectRatio: h,
                width: e,
                height: s
            };
            s * h > e ? a.height = e / h: a.width = s * h,
            a.oldLeft = a.left = (e - a.width) / 2,
            a.oldTop = a.top = (s - a.height) / 2,
            this.canvas = a,
            this.limitCanvas(!0, !0),
            this.initialImage = t.extend({},
            o),
            this.initialCanvas = t.extend({},
            a)
        },
        limitCanvas: function(t, i) {
            var e, s, o = this.options,
            h = o.strict,
            a = this.container,
            n = a.width,
            r = a.height,
            p = this.canvas,
            c = p.aspectRatio,
            d = this.cropBox,
            l = this.cropped && d,
            g = this.initialCanvas || p;
            t && (e = pt(o.minCanvasWidth) || 0, s = pt(o.minCanvasHeight) || 0, h && (e ? e = ht(e, l ? d.width: g.width) : s ? s = ht(s, l ? d.height: g.height) : l && (e = d.width, s = d.height, s * c > e ? e = s * c: s = e / c)), e && s ? s * c > e ? s = e / c: e = s * c: e ? s = e / c: s && (e = s * c), p.minWidth = e, p.minHeight = s, p.maxWidth = 1 / 0, p.maxHeight = 1 / 0),
            i && (h ? (p.minLeft = l ? ot(d.left, d.left + d.width - p.width) : ot(0, n - p.width), p.minTop = l ? ot(d.top, d.top + d.height - p.height) : ot(0, r - p.height), p.maxLeft = l ? d.left: ht(0, n - p.width), p.maxTop = l ? d.top: ht(0, r - p.height)) : (p.minLeft = -p.width, p.minTop = -p.height, p.maxLeft = n, p.maxTop = r))
        },
        renderCanvas: function(t) {
            var i, e, s = this.options,
            o = this.canvas,
            h = this.image;
            this.rotated && (this.rotated = !1, e = c({
                width: h.width,
                height: h.height,
                degree: h.rotate
            }), i = e.width / e.height, i !== o.aspectRatio && (o.left -= (e.width - o.width) / 2, o.top -= (e.height - o.height) / 2, o.width = e.width, o.height = e.height, o.aspectRatio = i, this.limitCanvas(!0, !1))),
            (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft),
            (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop),
            o.width = ot(ht(o.width, o.minWidth), o.maxWidth),
            o.height = ot(ht(o.height, o.minHeight), o.maxHeight),
            this.limitCanvas(!1, !0),
            o.oldLeft = o.left = ot(ht(o.left, o.minLeft), o.maxLeft),
            o.oldTop = o.top = ot(ht(o.top, o.minTop), o.maxTop),
            this.$canvas.css({
                width: o.width,
                height: o.height,
                left: o.left,
                top: o.top
            }),
            this.renderImage(),
            this.cropped && s.strict && this.limitCropBox(!0, !0),
            t && this.output()
        },
        renderImage: function(i) {
            var e, s = this.canvas,
            o = this.image;
            o.rotate && (e = c({
                width: s.width,
                height: s.height,
                degree: o.rotate,
                aspectRatio: o.aspectRatio
            },
            !0)),
            t.extend(o, e ? {
                width: e.width,
                height: e.height,
                left: (s.width - e.width) / 2,
                top: (s.height - e.height) / 2
            }: {
                width: s.width,
                height: s.height,
                left: 0,
                top: 0
            }),
            this.$clone.css({
                width: o.width,
                height: o.height,
                marginLeft: o.left,
                marginTop: o.top,
                transform: p(o)
            }),
            i && this.output()
        },
        initCropBox: function() {
            var i = this.options,
            e = this.canvas,
            s = i.aspectRatio,
            o = pt(i.autoCropArea) || .8,
            h = {
                width: e.width,
                height: e.height
            };
            s && (e.height * s > e.width ? h.height = h.width / s: h.width = h.height * s),
            this.cropBox = h,
            this.limitCropBox(!0, !0),
            h.width = ot(ht(h.width, h.minWidth), h.maxWidth),
            h.height = ot(ht(h.height, h.minHeight), h.maxHeight),
            h.width = ht(h.minWidth, h.width * o),
            h.height = ht(h.minHeight, h.height * o),
            h.oldLeft = h.left = e.left + (e.width - h.width) / 2,
            h.oldTop = h.top = e.top + (e.height - h.height) / 2,
            this.initialCropBox = t.extend({},
            h)
        },
        limitCropBox: function(t, i) {
            var e, s, o, h, a = this.options,
            n = a.strict,
            r = this.container,
            p = r.width,
            c = r.height,
            d = this.canvas,
            l = this.cropBox,
            g = a.aspectRatio;
            t && (e = pt(a.minCropBoxWidth) || 0, s = pt(a.minCropBoxHeight) || 0, e = ot(e, p), s = ot(s, c), o = ot(p, n ? d.width: p), h = ot(c, n ? d.height: c), g && (e && s ? s * g > e ? s = e / g: e = s * g: e ? s = e / g: s && (e = s * g), h * g > o ? h = o / g: o = h * g), l.minWidth = ot(e, o), l.minHeight = ot(s, h), l.maxWidth = o, l.maxHeight = h),
            i && (n ? (l.minLeft = ht(0, d.left), l.minTop = ht(0, d.top), l.maxLeft = ot(p, d.left + d.width) - l.width, l.maxTop = ot(c, d.top + d.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = p - l.width, l.maxTop = c - l.height))
        },
        renderCropBox: function() {
            var t = this.options,
            i = this.container,
            e = i.width,
            s = i.height,
            o = this.cropBox; (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft),
            (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop),
            o.width = ot(ht(o.width, o.minWidth), o.maxWidth),
            o.height = ot(ht(o.height, o.minHeight), o.maxHeight),
            this.limitCropBox(!1, !0),
            o.oldLeft = o.left = ot(ht(o.left, o.minLeft), o.maxLeft),
            o.oldTop = o.top = ot(ht(o.top, o.minTop), o.maxTop),
            t.movable && t.cropBoxMovable && this.$face.data(j, o.width === e && o.height === s ? V: G),
            this.$cropBox.css({
                width: o.width,
                height: o.height,
                left: o.left,
                top: o.top
            }),
            this.cropped && t.strict && this.limitCanvas(!0, !0),
            this.disabled || this.output()
        },
        output: function() {
            this.preview(),
            this.complete ? this.trigger(E, this.getData()) : this.built || this.$element.one(R, t.proxy(function() {
                this.trigger(E, this.getData())
            },
            this))
        }
    }),
    t.extend(ct, {
        initPreview: function() {
            var i = n(this.crossOrigin),
            e = this.url;
            this.$preview = t(this.options.preview),
            this.$viewBox.html("<img" + i + ' src="' + e + '">'),
            this.$preview.each(function() {
                var s = t(this);
                s.data(S, {
                    width: s.width(),
                    height: s.height(),
                    original: s.html()
                }),
                s.html("<img" + i + ' src="' + e + '" style="display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important">')
            })
        },
        resetPreview: function() {
            this.$preview.each(function() {
                var i = t(this);
                i.html(i.data(S).original).removeData(S)
            })
        },
        preview: function() {
            var i = this.image,
            e = this.canvas,
            s = this.cropBox,
            o = s.width,
            h = s.height,
            a = i.width,
            n = i.height,
            r = s.left - e.left - i.left,
            c = s.top - e.top - i.top;
            this.cropped && !this.disabled && (this.$viewBox.find("img").css({
                width: a,
                height: n,
                marginLeft: -r,
                marginTop: -c,
                transform: p(i)
            }), this.$preview.each(function() {
                var e = t(this),
                s = e.data(S),
                d = s.width,
                l = s.height,
                g = d,
                u = l,
                f = 1;
                o && (f = d / o, u = h * f),
                h && u > l && (f = l / h, g = o * f, u = l),
                e.width(g).height(u).find("img").css({
                    width: a * f,
                    height: n * f,
                    marginLeft: -r * f,
                    marginTop: -c * f,
                    transform: p(i)
                })
            }))
        }
    }),
    t.extend(ct, {
        bind: function() {
            var i = this.options,
            e = this.$element,
            s = this.$cropper;
            t.isFunction(i.cropstart) && e.on(z, i.cropstart),
            t.isFunction(i.cropmove) && e.on(I, i.cropmove),
            t.isFunction(i.cropend) && e.on(P, i.cropend),
            t.isFunction(i.crop) && e.on(E, i.crop),
            t.isFunction(i.zoom) && e.on(F, i.zoom),
            s.on(D, t.proxy(this.cropStart, this)),
            i.zoomable && i.mouseWheelZoom && s.on(T, t.proxy(this.wheel, this)),
            i.doubleClickToggle && s.on(k, t.proxy(this.dblclick, this)),
            u.on(Y, this._cropMove = o(this.cropMove, this)).on(X, this._cropEnd = o(this.cropEnd, this)),
            i.responsive && g.on(L, this._resize = o(this.resize, this))
        },
        unbind: function() {
            var i = this.options,
            e = this.$element,
            s = this.$cropper;
            t.isFunction(i.cropstart) && e.off(z, i.cropstart),
            t.isFunction(i.cropmove) && e.off(I, i.cropmove),
            t.isFunction(i.cropend) && e.off(P, i.cropend),
            t.isFunction(i.crop) && e.off(E, i.crop),
            t.isFunction(i.zoom) && e.off(F, i.zoom),
            s.off(D, this.cropStart),
            i.zoomable && i.mouseWheelZoom && s.off(T, this.wheel),
            i.doubleClickToggle && s.off(k, this.dblclick),
            u.off(Y, this._cropMove).off(X, this._cropEnd),
            i.responsive && g.off(L, this._resize)
        }
    }),
    t.extend(ct, {
        resize: function() {
            var i, e, s, o = this.$container,
            h = this.container; ! this.disabled && h && (s = o.width() / h.width, (1 !== s || o.height() !== h.height) && (i = this.getCanvasData(), e = this.getCropBoxData(), this.render(), this.setCanvasData(t.each(i,
            function(t, e) {
                i[t] = e * s
            })), this.setCropBoxData(t.each(e,
            function(t, i) {
                e[t] = i * s
            }))))
        },
        dblclick: function() {
            this.disabled || (this.$dragBox.hasClass(y) ? this.setDragMode(V) : this.setDragMode(J))
        },
        wheel: function(t) {
            var i = t.originalEvent,
            e = i,
            s = pt(this.options.wheelZoomRatio) || .1,
            o = 1;
            this.disabled || (t.preventDefault(), e.deltaY ? o = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? o = -e.wheelDelta / 120 : e.detail && (o = e.detail > 0 ? 1 : -1), this.zoom( - o * s, i))
        },
        cropStart: function(i) {
            var e, s, o = this.options,
            h = i.originalEvent,
            a = h && h.touches,
            n = i;
            if (!this.disabled) {
                if (a) {
                    if (e = a.length, e > 1) {
                        if (!o.zoomable || !o.touchDragZoom || 2 !== e) return;
                        n = a[1],
                        this.startX2 = n.pageX,
                        this.startY2 = n.pageY,
                        s = tt
                    }
                    n = a[0]
                }
                if (s = s || t(n.target).data(j), O.test(s)) {
                    if (this.trigger(z, {
                        originalEvent: h,
                        action: s
                    }).isDefaultPrevented()) return;
                    i.preventDefault(),
                    this.action = s,
                    this.cropping = !1,
                    this.startX = n.pageX || h && h.pageX,
                    this.startY = n.pageY || h && h.pageY,
                    s === J && (this.cropping = !0, this.$dragBox.addClass(v))
                }
            }
        },
        cropMove: function(t) {
            var i, e = this.options,
            s = t.originalEvent,
            o = s && s.touches,
            h = t,
            a = this.action;
            if (!this.disabled) {
                if (o) {
                    if (i = o.length, i > 1) {
                        if (!e.zoomable || !e.touchDragZoom || 2 !== i) return;
                        h = o[1],
                        this.endX2 = h.pageX,
                        this.endY2 = h.pageY
                    }
                    h = o[0]
                }
                if (a) {
                    if (this.trigger(I, {
                        originalEvent: s,
                        action: a
                    }).isDefaultPrevented()) return;
                    t.preventDefault(),
                    this.endX = h.pageX || s && s.pageX,
                    this.endY = h.pageY || s && s.pageY,
                    this.change(h.shiftKey, a === tt ? s: null)
                }
            }
        },
        cropEnd: function(t) {
            var i = t.originalEvent,
            e = this.action;
            this.disabled || e && (t.preventDefault(), this.cropping && (this.cropping = !1, this.$dragBox.toggleClass(v, this.cropped && this.options.modal)), this.action = "", this.trigger(P, {
                originalEvent: i,
                action: e
            }))
        }
    }),
    t.extend(ct, {
        change: function(t, i) {
            var e, s, o = this.options,
            h = o.aspectRatio,
            a = this.action,
            n = this.container,
            r = this.canvas,
            p = this.cropBox,
            c = p.width,
            d = p.height,
            l = p.left,
            g = p.top,
            u = l + c,
            f = g + d,
            m = 0,
            v = 0,
            w = n.width,
            b = n.height,
            C = !0;
            switch (!h && t && (h = c && d ? c / d: 1), o.strict && (m = p.minLeft, v = p.minTop, w = m + ot(n.width, r.width), b = v + ot(n.height, r.height)), s = {
                x: this.endX - this.startX,
                y: this.endY - this.startY
            },
            h && (s.X = s.y * h, s.Y = s.x / h), a) {
            case G:
                l += s.x,
                g += s.y;
                break;
            case A:
                if (s.x >= 0 && (u >= w || h && (v >= g || f >= b))) {
                    C = !1;
                    break
                }
                c += s.x,
                h && (d = c / h, g -= s.Y / 2),
                0 > c && (a = N, c = 0);
                break;
            case Z:
                if (s.y <= 0 && (v >= g || h && (m >= l || u >= w))) {
                    C = !1;
                    break
                }
                d -= s.y,
                g += s.y,
                h && (c = d * h, l += s.X / 2),
                0 > d && (a = U, d = 0);
                break;
            case N:
                if (s.x <= 0 && (m >= l || h && (v >= g || f >= b))) {
                    C = !1;
                    break
                }
                c -= s.x,
                l += s.x,
                h && (d = c / h, g += s.Y / 2),
                0 > c && (a = A, c = 0);
                break;
            case U:
                if (s.y >= 0 && (f >= b || h && (m >= l || u >= w))) {
                    C = !1;
                    break
                }
                d += s.y,
                h && (c = d * h, l -= s.X / 2),
                0 > d && (a = Z, d = 0);
                break;
            case K:
                if (h) {
                    if (s.y <= 0 && (v >= g || u >= w)) {
                        C = !1;
                        break
                    }
                    d -= s.y,
                    g += s.y,
                    c = d * h
                } else s.x >= 0 ? w > u ? c += s.x: s.y <= 0 && v >= g && (C = !1) : c += s.x,
                s.y <= 0 ? g > v && (d -= s.y, g += s.y) : (d -= s.y, g += s.y);
                0 > c && 0 > d ? (a = q, d = 0, c = 0) : 0 > c ? (a = Q, c = 0) : 0 > d && (a = _, d = 0);
                break;
            case Q:
                if (h) {
                    if (s.y <= 0 && (v >= g || m >= l)) {
                        C = !1;
                        break
                    }
                    d -= s.y,
                    g += s.y,
                    c = d * h,
                    l += s.X
                } else s.x <= 0 ? l > m ? (c -= s.x, l += s.x) : s.y <= 0 && v >= g && (C = !1) : (c -= s.x, l += s.x),
                s.y <= 0 ? g > v && (d -= s.y, g += s.y) : (d -= s.y, g += s.y);
                0 > c && 0 > d ? (a = _, d = 0, c = 0) : 0 > c ? (a = K, c = 0) : 0 > d && (a = q, d = 0);
                break;
            case q:
                if (h) {
                    if (s.x <= 0 && (m >= l || f >= b)) {
                        C = !1;
                        break
                    }
                    c -= s.x,
                    l += s.x,
                    d = c / h
                } else s.x <= 0 ? l > m ? (c -= s.x, l += s.x) : s.y >= 0 && f >= b && (C = !1) : (c -= s.x, l += s.x),
                s.y >= 0 ? b > f && (d += s.y) : d += s.y;
                0 > c && 0 > d ? (a = K, d = 0, c = 0) : 0 > c ? (a = _, c = 0) : 0 > d && (a = Q, d = 0);
                break;
            case _:
                if (h) {
                    if (s.x >= 0 && (u >= w || f >= b)) {
                        C = !1;
                        break
                    }
                    c += s.x,
                    d = c / h
                } else s.x >= 0 ? w > u ? c += s.x: s.y >= 0 && f >= b && (C = !1) : c += s.x,
                s.y >= 0 ? b > f && (d += s.y) : d += s.y;
                0 > c && 0 > d ? (a = Q, d = 0, c = 0) : 0 > c ? (a = q, c = 0) : 0 > d && (a = K, d = 0);
                break;
            case V:
                this.move(s.x, s.y),
                C = !1;
                break;
            case tt:
                this.zoom(function(t, i, e, s) {
                    var o = st(t * t + i * i),
                    h = st(e * e + s * s);
                    return (h - o) / o
                } (at(this.startX - this.startX2), at(this.startY - this.startY2), at(this.endX - this.endX2), at(this.endY - this.endY2)), i),
                this.startX2 = this.endX2,
                this.startY2 = this.endY2,
                C = !1;
                break;
            case J:
                s.x && s.y && (e = this.$cropper.offset(), l = this.startX - e.left, g = this.startY - e.top, c = p.minWidth, d = p.minHeight, s.x > 0 ? s.y > 0 ? a = _: (a = K, g -= d) : s.y > 0 ? (a = q, l -= c) : (a = Q, l -= c, g -= d), this.cropped || (this.cropped = !0, this.$cropBox.removeClass(x)))
            }
            C && (p.width = c, p.height = d, p.left = l, p.top = g, this.action = a, this.renderCropBox()),
            this.startX = this.endX,
            this.startY = this.endY
        }
    }),
    t.extend(ct, {
        crop: function() {
            this.built && !this.disabled && (this.cropped || (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && this.$dragBox.addClass(v), this.$cropBox.removeClass(x)), this.setCropBoxData(this.initialCropBox))
        },
        reset: function() {
            this.built && !this.disabled && (this.image = t.extend({},
            this.initialImage), this.canvas = t.extend({},
            this.initialCanvas), this.cropBox = t.extend({},
            this.initialCropBox), this.renderCanvas(), this.cropped && this.renderCropBox())
        },
        clear: function() {
            this.cropped && !this.disabled && (t.extend(this.cropBox, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), this.$dragBox.removeClass(v), this.$cropBox.addClass(x))
        },
        replace: function(t) { ! this.disabled && t && (this.isImg && (this.replaced = !0, this.$element.attr("src", t)), this.options.data = null, this.load(t))
        },
        enable: function() {
            this.built && (this.disabled = !1, this.$cropper.removeClass(B))
        },
        disable: function() {
            this.built && (this.disabled = !0, this.$cropper.addClass(B))
        },
        destroy: function() {
            var t = this.$element;
            this.ready ? (this.isImg && this.replaced && t.attr("src", this.originalUrl), this.unbuild(), t.removeClass(x)) : this.isImg ? t.off(M, this.start) : this.$clone && this.$clone.remove(),
            t.removeData(m)
        },
        move: function(t, s) {
            var o = this.canvas;
            e(s) && (s = t),
            t = pt(t),
            s = pt(s),
            this.built && !this.disabled && this.options.movable && (o.left += i(t) ? t: 0, o.top += i(s) ? s: 0, this.renderCanvas(!0))
        },
        zoom: function(t, i) {
            var e, s, o = this.canvas;
            if (t = pt(t), t && this.built && !this.disabled && this.options.zoomable) {
                if (this.trigger(F, {
                    originalEvent: i,
                    ratio: t
                }).isDefaultPrevented()) return;
                t = 0 > t ? 1 / (1 - t) : 1 + t,
                e = o.width * t,
                s = o.height * t,
                o.left -= (e - o.width) / 2,
                o.top -= (s - o.height) / 2,
                o.width = e,
                o.height = s,
                this.renderCanvas(!0),
                this.setDragMode(V)
            }
        },
        rotate: function(t) {
            var i = this.image,
            e = i.rotate || 0;
            t = pt(t) || 0,
            this.built && !this.disabled && this.options.rotatable && (i.rotate = (e + t) % 360, this.rotated = !0, this.renderCanvas(!0))
        },
        scale: function(t, s) {
            var o = this.image;
            e(s) && (s = t),
            t = pt(t),
            s = pt(s),
            this.built && !this.disabled && this.options.scalable && (o.scaleX = i(t) ? t: 1, o.scaleY = i(s) ? s: 1, this.renderImage(!0))
        },
        getData: function(i) {
            var e, s, o = this.options,
            h = this.image,
            a = this.canvas,
            n = this.cropBox;
            return this.built && this.cropped ? (s = {
                x: n.left - a.left,
                y: n.top - a.top,
                width: n.width,
                height: n.height
            },
            e = h.width / h.naturalWidth, t.each(s,
            function(t, o) {
                o /= e,
                s[t] = i ? Math.round(o) : o
            })) : s = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            o.rotatable && (s.rotate = h.rotate || 0),
            o.scalable && (s.scaleX = h.scaleX || 1, s.scaleY = h.scaleY || 1),
            s
        },
        setData: function(e) {
            var s, o, h, a = this.options,
            n = this.image,
            r = this.canvas,
            p = {};
            t.isFunction(e) && (e = e.call(this.element)),
            this.built && !this.disabled && t.isPlainObject(e) && (a.rotatable && i(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, this.rotated = s = !0), a.scalable && (i(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, o = !0), i(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, o = !0)), s ? this.renderCanvas() : o && this.renderImage(), h = n.width / n.naturalWidth, i(e.x) && (p.left = e.x * h + r.left), i(e.y) && (p.top = e.y * h + r.top), i(e.width) && (p.width = e.width * h), i(e.height) && (p.height = e.height * h), this.setCropBoxData(p))
        },
        getContainerData: function() {
            return this.built ? this.container: {}
        },
        getImageData: function() {
            return this.ready ? this.image: {}
        },
        getCanvasData: function() {
            var t, i = this.canvas;
            return this.built && (t = {
                left: i.left,
                top: i.top,
                width: i.width,
                height: i.height
            }),
            t || {}
        },
        setCanvasData: function(e) {
            var s = this.canvas,
            o = s.aspectRatio;
            t.isFunction(e) && (e = e.call(this.$element)),
            this.built && !this.disabled && t.isPlainObject(e) && (i(e.left) && (s.left = e.left), i(e.top) && (s.top = e.top), i(e.width) ? (s.width = e.width, s.height = e.width / o) : i(e.height) && (s.height = e.height, s.width = e.height * o), this.renderCanvas(!0))
        },
        getCropBoxData: function() {
            var t, i = this.cropBox;
            return this.built && this.cropped && (t = {
                left: i.left,
                top: i.top,
                width: i.width,
                height: i.height
            }),
            t || {}
        },
        setCropBoxData: function(e) {
            var s, o, h = this.cropBox,
            a = this.options.aspectRatio;
            t.isFunction(e) && (e = e.call(this.$element)),
            this.built && this.cropped && !this.disabled && t.isPlainObject(e) && (i(e.left) && (h.left = e.left), i(e.top) && (h.top = e.top), i(e.width) && e.width !== h.width && (s = !0, h.width = e.width), i(e.height) && e.height !== h.height && (o = !0, h.height = e.height), a && (s ? h.height = h.width / a: o && (h.width = h.height * a)), this.renderCropBox())
        },
        getCroppedCanvas: function(i) {
            var e, s, o, h, a, n, r, p, c, l, g;
            return this.built && this.cropped && et ? (t.isPlainObject(i) || (i = {}), g = this.getData(), e = g.width, s = g.height, p = e / s, t.isPlainObject(i) && (a = i.width, n = i.height, a ? (n = a / p, r = a / e) : n && (a = n * p, r = n / s)), o = a || e, h = n || s, c = t("<canvas>")[0], c.width = o, c.height = h, l = c.getContext("2d"), i.fillColor && (l.fillStyle = i.fillColor, l.fillRect(0, 0, o, h)), l.drawImage.apply(l,
            function() {
                var t, i, o, h, a, n, p = d(this.$clone[0], this.image),
                c = p.width,
                l = p.height,
                u = [p],
                f = g.x,
                m = g.y;
                return - e >= f || f > c ? f = t = o = a = 0 : 0 >= f ? (o = -f, f = 0, t = a = ot(c, e + f)) : c >= f && (o = 0, t = a = ot(e, c - f)),
                0 >= t || -s >= m || m > l ? m = i = h = n = 0 : 0 >= m ? (h = -m, m = 0, i = n = ot(l, s + m)) : l >= m && (h = 0, i = n = ot(s, l - m)),
                u.push(f, m, t, i),
                r && (o *= r, h *= r, a *= r, n *= r),
                a > 0 && n > 0 && u.push(o, h, a, n),
                u
            }.call(this)), c) : void 0
        },
        setAspectRatio: function(t) {
            var i = this.options;
            this.disabled || e(t) || (i.aspectRatio = pt(t) || NaN, this.built && (this.initCropBox(), this.cropped && this.renderCropBox()))
        },
        setDragMode: function(t) {
            var i, e, s = this.options;
            this.ready && !this.disabled && (i = s.dragCrop && t === J, e = s.movable && t === V, t = i || e ? t: it, this.$dragBox.data(j, t).toggleClass(y, i).toggleClass(C, e), s.cropBoxMovable || this.$face.data(j, t).toggleClass(y, i).toggleClass(C, e))
        }
    }),
    t.extend(l.prototype, ct),
    l.DEFAULTS = {
        aspectRatio: NaN,
        data: null,
        preview: "",
        strict: !0,
        responsive: !0,
        checkImageOrigin: !0,
        modal: !0,
        guides: !0,
        center: !0,
        highlight: !0,
        background: !0,
        autoCrop: !0,
        autoCropArea: .8,
        dragCrop: !0,
        movable: !0,
        rotatable: !0,
        scalable: !0,
        zoomable: !0,
        mouseWheelZoom: !0,
        wheelZoomRatio: .1,
        touchDragZoom: !0,
        cropBoxMovable: !0,
        cropBoxResizable: !0,
        doubleClickToggle: !0,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        minContainerWidth: 200,
        minContainerHeight: 100,
        build: null,
        built: null,
        cropstart: null,
        cropmove: null,
        cropend: null,
        crop: null,
        zoom: null
    },
    l.setDefaults = function(i) {
        t.extend(l.DEFAULTS, i)
    },
    l.TEMPLATE = '<div class="cropper-container"><div class="cropper-canvas"></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>',
    l.other = t.fn.cropper,
    t.fn.cropper = function(i) {
        var o, h = s(arguments, 1);
        return this.each(function() {
            var e, s = t(this),
            a = s.data(m);
            if (!a) {
                if (/destroy/.test(i)) return;
                s.data(m, a = new l(this, i))
            }
            "string" == typeof i && t.isFunction(e = a[i]) && (o = e.apply(a, h))
        }),
        e(o) ? this: o
    },
    t.fn.cropper.Constructor = l,
    t.fn.cropper.setDefaults = l.setDefaults,
    t.fn.cropper.noConflict = function() {
        return t.fn.cropper = l.other,
        this
    }
});