// Originated from gigapan-sd-min.js
// Made legible using:  http://jsbeautifier.org/

(function (c, e, h, a) {
    var r, t, y, O, K = 10,
        S = "hidden",
        n = " while executing ",
        A = "function",
        x = "none",
        w = "",
        p = null,
        m = !0,
        P = 0.5,
        k = !1;
    c.Seadragon || (c.Seadragon = {});
    var l = c.Seadragon,
        b = l.Config;
    b || (b = l.Config = {
        debugMode: k,
        animationTime: 2.5,
        blendTime: P,
        alwaysBlend: k,
        autoHideControls: m,
        constrainDuringPan: m,
        immediateRender: k,
        logarithmicZoom: m,
        wrapHorizontal: k,
        wrapVertical: k,
        wrapOverlays: k,
        transformOverlays: k,
        minZoomDimension: p,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
        visibilityRatio: 0.8,
        springStiffness: 5,
        imageLoaderLimit: 2,
        clickTimeThreshold: 200,
        clickDistThreshold: 5,
        zoomPerClick: 2,
		zoomPerScroll: 1.04,	// <jps>  was: h.pow(2, 1 / 3),
        zoomPerSecond: 2,
        proxyUrl: p,
        imagePath: "images/controls/"
    });
    var g = l.Strings;
    g || (g = l.Strings = {
        Errors: {
            Failure: "Sorry, but Seadragon Ajax can't run on your browser!\nPlease try using IE 8 or Firefox 3.\n",
            Dzc: "Sorry, we don't support Deep Zoom Collections!",
            Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Empty: "You asked us to open nothing, so we did just that.",
            ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
            Security: "It looks like a security restriction stopped us from loading this Deep Zoom Image.",
            Status: "This space unintentionally left blank ({0} {1}).",
            Unknown: "Whoops, something inexplicably went wrong. Sorry!"
        },
        Messages: {
            Loading: "Loading..."
        },
        Tooltips: {
            FullPage: "Toggle full page",
            Home: "Go home",
            ZoomIn: "Zoom in (you can also use your mouse's scroll wheel)",
            ZoomOut: "Zoom out (you can also use your mouse's scroll wheel)"
        }
    }, g.getString = function (f) {
        for (var a = f.split("."), b = g, d = 0; d < a.length; d++) b = b[a[d]] || {};
        "string" != typeof b && (b = w);
        var c = arguments;
        return b.replace(/\{\d+\}/g, function (f) {
            f = parseInt(f.match(/\d+/)) + 1;
            return f < c.length ? c[f] : w
        })
    }, g.setString = function (f, a) {
        for (var b = f.split("."), d = g, c = 0; c < b.length - 1; c++) d[b[c]] || (d[b[c]] = {}), d = d[b[c]];
        d[b[c]] = a
    });
    var q = function () {
        this.log = function (f, a) {
            var G = c.console || {}, d = b.debugMode;
            d && G.log ? G.log(f) : d && a && alert(f)
        };
        this.error = function (f, a) {
            var G = c.console || {}, d = b.debugMode;
            d && G.error ?
                G.error(f) : d && alert(f);
            if (d) throw a || Error(f);
        };
        this.fail = function (f) {
            alert(g.getString("Errors.Failure"));
            throw Error(f);
        }
    }, q = l.Debug = new q,
        s = l.Profiler = function () {
            var f = this,
                a = k,
                b = 0,
                d = p,
                c = p,
                e = Infinity,
                h = 0,
                j = 0,
                i = Infinity,
                v = 0,
                g = 0;
            this.getAvgUpdateTime = function () {
                return h
            };
            this.getMinUpdateTime = function () {
                return e
            };
            this.getMaxUpdateTime = function () {
                return j
            };
            this.getAvgIdleTime = function () {
                return v
            };
            this.getMinIdleTime = function () {
                return i
            };
            this.getMaxIdleTime = function () {
                return g
            };
            this.isMidUpdate = function () {
                return a
            };
            this.getNumUpdates = function () {
                return b
            };
            this.beginUpdate = function () {
                a && f.endUpdate();
                a = m;
                d = (new Date).getTime();
                if (!(1 > b)) {
                    var Pa = d - c;
                    v = (v * (b - 1) + Pa) / b;
                    Pa < i && (i = Pa);
                    Pa > g && (g = Pa)
                }
            };
            this.endUpdate = function () {
                if (a) {
                    c = (new Date).getTime();
                    a = k;
                    var f = c - d;
                    b++;
                    h = (h * (b - 1) + f) / b;
                    f < e && (e = f);
                    f > j && (j = f)
                }
            };
            this.clearProfile = function () {
                a = k;
                b = 0;
                c = d = p;
                e = Infinity;
                j = h = 0;
                i = Infinity;
                g = v = 0
            }
        }, j = l.Point;
    if (!j) {
        var j = l.Point = function (f, a) {
            this.x = "number" == typeof f ? f : 0;
            this.y = "number" == typeof a ? a : 0
        }, u = j.prototype;
        u.plus = function (f) {
            return new j(this.x +
                f.x, this.y + f.y)
        };
        u.minus = function (f) {
            return new j(this.x - f.x, this.y - f.y)
        };
        u.times = function (f) {
            return new j(this.x * f, this.y * f)
        };
        u.divide = function (f) {
            return new j(this.x / f, this.y / f)
        };
        u.negate = function () {
            return new j(-this.x, -this.y)
        };
        u.distanceTo = function (f) {
            return h.sqrt(h.pow(this.x - f.x, 2) + h.pow(this.y - f.y, 2))
        };
        u.apply = function (f) {
            return new j(f(this.x), f(this.y))
        };
        u.equals = function (f) {
            return f instanceof j && this.x === f.x && this.y === f.y
        };
        u.toString = function () {
            return "(" + this.x + "," + this.y + ")"
        }
    }
    var D =
        l.Rect;
    D || (D = l.Rect = function (f, a, b, d) {
        this.x = "number" == typeof f ? f : 0;
        this.y = "number" == typeof a ? a : 0;
        this.width = "number" == typeof b ? b : 0;
        this.height = "number" == typeof d ? d : 0
    }, u = D.prototype, u.getAspectRatio = function () {
        return this.width / this.height
    }, u.getTopLeft = function () {
        return new j(this.x, this.y)
    }, u.getBottomRight = function () {
        return new j(this.x + this.width, this.y + this.height)
    }, u.getCenter = function () {
        return new j(this.x + this.width / 2, this.y + this.height / 2)
    }, u.getSize = function () {
        return new j(this.width, this.height)
    },
        u.equals = function (f) {
        return f instanceof D && this.x === f.x && this.y === f.y && this.width === f.width && this.height === f.height
    }, u.toString = function () {
        return "[" + this.x + "," + this.y + "," + this.width + "x" + this.height + "]"
    });
    var T = l.Spring = function (f) {
        var a = "number" == typeof f ? f : 0,
            c = a,
            d = a,
            e = (new Date).getTime(),
            j = e,
            i = e;
        this.getCurrent = function () {
            return a
        };
        this.getTarget = function () {
            return d
        };
        this.resetTo = function (f) {
            d = f;
            i = e;
            c = d;
            j = i
        };
        this.springTo = function (f) {
            c = a;
            j = e;
            d = f;
            i = j + 1E3 * b.animationTime
        };
        this.shiftBy = function (f) {
            c +=
                f;
            d += f
        };
        this.update = function () {
            e = (new Date).getTime();
            var f;
            if (e >= i) f = d;
            else {
                f = c;
                var m = d - c,
                    v;
                v = b.springStiffness;
                v = (1 - h.exp(-((e - j) / (i - j)) * v)) / (1 - h.exp(-v));
                f += m * v
            }
            a = f
        }
    }, U = l.Browser = {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5
        }, i = function () {
            var f = this,
                a = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"],
                G = {
                    bmp: k,
                    jpeg: m,
                    jpg: m,
                    png: m,
                    tif: k,
                    wdp: k
                }, d = U.UNKNOWN,
                wa = 0,
                Wa = k,
                $ = {}, g = navigator.appName,
                aa = navigator.appVersion,
                v = navigator.userAgent;
            if ("Microsoft Internet Explorer" == g && c.attachEvent &&
                c.ActiveXObject) g = v.indexOf("MSIE"), d = U.IE, wa = parseFloat(v.substring(g + 5, v.indexOf(";", g))), v = e.documentMode, "undefined" !== typeof v && (wa = v);
            else if ("Netscape" == g && c.addEventListener) {
                var l = v.indexOf("Firefox"),
                    g = v.indexOf("Safari"),
                    aa = v.indexOf("Chrome");
                0 <= l ? (d = U.FIREFOX, wa = parseFloat(v.substring(l + 8))) : 0 <= g && (l = v.substring(0, g).lastIndexOf("/"), d = 0 <= aa ? U.CHROME : U.SAFARI, wa = parseFloat(v.substring(l + 1, g)))
            } else "Opera" == g && (c.opera && c.attachEvent) && (d = U.OPERA, wa = parseFloat(aa));
            v = c.location.search.substring(1).split("&");
            for (g = 0; g < v.length; g++) aa = v[g], l = aa.indexOf("="), 0 < l && ($[aa.substring(0, l)] = decodeURIComponent(aa.substring(l + 1)));
            Wa = d == U.IE && 9 > wa || d == U.CHROME && 2 > wa;
            this.getBrowser = function () {
                return d
            };
            this.getBrowserVersion = function () {
                return wa
            };
            this.getElement = function (f) {
                "string" == typeof f && (f = e.getElementById(f));
                return f
            };
            this.getElementPosition = function (a) {
                for (var a = f.getElement(a), b = new j, d = "fixed" == f.getElementStyle(a).position, c = d && a != e.body ? e.body : a.offsetParent; c;) b.x += a.offsetLeft, b.y += a.offsetTop,
                d && (b = b.plus(f.getPageScroll())), a = c, c = (d = "fixed" == f.getElementStyle(a).position) && a != e.body ? e.body : a.offsetParent;
                return b
            };
            this.getElementSize = function (a) {
                a = f.getElement(a);
                return new j(a.clientWidth, a.clientHeight)
            };
            this.getElementStyle = function (a) {
                a = f.getElement(a);
                if (a.currentStyle) return a.currentStyle;
                if (c.getComputedStyle) return c.getComputedStyle(a, w);
                q.fail("Unknown element style, no known technique.")
            };
            this.getEvent = function (f) {
                return f ? f : c.event
            };
            this.getMousePosition = function (a) {
                var a =
                    f.getEvent(a),
                    b = new j;
                "DOMMouseScroll" == a.type && d == U.FIREFOX && 3 > wa ? (b.x = a.screenX, b.y = a.screenY) : "number" == typeof a.pageX ? (b.x = a.pageX, b.y = a.pageY) : "number" == typeof a.clientX ? (b.x = a.clientX + e.body.scrollLeft + e.documentElement.scrollLeft, b.y = a.clientY + e.body.scrollTop + e.documentElement.scrollTop) : q.fail("Unknown event mouse position, no known technique.");
                return b
            };
            this.getMouseScroll = function (a) {
                var a = f.getEvent(a),
                    b = 0;
                "number" == typeof a.wheelDelta ? b = a.wheelDelta : "number" == typeof a.detail ? b = -1 * a.detail :
                    q.fail("Unknown event mouse scroll, no known technique.");
                return b ? b / h.abs(b) : 0
            };
            this.getPageScroll = function () {
                var f = new j,
                    a = e.documentElement || {}, b = e.body || {};
                if ("number" == typeof c.pageXOffset) f.x = c.pageXOffset, f.y = c.pageYOffset;
                else if (b.scrollLeft || b.scrollTop) f.x = b.scrollLeft, f.y = b.scrollTop;
                else if (a.scrollLeft || a.scrollTop) f.x = a.scrollLeft, f.y = a.scrollTop;
                return f
            };
            this.getWindowSize = function () {
                var f = new j,
                    a = e.documentElement || {}, b = e.body || {};
                "number" == typeof c.innerWidth ? (f.x = c.innerWidth,
                    f.y = c.innerHeight) : a.clientWidth || a.clientHeight ? (f.x = a.clientWidth, f.y = a.clientHeight) : b.clientWidth || b.clientHeight ? (f.x = b.clientWidth, f.y = b.clientHeight) : q.fail("Unknown window size, no known technique.");
                return f
            };
            this.imageFormatSupported = function (f) {
                f = f ? f : w;
                return !!G[f.toLowerCase()]
            };
            this.makeCenteredNode = function (a) {
                var a = i.getElement(a),
                    b = f.makeNeutralElement("div"),
                    d = [];
                d.push('<div style="display:table; height:100%; width:100%;');
                d.push("border:none; margin:0px; padding:0px;");
                d.push('#position:relative; overflow:hidden; text-align:left;">');
                d.push('<div style="#position:absolute; #top:50%; width:100%; ');
                d.push("border:none; margin:0px; padding:0px;");
                d.push('display:table-cell; vertical-align:middle;">');
                d.push('<div style="#position:relative; #top:-50%; width:100%; ');
                d.push("border:none; margin:0px; padding:0px;");
                d.push('text-align:center;"></div></div></div>');
                b.innerHTML = d.join(w);
                for (var d = b = b.firstChild, c = b.getElementsByTagName("div"); 0 < c.length;) d = c[0], c = d.getElementsByTagName("div");
                d.appendChild(a);
                return b
            };
            this.makeNeutralElement = function (f) {
                var f = e.createElement(f),
                    a = f.style;
                a.background = "transparent none";
                a.border = x;
                a.margin = "0px";
                a.padding = "0px";
                a.position = "static";
                return f
            };
            this.makeTransparentImage = function (a) {
                var b = f.makeNeutralElement("img"),
                    c = p;
                d == U.IE && 7 > wa ? (c = f.makeNeutralElement("span"), c.style.display = "inline-block", b.onload = function () {
                    c.style.width = c.style.width || b.width + "px";
                    c.style.height = c.style.height || b.height + "px";
                    b = b.onload = p
                }, b.src = a, c.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                    a + "', sizingMethod='scale')") : (c = b, c.src = a);
                return c
            };
            this.setElementOpacity = function (a, b, d) {
                a = f.getElement(a);
                d && Wa && (b = h.round(b));
                a.style.opacity = 1 > b ? b : w;
                a.style.filter = (a.style.filter || w).replace(/[\s]*alpha\(.*?\)[\s]*/g, w);
                1 <= b || (b = " alpha(opacity=" + h.round(100 * b) + ") ", a.style.filter += b)
            };
            this.addEvent = function (a, b, d, c) {
                a = f.getElement(a);
                a.addEventListener ? ("mousewheel" == b && a.addEventListener("DOMMouseScroll", d, c), a.addEventListener(b, d, c)) : a.attachEvent ? (a.attachEvent("on" + b, d), c && a.setCapture &&
                    a.setCapture()) : q.fail("Unable to attach event handler, no known technique.")
            };
            this.removeEvent = function (a, b, d, c) {
                a = f.getElement(a);
                a.removeEventListener ? ("mousewheel" == b && a.removeEventListener("DOMMouseScroll", d, c), a.removeEventListener(b, d, c)) : a.detachEvent ? (a.detachEvent("on" + b, d), c && a.releaseCapture && a.releaseCapture()) : q.fail("Unable to detach event handler, no known technique.")
            };
            this.cancelEvent = function (a) {
                a = f.getEvent(a);
                a.preventDefault && a.preventDefault();
                a.cancel = m;
                a.returnValue = k
            };
            this.stopEvent = function (a) {
                a = f.getEvent(a);
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = m
            };
            this.createCallback = function (f, a) {
                for (var b = [], d = 2; d < arguments.length; d++) b.push(arguments[d]);
                return function () {
                    for (var d = b.concat([]), c = 0; c < arguments.length; c++) d.push(arguments[c]);
                    return a.apply(f, d)
                }
            };
            this.getUrlParameter = function (f) {
                return (f = $[f]) ? f : p
            };
            this.makeAjaxRequest = function (f, d) {
                var G = typeof d == A,
                    e = p;
                if (G) var h = d,
                d = function () {
                    c.setTimeout(i.createCallback(p, h, e), 1)
                };
                if (c.ActiveXObject) for (var j = 0; j <
                        a.length; j++) try {
                            e = new ActiveXObject(a[j]);
                            break
                } catch ($) {} else c.XMLHttpRequest && (e = new XMLHttpRequest);
                !e && q.fail("Browser doesn't support XMLHttpRequest.");
                b.proxyUrl && (f = b.proxyUrl + f);
                G && (e.onreadystatechange = function () {
                    4 == e.readyState && (e.onreadystatechange = new Function, d())
                });
                try {
                    e.open("GET", f, G), e.send(p)
                } catch (g) {
                    q.log(g.name + " while making AJAX request: " + g.message), e = e.onreadystatechange = p, G && d()
                }
                return G ? p : e
            };
            this.parseXml = function (f) {
                var a = p;
                if (c.ActiveXObject) try {
                        a = new ActiveXObject("Microsoft.XMLDOM"),
                        a.async = k, a.loadXML(f)
                } catch (b) {
                    q.log(b.name + " while parsing XML (ActiveX): " + b.message)
                } else if (c.DOMParser) try {
                        a = (new DOMParser).parseFromString(f, "text/xml")
                } catch (d) {
                    q.log(d.name + " while parsing XML (DOMParser): " + d.message)
                } else q.fail("Browser doesn't support XML DOM.");
                return a
            }
        }, i = l.Utils = new i,
        Ca = l.MouseTracker;
    var ba = function (f, a) {
        var b = i.getMousePosition(f),
            d = i.getElementPosition(a);
        return b.minus(d)
    }, na = function (f, a) {
            for (var b = e.body; a && f != a && b != a;) try {
                    a = a.parentNode
            } catch (d) {
                return k
            }
            return f ==
                a
        }, u = function () {
            oa = m
        }, ga = function () {
            oa = k
        }, E = "mouseup";
    if (!Ca) {
        var da = i.getBrowser() == U.IE && 9 > i.getBrowserVersion(),
            oa = k,
            La = k,
            Ma = {}, W = [];
        da ? (i.addEvent(e, "mousedown", u, k), i.addEvent(e, E, ga, k)) : (i.addEvent(c, "mousedown", u, m), i.addEvent(c, E, ga, m));
        Ca = l.MouseTracker = function (f) {
            function a() {
                s && (da ? (i.removeEvent(f, ja, u, m), i.removeEvent(f, E, l, m), i.addEvent(f, E, $, k)) : (i.removeEvent(c, ja, n, m), i.removeEvent(c, E, aa, m)), s = k)
            }
            function G(f, a) {
                var b = Ma,
                    d;
                for (d in b) b.hasOwnProperty(d) && B != d && b[d][f](a)
            }
            function d(a) {
                a =
                    i.getEvent(a);
                da && s && !na(a.srcElement, f) && G("onMouseOver", a);
                var b = a.relatedTarget ? a.relatedTarget : a.fromElement;
                if (na(f, a.target ? a.target : a.srcElement) && !na(f, b)) if (w = m, typeof z.enterHandler == A) try {
                            z.enterHandler(z, ba(a, f), t, oa)
                    } catch (d) {
                    q.error(d.name + " while executing enter handler: " + d.message, d)
                }
            }
            function j(a) {
                a = i.getEvent(a);
                da && s && !na(a.srcElement, f) && G("onMouseOut", a);
                var b = a.relatedTarget ? a.relatedTarget : a.toElement;
                if (na(f, a.target ? a.target : a.srcElement) && !na(f, b)) if (w = k, typeof z.exitHandler ==
                        A) try {
                            z.exitHandler(z, ba(a, f), t, oa)
                    } catch (d) {
                    q.error(d.name + " while executing exit handler: " + d.message, d)
                }
            }
            function g(a) {
                a = i.getEvent(a);
                if (2 != a.button) {
                    t = m;
                    y = D = i.getMousePosition(a);
                    O = (new Date).getTime();
                    if (typeof z.pressHandler == A) try {
                            z.pressHandler(z, ba(a, f))
                    } catch (b) {
                        q.error(b.name + " while executing press handler: " + b.message, b)
                    }(z.pressHandler || z.dragHandler) && i.cancelEvent(a);
                    !da || !La ? (s || (da ? (i.removeEvent(f, E, $, k), i.addEvent(f, E, l, m), i.addEvent(f, ja, u, m)) : (i.addEvent(c, E, aa, m), i.addEvent(c,
                        ja, n, m)), s = m), La = m, W = [L]) : da && W.push(L)
                }
            }
            function $(a) {
                var a = i.getEvent(a),
                    d = t,
                    c = w;
                if (2 != a.button) {
                    t = k;
                    if (typeof z.releaseHandler == A) try {
                            z.releaseHandler(z, ba(a, f), d, c)
                    } catch (Ba) {
                        q.error(Ba.name + " while executing release handler: " + Ba.message, Ba)
                    }
                    if (d && c && (a = i.getEvent(a), 2 != a.button && (d = (new Date).getTime() - O, c = i.getMousePosition(a), c = y.distanceTo(c), d = d <= b.clickTimeThreshold && c <= b.clickDistThreshold, typeof z.clickHandler == A))) try {
                            z.clickHandler(z, ba(a, f), d, a.shiftKey)
                    } catch (G) {
                        q.error(G.name + " while executing click handler: " +
                            G.message, G)
                    }
                }
            }
            function l(f) {
                f = i.getEvent(f);
                if (2 != f.button) {
                    for (var b = 0; b < W.length; b++) {
                        var d = W[b];
                        !d.hasMouse() && d.onMouseUp(f)
                    }
                    a();
                    La = k;
                    f.srcElement.fireEvent("on" + f.type, e.createEventObject(f));
                    i.stopEvent(f)
                }
            }
            function aa(f) {
                !w && $(f);
                a()
            }
            function v(a) {
                z.clickHandler && i.cancelEvent(a)
            }
            function n(a) {
                var a = i.getEvent(a),
                    b = i.getMousePosition(a),
                    d = b.minus(D);
                D = b;
                if (typeof z.dragHandler == A) {
                    try {
                        z.dragHandler(z, ba(a, f), d, a.shiftKey)
                    } catch (c) {
                        q.error(c.name + " while executing drag handler: " + c.message,
                            c)
                    }
                    i.cancelEvent(a)
                }
            }
            function u(a) {
                for (var f = 0; f < W.length; f++) W[f].onMouseMove(a);
                i.stopEvent(a)
            }
            function r(a) {
                var a = i.getEvent(a),
                    b = i.getMouseScroll(a);
                if (typeof z.scrollHandler == A) {
                    if (b) try {
                            z.scrollHandler(z, ba(a, f), b, a.shiftKey)
                    } catch (d) {
                        q.error(d.name + " while executing scroll handler: " + d.message, d)
                    }
                    i.cancelEvent(a)
                }
            }
            var ja = "mousemove",
                z = this,
                L = p,
                B = h.random(),
                f = i.getElement(f),
                xa = k,
                s = k,
                t = k,
                w = k,
                D = p,
                O = p,
                y = p;
            this.target = f;
            this.scrollHandler = this.dragHandler = this.clickHandler = this.releaseHandler =
                this.pressHandler = this.exitHandler = this.enterHandler = p;
            L = {
                hasMouse: function () {
                    return w
                },
                onMouseOver: d,
                onMouseOut: j,
                onMouseUp: $,
                onMouseMove: n
            };
            this.isTracking = function () {
                return xa
            };
            this.setTracking = function (b) {
                b ? xa || (i.addEvent(f, "mouseover", d, k), i.addEvent(f, "mouseout", j, k), i.addEvent(f, "mousedown", g, k), i.addEvent(f, E, $, k), i.addEvent(f, "mousewheel", r, k), i.addEvent(f, "click", v, k), xa = m, Ma[B] = L) : xa && (i.removeEvent(f, "mouseover", d, k), i.removeEvent(f, "mouseout", j, k), i.removeEvent(f, "mousedown", g, k), i.removeEvent(f,
                    E, $, k), i.removeEvent(f, "mousewheel", r, k), i.removeEvent(f, "click", v, k), a(), xa = k, delete Ma[B])
            }
        }
    }
    var gb = l.EventManager = function () {
        var a = {};
        this.addListener = function (b, c) {
            typeof c == A && (a[b] || (a[b] = []), a[b].push(c))
        };
        this.removeListener = function (b, c) {
            var d = a[b];
            if (typeof c == A && d) for (var e = 0; e < d.length; e++) if (c == d[e]) {
                        d.splice(e, 1);
                        break
                    }
        };
        this.clearListeners = function (b) {
            a[b] && delete a[b]
        };
        this.trigger = function (b) {
            var e = a[b],
                d = [];
            if (e) {
                for (var j = 1; j < arguments.length; j++) d.push(arguments[j]);
                for (j = 0; j <
                    e.length; j++) try {
                        e[j].apply(c, d)
                } catch (h) {
                    q.error(h.name + n + b + " handler: " + h.message, h)
                }
            }
        }
    }, Xa, ib = function (a, b) {
            function e(G) {
                d.onload = p;
                d.onabort = p;
                d.onerror = p;
                j && c.clearTimeout(j);
                c.setTimeout(function () {
                    b(a, G ? d : p)
                }, 1)
            }
            var d = p,
                j = p;
            this.start = function () {
                d = new Image;
                var b = function () {
                    e(k)
                };
                d.onload = function () {
                    e(m)
                };
                d.onabort = b;
                d.onerror = b;
                j = c.setTimeout(function () {
                    q.log("Image timed out: " + a);
                    e(k)
                }, hb);
                d.src = a
            }
        }, hb = 15E3;
    Xa = l.ImageLoader = function () {
        function a(f, b, e) {
            c--;
            if (typeof f == A) try {
                    f(e)
            } catch (j) {
                q.error(j.name +
                    n + b + " callback: " + j.message, j)
            }
        }
        var c = 0;
        this.loadImage = function (e, d) {
            if (c >= b.imageLoaderLimit) return k;
            var j = i.createCallback(p, a, d),
                j = new ib(e, j);
            c++;
            j.start();
            return m
        }
    };
    var sa, Ya;
    r = 0;
    t = 1;
    y = 2;
    O = 3;
    sa = l.Button = function (a, b, e, d, j, g, $, l, aa, v) {
        function n() {
            c.setTimeout(u, 20)
        }
        function u() {
            if (J) {
                var a = 1 - ((new Date).getTime() - T) / x,
                    a = h.min(1, a),
                    a = h.max(0, a);
                i.setElementOpacity(xa, a, m);
                0 < a && n()
            }
        }
        function q(a) {
            a >= t && L == r && (J = k, i.setElementOpacity(xa, 1, m), L = t);
            a >= y && L == t && (s.style.visibility = w, L = y);
            a >= O && L ==
                y && (D.style.visibility = w, L = O)
        }
        function ja(a) {
            a <= y && L == O && (D.style.visibility = S, L = y);
            a <= t && L == y && (s.style.visibility = S, L = t);
            a <= r && L == t && (J = m, T = (new Date).getTime() + K, c.setTimeout(n, K), L = r)
        }
        var z = i.makeNeutralElement("span"),
            L = t,
            B = new Ca(z),
            b = i.makeTransparentImage(b),
            xa = i.makeTransparentImage(e),
            s = i.makeTransparentImage(d),
            D = i.makeTransparentImage(j),
            g = typeof g == A ? g : p,
            $ = typeof $ == A ? $ : p,
            l = typeof l == A ? l : p,
            aa = typeof aa == A ? aa : p,
            v = typeof v == A ? v : p,
            K = 0,
            x = 2E3,
            T = p,
            J = k;
        this.elmt = z;
        this.notifyGroupEnter = function () {
            q(t)
        };
        this.notifyGroupExit = function () {
            ja(r)
        };
        z.style.display = "inline-block";
        z.style.position = "relative";
        z.title = a;
        z.appendChild(b);
        z.appendChild(xa);
        z.appendChild(s);
        z.appendChild(D);
        a = xa.style;
        e = s.style;
        d = D.style;
        a.position = e.position = d.position = "absolute";
        a.top = e.top = d.top = "0px";
        a.left = e.left = d.left = "0px";
        e.visibility = d.visibility = S;
        i.getBrowser() == U.FIREFOX && 3 > i.getBrowserVersion() && (a.top = e.top = d.top = w);
        B.enterHandler = function (a, f, b, d) {
            b ? (q(O), aa && aa()) : !d && q(y)
        };
        B.exitHandler = function (a, f, b) {
            ja(t);
            b && v && v()
        };
        B.pressHandler = function () {
            q(O);
            g && g()
        };
        B.releaseHandler = function (a, f, b, d) {
            b && d ? (ja(y), $ && $()) : b ? ja(t) : q(y)
        };
        B.clickHandler = function (a, f, b) {
            l && b && l()
        };
        B.setTracking(m);
        ja(r)
    };
    Ya = l.ButtonGroup = function (a) {
        function b() {
            for (var d = 0; d < a.length; d++) a[d].notifyGroupEnter()
        }
        function c(b, d, e) {
            if (!e) for (b = 0; b < a.length; b++) a[b].notifyGroupExit()
        }
        var d = i.makeNeutralElement("span"),
            a = a.concat([]),
            e = new Ca(d);
        this.elmt = d;
        this.emulateEnter = function () {
            b()
        };
        this.emulateExit = function () {
            c()
        };
        d.style.display =
            "inline-block";
        for (var j = 0; j < a.length; j++) d.appendChild(a[j].elmt);
        e.enterHandler = b;
        e.exitHandler = c;
        e.releaseHandler = function (b, d, c, e) {
            if (!e) for (b = 0; b < a.length; b++) a[b].notifyGroupExit()
        };
        e.setTracking(m)
    };
    var Za = l.TileSource = function (a, b, c, d, e, i) {
        var g = this,
            m = b / a;
        this.width = a;
        this.height = b;
        this.aspectRatio = a / b;
        this.dimensions = new j(a, b);
        this.minLevel = e ? e : 0;
        this.maxLevel = i ? i : h.ceil(h.log(h.max(a, b)) / h.log(2));
        this.tileSize = c ? c : 0;
        this.tileOverlap = d ? d : 0;
        this.getLevelScale = function (a) {
            return 1 / (1 << g.maxLevel -
                a)
        };
        this.getNumTiles = function (d) {
            var c = g.getLevelScale(d),
                d = h.ceil(c * a / g.tileSize),
                c = h.ceil(c * b / g.tileSize);
            return new j(d, c)
        };
        this.getPixelRatio = function (a) {
            a = g.dimensions.times(g.getLevelScale(a));
            return new j(1 / a.x, 1 / a.y)
        };
        this.getTileAtPoint = function (a, b) {
            var f = g.dimensions.times(g.getLevelScale(a)),
                d = b.times(f.x),
                c;
            c = 0 <= b.x && 1 >= b.x ? h.floor(d.x / g.tileSize) : h.ceil(f.x / g.tileSize) * h.floor(d.x / f.x) + h.floor((f.x + d.x % f.x) % f.x / g.tileSize);
            f = 0 <= b.y && b.y <= m ? h.floor(d.y / g.tileSize) : h.ceil(f.y / g.tileSize) *
                h.floor(d.y / f.y) + h.floor((f.y + d.y % f.y) % f.y / g.tileSize);
            return new j(c, f)
        };
        this.getTileBounds = function (a, f, b) {
            var d = g.dimensions.times(g.getLevelScale(a)),
                a = 0 === f ? 0 : g.tileSize * f - g.tileOverlap,
                c = 0 === b ? 0 : g.tileSize * b - g.tileOverlap,
                f = g.tileSize + (0 === f ? 1 : 2) * g.tileOverlap,
                b = g.tileSize + (0 === b ? 1 : 2) * g.tileOverlap,
                f = h.min(f, d.x - a),
                b = h.min(b, d.y - c),
                d = 1 / d.x;
            return new D(a * d, c * d, f * d, b * d)
        };
        this.getTileUrl = function () {
            throw Error("Method not implemented.");
        };
        this.tileExists = function (a, f, b) {
            var d = g.getNumTiles(a);
            return a >= g.minLevel && a <= g.maxLevel && 0 <= f && 0 <= b && f < d.x && b < d.y
        }
    }, Fa = l.DisplayRect = function (a, b, c, d, e, j) {
            D.apply(this, arguments);
            this.minLevel = e;
            this.maxLevel = j
        };
    Fa.prototype = new D;
    var pa = l.DziTileSource = function (a, b, c, d, e, j, g) {
        Za.apply(this, [a, b, c, d]);
        var i = this,
            p = {};
        this.tileFormat = this.fileFormat = j;
        this.displayRects = g;
        if (g) for (a = g.length - 1; 0 <= a; a--) {
                b = g[a];
                for (d = b.minLevel; d <= b.maxLevel; d++) p[d] || (p[d] = []), p[d].push(b)
        }
        this.getTileUrl = function (a, b, f) {
            return [e, a, "/", b, "_", f, ".", j].join(w)
        };
        this.tileExists = function (a, b, f) {
            var d = p[a];
            if (!d || !d.length) return m;
            for (var e = i.getLevelScale(a), j = d.length - 1; 0 <= j; j--) {
                var g = d[j];
                if (!(a < g.minLevel || a > g.maxLevel)) {
                    var Ba = g.x * e,
                        l = g.y * e,
                        n = Ba + g.width * e,
                        g = l + g.height * e,
                        Ba = h.floor(Ba / c),
                        l = h.floor(l / c),
                        n = h.ceil(n / c),
                        g = h.ceil(g / c);
                    if (Ba <= b && b < n && l <= f && f < g) return m
                }
            }
            return k
        }
    };
    pa.prototype = new Za;
    var H = function (a) {
        Error.apply(this, arguments);
        this.message = a
    }, Na = function (a) {
            a instanceof H || (q.error(a.name + " while creating DZI from XML: " + a.message), a = new H(g.getString("Errors.Unknown")));
            return a
        }, Oa = function (a) {
            var a = a.split("/"),
                b = a[a.length - 1],
                c = b.lastIndexOf("."); - 1 < c && (a[a.length - 1] = b.slice(0, c));
            return a.join("/") + "_files/"
        }, $a = function (a, b) {
            if (a) {
                if (200 !== a.status && 0 !== a.status) {
                    var c = a.status;
                    throw new H(g.getString("Errors.Status", c, 404 == c ? "Not Found" : a.statusText));
                }
            } else throw new H(g.getString("Errors.Security"));
            c = p;
            a.responseXML && a.responseXML.documentElement ? c = a.responseXML : a.responseText && (c = i.parseXml(a.responseText));
            return Ga(c, b)
        }, Ga = function (a, b) {
            if (!a || !a.documentElement) throw new H(g.getString("Errors.Xml"));
            var c = a.documentElement,
                d = c.tagName;
            if ("Image" == d) try {
                    var e = c.getAttribute("Format");
                    if (!i.imageFormatSupported(e)) throw new H(g.getString("Errors.ImageFormat", e.toUpperCase()));
                    for (var j = c.getElementsByTagName("Size")[0], h = c.getElementsByTagName("DisplayRect"), m = parseInt(j.getAttribute("Width"), K), k = parseInt(j.getAttribute("Height"), K), p = parseInt(c.getAttribute("TileSize")), l = parseInt(c.getAttribute("Overlap")), c = [], d = 0; d < h.length; d++) {
                        var n = h[d],
                            q = n.getElementsByTagName("Rect")[0];
                        c.push(new Fa(parseInt(q.getAttribute("X"),
                            K), parseInt(q.getAttribute("Y"), K), parseInt(q.getAttribute("Width"), K), parseInt(q.getAttribute("Height"), K), parseInt(n.getAttribute("MinLevel"), K), parseInt(n.getAttribute("MaxLevel"), K)))
                    }
                    return new pa(m, k, p, l, b, e, c)
            } catch (ja) {
                throw e = g.getString("Errors.Dzi"), ja instanceof H ? ja : new H(e);
            } else {
                if ("Collection" == d) throw new H(g.getString("Errors.Dzc"));
                if ("Error" == d) throw e = c.getElementsByTagName("Message")[0].firstChild.nodeValue, new H(e);
            }
            throw new H(g.getString("Errors.Dzi"));
        };
    H.prototype = Error();
    pa.getTilesUrl = Oa;
    pa.createFromJson = function (a, b) {
        var e = typeof b == A,
            d, j;
        if (!a || !a.url && !a.tilesUrl) j = new H(g.getString("Errors.Empty"));
        else try {
                var h = a.displayRects;
                if (h && h.length) for (var m = 0, k = h.length; m < k; m++) {
                        var l = h[m];
                        h[m] = new Fa(l.x || l[0], l.y || l[1], l.width || l[2], l.height || l[3], l.minLevel || l[4], l.maxLevel || l[5])
                }
                d = new pa(a.width, a.height, a.tileSize, a.tileOverlap, a.tilesUrl || Oa(a.url), a.tileFormat, a.displayRects);
                d.xmlUrl = a.url
        } catch (n) {
            j = Na(n)
        }
        if (e) c.setTimeout(i.createCallback(p, b, d, j && j.message),
                1);
        else {
            if (j) throw j;
            return d
        }
    };
    pa.createFromXml = function (a, b, e) {
        function d(b, d) {
            try {
                var c = b(d, m);
                c.xmlUrl = a;
                return c
            } catch (e) {
                if (j) return h = Na(e).message, p;
                throw Na(e);
            }
        }
        var j = typeof e == A,
            h = p;
        if (!a) {
            h = g.getString("Errors.Empty");
            if (j) return c.setTimeout(function () {
                    e(p, h)
                }, 1), p;
            throw new H(h);
        }
        var m = Oa(a);
        return j ? (b ? c.setTimeout(function () {
            var a = d(Ga, i.parseXml(b));
            e(a, h)
        }, 1) : i.makeAjaxRequest(a, function (a) {
            a = d($a, a);
            e(a, h)
        }), p) : b ? d(Ga, i.parseXml(b)) : d($a, i.makeAjaxRequest(a))
    };
    for (var jb = l.Viewport = function (a, c) {
        function e(a) {
            var a = 1 / d.getZoom(a),
                f = a / d.getAspectRatio(),
                c = b.visibilityRatio,
                a = (c - P) * a,
                f = (c - P) * f,
                c = 1 - 2 * a,
                j = i - 2 * f;
            0 > c && (a += P * c, c = 0);
            0 > j && (f += P * j, j = 0);
            return new l.Rect(a, f, c, j)
        }
        var d = this,
            a = new j(a.x, a.y),
            g = c.x / c.y,
            i = c.y / c.x,
            k = new T(0),
            n = new T(0),
            q = new T(b.logarithmicZoom ? 0 : 1),
            u = p,
            r = new D(0, 0, 1, i),
            s = r.getCenter(),
            t = h.LN2;
        this.getHomeBounds = function () {
            var a = d.getAspectRatio(),
                b = new D(r.x, r.y, r.width, r.height);
            g >= a ? (b.height = r.width / a, b.y = s.y - b.height / 2) : (b.width = r.height * a, b.x = s.x - b.width /
                2);
            return b
        };
        this.getHomeCenter = function () {
            return s
        };
        this.getHomeZoom = function () {
            var a = g / d.getAspectRatio();
            return 1 <= a ? 1 : a
        };
        this.getMinCenter = function (a) {
            return e(a).getTopLeft()
        };
        this.getMaxCenter = function (a) {
            return e(a).getBottomRight()
        };
        this.getMinZoom = function () {
            var e = d.getHomeZoom();
            return h.min(b.minZoomDimension ? c.x <= c.y ? b.minZoomDimension / a.x : b.minZoomDimension / (a.x * i) : b.minZoomImageRatio * e, e)
        };
        this.getMaxZoom = function () {
            return h.max(c.x * b.maxZoomPixelRatio / a.x, d.getHomeZoom())
        };
        this.getAspectRatio = function () {
            return a.x / a.y
        };
        this.getContainerSize = function () {
            return new j(a.x, a.y)
        };
        this.getBounds = function (a) {
            var b = d.getCenter(a),
                a = 1 / d.getZoom(a),
                f = a / d.getAspectRatio();
            return new D(b.x - a / 2, b.y - f / 2, a, f)
        };
        this.getCenter = function (b) {
            var c = new j(k.getCurrent(), n.getCurrent()),
                e = new j(k.getTarget(), n.getTarget());
            if (b) return c;
            if (!u) return e;
            var b = d.getZoom(),
                g = 1 / b,
                h = g / d.getAspectRatio(),
                c = new D(c.x - g / 2, c.y - h / 2, g, h),
                g = d.pixelFromPoint(u, m),
                b = u.minus(c.getTopLeft()).times(a.x / c.width).minus(g).divide(a.x *
                    b);
            return e.plus(b)
        };
        this.getZoom = function (a) {
            a = a ? q.getCurrent() : q.getTarget();
            return b.logarithmicZoom ? h.pow(2, a) : a
        };
        this.applyConstraints = function (a) {
            var f = d.getZoom(),
                c;
            c = d.getMinZoom();
            var g = d.getMaxZoom();
            c = h.min(h.max(f, c), g);
            f != c && d.zoomTo(c, u, a);
            var f = d.getCenter(),
                i = e(),
                g = f.x,
                m = f.y,
                k = h.min(h.max(g, i.x), i.x + i.width),
                i = h.min(h.max(m, i.y), i.y + i.height),
                g = g === k && m === i ? f : new j(k, i);
            b.wrapHorizontal && (g.x = f.x);
            b.wrapVertical && (g.y = f.y);
            f.equals(g) || (c = 1 / c, f = c / d.getAspectRatio(), d.fitBounds(new D(g.x -
                P * c, g.y - P * f, c, f), a))
        };
        this.ensureVisible = function (a) {
            d.applyConstraints(a)
        };
        this.fitBounds = function (b, c) {
            var e = d.getAspectRatio(),
                j = b.getCenter(),
                g = new D(b.x, b.y, b.width, b.height);
            g.getAspectRatio() >= e ? (g.height = b.width / e, g.y = j.y - g.height / 2) : (g.width = b.height * e, g.x = j.x - g.width / 2);
            d.panTo(d.getCenter(m), m);
            d.zoomTo(d.getZoom(m), p, m);
            var h = d.getBounds(),
                i = d.getZoom(),
                e = 1 / g.width;
            e == i || g.width == h.width ? d.panTo(j, c) : (j = h.getTopLeft().times(a.x / h.width).minus(g.getTopLeft().times(a.x / g.width)).divide(a.x /
                h.width - a.x / g.width), d.zoomTo(e, j, c))
        };
        this.goHome = function (a) {
            var f = d.getCenter();
            b.wrapHorizontal && (f.x = (1 + f.x % 1) % 1, k.resetTo(f.x), k.update());
            b.wrapVertical && (f.y = (i + f.y % i) % i, n.resetTo(f.y), n.update());
            d.fitBounds(r, a)
        };
        this.panBy = function (a, b) {
            d.panTo(d.getCenter().plus(a), b)
        };
        this.panTo = function (b, c) {
            if (c) k.resetTo(b.x), n.resetTo(b.y);
            else if (u) {
                var e = d.getZoom(),
                    g = 1 / e,
                    j = g / d.getAspectRatio(),
                    g = new D(k.getCurrent() - g / 2, n.getCurrent() - j / 2, g, j),
                    j = d.pixelFromPoint(u, m),
                    e = u.minus(g.getTopLeft()).times(a.x /
                        g.width).minus(j).divide(a.x * e),
                    e = b.minus(e);
                k.springTo(e.x);
                n.springTo(e.y)
            } else k.springTo(b.x), n.springTo(b.y)
        };
        this.zoomBy = function (a, b, f) {
            d.zoomTo(d.getZoom() * a, b, f)
        };
        this.zoomTo = function (a, f, d) {
            d ? q.resetTo(b.logarithmicZoom ? h.log(a) / t : a) : q.springTo(b.logarithmicZoom ? h.log(a) / t : a);
            u = f instanceof j ? f : p
        };
        this.resize = function (b, c) {
            var e = d.getBounds(),
                g = b.x / a.x;
            a = new j(b.x, b.y);
            c && (e.width *= g, e.height = e.width / d.getAspectRatio());
            d.fitBounds(e, m)
        };
        this.update = function () {
            var a = k.getCurrent(),
                b = n.getCurrent(),
                f = q.getCurrent();
            if (u) var c = d.pixelFromPoint(u, m);
            q.update();
            u && q.getCurrent() != f ? (c = d.pixelFromPoint(u, m).minus(c), c = d.deltaPointsFromPixels(c, m), k.shiftBy(c.x), n.shiftBy(c.y)) : u = p;
            k.update();
            n.update();
            return k.getCurrent() != a || n.getCurrent() != b || q.getCurrent() != f
        };
        this.deltaPixelsFromPoints = function (b, c) {
            return b.times(a.x * d.getZoom(c))
        };
        this.deltaPointsFromPixels = function (b, c) {
            return b.divide(a.x * d.getZoom(c))
        };
        this.pixelFromPoint = function (b, c) {
            var e = d.getBounds(c);
            return b.minus(e.getTopLeft()).times(a.x /
                e.width)
        };
        this.pointFromPixel = function (b, c) {
            var e = d.getBounds(c);
            return b.divide(a.x / e.width).plus(e.getTopLeft())
        };
        d.goHome(m);
        d.update()
    }, ab, F, Da = function (a, b, c, d, e, g) {
            this.level = a;
            this.x = b;
            this.y = c;
            this.bounds = d;
            this.exists = e;
            this.url = g;
            this.image = this.elmt = p;
            this.loading = this.loaded = k;
            this.visibility = this.distance = this.opacity = this.blendStart = this.size = this.position = this.style = p;
            this.beingDrawn = k;
            this.lastTouchTime = this.lastDrawnTime = 0
        }, bb = function (a) {
            switch (a) {
            case F.TOP_LEFT:
                return function () {};
            case F.TOP:
                return function (a, b) {
                    a.x -= b.x / 2
                };
            case F.TOP_RIGHT:
                return function (a, b) {
                    a.x -= b.x
                };
            case F.RIGHT:
                return function (a, b) {
                    a.x -= b.x;
                    a.y -= b.y / 2
                };
            case F.BOTTOM_RIGHT:
                return function (a, b) {
                    a.x -= b.x;
                    a.y -= b.y
                };
            case F.BOTTOM:
                return function (a, b) {
                    a.x -= b.x / 2;
                    a.y -= b.y
                };
            case F.BOTTOM_LEFT:
                return function (a, b) {
                    a.y -= b.y
                };
            case F.LEFT:
                return function (a, b) {
                    a.y -= b.y / 2
                };
            default:
                return function (a, b) {
                    a.x -= b.x / 2;
                    a.y -= b.y / 2
                }
            }
        }, Ha = function (a, b, c) {
            this.elmt = a;
            this.scales = b instanceof D;
            this.bounds = new D(b.x, b.y, b.width,
                b.height);
            this.adjust = bb(b instanceof j ? c : F.TOP_LEFT);
            this.position = new j(b.x, b.y);
            this.size = new j(b.width, b.height);
            this.style = a.style;
            this.naturalSize = new j(a.clientWidth, a.clientHeight)
        }, kb = 100, cb = P, db = i.getBrowser(), ga = i.getBrowserVersion(), u = !! e.createElement("canvas").getContext, lb = (e.documentElement || {}).style || {}, Ia = k, mb = ["msTransform", "WebkitTransform", "MozTransform"], V, Va; V = mb.shift();) if ("undefined" !== typeof lb[V]) {
            Ia = m;
            Va = /webkit/i.test(V);
            break
        }
    var ga = db == U.SAFARI && 4 > ga,
        Ja = u && !ga,
        eb = !Ja && Ia,
        fb = k,
        nb = "undefined" !== typeof e.documentMode ? "bicubic" : "nearest-neighbor";
    Da.prototype.toString = function () {
        return this.level + "/" + this.x + "_" + this.y
    };
    Da.prototype.drawHTML = function (a) {
        if (this.loaded) {
            this.elmt || (this.elmt = i.makeNeutralElement("img"), this.elmt.src = this.url, this.style = this.elmt.style, this.style.position = "absolute", this.style.msInterpolationMode = nb, eb && (this.style[V + "Origin"] = "0px 0px"));
            var b = this.elmt,
                c = this.image,
                d = this.style,
                e = this.position,
                g = this.size;
            b.parentNode != a && a.appendChild(b);
            eb ? d[V] = ["matrix(", (g.x / c.width).toFixed(8), ",0,0,", (g.y / c.height).toFixed(8), ",", e.x.toFixed(8), Va ? "," : "px,", e.y.toFixed(8), Va ? ")" : "px)"].join(w) : fb ? (c = a.clientWidth, a = a.clientHeight, d.width = c + "px", d.height = a + "px", d.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (g.x / c).toFixed(8), ",M22=", (g.y / a).toFixed(8), ",Dx=", e.x.toFixed(8), ",Dy=", e.y.toFixed(8), ")"].join(w)) : (e = e.apply(h.floor), g = g.apply(h.ceil), d.left = e.x + "px", d.top = e.y + "px", d.width = g.x + "px", d.height = g.y + "px");
            i.setElementOpacity(b,
                this.opacity)
        } else q.error("Attempting to draw tile " + this.toString() + " when it's not yet loaded.")
    };
    Da.prototype.drawCanvas = function (a) {
        if (this.loaded) {
            var b = this.position,
                c = this.size;
            a.globalAlpha = this.opacity;
            a.drawImage(this.image, b.x, b.y, c.x, c.y)
        } else q.error("Attempting to draw tile " + this.toString() + " when it's not yet loaded.")
    };
    Da.prototype.unload = function () {
        this.elmt && this.elmt.parentNode && this.elmt.parentNode.removeChild(this.elmt);
        this.image = this.elmt = p;
        this.loading = this.loaded = k
    };
    F = l.OverlayPlacement = {
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8
    };
    Ha.prototype.destroy = function () {
        var a = this.elmt,
            b = this.style;
        a.parentNode && a.parentNode.removeChild(a);
        b.top = w;
        b.left = w;
        b.position = w;
        this.scales && (b.width = w, b.height = w)
    };
    Ha.prototype.drawHTML = function (a) {
        var c = this.elmt,
            e = this.style,
            d = this.scales,
            g = this.naturalSize;
        c.parentNode != a && (a.appendChild(c), e.position = "absolute", g.x = c.clientWidth, g.y = c.clientHeight);
        var j = this.position,
            i = this.size;
        d || (i.x = g.x = g.x ||
            c.clientWidth, i.y = g.y = g.y || c.clientHeight);
        this.adjust(j, i);
        b.transformOverlays && Ia ? (e[V + "Origin"] = "0px 0px", e[V] = ["translate(", j.x.toFixed(8), "px,", j.y.toFixed(8), "px)"].join(w), d && (c.clientWidth || (e.width = "100%"), c.clientHeight || (e.height = "100%"), e[V] += [" scale(", (i.x / c.clientWidth).toFixed(8), ",", (i.y / c.clientHeight).toFixed(8), ")"].join(w))) : b.transformOverlays && fb ? (c = a.clientWidth, a = a.clientHeight, e.width = c + "px", e.height = a + "px", e.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (i.x /
                c).toFixed(8), ",M22=", (i.y / a).toFixed(8), ",Dx=", j.x.toFixed(8), ",Dy=", j.y.toFixed(8), ")"].join(w)) : (j = j.apply(h.floor), i = i.apply(h.ceil), e.left = j.x + "px", e.top = j.y + "px", d && (e.width = i.x + "px", e.height = i.y + "px"))
    };
    Ha.prototype.update = function (a, b) {
        this.scales = a instanceof D;
        this.bounds = new D(a.x, a.y, a.width, a.height);
        this.adjust = bb(a instanceof j ? b : F.TOP_LEFT)
    };
    ab = l.Drawer = function (c, e, g) {
        function d(a) {
            T[a] || (T[a] = c.getPixelRatio(a));
            return T[a]
        }
        function l(a, b, c) {
            a.loading = k;
            if (ha) q.error("Tile load callback in middle of drawing routine.");
            else if (c) if (b < E) q.log("Ignoring tile " + a + " loaded before reset: " + a.url);
                else {
                    a.loaded = m;
                    a.image = c;
                    b = F.length;
                    if (F.length >= kb) {
                        for (var c = h.ceil(h.log(x) / h.log(2)), d = p, f = -1, e = F.length - 1; 0 <= e; e--) {
                            var g = F[e];
                            if (!(g.level <= c || g.beingDrawn)) if (d) {
                                    var j = g.lastTouchTime,
                                        i = d.lastTouchTime,
                                        n = g.level,
                                        u = d.level;
                                    if (j < i || j == i && n > u) d = g, f = e
                                } else d = g, f = e
                        }
                        d && 0 <= f && (d.unload(), b = f)
                    }
                    F[b] = a;
                    Q = m
                } else q.log("Tile " + a + " failed to load: " + a.url), a.exists = k
        }
        function n(b, c, d) {
            if (!ia[b]) return k;
            if (c === a || d === a) {
                var b = ia[b],
                    f;
                for (f in b) if (b.hasOwnProperty(f)) {
                        var c = b[f],
                            e;
                        for (e in c) if (c.hasOwnProperty(e) && !c[e]) return k
                    }
                return m
            }
            return ia[b][c] === a || ia[b][c][d] === a || ia[b][c][d] === m
        }
        function u(a, b, c, d) {
            ia[a] ? (ia[a][b] || (ia[a][b] = {}), ia[a][b][c] = d) : q.error("Setting coverage for a tile before its level's coverage has been reset: " + a)
        }
        function r(a) {
            for (var b = J.length - 1; 0 <= b; b--) if (J[b].elmt == a) return b;
            return -1
        }
        var t = i.getElement(g),
            v = i.makeNeutralElement(Ja ? "canvas" : "div"),
            D = Ja ? v.getContext("2d") : p,
            O = new Xa,
            y = new s,
            K =
                c.minLevel,
            z = c.maxLevel,
            x = c.tileSize,
            B = c.tileOverlap,
            S = c.height / c.width,
            A = {}, T = {}, H = {}, F = [],
            ia = {}, J = [],
            ka = [],
            C = 0,
            E = 0,
            ha = k,
            Q = m;
        this.elmt = t;
        this.profiler = y;
        v.style.width = "100%";
        v.style.height = "100%";
        v.style.position = "absolute";
        t.style.textAlign = "left";
        t.appendChild(v);
        this.addOverlay = function (a, b, c) {
            a = i.getElement(a);
            0 <= r(a) || (J.push(new Ha(a, b, c)), Q = m)
        };
        this.updateOverlay = function (a, b, c) {
            a = i.getElement(a);
            a = r(a);
            0 <= a && (J[a].update(b, c), Q = m)
        };
        this.removeOverlay = function (a) {
            a = i.getElement(a);
            a = r(a);
            0 <= a && (J[a].destroy(), J.splice(a, 1), Q = m)
        };
        this.clearOverlays = function () {
            for (; 0 < J.length;) J.pop().destroy(), Q = m
        };
        this.needsUpdate = function () {
            return Q
        };
        this.numTilesLoaded = function () {
            return F.length
        };
        this.reset = function () {
            H = {};
            F = [];
            E = (new Date).getTime();
            Q = m
        };
        this.update = function () {
            y.beginUpdate();
            ha = m;
            for (Q = k; 0 < ka.length;) {
                var g = ka.pop();
                g.beingDrawn = k
            }
            var q = e.getContainerSize(),
                r = q.x,
                q = q.y;
            Ja ? (v.width = r, v.height = q, D.clearRect(0, 0, r, q)) : v.innerHTML = w;
            var r = e.getBounds(m),
                s = r.getTopLeft(),
                x = r.getBottomRight();
            if (b.wrapHorizontal || !(0 > x.x || 1 < s.x)) if (b.wrapVertical || !(0 > x.y || s.y > S)) {
                    var G = C,
                        T = db === U.CHROME,
                        L = h.abs,
                        r = h.floor,
                        I = h.log,
                        F = h.max,
                        E = h.min,
                        q = e.deltaPixelsFromPoints,
                        V = e.pixelFromPoint,
                        qa = c.getTileAtPoint,
                        va = b.alwaysBlend,
                        pa = 1E3 * b.blendTime,
                        ba = b.immediateRender,
                        za = b.minZoomDimension,
                        ta = b.wrapHorizontal,
                        da = b.wrapVertical,
                        Ca = b.wrapOverlays;
                    ta || (s.x = F(s.x, 0), x.x = E(x.x, 1));
                    da || (s.y = F(s.y, 0), x.y = E(x.y, S));
                    for (var N = p, ca = k, X = (new Date).getTime(), Ea = e.getCenter(), na = V(Ea), ya = q(d(0), k).x, ba = ba ? 1 : ya, F = F(K,
                            r(I(za || 64) / I(2))), za = q(d(0), m).x, I = E(z, r(I(za / cb) / I(2))), F = E(F, I); I >= F; I--) {
                        za = k;
                        ya = q(d(I), m).x;
                        if (!ca && ya >= cb || I == F) ca = za = m;
                        else if (!ca) continue;
                        ia[I] = {};
                        var ya = E(1, (ya - P) / P),
                            R = q(d(I), k).x,
                            R = ba / L(ba - R),
                            ga = qa(I, s),
                            la = qa(I, x),
                            ma, ua = I;
                        A[ua] || (A[ua] = c.getNumTiles(ua));
                        ma = A[ua];
                        ua = ma.x;
                        ma = ma.y;
                        ta || (la.x = E(la.x, ua - 1));
                        da || (la.y = E(la.y, ma - 1));
                        for (var Y = ga.x; Y <= la.x; Y++) for (var ra = ga.y; ra <= la.y; ra++) {
                                var M = I,
                                    Z = Y,
                                    fa = ra,
                                    g = X,
                                    Aa = ua,
                                    Ua = ma;
                                H[M] || (H[M] = {});
                                H[M][Z] || (H[M][Z] = {});
                                if (!H[M][Z][fa]) {
                                    var W = (Aa + Z % Aa) %
                                        Aa,
                                        Qa = (Ua + fa % Ua) % Ua,
                                        sa = c.getTileBounds(M, W, Qa),
                                        Ka = c.tileExists(M, W, Qa),
                                        oa = c.getTileUrl(M, W, Qa);
                                    sa.x += 1 * (Z - W) / Aa;
                                    sa.y += S * (fa - Qa) / Ua;
                                    H[M][Z][fa] = new Da(M, Z, fa, sa, Ka, oa)
                                }
                                M = H[M][Z][fa];
                                M.lastTouchTime = g;
                                g = M;
                                M = za;
                                u(I, Y, ra, k);
                                g.exists && (ca && !M && ((Y === a || ra === a ? n(I + 1) : n(I + 1, 2 * Y, 2 * ra) && n(I + 1, 2 * Y, 2 * ra + 1) && n(I + 1, 2 * Y + 1, 2 * ra) && n(I + 1, 2 * Y + 1, 2 * ra + 1)) ? u(I, Y, ra, m) : M = m), M && (Aa = g.bounds.getTopLeft(), fa = g.bounds.getSize(), M = V(Aa, m), Z = q(fa, m), B || (Z = Z.plus(new j(1, 1))), Aa = V(Aa, k), fa = q(fa, k), fa = Aa.plus(fa.divide(2)), fa =
                                    na.distanceTo(fa), g.position = M, g.size = Z, g.distance = fa, g.visibility = R, g.loaded ? (g.blendStart || (g.blendStart = X), M = X - g.blendStart, Z = 0 === pa ? 1 : E(1, M / pa), va && (Z *= ya), g.opacity = Z, ka.push(g), 1 <= Z ? (u(I, Y, ra, m), T && g.lastDrawnTime !== G && u(I, Y, ra, k)) : M < pa && (Q = m), g.lastDrawnTime = X) : g.loading || (N = !N || g.visibility > N.visibility || g.visibility == N.visibility && g.distance < N.distance ? g : N)))
                        }
                        if (n(I)) break
                    }
                    for (s = ka.length - 1; 0 <= s; s--) g = ka[s], Ja ? g.drawCanvas(D) : g.drawHTML(v), g.beingDrawn = m;
                    x = J.length;
                    for (s = 0; s < x; s++) G = J[s],
                    T = G.bounds, L = T.getTopLeft(), Ca && ta && (L.x += r(Ea.x)), G.position = V(L, m), G.size = q(T.getSize(), m), G.drawHTML(t);
                    N && (N.loading = O.loadImage(N.url, i.createCallback(p, l, N, X)), Q = m);
                    C = X
                }
            ha = k;
            y.endUpdate()
        };
        this.idle = function () {}
    };
    var va, Ka = function (a, b, c) {
            var d = i.makeNeutralElement("span");
            this.elmt = a;
            this.anchor = b;
            this.container = c;
            this.wrapper = d;
            d.style.display = "inline-block";
            d.appendChild(a);
            b == va.NONE && (d.style.width = d.style.height = "100%");
            b == va.TOP_RIGHT || b == va.BOTTOM_RIGHT ? c.insertBefore(d, c.firstChild) :
                c.appendChild(d)
        }, ob = i.getBrowser();
    va = l.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4
    };
    Ka.prototype.destroy = function () {
        this.wrapper.removeChild(this.elmt);
        this.container.removeChild(this.wrapper)
    };
    Ka.prototype.isVisible = function () {
        return this.wrapper.style.display != x
    };
    Ka.prototype.setVisible = function (a) {
        this.wrapper.style.display = a ? "inline-block" : x
    };
    Ka.prototype.setOpacity = function (a) {
        this.elmt["----seadragon----"] && ob == U.IE ? i.setElementOpacity(this.elmt, a, m) : i.setElementOpacity(this.wrapper,
            a, m)
    };
    l.Viewer = function (a) {
        function l(a) {
            a = e.createTextNode(a);
            E.innerHTML = w;
            E.appendChild(i.makeCenteredNode(a));
            a = a.parentNode.style;
            a.fontFamily = "verdana";
            a.fontSize = "13px";
            a.fontSizeAdjust = x;
            a.fontStyle = "normal";
            a.fontStretch = "normal";
            a.fontVariant = "normal";
            a.fontWeight = "normal";
            a.lineHeight = "1em";
            a.textAlign = "center";
            a.textDecoration = x
        }
        function n() {
            J && u();
            Ra = (new Date).getTime();
            c.setTimeout(function () {
                Ra > Na && l(g.getString("Messages.Loading"))
            }, 2E3);
            return Ra
        }
        function d(b, e, g) {
            Na = (new Date).getTime();
            b < Ra ? (q.log("Ignoring out-of-date open."), ha.trigger("ignore", B)) : e ? (E.innerHTML = w, qa = i.getElementSize(a), 0 === qa.x || 0 === qa.y ? c.setTimeout(function () {
                d(b, e, g)
            }, K) : (J = e, C = new jb(qa, J.dimensions), ka = new ab(J, C, E), W = new s, B.source = J, B.viewport = C, B.drawer = ka, B.profiler = W, ta = k, Sa = m, r(D), ha.trigger("open", B))) : (l(g), ha.trigger("error", B))
        }
        function u() {
            B.source = J = p;
            B.viewport = C = p;
            B.drawer = ka = p;
            B.profiler = W = p;
            E.innerHTML = w
        }
        function r(a, b) {
            if (ta) return c.setTimeout(a, 1);
            var d = (new Date).getTime(),
                d = h.max(1, (b ? b : d) + 1E3 / 60 - d);
            return c.setTimeout(a, d)
        }
        function t() {
            if (J) {
                W.beginUpdate();
                var b = i.getElementSize(a);
                !b.equals(qa) && (0 < b.x && 0 < b.y) && (C.resize(b, m), qa = b, ha.trigger("resize", B));
                b = C.update();
                !ta && b && (ha.trigger("animationstart", B), T());
                b ? (ka.update(), ha.trigger("animation", B)) : Sa || ka.needsUpdate() ? (ka.update(), Sa = k) : ka.idle();
                ta && !b && (ha.trigger("animationfinish", B), !Ta && A());
                ta = b;
                W.endUpdate()
            }
        }
        function D() {
            if (J) {
                var a = (new Date).getTime();
                t();
                r(arguments.callee, a)
            }
        }
        function y(a) {
            for (var b = ea.length -
                1; 0 <= b; b--) if (ea[b].elmt == a) return b;
            return -1
        }
        function v() {
            c.setTimeout(O, 20)
        }
        function O() {
            if (ga) {
                for (var a = 1 - ((new Date).getTime() - na) / Ja, a = h.min(1, a), a = h.max(0, a), b = ea.length - 1; 0 <= b; b--) ea[b].setOpacity(a);
                0 < a && v()
            }
        }
        function T() {
            ga = k;
            for (var a = ea.length - 1; 0 <= a; a--) ea[a].setOpacity(1)
        }
        function A() {
            b.autoHideControls && (ga = m, na = (new Date).getTime() + Da, c.setTimeout(v, Da))
        }
        function F() {
            Ta = m;
            T()
        }
        function z(a, b, c) {
            c || (Ta = k, !ta && A())
        }
        function U(a) {
            a = i.getEvent(a);
            27 === a.keyCode && B.setFullPage(k)
        }
        var B =
            this,
            H = i.getElement(a),
            a = i.makeNeutralElement("div"),
            E = i.makeNeutralElement("div"),
            P = i.makeNeutralElement("div"),
            V = i.makeNeutralElement("div"),
            ba = i.makeNeutralElement("div"),
            ia = i.makeNeutralElement("div"),
            J = p,
            ka = p,
            C = p,
            W = p,
            ha = new gb,
            Q = new Ca(E),
            da = new Ca(a),
            ea = [],
            ga = m,
            na = p,
            oa = p,
            Da = 1E3,
            Ja = 2E3,
            na = p,
            ga = k,
            Ha = e.body.style.width,
            I = e.body.style.height,
            La = e.body.style.overflow,
            Ma = e.documentElement.style.overflow,
            Fa = new j(1, 1),
            qa = p,
            Ra = 0,
            Na = 0,
            Oa = p,
            za = p,
            ta = k,
            Sa = k,
            Ta = k;
        this.container = H;
        this.elmt = a;
        this.profiler =
            this.viewport = this.drawer = this.source = p;
        this.tracker = Q;
        this.isOpen = function () {
            return !!J
        };
        this.openDzi = function (a, b) {
            var c = n(),
                c = i.createCallback(p, d, c);
            switch (typeof a) {
            case "string":
                pa.createFromXml(a, b, c);
                break;
            default:
                pa.createFromJson(a, c)
            }
        };
        this.openTileSource = function (a) {
            var b = n();
            c.setTimeout(function () {
                d(b, a)
            }, 1)
        };
        this.close = function () {
            J && u()
        };
        this.addControl = function (b, c) {
            b = i.getElement(b);
            if (!(0 <= y(b))) {
                var d = p;
                switch (c) {
                case va.TOP_RIGHT:
                    d = V;
                    b.style.position = "relative";
                    break;
                case va.BOTTOM_RIGHT:
                    d =
                        ba;
                    b.style.position = "relative";
                    break;
                case va.BOTTOM_LEFT:
                    d = ia;
                    b.style.position = "relative";
                    break;
                case va.TOP_LEFT:
                    d = P;
                    b.style.position = "relative";
                    break;
                default:
                    d = a, b.style.position = "absolute"
                }
                ea.push(new Ka(b, c, d))
            }
        };
        this.removeControl = function (a) {
            a = i.getElement(a);
            a = y(a);
            0 <= a && (ea[a].destroy(), ea.splice(a, 1))
        };
        this.clearControls = function () {
            for (; 0 < ea.length;) ea.pop().destroy()
        };
        this.getNavControl = function () {
            return oa
        };
        this.isDashboardEnabled = function () {
            for (var a = ea.length - 1; 0 <= a; a--) if (ea[a].isVisible()) return m;
            return k
        };
        this.isFullPage = function () {
            return a.parentNode == e.body
        };
        this.isMouseNavEnabled = function () {
            return Q.isTracking()
        };
        this.isVisible = function () {
            return a.style.visibility != S
        };
        this.setDashboardEnabled = function (a) {
            for (var b = ea.length - 1; 0 <= b; b--) ea[b].setVisible(a)
        };
        this.setFullPage = function (b) {
            if (b != B.isFullPage()) {
                var c = e.body,
                    d = c.style,
                    g = e.documentElement.style,
                    k = a.style,
                    l = E.style;
                b ? (La = d.overflow, Ma = g.overflow, d.overflow = S, g.overflow = S, Ha = d.width, I = d.height, d.width = "100%", d.height = "100%", l.backgroundColor =
                    "black", l.color = "white", k.position = "fixed", k.zIndex = "99999999", c.appendChild(a), qa = i.getWindowSize(), i.addEvent(e, "keydown", U), F()) : (d.overflow = La, g.overflow = Ma, d.width = Ha, d.height = I, l.backgroundColor = w, l.color = w, k.position = "relative", k.zIndex = w, H.appendChild(a), qa = i.getElementSize(H), i.removeEvent(e, "keydown", U), z());
                C && (c = C.getBounds(), C.resize(qa), d = C.getBounds(), b ? Fa = new j(d.width / c.width, d.height / c.height) : (C.update(), C.zoomBy(h.max(Fa.x, Fa.y), p, m)), Sa = m, ha.trigger("resize", B), t())
            }
        };
        this.setMouseNavEnabled = function (a) {
            Q.setTracking(a)
        };
        this.setVisible = function (b) {
            a.style.visibility = b ? w : S
        };
        this.showMessage = function (a, b) {
            b ? c.setTimeout(function () {
                !B.isOpen() && l(a)
            }, b) : l(a)
        };
        this.addEventListener = function (a, b) {
            ha.addListener(a, b)
        };
        this.removeEventListener = function (a, b) {
            ha.removeListener(a, b)
        };
        var N = E.style,
            ca = a.style,
            X = P.style,
            Ea = V.style,
            Ga = ba.style,
            ya = ia.style;
        ca.width = "100%";
        ca.height = "100%";
        ca.position = "relative";
        ca.left = "0px";
        ca.top = "0px";
        ca.textAlign = "left";
        N.width = "100%";
        N.height = "100%";
        N.overflow =
            S;
        N.position = "absolute";
        N.top = "0px";
        N.left = "0px";
        X.position = Ea.position = Ga.position = ya.position = "absolute";
        X.top = Ea.top = "0px";
        X.left = ya.left = "0px";
        Ea.right = Ga.right = "0px";
        ya.bottom = Ga.bottom = "0px";
        Q.clickHandler = function (a, c, d, e) {
            C && d && (a = b.zoomPerClick, C.zoomBy(e ? 1 / a : a, C.pointFromPixel(c, m)), C.applyConstraints())
        };
        Q.pressHandler = function (a, b) {
            C && (Oa = b, za = C.getCenter())
        };
        Q.dragHandler = function (a, c, d) {
            C && (b.constrainDuringPan ? (a = c.minus(Oa), a = C.deltaPointsFromPixels(a.negate(), m), C.panTo(za.plus(a)),
                C.applyConstraints()) : C.panBy(C.deltaPointsFromPixels(d.negate(), m)))
        };
        Q.releaseHandler = function (a, b, c) {
            c && C && C.applyConstraints()
        };
        Q.scrollHandler = function (a, c, d) {
            C && (a = h.pow(b.zoomPerScroll, d), C.zoomBy(a, C.pointFromPixel(c, m)), C.applyConstraints())
        };
        Q.setTracking(m);
        var R = B,
            N = function () {
                Y = (new Date).getTime();
                ua = b.zoomPerSecond;
                ma = m;
                c.setTimeout(Ia, K)
            }, ca = function () {
                Y = (new Date).getTime();
                ua = 1 / b.zoomPerSecond;
                ma = m;
                c.setTimeout(Ia, K)
            }, X = function () {
                ma = k
            }, Ia = function () {
                if (ma && R.viewport) {
                    var a = (new Date).getTime(),
                        b = h.pow(ua, (a - Y) / 1E3);
                    R.viewport.zoomBy(b);
                    R.viewport.applyConstraints();
                    Y = a;
                    c.setTimeout(Ia, K)
                }
            }, la = p,
            ma = k,
            ua = p,
            Y = p,
            N = new sa(g.getString("Tooltips.ZoomIn"), b.imagePath + "zoomin_rest.png", b.imagePath + "zoomin_grouphover.png", b.imagePath + "zoomin_hover.png", b.imagePath + "zoomin_pressed.png", N, X, function () {
                R.viewport && (ma = k, R.viewport.zoomBy(b.zoomPerClick / 1), R.viewport.applyConstraints())
            }, N, X),
            ca = new sa(g.getString("Tooltips.ZoomOut"), b.imagePath + "zoomout_rest.png", b.imagePath + "zoomout_grouphover.png",
                b.imagePath + "zoomout_hover.png", b.imagePath + "zoomout_pressed.png", ca, X, function () {
                R.viewport && (ma = k, R.viewport.zoomBy(1 / b.zoomPerClick), R.viewport.applyConstraints())
            }, ca, X),
            X = new sa(g.getString("Tooltips.Home"), b.imagePath + "home_rest.png", b.imagePath + "home_grouphover.png", b.imagePath + "home_hover.png", b.imagePath + "home_pressed.png", p, function () {
                R.viewport && R.viewport.goHome()
            }, p, p, p),
            Ea = new sa(g.getString("Tooltips.FullPage"), b.imagePath + "fullpage_rest.png", b.imagePath + "fullpage_grouphover.png", b.imagePath +
                "fullpage_hover.png", b.imagePath + "fullpage_pressed.png", p, function () {
                R.setFullPage(!R.isFullPage());
                la.emulateExit();
                R.viewport && R.viewport.applyConstraints()
            }, p, p, p),
            la = new Ya([N, ca, X, Ea]);
        la.elmt["----seadragon----"] = m;
        R.addEventListener("open", function () {
            la.emulateEnter();
            la.emulateExit()
        });
        oa = la.elmt;
        oa.style.marginRight = "4px";
        oa.style.marginBottom = "4px";
        B.addControl(oa, va.BOTTOM_RIGHT);
        da.enterHandler = F;
        da.exitHandler = z;
        da.releaseHandler = function (a, b, c, d) {
            d || (Ta = k, !ta && A())
        };
        da.setTracking(m);
        c.setTimeout(A, 1);
        a.appendChild(E);
        a.appendChild(P);
        a.appendChild(V);
        a.appendChild(ba);
        a.appendChild(ia);
        H.innerHTML = w;
        H.appendChild(a)
    }
})(window, document, Math);
var org;
if (org) {
    if ("object" != typeof org) {
        var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
        alert(orgExistsMessage);
        throw Error(orgExistsMessage);
    }
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) {
        var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
        alert(orgGigapanExistsMessage);
        throw Error(orgGigapanExistsMessage);
    }
} else org.gigapan = {};
if (org.gigapan.utils) {
    if ("object" != typeof org.gigapan.utils) {
        var orgGigapanUtilsExistsMessage = "Error: failed to create org.gigapan.utils namespace: org.gigapan.utils already exists and is not an object";
        alert(orgGigapanUtilsExistsMessage);
        throw Error(orgGigapanUtilsExistsMessage);
    }
} else org.gigapan.utils = {};
org.gigapan.utils.GigapanTiles = function () {
    return {
        getTileServerDomainName: function (c) {
            c = Math.floor(c / 1E3);
            return "tile" + (10 > c ? "0" : "") + c + ".gigapan.org"
        },
        getTilesPath: function (c, e) {
            return org.gigapan.utils.GigapanTiles.getTileServerDomainName(c) + ("/gigapans0/" + c + "/tiles" + (null == e ? "" : "." + e) + "/")
        }
    }
}();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.seadragon) {
    if ("object" != typeof org.gigapan.seadragon) {
        var orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object";
        alert(orgGigapanSeadragonExistsMessage);
        throw Error(orgGigapanSeadragonExistsMessage);
    }
} else org.gigapan.seadragon = {};
if (!window.Seadragon) {
    var noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.GigapanTileSource.js";
    alert(noSeadragonMsg);
    throw Error(noSeadragonMsg);
}
(function () {
    org.gigapan.seadragon.GigapanTileSource = function (c, e, h, a, r) {
        Seadragon.TileSource.call(this, a, r, 256, 0, 8);
        var t = "http://" + c + "/gigapans0/" + e + "/tiles",
            y = ["0", "1", "2", "3"];
        null != h && 0 < h.length && (t += "." + h);
        this.getTileUrl = function (a, c, e) {
            8 > a ? a = 0 : 8 <= a && (a -= 8);
            for (var h = "r", a = 1 << a >> 1; a;) h += y[(c & a ? 1 : 0) + (e & a ? 2 : 0)], a >>= 1;
            c = t;
            for (e = 0; e < h.length - 3;) c += "/" + h.substr(e, 3), e += 3;
            return c + "/" + h + ".jpg"
        };
        this.getTileBounds = function (a, c, e) {
            a = 1 / this.dimensions.times(this.getLevelScale(a)).x;
            return new Seadragon.Rect((0 ===
                c ? 0 : this.tileSize * c - this.tileOverlap) * a, (0 === e ? 0 : this.tileSize * e - this.tileOverlap) * a, (this.tileSize + (0 === c ? 1 : 2) * this.tileOverlap) * a, (this.tileSize + (0 === e ? 1 : 2) * this.tileOverlap) * a)
        };
        org.gigapan.seadragon.GigapanTileSource.prototype = new Seadragon.TileSource;
        org.gigapan.seadragon.GigapanTileSource.prototype.constructor = org.gigapan.seadragon.GigapanTileSource
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewers) {
    if ("object" != typeof org.gigapan.viewers) {
        var orgGigapanViewersExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
        alert(orgGigapanViewersExistsMessage);
        throw Error(orgGigapanViewersExistsMessage);
    }
} else org.gigapan.viewers = {}; if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
if (!org.gigapan.utils.GigapanTiles) {
    var noGigapanTilesMsg = "The org.gigapan.urils.GigapanTiles library is required by org.gigapan.viewers.AS3Viewer.js";
    alert(noGigapanTilesMsg);
    throw Error(noGigapanTilesMsg);
}
(function () {
    org.gigapan.viewers.SeadragonViewer = function (c, e, h) {
        function a() {
            q = (new Date).getTime();
            g = Seadragon.Config.zoomPerSecond;
            b = !0;
            window.setTimeout(O, 10)
        }

        function r() {
            q = (new Date).getTime();
            g = 1 / Seadragon.Config.zoomPerSecond;
            b = !0;
            window.setTimeout(O, 10)
        }
        function t() {
            b = !1
        }

        function y() {
            if (!s.sliding) {
                var a, b = n.viewport.getMaxZoom();
                n.viewport.getHomeZoom();
                a = n.viewport.getMinZoom();
                var c = n.viewport.getZoom();
                n.viewport.getZoom(!0);
                n.viewport.getBounds().getSize();
                n.viewport.getContainerSize();
                a = (Math.log(c) - Math.log(a)) / (Math.log(b) - Math.log(a));
                var c = document.getElementById("slider-track"),
                    b = document.getElementById("slider-handle"),
                    e = c.offsetTop;
                a = e + Math.ceil((1 - a) * (e + c.clientHeight - b.clientHeight - e));
                b.style.top = a + "px"
            }
        }

        function O() {
            if (b && n.viewport) {
                var a = (new Date).getTime(),
                    c = Math.pow(g, (a - q) / 1E3);
                n.viewport.zoomBy(c);
                n.viewport.applyConstraints();
                q = a;
                window.setTimeout(O, 10)
            }
        }

        function K() {
            n.viewport && (b = !1, n.viewport.zoomBy(Seadragon.Config.zoomPerClick / 1), n.viewport.applyConstraints())
        }

        function S() {
            n.viewport && (b = !1, n.viewport.zoomBy(1 / Seadragon.Config.zoomPerClick), n.viewport.applyConstraints())
        }
        var n = null,
            A = !1,
            x = new org.gigapan.multitouch.TouchManager,
            w = org.gigapan.seadragon.SeadragonUtils,
            p = null,
            c = -1 != navigator.userAgent.indexOf("iPhone") || -1 != navigator.userAgent.indexOf("iPod") || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android"),
            m = !0;
        "undefined" != typeof e.navigation && "undefined" != typeof e.navigation.hideControls && (m = e.navigation.hideControls ? !1 : !0);
        var P = c && !0,
            k = !c && !0,
            l = {}, b = !1,
            g = null,
            q = null,
            s = {
                sliding: !1,
                track: void 0,
                handle: void 0,
                zoomSliderMax: void 0,
                zoomSliderMin: void 0,
                initialMouseY: void 0,
                startY: void 0,
                init: function (a, b) {
                    s.track = document.getElementById(a);
                    s.handle = document.getElementById(b);
                    s.zoomSliderMax = s.track.offsetTop;
                    s.zoomSliderMin = s.track.offsetTop + s.track.clientHeight - s.handle.clientHeight
                },
                startSliderZoom: function (a) {
                    s.initialMouseY = a.clientY;
                    s.startY = s.handle.offsetTop;
                    s.sliding = !0;
                    l.GigapanNavigationControl.addEventListener("slider-handle-mousemove",
                        s.doSliderZoom);
                    l.GigapanNavigationControl.addEventListener("slider-handle-mouseup", s.endSliderZooming);
                    return !1
                },
                endSliderZooming: function () {
                    s.sliding = !1;
                    l.GigapanNavigationControl.removeEventListener("slider-handle-mousemove", s.doSliderZoom);
                    l.GigapanNavigationControl.removeEventListener("slider-handle-mouseup", s.endSliderZooming)
                },
                doSliderZoom: function (a) {
                    s.sliding && s.setSliderPosition(a.clientY - s.initialMouseY);
                    return !1
                },
                setSliderPosition: function (a) {
                    a = s.startY + a;
                    a = Math.max(a, s.zoomSliderMax);
                    a = Math.min(a, s.zoomSliderMin);
                    s.handle.style.top = a + "px";
                    a = (a - s.zoomSliderMin) / (s.zoomSliderMax - s.zoomSliderMin) * (Math.log(n.viewport.getMaxZoom()) - Math.log(n.viewport.getMinZoom()));
                    a = Math.exp(a + Math.log(n.viewport.getMinZoom()));
                    n.viewport.zoomTo(a)
                }
            };
        this.setViewBounds = function (a, b, c, g, h) {
            b = org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(b, c, g, h, e.width);
            n.viewport.fitBounds(b);
            if ("undefined" != typeof window[a]) return window[a]()
        };
        this.showNavigationControls = function () {
            n.addControl(l.GigapanNavigationControl.getElement(),
                l.GigapanNavigationControl.getSeadragonControlAnchor())
        };
        this.hideNavigationControls = function () {
            n.removeControl(l.GigapanNavigationControl.getElement())
        };
        this.isOpen = function () {
            return n.isOpen();
        };
        this.showSnapInclusion = function (a, b, c, g, h) {
            var i = document.createElement("div"),
                b = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(b, c, g, h, e.width);
            i.id = "overlay_" + a;
            i.className = "overlay";
            n.drawer.addOverlay(i, b)
        };
        this.hideSnapInclusion = function (a) {
            a = document.getElementById("overlay_" + a);
            n.drawer.removeOverlay(a)
        };
        this.getViewBounds = function (a) {
            var b = n.viewport.getBounds(),
                b = new org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(b.x, b.y, b.x + b.width, b.y + b.height, e.width);
            return window[a](b.xmin, b.ymin, b.xmax, b.ymax)
        };
        this.getActualCoords = function (x, y) {
            var a = new Seadragon.Point(x, y);
            var b = new org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonViewerCoords(a, n);
            var c = new org.gigapan.seadragon.SeadragonUtils.convertSeadragonPointToGigapanPoint(b, e.width);
        };
        x.addEventListener("tap", function (a) {
            if (n.isOpen() && n.viewport) {
                var b = Seadragon.Utils.getElementPosition(n.elmt),
                    a = a.minus(b);
                w.convertPageCoordsToSeadragonCoords(a, n)
            }
        });
        x.addEventListener("pan", function (a) {
            n.isOpen() && n.viewport && (a = n.viewport.deltaPointsFromPixels(a), n.viewport.panBy(a))
        });
        x.addEventListener("pinch", function (a, b, c, e) {
            n.isOpen() && n.viewport && (b = w.convertPageCoordsToSeadragonCoords(e, n), n.viewport.zoomBy(a, b))
        });
        "undefined" != typeof e.viewport && (p = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(e.viewport.xmin,
            e.viewport.ymin, e.viewport.xmax, e.viewport.ymax, e.width));
        c = org.gigapan.utils.GigapanTiles.getTileServerDomainName(e.id);
        c = new org.gigapan.seadragon.GigapanTileSource(c, e.id, e.auth_key, e.width, e.height);
        Seadragon.Config.visibilityRatio = 0.5;
        Seadragon.Config.minZoomImageRatio = 0.5;
        Seadragon.Config.autoHideControls = !1;
        Seadragon.Config.imagePath = "gigapan.large/images/controls/";		// <jps>	was:  "/images/controls/";
        n = new Seadragon.Viewer("gigapan-viewer");
        n.addEventListener("open", function () {
            var b = n.drawer.elmt;
            if (!A && (A = !0, -1 != navigator.userAgent.indexOf("Chrome") && -1 != navigator.userAgent.indexOf("Android") ? (Seadragon.Utils.addEvent(b, "touchstart", x.onTouchStartChrome), Seadragon.Utils.addEvent(b, "touchmove", x.onTouchMoveChrome), Seadragon.Utils.addEvent(b, "touchend", x.onTouchEnd), Seadragon.Utils.addEvent(b, "touchcancel", x.onTouchEnd)) : (Seadragon.Utils.addEvent(b, "MozTouchDown", x.onTouchStartMozilla), Seadragon.Utils.addEvent(b, "MozTouchMove", x.onTouchMoveMozilla), Seadragon.Utils.addEvent(b, "MozTouchUp", x.onTouchEndMozilla), Seadragon.Utils.addEvent(b, "touchstart",
                x.onTouchStart), Seadragon.Utils.addEvent(b, "touchmove", x.onTouchMove), Seadragon.Utils.addEvent(b, "touchend", x.onTouchEnd), Seadragon.Utils.addEvent(b, "touchcancel", x.onTouchCancel), Seadragon.Utils.addEvent(b, "gesturestart", x.onGestureStart), Seadragon.Utils.addEvent(b, "gesturechange", x.onGestureChange), Seadragon.Utils.addEvent(b, "gestureend", x.onGestureEnd)), null != p && n.viewport.fitBounds(p, !0), m && (P && (
                l.GigapanMobileNavigationControl.addEventListener("zoom-plus-click", K),
                l.GigapanMobileNavigationControl.addEventListener("zoom-plus-mousedown", a),
                l.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseup", t),
                l.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseout", t),
                l.GigapanMobileNavigationControl.addEventListener("zoom-minus-click", S),
                l.GigapanMobileNavigationControl.addEventListener("zoom-minus-mousedown", r),
                l.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseup", t),
                l.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseout", t),
            	//l.GigapanMobileNavigationControl.addEventListener("buy-print-click",function(){window.open("/prints/new?gigapan_id="+SDViewer.gigapan.id)}),
            l.GigapanMobileNavigationControl.addEventListener("full-screen-click", function () {
                n.isFullPage() ? n.setFullPage(!1) : n.setFullPage(!0)
            })),
                k && (l.GigapanNavigationControl.addEventListener("zoom-plus-click", K),
                l.GigapanNavigationControl.addEventListener("zoom-plus-mousedown", a),
                l.GigapanNavigationControl.addEventListener("zoom-plus-mouseup", t),
                l.GigapanNavigationControl.addEventListener("zoom-plus-mouseout", t),
                l.GigapanNavigationControl.addEventListener("zoom-minus-click", S),
                l.GigapanNavigationControl.addEventListener("zoom-minus-mousedown", r),
                l.GigapanNavigationControl.addEventListener("zoom-minus-mouseup", t),
                l.GigapanNavigationControl.addEventListener("zoom-minus-mouseout", t),
                l.GigapanNavigationControl.addEventListener("slider-handle-mousedown", s.startSliderZoom),
                l.GigapanNavigationControl.addEventListener("view-all-click", function () {
                n.viewport.goHome()
            }),
                l.GigapanNavigationControl.addEventListener("full-screen-click", function () {
                n.isFullPage() ? n.setFullPage(!1) : n.setFullPage(!0)
            }),
                y(), s.init("slider-track", "slider-handle"))), "undefined" != window[h])) return window[h]()
        });
        n.setDashboardEnabled(!1);
        n.openTileSource(c);
        "undefined" != typeof e.events && "undefined" != typeof e.events.animation && n.addEventListener("animation", e.events.animation);
        n.addEventListener("animation",
            y);
        m && (k && (l.GigapanNavigationControl = new org.gigapan.viewer.GigapanNavigationControl), P && (l.GigapanMobileNavigationControl = new org.gigapan.viewer.GigapanMobileNavigationControl)); /*l.GigapanWatermarkControl=new org.gigapan.viewer.GigapanWatermarkControl;*/
        for (key in l) n.addControl(l[key].getElement(), l[key].getSeadragonControlAnchor());
        for (key in l) l[key].initialize()
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.seadragon) {
    if ("object" != typeof org.gigapan.seadragon) throw orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object", alert(orgGigapanSeadragonExistsMessage), Error(orgGigapanSeadragonExistsMessage);
} else org.gigapan.seadragon = {}; if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
(function () {
    org.gigapan.seadragon.SeadragonUtils = function () {};
    org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect = function (c, e, h, a, r) {
        c /= r;
        e /= r;
        return new Seadragon.Rect(c, e, h / r - c, a / r - e)
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect = function (c, e, h, a, r) {
        return {
            xmin: c * r,
            ymin: e * r,
            xmax: h * r,
            ymax: a * r
        }
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonPointToGigapanPoint = function (c, e) {
        return new Seadragon.Point(c.x * e, c.y * e)
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonViewerCoordsToSeadragonCoords = function (c, e) {
        return e.viewport.pointFromPixel(c)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonViewerCoords = function (c, e) {
        var h = Seadragon.Utils.getElementPosition(e.elmt);
        return c.minus(h)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonCoords = function (c, e) {
        var h = this.convertPageCoordsToSeadragonViewerCoords(c, e);
        return this.convertSeadragonViewerCoordsToSeadragonCoords(h, e)
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.events) {
    if ("object" != typeof org.gigapan.events) {
        var orgGigapanEventsExistsMessage = "Error: failed to create org.gigapan.events namespace: org.gigapan.events already exists and is not an object";
        alert(orgGigapanEventsExistsMessage);
        throw Error(orgGigapanEventsExistsMessage);
    }
} else org.gigapan.events = {};
(function () {
    org.gigapan.events.EventManager = function () {
        var c = {};
        this.addEventListener = function (e, h) {
            e && (h && "function" == typeof h) && (c[e] || (c[e] = []), c[e].push(h))
        };
        this.removeEventListener = function (e, h) {
            if (e && c[e] && h && "function" == typeof h) for (var a = 0; a < c[e].length; a++) if (h == c[e][a]) {
                        c[e].splice(a, 1);
                        break
                    }
        };
        this.publishEvent = function (e, h) {
            if (e) {
                var a = c[e];
                if (a) for (var r = 0; r < a.length; r++) try {
                            if ("function" === typeof h) h(a[r]);
                            else if ("undefined" === typeof h) a[r]();
                            else console.log("EVENTS_MANAGER.publishEvent(): unexpected argument [" +
                                    h + "]")
                } catch (t) {
                    console.log(t.name + " while publishing event '" + e + "': " + t.message, t)
                }
            }
        }
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.multitouch) {
    if ("object" != typeof org.gigapan.multitouch) {
        var orgGigapanMultitouchExistsMessage = "Error: failed to create org.gigapan.multitouch namespace: org.gigapan.multitouch already exists and is not an object";
        alert(orgGigapanMultitouchExistsMessage);
        throw Error(orgGigapanMultitouchExistsMessage);
    }
} else org.gigapan.multitouch = {};
if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.multitouch.Touch.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
(function () {
    org.gigapan.multitouch.Touch = function (c) {
        var e = (new Date).getTime(),
            h = c.identifier,
            a = new Seadragon.Point(c.pageX, c.pageY),
            r = new Seadragon.Point(c.pageX, c.pageY),
            t = !0;
        this.update = function (c) {
            a.x = r.x;
            a.y = r.y;
            r.x = c.pageX;
            r.y = c.pageY
        };
        this.getIdentifier = function () {
            return h
        };
        this.getCurrentPoint = function () {
            return r
        };
        this.getPreviousPoint = function () {
            return a
        };
        this.getDeltaFromPrevious = function () {
            return a.minus(r)
        };
        this.getStartingTimestamp = function () {
            return e
        };
        this.flagThisTouchAsNotBeingTheOnlyOne = function () {
            t = !1
        };
        this.isThisTheOnlyTouch = function () {
            return t
        }
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.multitouch) {
    if ("object" != typeof org.gigapan.multitouch) throw orgGigapanMultitouchExistsMessage = "Error: failed to create org.gigapan.multitouch namespace: org.gigapan.multitouch already exists and is not an object", alert(orgGigapanMultitouchExistsMessage), Error(orgGigapanMultitouchExistsMessage);
} else org.gigapan.multitouch = {};
if (!org.gigapan.multitouch.Touch) {
    var noTouchMsg = "The org.gigapan.multitouch.Touch library is required by org.gigapan.multitouch.TouchManager.js";
    alert(noTouchMsg);
    throw Error(noTouchMsg);
}
if (!org.gigapan.events.EventManager) {
    var noEventManagerMsg = "The org.gigapan.events.EventManager library is required by org.gigapan.multitouch.TouchManager.js";
    alert(noEventManagerMsg);
    throw Error(noEventManagerMsg);
}
(function () {
    org.gigapan.multitouch.TouchManager = function () {
        var c = new org.gigapan.events.EventManager,
            e = 0,
            h = [],
            a = [],
            r = 1,
            t = null,
            y = !1,
            O = function (a) {
                var c = a.getIdentifier();
                h["t" + c] = a;
                e++;
                if (1 < e) for (var k in h)(a = h[k]) && a.flagThisTouchAsNotBeingTheOnlyOne();
                y = !y && 1 == e
            }, K = function (b) {
                if (b) {
                    console.log("registerTouch(" + b.identifier + ")");
                    var c = h["t" + b.identifier];
                    if (c) c.update(b);
                    else {
                        var e = "t" + b.identifier;
                        (c = a[e]) ? (delete a[e], O(c), y = !1) : O(new org.gigapan.multitouch.Touch(b))
                    }
                }
            }, S = function (a) {
                y = !1;
                if (a) {
                    var c =
                        h["t" + a.identifier];
                    c ? c.update(a) : O(new org.gigapan.multitouch.Touch(a))
                }
            }, n = function (b, g) {
                if (b) {
                    var k = h["t" + b.identifier];
                    if (k) {
                        var l = "t" + b.identifier;
                        g && (a[l] = h[l]);
                        delete h[l];
                        e--;
                        console.log("unregisterTouch(" + k.getIdentifier() + "): size=[" + e + "]");
                        if (0 == e && y && k.isThisTheOnlyTouch()) {
                            var j = (new Date).getTime() - k.getStartingTimestamp(),
                                k = k.getCurrentPoint(),
                                m = new Seadragon.Point(k.x, k.y);
                            c.publishEvent("tap", function (a) {
                                a(m, j)
                            })
                        }
                    }
                }
                y = !1
            }, A = function () {
                var a = [],
                    c;
                for (c in h) a[a.length] = h[c];
                return a
            },
            x = function (a) {
                if (a) {
                    console.log("_onTouchStart(" + a + ")");
                    a.preventDefault();
                    for (var a = a.changedTouches, c = 0; c < a.length; c++) K(a.item(c))
                }
            };
        this.onTouchStart = x;
        this.onTouchStartMozilla = function (a) {
            a && (P(a), a.preventDefault(), K(a), w())
        };
        this.onTouchStartChrome = function (a) {
            a && (x(a), console.log("onTouchStartChrome(" + a + ") size=" + e), w())
        };
        var w = function () {
            if (2 == e) {
                r = 1;
                t = null;
                var a = A();
                if (a[0] && a[1]) {
                    var c = a[0].getCurrentPoint().distanceTo(a[1].getCurrentPoint());
                    a[0].distance = c;
                    a[1].distance = c;
                    a[0].scale =
                        1;
                    a[1].scale = 1
                }
            }
        };
        this.onTouchMove = function (a) {
            if (a) {
                a.preventDefault();
                y = !1;
                for (var a = a.changedTouches, c = 0; c < a.length; c++) S(a.item(c));
                1 == e && p(a.item(0).identifier)
            }
        };
        this.onTouchMoveMozilla = function (a) {
            if (a) {
                P(a);
                var c = h["t" + a.identifier];
                if ("undefined" !== typeof c && null != c && (c.getCurrentPoint().x != a.pageX || c.getCurrentPoint().y != a.pageY)) a.preventDefault(), y = !1, a.pageX = a.layerX, a.pageY = a.layerY, a.identifier = a.streamId, S(a), 1 == e ? p(a.identifier) : 2 == e && m()
            }
        };
        this.onTouchMoveChrome = function (a) {
            if (a) {
                a.preventDefault();
                y = !1;
                for (var a = a.changedTouches, c = 0; c < a.length; c++) S(a.item(c));
                1 == e ? p(a.item(0).identifier) : 2 == e ? m() : console.log("!!!!!!!!!!!!!!!onTouchMoveChrome(): size = " + e)
            }
        };
        var p = function (a) {
            if (1 == e && (a = h["t" + a])) {
                var g = a.getDeltaFromPrevious();
                c.publishEvent("pan", function (a) {
                    a(g)
                })
            }
        }, m = function () {
                if (2 == e) {
                    var a = A();
                    if (a[0] && a[1]) {
                        var c = a[0].distance,
                            h = a[0].getCurrentPoint().distanceTo(a[1].getCurrentPoint());
                        console.log("prev [" + c + "] new [" + h + "]");
                        c = h / c;
                        a[0].scale = c;
                        a[1].scale = c;
                        l(c)
                    } else console.log("AAAHHHH!!! theTouches.length=[" +
                            a.length + "]")
                }
            }, P = function (a) {
                a && (a.pageX = a.layerX, a.pageY = a.layerY, a.identifier = a.streamId)
            }, k = function (a) {
                if (a) {
                    var a = a.changedTouches,
                        c = 1 < a.length;
                    c && (y = !1);
                    for (var e = 0; e < a.length; e++) n(a.item(e), c)
                }
            };
        this.onTouchEndMozilla = function (a) {
            a && (P(a), n(a, !1))
        };
        this.onTouchEnd = function (a) {
            k(a)
        };
        this.onTouchCancel = function (a) {
            k(a)
        };
        this.onGestureStart = function (a) {
            a && (y = !1, a.preventDefault(), 2 == e && (r = 1, t = null))
        };
        this.onGestureChange = function (a) {
            a && (y = !1, a.preventDefault(), l(a.scale))
        };
        var l = function (a) {
            if (2 ==
                e) {
                var g = A();
                if (g[0] && g[1]) {
                    var h = Math.max(0.8, Math.min(1.2, 1 + a - r));
                    null == t && (t = g[0].getCurrentPoint().plus(g[1].getCurrentPoint()).divide(2));
                    c.publishEvent("pinch", function (a) {
                        a(h, g[0], g[1], t)
                    })
                }
                r = a
            }
        };
        this.onGestureEnd = function (a) {
            a && (y = !1, 2 == e && (r = 1, t = null))
        };
        this.addEventListener = c.addEventListener;
        this.removeEventListener = c.removeEventListener;
        this.publishEvent = c.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.GigapanNavigationControl = function () {
        var c = new org.gigapan.events.EventManager,
            e = Seadragon.ControlAnchor.NONE,
            h = document.createElement("div");
        h.id = "gigapan-navigation";
        this.getSeadragonControlAnchor = function () {
            return e
        };
        this.getElement = function () {
            return h
        };
        this.initialize = function () {
            h.innerHTML = '<div class="motion-circle"></div><div id="zoom-plus-button" class="zoom-plus-button"></div><div id="zoom-minus-button" class="zoom-minus-button"></div><div id="slider-track" class="slider-track"></div><div id="slider-handle" class="slider-handle"></div><div id="view-all-button" class="view-all-button"></div><div id="full-screen-button" class="full-screen-button"></div>';
            document.getElementById("zoom-plus-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-click")
            };
            document.getElementById("zoom-plus-button").onmousedown = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mousedown")
            };
            document.getElementById("zoom-plus-button").onmouseout = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mouseout")
            };
            document.getElementById("zoom-plus-button").onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mouseup")
            };
            document.getElementById("zoom-minus-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-click")
            };
            document.getElementById("zoom-minus-button").onmousedown = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mousedown")
            };
            document.getElementById("zoom-minus-button").onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ?
                    (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mouseup")
            };
            document.getElementById("zoom-minus-button").onmouseout = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mouseout")
            };
            document.getElementById("slider-handle").onmousedown = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) :
                    (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("slider-handle-mousedown", function (c) {
                    c(a)
                })
            };
            document.onmousemove = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("slider-handle-mousemove", function (c) {
                    c(a)
                })
            };
            document.onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("slider-handle-mouseup", function (c) {
                    c(a)
                })
            };
            document.getElementById("view-all-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("view-all-click", function (c) {
                    c(a)
                })
            };
            document.getElementById("full-screen-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("full-screen-click", function (c) {
                    c(a)
                })
            }
        };
        this.addEventListener = c.addEventListener;
        this.removeEventListener = c.removeEventListener;
        this.publishEvent = c.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.GigapanMobileNavigationControl = function () {
        var c = new org.gigapan.events.EventManager,
            e = Seadragon.ControlAnchor.BOTTOM_LEFT,
            h = document.createElement("div");
        h.id = "gigapan-mobile-navigation";
        this.getSeadragonControlAnchor = function () {
            return e
        };
        this.getElement = function () {
            return h
        };
        this.initialize = function () {
            h.innerHTML = '<div id="mobile-zoom-plus-button" class="mobile-zoom-plus-button"></div><div id="mobile-zoom-minus-button" class="mobile-zoom-minus-button"></div><div id="mobile-full-screen-button" class="mobile-full-screen-button"></div><div id="mobile-buy-print-button" class="mobile-buy-print-button"></div>';
            document.getElementById("mobile-zoom-plus-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-click")
            };
            document.getElementById("mobile-zoom-plus-button").onmousedown = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mousedown")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseout = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mouseout")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-plus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-click")
            };
            document.getElementById("mobile-zoom-minus-button").onmousedown = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mousedown")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseout = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("zoom-minus-mouseout")
            }
            document.getElementById("mobile-full-screen-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("full-screen-click")
            };
            document.getElementById("mobile-buy-print-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                c.publishEvent("buy-print-click")
            };
        };
        this.addEventListener = c.addEventListener;
        this.removeEventListener = c.removeEventListener;
        this.publishEvent = c.publishEvent
    }
})();