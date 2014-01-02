(function (b, a, d, q) {
    var k, v, p, x, f = 10,
        P = "hidden",
        s = " while executing ",
        A = "function",
        E = "none",
        z = "",
        h = null,
        m = !0,
        J = 0.5,
        n = !1;
    b.Seadragon || (b.Seadragon = {});
    var C = b.Seadragon,
        e = C.Config;
    e || (e = C.Config = {
        debugMode: n,
        animationTime: 1.5,
        blendTime: J,
        alwaysBlend: n,
        autoHideControls: m,
        constrainDuringPan: m,
        immediateRender: n,
        logarithmicZoom: m,
        wrapHorizontal: n,
        wrapVertical: n,
        wrapOverlays: n,
        transformOverlays: n,
        minZoomDimension: h,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
        visibilityRatio: 0.8,
        springStiffness: 5,
        imageLoaderLimit: 2,
        clickTimeThreshold: 200,
        clickDistThreshold: 5,
        zoomPerClick: 2,
        zoomPerScroll: d.pow(2, 1 / 3),
        zoomPerSecond: 2,
        proxyUrl: h,
        imagePath: "img/"
    });
    var j = C.Strings;
    j || (j = C.Strings = {
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
        }, j.getString =
        function (g) {
            for (var a = g.split("."), c = j, w = 0; w < a.length; w++) c = c[a[w]] || {};
            "string" != typeof c && (c = z);
            var b = arguments;
            return c.replace(/\{\d+\}/g, function (g) {
                g = parseInt(g.match(/\d+/)) + 1;
                return g < b.length ? b[g] : z
            })
        }, j.setString = function (g, a) {
            for (var c = g.split("."), w = j, b = 0; b < c.length - 1; b++) w[c[b]] || (w[c[b]] = {}), w = w[c[b]];
            w[c[b]] = a
        });
    var y = function () {
        this.log = function (g, a) {
            var c = b.console || {}, w = e.debugMode;
            w && c.log ? c.log(g) : w && a && alert(g)
        };
        this.error = function (g, a) {
            var c = b.console || {}, w = e.debugMode;
            w && c.error ?
                c.error(g) : w && alert(g);
            if (w) throw a || Error(g);
        };
        this.fail = function (g) {
            alert(j.getString("Errors.Failure"));
            throw Error(g);
        }
    }, y = C.Debug = new y,
        qa = C.Profiler = function () {
            var g = this,
                a = n,
                c = 0,
                w = h,
                b = h,
                e = Infinity,
                d = 0,
                f = 0,
                j = Infinity,
                l = 0,
                t = 0;
            this.getAvgUpdateTime = function () {
                return d
            };
            this.getMinUpdateTime = function () {
                return e
            };
            this.getMaxUpdateTime = function () {
                return f
            };
            this.getAvgIdleTime = function () {
                return l
            };
            this.getMinIdleTime = function () {
                return j
            };
            this.getMaxIdleTime = function () {
                return t
            };
            this.isMidUpdate = function () {
                return a
            };
            this.getNumUpdates = function () {
                return c
            };
            this.beginUpdate = function () {
                a && g.endUpdate();
                a = m;
                w = (new Date).getTime();
                if (!(1 > c)) {
                    var e = w - b;
                    l = (l * (c - 1) + e) / c;
                    e < j && (j = e);
                    e > t && (t = e)
                }
            };
            this.endUpdate = function () {
                if (a) {
                    b = (new Date).getTime();
                    a = n;
                    var g = b - w;
                    c++;
                    d = (d * (c - 1) + g) / c;
                    g < e && (e = g);
                    g > f && (f = g)
                }
            };
            this.clearProfile = function () {
                a = n;
                c = 0;
                b = w = h;
                e = Infinity;
                f = d = 0;
                j = Infinity;
                t = l = 0
            }
        }, l = C.Point;
    if (!l) {
        var l = C.Point = function (g, a) {
            this.x = "number" == typeof g ? g : 0;
            this.y = "number" == typeof a ? a : 0
        }, G = l.prototype;
        G.plus = function (g) {
            return new l(this.x +
                g.x, this.y + g.y)
        };
        G.minus = function (g) {
            return new l(this.x - g.x, this.y - g.y)
        };
        G.times = function (g) {
            return new l(this.x * g, this.y * g)
        };
        G.divide = function (g) {
            return new l(this.x / g, this.y / g)
        };
        G.negate = function () {
            return new l(-this.x, -this.y)
        };
        G.distanceTo = function (g) {
            return d.sqrt(d.pow(this.x - g.x, 2) + d.pow(this.y - g.y, 2))
        };
        G.apply = function (g) {
            return new l(g(this.x), g(this.y))
        };
        G.equals = function (g) {
            return g instanceof l && this.x === g.x && this.y === g.y
        };
        G.toString = function () {
            return "(" + this.x + "," + this.y + ")"
        }
    }
    var u =
        C.Rect;
    u || (u = C.Rect = function (g, a, c, b) {
            this.x = "number" == typeof g ? g : 0;
            this.y = "number" == typeof a ? a : 0;
            this.width = "number" == typeof c ? c : 0;
            this.height = "number" == typeof b ? b : 0
        }, G = u.prototype, G.getAspectRatio = function () {
            return this.width / this.height
        }, G.getTopLeft = function () {
            return new l(this.x, this.y)
        }, G.getBottomRight = function () {
            return new l(this.x + this.width, this.y + this.height)
        }, G.getCenter = function () {
            return new l(this.x + this.width / 2, this.y + this.height / 2)
        }, G.getSize = function () {
            return new l(this.width, this.height)
        },
        G.equals = function (g) {
            return g instanceof u && this.x === g.x && this.y === g.y && this.width === g.width && this.height === g.height
        }, G.toString = function () {
            return "[" + this.x + "," + this.y + "," + this.width + "x" + this.height + "]"
        });
    var K = C.Spring = function (g) {
        var a = "number" == typeof g ? g : 0,
            c = a,
            b = a,
            h = (new Date).getTime(),
            f = h,
            j = h;
        this.getCurrent = function () {
            return a
        };
        this.getTarget = function () {
            return b
        };
        this.resetTo = function (g) {
            b = g;
            j = h;
            c = b;
            f = j
        };
        this.springTo = function (g) {
            c = a;
            f = h;
            b = g;
            j = f + 1E3 * e.animationTime
        };
        this.shiftBy = function (g) {
            c +=
                g;
            b += g
        };
        this.update = function () {
            h = (new Date).getTime();
            var g;
            if (h >= j) g = b;
            else {
                g = c;
                var l = b - c,
                    m;
                m = e.springStiffness;
                m = (1 - d.exp(-((h - f) / (j - f)) * m)) / (1 - d.exp(-m));
                g += l * m
            }
            a = g
        }
    }, L = C.Browser = {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5
        }, c = function () {
            var g = this,
                Fa = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"],
                f = {
                    bmp: n,
                    jpeg: m,
                    jpg: m,
                    png: m,
                    tif: n,
                    wdp: n
                }, w = L.UNKNOWN,
                j = 0,
                t = n,
                Sa = {}, k = navigator.appName,
                B = navigator.appVersion,
                u = navigator.userAgent;
            if ("Microsoft Internet Explorer" == k && b.attachEvent &&
                b.ActiveXObject) k = u.indexOf("MSIE"), w = L.IE, j = parseFloat(u.substring(k + 5, u.indexOf(";", k))), u = a.documentMode, "undefined" !== typeof u && (j = u);
            else if ("Netscape" == k && b.addEventListener) {
                var x = u.indexOf("Firefox"),
                    k = u.indexOf("Safari"),
                    B = u.indexOf("Chrome");
                0 <= x ? (w = L.FIREFOX, j = parseFloat(u.substring(x + 8))) : 0 <= k && (x = u.substring(0, k).lastIndexOf("/"), w = 0 <= B ? L.CHROME : L.SAFARI, j = parseFloat(u.substring(x + 1, k)))
            } else "Opera" == k && (b.opera && b.attachEvent) && (w = L.OPERA, j = parseFloat(B));
            u = b.location.search.substring(1).split("&");
            for (k = 0; k < u.length; k++) B = u[k], x = B.indexOf("="), 0 < x && (Sa[B.substring(0, x)] = decodeURIComponent(B.substring(x + 1)));
            t = w == L.IE && 9 > j || w == L.CHROME && 2 > j;
            this.getBrowser = function () {
                return w
            };
            this.getBrowserVersion = function () {
                return j
            };
            this.getElement = function (g) {
                "string" == typeof g && (g = a.getElementById(g));
                return g
            };
            this.getElementPosition = function (c) {
                for (var c = g.getElement(c), b = new l, e = "fixed" == g.getElementStyle(c).position, w = e && c != a.body ? a.body : c.offsetParent; w;) b.x += c.offsetLeft, b.y += c.offsetTop, e && (b = b.plus(g.getPageScroll())),
                c = w, w = (e = "fixed" == g.getElementStyle(c).position) && c != a.body ? a.body : c.offsetParent;
                return b
            };
            this.getElementSize = function (a) {
                a = g.getElement(a);
                return new l(a.clientWidth, a.clientHeight)
            };
            this.getElementStyle = function (a) {
                a = g.getElement(a);
                if (a.currentStyle) return a.currentStyle;
                if (b.getComputedStyle) return b.getComputedStyle(a, z);
                y.fail("Unknown element style, no known technique.")
            };
            this.getEvent = function (g) {
                return g ? g : b.event
            };
            this.getMousePosition = function (c) {
                var c = g.getEvent(c),
                    b = new l;
                "DOMMouseScroll" ==
                    c.type && w == L.FIREFOX && 3 > j ? (b.x = c.screenX, b.y = c.screenY) : "number" == typeof c.pageX ? (b.x = c.pageX, b.y = c.pageY) : "number" == typeof c.clientX ? (b.x = c.clientX + a.body.scrollLeft + a.documentElement.scrollLeft, b.y = c.clientY + a.body.scrollTop + a.documentElement.scrollTop) : y.fail("Unknown event mouse position, no known technique.");
                return b
            };
            this.getMouseScroll = function (c) {
                var c = g.getEvent(c),
                    a = 0;
                "number" == typeof c.wheelDelta ? a = c.wheelDelta : "number" == typeof c.detail ? a = -1 * c.detail : y.fail("Unknown event mouse scroll, no known technique.");
                return a ? a / d.abs(a) : 0
            };
            this.getPageScroll = function () {
                var g = new l,
                    c = a.documentElement || {}, e = a.body || {};
                if ("number" == typeof b.pageXOffset) g.x = b.pageXOffset, g.y = b.pageYOffset;
                else if (e.scrollLeft || e.scrollTop) g.x = e.scrollLeft, g.y = e.scrollTop;
                else if (c.scrollLeft || c.scrollTop) g.x = c.scrollLeft, g.y = c.scrollTop;
                return g
            };
            this.getWindowSize = function () {
                var g = new l,
                    c = a.documentElement || {}, e = a.body || {};
                "number" == typeof b.innerWidth ? (g.x = b.innerWidth, g.y = b.innerHeight) : c.clientWidth || c.clientHeight ? (g.x = c.clientWidth,
                    g.y = c.clientHeight) : e.clientWidth || e.clientHeight ? (g.x = e.clientWidth, g.y = e.clientHeight) : y.fail("Unknown window size, no known technique.");
                return g
            };
            this.imageFormatSupported = function (g) {
                g = g ? g : z;
                return !!f[g.toLowerCase()]
            };
            this.makeCenteredNode = function (a) {
                var a = c.getElement(a),
                    b = g.makeNeutralElement("div"),
                    e = [];
                e.push('<div style="display:table; height:100%; width:100%;');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('#position:relative; overflow:hidden; text-align:left;">');
                e.push('<div style="#position:absolute; #top:50%; width:100%; ');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('display:table-cell; vertical-align:middle;">');
                e.push('<div style="#position:relative; #top:-50%; width:100%; ');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('text-align:center;"></div></div></div>');
                b.innerHTML = e.join(z);
                for (var e = b = b.firstChild, w = b.getElementsByTagName("div"); 0 < w.length;) e = w[0], w = e.getElementsByTagName("div");
                e.appendChild(a);
                return b
            };
            this.makeNeutralElement = function (g) {
                var g = a.createElement(g),
                    c = g.style;
                c.background =
                    "transparent none";
                c.border = E;
                c.margin = "0px";
                c.padding = "0px";
                c.position = "static";
                return g
            };
            this.makeTransparentImage = function (c) {
                var a = g.makeNeutralElement("img"),
                    b = h;
                w == L.IE && 7 > j ? (b = g.makeNeutralElement("span"), b.style.display = "inline-block", a.onload = function () {
                    b.style.width = b.style.width || a.width + "px";
                    b.style.height = b.style.height || a.height + "px";
                    a = a.onload = h
                }, a.src = c, b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "', sizingMethod='scale')") : (b = a, b.src = c);
                return b
            };
            this.setElementOpacity =
                function (c, a, b) {
                    c = g.getElement(c);
                    b && t && (a = d.round(a));
                    c.style.opacity = 1 > a ? a : z;
                    c.style.filter = (c.style.filter || z).replace(/[\s]*alpha\(.*?\)[\s]*/g, z);
                    1 <= a || (a = " alpha(opacity=" + d.round(100 * a) + ") ", c.style.filter += a)
            };
            this.addEvent = function (c, a, b, e) {
                c = g.getElement(c);
                c.addEventListener ? ("mousewheel" == a && c.addEventListener("DOMMouseScroll", b, e), c.addEventListener(a, b, e)) : c.attachEvent ? (c.attachEvent("on" + a, b), e && c.setCapture && c.setCapture()) : y.fail("Unable to attach event handler, no known technique.")
            };
            this.removeEvent = function (c, a, b, e) {
                c = g.getElement(c);
                c.removeEventListener ? ("mousewheel" == a && c.removeEventListener("DOMMouseScroll", b, e), c.removeEventListener(a, b, e)) : c.detachEvent ? (c.detachEvent("on" + a, b), e && c.releaseCapture && c.releaseCapture()) : y.fail("Unable to detach event handler, no known technique.")
            };
            this.cancelEvent = function (c) {
                c = g.getEvent(c);
                c.preventDefault && c.preventDefault();
                c.cancel = m;
                c.returnValue = n
            };
            this.stopEvent = function (c) {
                c = g.getEvent(c);
                c.stopPropagation && c.stopPropagation();
                c.cancelBubble = m
            };
            this.createCallback = function (g, c) {
                for (var a = [], b = 2; b < arguments.length; b++) a.push(arguments[b]);
                return function () {
                    for (var b = a.concat([]), e = 0; e < arguments.length; e++) b.push(arguments[e]);
                    return c.apply(g, b)
                }
            };
            this.getUrlParameter = function (g) {
                return (g = Sa[g]) ? g : h
            };
            this.makeAjaxRequest = function (g, a) {
                var w = typeof a == A,
                    d = h;
                if (w) var f = a,
                a = function () {
                    b.setTimeout(c.createCallback(h, f, d), 1)
                };
                if (b.ActiveXObject)
                    for (var j = 0; j < Fa.length; j++) try {
                        d = new ActiveXObject(Fa[j]);
                        break
                    } catch (l) {} else b.XMLHttpRequest &&
                        (d = new XMLHttpRequest);
                !d && y.fail("Browser doesn't support XMLHttpRequest.");
                e.proxyUrl && (g = e.proxyUrl + g);
                w && (d.onreadystatechange = function () {
                    4 == d.readyState && (d.onreadystatechange = new Function, a())
                });
                try {
                    d.open("GET", g, w), d.send(h)
                } catch (m) {
                    y.log(m.name + " while making AJAX request: " + m.message), d = d.onreadystatechange = h, w && a()
                }
                return w ? h : d
            };
            this.parseXml = function (g) {
                var c = h;
                if (b.ActiveXObject) try {
                    c = new ActiveXObject("Microsoft.XMLDOM"), c.async = n, c.loadXML(g)
                } catch (a) {
                    y.log(a.name + " while parsing XML (ActiveX): " +
                        a.message)
                } else if (b.DOMParser) try {
                    c = (new DOMParser).parseFromString(g, "text/xml")
                } catch (e) {
                    y.log(e.name + " while parsing XML (DOMParser): " + e.message)
                } else y.fail("Browser doesn't support XML DOM.");
                return c
            }
        }, c = C.Utils = new c,
        R = C.MouseTracker;
    var H = function (g, a) {
        var b = c.getMousePosition(g),
            e = c.getElementPosition(a);
        return b.minus(e)
    }, W = function (g, c) {
            for (var b = a.body; c && g != c && b != c;) try {
                c = c.parentNode
            } catch (e) {
                return n
            }
            return g == c
        }, G = function () {
            ga = m
        }, ea = function () {
            ga = n
        }, I = "mouseup";
    if (!R) {
        var ca = c.getBrowser() ==
            L.IE && 9 > c.getBrowserVersion(),
            ga = n,
            ha = n,
            Z = {}, ia = [];
        ca ? (c.addEvent(a, "mousedown", G, n), c.addEvent(a, I, ea, n)) : (c.addEvent(b, "mousedown", G, m), c.addEvent(b, I, ea, m));
        R = C.MouseTracker = function (g) {
            function f() {
                z && (ca ? (c.removeEvent(g, sa, r, m), c.removeEvent(g, I, B, m), c.addEvent(g, I, k, n)) : (c.removeEvent(b, sa, p, m), c.removeEvent(b, I, u, m)), z = n)
            }

            function j(g, c) {
                var a = Z,
                    b;
                for (b in a) a.hasOwnProperty(b) && za != b && a[b][g](c)
            }

            function w(a) {
                a = c.getEvent(a);
                ca && z && !W(a.srcElement, g) && j("onMouseOver", a);
                var b = a.relatedTarget ?
                    a.relatedTarget : a.fromElement;
                if (W(g, a.target ? a.target : a.srcElement) && !W(g, b))
                    if (q = m, typeof M.enterHandler == A) try {
                        M.enterHandler(M, H(a, g), K, ga)
                    } catch (e) {
                        y.error(e.name + " while executing enter handler: " + e.message, e)
                    }
            }

            function l(a) {
                a = c.getEvent(a);
                ca && z && !W(a.srcElement, g) && j("onMouseOut", a);
                var b = a.relatedTarget ? a.relatedTarget : a.toElement;
                if (W(g, a.target ? a.target : a.srcElement) && !W(g, b))
                    if (q = n, typeof M.exitHandler == A) try {
                        M.exitHandler(M, H(a, g), K, ga)
                    } catch (e) {
                        y.error(e.name + " while executing exit handler: " +
                            e.message, e)
                    }
            }

            function t(a) {
                a = c.getEvent(a);
                if (2 != a.button) {
                    K = m;
                    O = v = c.getMousePosition(a);
                    P = (new Date).getTime();
                    if (typeof M.pressHandler == A) try {
                        M.pressHandler(M, H(a, g))
                    } catch (e) {
                        y.error(e.name + " while executing press handler: " + e.message, e)
                    }(M.pressHandler || M.dragHandler) && c.cancelEvent(a);
                    !ca || !ha ? (z || (ca ? (c.removeEvent(g, I, k, n), c.addEvent(g, I, B, m), c.addEvent(g, sa, r, m)) : (c.addEvent(b, I, u, m), c.addEvent(b, sa, p, m)), z = m), ha = m, ia = [ba]) : ca && ia.push(ba)
                }
            }

            function k(a) {
                var a = c.getEvent(a),
                    b = K,
                    w = q;
                if (2 !=
                    a.button) {
                    K = n;
                    if (typeof M.releaseHandler == A) try {
                        M.releaseHandler(M, H(a, g), b, w)
                    } catch (d) {
                        y.error(d.name + " while executing release handler: " + d.message, d)
                    }
                    if (b && w && (a = c.getEvent(a), 2 != a.button && (b = (new Date).getTime() - P, w = c.getMousePosition(a), w = O.distanceTo(w), b = b <= e.clickTimeThreshold && w <= e.clickDistThreshold, typeof M.clickHandler == A))) try {
                        M.clickHandler(M, H(a, g), b, a.shiftKey)
                    } catch (h) {
                        y.error(h.name + " while executing click handler: " + h.message, h)
                    }
                }
            }

            function B(g) {
                g = c.getEvent(g);
                if (2 != g.button) {
                    for (var b =
                        0; b < ia.length; b++) {
                        var e = ia[b];
                        !e.hasMouse() && e.onMouseUp(g)
                    }
                    f();
                    ha = n;
                    g.srcElement.fireEvent("on" + g.type, a.createEventObject(g));
                    c.stopEvent(g)
                }
            }

            function u(g) {
                !q && k(g);
                f()
            }

            function x(g) {
                M.clickHandler && c.cancelEvent(g)
            }

            function p(a) {
                var a = c.getEvent(a),
                    b = c.getMousePosition(a),
                    e = b.minus(v);
                v = b;
                if (typeof M.dragHandler == A) {
                    try {
                        M.dragHandler(M, H(a, g), e, a.shiftKey)
                    } catch (w) {
                        y.error(w.name + " while executing drag handler: " + w.message, w)
                    }
                    c.cancelEvent(a)
                }
            }

            function r(g) {
                for (var a = 0; a < ia.length; a++) ia[a].onMouseMove(g);
                c.stopEvent(g)
            }

            function s(a) {
                var a = c.getEvent(a),
                    b = c.getMouseScroll(a);
                if (typeof M.scrollHandler == A) {
                    if (b) try {
                        M.scrollHandler(M, H(a, g), b, a.shiftKey)
                    } catch (e) {
                        y.error(e.name + " while executing scroll handler: " + e.message, e)
                    }
                    c.cancelEvent(a)
                }
            }
            var sa = "mousemove",
                M = this,
                ba = h,
                za = d.random(),
                g = c.getElement(g),
                E = n,
                z = n,
                K = n,
                q = n,
                v = h,
                P = h,
                O = h;
            this.target = g;
            this.scrollHandler = this.dragHandler = this.clickHandler = this.releaseHandler = this.pressHandler = this.exitHandler = this.enterHandler = h;
            ba = {
                hasMouse: function () {
                    return q
                },
                onMouseOver: w,
                onMouseOut: l,
                onMouseUp: k,
                onMouseMove: p
            };
            this.isTracking = function () {
                return E
            };
            this.setTracking = function (a) {
                a ? E || (c.addEvent(g, "mouseover", w, n), c.addEvent(g, "mouseout", l, n), c.addEvent(g, "mousedown", t, n), c.addEvent(g, I, k, n), c.addEvent(g, "mousewheel", s, n), c.addEvent(g, "click", x, n), E = m, Z[za] = ba) : E && (c.removeEvent(g, "mouseover", w, n), c.removeEvent(g, "mouseout", l, n), c.removeEvent(g, "mousedown", t, n), c.removeEvent(g, I, k, n), c.removeEvent(g, "mousewheel", s, n), c.removeEvent(g, "click", x, n), f(), E = n,
                    delete Z[za])
            }
        }
    }
    var fa = C.EventManager = function () {
        var g = {};
        this.addListener = function (a, c) {
            typeof c == A && (g[a] || (g[a] = []), g[a].push(c))
        };
        this.removeListener = function (a, c) {
            var b = g[a];
            if (typeof c == A && b)
                for (var e = 0; e < b.length; e++)
                    if (c == b[e]) {
                        b.splice(e, 1);
                        break
                    }
        };
        this.clearListeners = function (a) {
            g[a] && delete g[a]
        };
        this.trigger = function (a) {
            var c = g[a],
                e = [];
            if (c) {
                for (var d = 1; d < arguments.length; d++) e.push(arguments[d]);
                for (d = 0; d < c.length; d++) try {
                    c[d].apply(b, e)
                } catch (h) {
                    y.error(h.name + s + a + " handler: " + h.message,
                        h)
                }
            }
        }
    }, t, O = function (g, a) {
            function c(f) {
                e.onload = h;
                e.onabort = h;
                e.onerror = h;
                d && b.clearTimeout(d);
                b.setTimeout(function () {
                    a(g, f ? e : h)
                }, 1)
            }
            var e = h,
                d = h;
            this.start = function () {
                e = new Image;
                var a = function () {
                    c(n)
                };
                e.onload = function () {
                    c(m)
                };
                e.onabort = a;
                e.onerror = a;
                d = b.setTimeout(function () {
                    y.log("Image timed out: " + g);
                    c(n)
                }, V);
                e.src = g
            }
        }, V = 15E3;
    t = C.ImageLoader = function () {
        function g(g, c, b) {
            a--;
            if (typeof g == A) try {
                g(b)
            } catch (e) {
                y.error(e.name + s + c + " callback: " + e.message, e)
            }
        }
        var a = 0;
        this.loadImage = function (b, d) {
            if (a >=
                e.imageLoaderLimit) return n;
            var f = c.createCallback(h, g, d),
                f = new O(b, f);
            a++;
            f.start();
            return m
        }
    };
    k = 0;
    v = 1;
    p = 2;
    x = 3;
    C.Button = function (g, a, e, w, f, j, l, t, B, u) {
        function y() {
            b.setTimeout(E, 20)
        }

        function E() {
            if (U) {
                var a = 1 - ((new Date).getTime() - C) / G,
                    a = d.min(1, a),
                    a = d.max(0, a);
                c.setElementOpacity(s, a, m);
                0 < a && y()
            }
        }

        function r(a) {
            a >= v && ba == k && (U = n, c.setElementOpacity(s, 1, m), ba = v);
            a >= p && ba == v && (K.style.visibility = z, ba = p);
            a >= x && ba == p && (q.style.visibility = z, ba = x)
        }

        function sa(a) {
            a <= p && ba == x && (q.style.visibility = P, ba = p);
            a <= v && ba == p && (K.style.visibility = P, ba = v);
            a <= k && ba == v && (U = m, C = (new Date).getTime() + O, b.setTimeout(y, O), ba = k)
        }
        var M = c.makeNeutralElement("span"),
            ba = v,
            za = new R(M),
            a = c.makeTransparentImage(a),
            s = c.makeTransparentImage(e),
            K = c.makeTransparentImage(w),
            q = c.makeTransparentImage(f),
            j = typeof j == A ? j : h,
            l = typeof l == A ? l : h,
            t = typeof t == A ? t : h,
            B = typeof B == A ? B : h,
            u = typeof u == A ? u : h,
            O = 0,
            G = 2E3,
            C = h,
            U = n;
        this.elmt = M;
        this.notifyGroupEnter = function () {
            r(v)
        };
        this.notifyGroupExit = function () {
            sa(k)
        };
        M.style.display = "inline-block";
        M.style.position = "relative";
        M.title = g;
        M.appendChild(a);
        M.appendChild(s);
        M.appendChild(K);
        M.appendChild(q);
        g = s.style;
        e = K.style;
        w = q.style;
        g.position = e.position = w.position = "absolute";
        g.top = e.top = w.top = "0px";
        g.left = e.left = w.left = "0px";
        e.visibility = w.visibility = P;
        c.getBrowser() == L.FIREFOX && 3 > c.getBrowserVersion() && (g.top = e.top = w.top = z);
        za.enterHandler = function (a, g, c, b) {
            c ? (r(x), B && B()) : !b && r(p)
        };
        za.exitHandler = function (a, g, c) {
            sa(v);
            c && u && u()
        };
        za.pressHandler = function () {
            r(x);
            j && j()
        };
        za.releaseHandler = function (a,
            g, c, b) {
            c && b ? (sa(p), l && l()) : c ? sa(v) : r(p)
        };
        za.clickHandler = function (a, g, c) {
            t && c && t()
        };
        za.setTracking(m);
        sa(k)
    };
    C.ButtonGroup = function (a) {
        function b() {
            for (var c = 0; c < a.length; c++) a[c].notifyGroupEnter()
        }

        function e(c, b, d) {
            if (!d)
                for (c = 0; c < a.length; c++) a[c].notifyGroupExit()
        }
        var d = c.makeNeutralElement("span"),
            a = a.concat([]),
            h = new R(d);
        this.elmt = d;
        this.emulateEnter = function () {
            b()
        };
        this.emulateExit = function () {
            e()
        };
        d.style.display = "inline-block";
        for (var f = 0; f < a.length; f++) d.appendChild(a[f].elmt);
        h.enterHandler =
            b;
        h.exitHandler = e;
        h.releaseHandler = function (c, b, e, d) {
            if (!d)
                for (c = 0; c < a.length; c++) a[c].notifyGroupExit()
        };
        h.setTracking(m)
    };
    var ja = C.TileSource = function (a, c, b, e, h, f) {
        var j = this,
            m = c / a;
        this.width = a;
        this.height = c;
        this.aspectRatio = a / c;
        this.dimensions = new l(a, c);
        this.minLevel = h ? h : 0;
        this.maxLevel = f ? f : d.ceil(d.log(d.max(a, c)) / d.log(2));
        this.tileSize = b ? b : 0;
        this.tileOverlap = e ? e : 0;
        this.getLevelScale = function (a) {
            return 1 / (1 << j.maxLevel - a)
        };
        this.getNumTiles = function (b) {
            var e = j.getLevelScale(b),
                b = d.ceil(e * a / j.tileSize),
                e = d.ceil(e * c / j.tileSize);
            return new l(b, e)
        };
        this.getPixelRatio = function (a) {
            a = j.dimensions.times(j.getLevelScale(a));
            return new l(1 / a.x, 1 / a.y)
        };
        this.getTileAtPoint = function (a, c) {
            var g = j.dimensions.times(j.getLevelScale(a)),
                b = c.times(g.x),
                e;
            e = 0 <= c.x && 1 >= c.x ? d.floor(b.x / j.tileSize) : d.ceil(g.x / j.tileSize) * d.floor(b.x / g.x) + d.floor((g.x + b.x % g.x) % g.x / j.tileSize);
            g = 0 <= c.y && c.y <= m ? d.floor(b.y / j.tileSize) : d.ceil(g.y / j.tileSize) * d.floor(b.y / g.y) + d.floor((g.y + b.y % g.y) % g.y / j.tileSize);
            return new l(e, g)
        };
        this.getTileBounds =
            function (a, g, c) {
                var b = j.dimensions.times(j.getLevelScale(a)),
                    a = 0 === g ? 0 : j.tileSize * g - j.tileOverlap,
                    e = 0 === c ? 0 : j.tileSize * c - j.tileOverlap,
                    g = j.tileSize + (0 === g ? 1 : 2) * j.tileOverlap,
                    c = j.tileSize + (0 === c ? 1 : 2) * j.tileOverlap,
                    g = d.min(g, b.x - a),
                    c = d.min(c, b.y - e),
                    b = 1 / b.x;
                return new u(a * b, e * b, g * b, c * b)
        };
        this.getTileUrl = function () {
            throw Error("Method not implemented.");
        };
        this.tileExists = function (a, g, c) {
            var b = j.getNumTiles(a);
            return a >= j.minLevel && a <= j.maxLevel && 0 <= g && 0 <= c && g < b.x && c < b.y
        }
    }, ka = C.DisplayRect = function (a,
            c, b, e, d, j) {
            u.apply(this, arguments);
            this.minLevel = d;
            this.maxLevel = j
        };
    ka.prototype = new u;
    var S = C.DziTileSource = function (a, c, b, e, j, h, f) {
        ja.apply(this, [a, c, b, e]);
        var l = this,
            t = {};
        this.tileFormat = this.fileFormat = h;
        this.displayRects = f;
        if (f)
            for (a = f.length - 1; 0 <= a; a--) {
                c = f[a];
                for (e = c.minLevel; e <= c.maxLevel; e++) t[e] || (t[e] = []), t[e].push(c)
            }
        this.getTileUrl = function (a, c, g) {
            return [j, a, "/", c, "_", g, ".", h].join(z)
        };
        this.tileExists = function (a, c, g) {
            var e = t[a];
            if (!e || !e.length) return m;
            for (var j = l.getLevelScale(a), h =
                    e.length - 1; 0 <= h; h--) {
                var f = e[h];
                if (!(a < f.minLevel || a > f.maxLevel)) {
                    var w = f.x * j,
                        k = f.y * j,
                        Fa = w + f.width * j,
                        f = k + f.height * j,
                        w = d.floor(w / b),
                        k = d.floor(k / b),
                        Fa = d.ceil(Fa / b),
                        f = d.ceil(f / b);
                    if (w <= c && c < Fa && k <= g && g < f) return m
                }
            }
            return n
        }
    };
    S.prototype = new ja;
    var N = function (a) {
        Error.apply(this, arguments);
        this.message = a
    }, aa = function (a) {
            a instanceof N || (y.error(a.name + " while creating DZI from XML: " + a.message), a = new N(j.getString("Errors.Unknown")));
            return a
        }, Q = function (a) {
            var a = a.split("/"),
                c = a[a.length - 1],
                b = c.lastIndexOf("."); - 1 < b && (a[a.length - 1] = c.slice(0, b));
            return a.join("/") + "_files/"
        }, da = function (a, b) {
            if (a) {
                if (200 !== a.status && 0 !== a.status) {
                    var e = a.status;
                    throw new N(j.getString("Errors.Status", e, 404 == e ? "Not Found" : a.statusText));
                }
            } else throw new N(j.getString("Errors.Security"));
            e = h;
            a.responseXML && a.responseXML.documentElement ? e = a.responseXML : a.responseText && (e = c.parseXml(a.responseText));
            return D(e, b)
        }, D = function (a, b) {
            if (!a || !a.documentElement) throw new N(j.getString("Errors.Xml"));
            var e = a.documentElement,
                d = e.tagName;
            if ("Image" == d) try {
                var h = e.getAttribute("Format");
                if (!c.imageFormatSupported(h)) throw new N(j.getString("Errors.ImageFormat", h.toUpperCase()));
                for (var l = e.getElementsByTagName("Size")[0], m = e.getElementsByTagName("DisplayRect"), t = parseInt(l.getAttribute("Width"), f), k = parseInt(l.getAttribute("Height"), f), B = parseInt(e.getAttribute("TileSize")), u = parseInt(e.getAttribute("Overlap")), e = [], d = 0; d < m.length; d++) {
                    var n = m[d],
                        x = n.getElementsByTagName("Rect")[0];
                    e.push(new ka(parseInt(x.getAttribute("X"), f), parseInt(x.getAttribute("Y"),
                        f), parseInt(x.getAttribute("Width"), f), parseInt(x.getAttribute("Height"), f), parseInt(n.getAttribute("MinLevel"), f), parseInt(n.getAttribute("MaxLevel"), f)))
                }
                return new S(t, k, B, u, b, h, e)
            } catch (sa) {
                throw h = j.getString("Errors.Dzi"), sa instanceof N ? sa : new N(h);
            } else {
                if ("Collection" == d) throw new N(j.getString("Errors.Dzc"));
                if ("Error" == d) throw h = e.getElementsByTagName("Message")[0].firstChild.nodeValue, new N(h);
            }
            throw new N(j.getString("Errors.Dzi"));
        };
    N.prototype = Error();
    S.getTilesUrl = Q;
    S.createFromJson =
        function (a, e) {
            var d = typeof e == A,
                f, l;
            if (!a || !a.url && !a.tilesUrl) l = new N(j.getString("Errors.Empty"));
            else try {
                var m = a.displayRects;
                if (m && m.length)
                    for (var t = 0, k = m.length; t < k; t++) {
                        var B = m[t];
                        m[t] = new ka(B.x || B[0], B.y || B[1], B.width || B[2], B.height || B[3], B.minLevel || B[4], B.maxLevel || B[5])
                    }
                f = new S(a.width, a.height, a.tileSize, a.tileOverlap, a.tilesUrl || Q(a.url), a.tileFormat, a.displayRects);
                f.xmlUrl = a.url
            } catch (u) {
                l = aa(u)
            }
            if (d) b.setTimeout(c.createCallback(h, e, f, l && l.message), 1);
            else {
                if (l) throw l;
                return f
            }
    };
    S.createFromXml = function (a, e, d) {
        function f(c, e) {
            try {
                var b = c(e, t);
                b.xmlUrl = a;
                return b
            } catch (d) {
                if (l) return m = aa(d).message, h;
                throw aa(d);
            }
        }
        var l = typeof d == A,
            m = h;
        if (!a) {
            m = j.getString("Errors.Empty");
            if (l) return b.setTimeout(function () {
                d(h, m)
            }, 1), h;
            throw new N(m);
        }
        var t = Q(a);
        return l ? (e ? b.setTimeout(function () {
            var a = f(D, c.parseXml(e));
            d(a, m)
        }, 1) : c.makeAjaxRequest(a, function (a) {
            a = f(da, a);
            d(a, m)
        }), h) : e ? f(D, c.parseXml(e)) : f(da, c.makeAjaxRequest(a))
    };
    for (var pa = C.Viewport = function (a, c) {
        function b(a) {
            var a =
                1 / f.getZoom(a),
                c = a / f.getAspectRatio(),
                g = e.visibilityRatio,
                a = (g - J) * a,
                c = (g - J) * c,
                g = 1 - 2 * a,
                d = t - 2 * c;
            0 > g && (a += J * g, g = 0);
            0 > d && (c += J * d, d = 0);
            return new C.Rect(a, c, g, d)
        }
        var f = this,
            a = new l(a.x, a.y),
            j = c.x / c.y,
            t = c.y / c.x,
            k = new K(0),
            B = new K(0),
            n = new K(e.logarithmicZoom ? 0 : 1),
            x = h,
            p = new u(0, 0, 1, t),
            y = p.getCenter(),
            r = d.LN2;
        this.getHomeBounds = function () {
            var a = f.getAspectRatio(),
                c = new u(p.x, p.y, p.width, p.height);
            j >= a ? (c.height = p.width / a, c.y = y.y - c.height / 2) : (c.width = p.height * a, c.x = y.x - c.width / 2);
            return c
        };
        this.getHomeCenter =
            function () {
                return y
        };
        this.getHomeZoom = function () {
            var a = j / f.getAspectRatio();
            return 1 <= a ? 1 : a
        };
        this.getMinCenter = function (a) {
            return b(a).getTopLeft()
        };
        this.getMaxCenter = function (a) {
            return b(a).getBottomRight()
        };
        this.getMinZoom = function () {
            var b = f.getHomeZoom();
            return d.min(e.minZoomDimension ? c.x <= c.y ? e.minZoomDimension / a.x : e.minZoomDimension / (a.x * t) : e.minZoomImageRatio * b, b)
        };
        this.getMaxZoom = function () {
            return d.max(c.x * e.maxZoomPixelRatio / a.x, f.getHomeZoom())
        };
        this.getAspectRatio = function () {
            return a.x /
                a.y
        };
        this.getContainerSize = function () {
            return new l(a.x, a.y)
        };
        this.getBounds = function (a) {
            var c = f.getCenter(a),
                a = 1 / f.getZoom(a),
                b = a / f.getAspectRatio();
            return new u(c.x - a / 2, c.y - b / 2, a, b)
        };
        this.getCenter = function (c) {
            var b = new l(k.getCurrent(), B.getCurrent()),
                e = new l(k.getTarget(), B.getTarget());
            if (c) return b;
            if (!x) return e;
            var c = f.getZoom(),
                d = 1 / c,
                h = d / f.getAspectRatio(),
                b = new u(b.x - d / 2, b.y - h / 2, d, h),
                d = f.pixelFromPoint(x, m),
                c = x.minus(b.getTopLeft()).times(a.x / b.width).minus(d).divide(a.x * c);
            return e.plus(c)
        };
        this.getZoom = function (a) {
            a = a ? n.getCurrent() : n.getTarget();
            return e.logarithmicZoom ? d.pow(2, a) : a
        };
        this.applyConstraints = function (a) {
            var c = f.getZoom(),
                g;
            g = f.getMinZoom();
            var h = f.getMaxZoom();
            g = d.min(d.max(c, g), h);
            c != g && f.zoomTo(g, x, a);
            var c = f.getCenter(),
                j = b(),
                h = c.x,
                m = c.y,
                t = d.min(d.max(h, j.x), j.x + j.width),
                j = d.min(d.max(m, j.y), j.y + j.height),
                h = h === t && m === j ? c : new l(t, j);
            e.wrapHorizontal && (h.x = c.x);
            e.wrapVertical && (h.y = c.y);
            c.equals(h) || (g = 1 / g, c = g / f.getAspectRatio(), f.fitBounds(new u(h.x - J * g, h.y - J * c, g,
                c), a))
        };
        this.ensureVisible = function (a) {
            f.applyConstraints(a)
        };
        this.fitBounds = function (c, b) {
            var e = f.getAspectRatio(),
                d = c.getCenter(),
                j = new u(c.x, c.y, c.width, c.height);
            j.getAspectRatio() >= e ? (j.height = c.width / e, j.y = d.y - j.height / 2) : (j.width = c.height * e, j.x = d.x - j.width / 2);
            f.panTo(f.getCenter(m), m);
            f.zoomTo(f.getZoom(m), h, m);
            var l = f.getBounds(),
                t = f.getZoom(),
                e = 1 / j.width;
            e == t || j.width == l.width ? f.panTo(d, b) : (d = l.getTopLeft().times(a.x / l.width).minus(j.getTopLeft().times(a.x / j.width)).divide(a.x / l.width - a.x /
                j.width), f.zoomTo(e, d, b))
        };
        this.goHome = function (a) {
            var c = f.getCenter();
            e.wrapHorizontal && (c.x = (1 + c.x % 1) % 1, k.resetTo(c.x), k.update());
            e.wrapVertical && (c.y = (t + c.y % t) % t, B.resetTo(c.y), B.update());
            f.fitBounds(p, a)
        };
        this.panBy = function (a, c) {
            f.panTo(f.getCenter().plus(a), c)
        };
        this.panTo = function (c, b) {
            if (b) k.resetTo(c.x), B.resetTo(c.y);
            else if (x) {
                var e = f.getZoom(),
                    d = 1 / e,
                    j = d / f.getAspectRatio(),
                    d = new u(k.getCurrent() - d / 2, B.getCurrent() - j / 2, d, j),
                    j = f.pixelFromPoint(x, m),
                    e = x.minus(d.getTopLeft()).times(a.x / d.width).minus(j).divide(a.x *
                        e),
                    e = c.minus(e);
                k.springTo(e.x);
                B.springTo(e.y)
            } else k.springTo(c.x), B.springTo(c.y)
        };
        this.zoomBy = function (a, c, b) {
            f.zoomTo(f.getZoom() * a, c, b)
        };
        this.zoomTo = function (a, c, b) {
            b ? n.resetTo(e.logarithmicZoom ? d.log(a) / r : a) : n.springTo(e.logarithmicZoom ? d.log(a) / r : a);
            x = c instanceof l ? c : h
        };
        this.resize = function (c, b) {
            var e = f.getBounds(),
                d = c.x / a.x;
            a = new l(c.x, c.y);
            b && (e.width *= d, e.height = e.width / f.getAspectRatio());
            f.fitBounds(e, m)
        };
        this.update = function () {
            var a = k.getCurrent(),
                c = B.getCurrent(),
                b = n.getCurrent();
            if (x) var e = f.pixelFromPoint(x, m);
            n.update();
            x && n.getCurrent() != b ? (e = f.pixelFromPoint(x, m).minus(e), e = f.deltaPointsFromPixels(e, m), k.shiftBy(e.x), B.shiftBy(e.y)) : x = h;
            k.update();
            B.update();
            return k.getCurrent() != a || B.getCurrent() != c || n.getCurrent() != b
        };
        this.deltaPixelsFromPoints = function (c, e) {
            return c.times(a.x * f.getZoom(e))
        };
        this.deltaPointsFromPixels = function (c, e) {
            return c.divide(a.x * f.getZoom(e))
        };
        this.pixelFromPoint = function (c, e) {
            var b = f.getBounds(e);
            return c.minus(b.getTopLeft()).times(a.x / b.width)
        };
        this.pointFromPixel = function (c, e) {
            var b = f.getBounds(e);
            return c.divide(a.x / b.width).plus(b.getTopLeft())
        };
        f.goHome(m);
        f.update()
    }, r, T, ua = function (a, c, e, b, f, d) {
            this.level = a;
            this.x = c;
            this.y = e;
            this.bounds = b;
            this.exists = f;
            this.url = d;
            this.image = this.elmt = h;
            this.loading = this.loaded = n;
            this.visibility = this.distance = this.opacity = this.blendStart = this.size = this.position = this.style = h;
            this.beingDrawn = n;
            this.lastTouchTime = this.lastDrawnTime = 0
        }, la = function (a) {
            switch (a) {
            case T.TOP_LEFT:
                return function () {};
            case T.TOP:
                return function (a,
                    c) {
                    a.x -= c.x / 2
                };
            case T.TOP_RIGHT:
                return function (a, c) {
                    a.x -= c.x
                };
            case T.RIGHT:
                return function (a, c) {
                    a.x -= c.x;
                    a.y -= c.y / 2
                };
            case T.BOTTOM_RIGHT:
                return function (a, c) {
                    a.x -= c.x;
                    a.y -= c.y
                };
            case T.BOTTOM:
                return function (a, c) {
                    a.x -= c.x / 2;
                    a.y -= c.y
                };
            case T.BOTTOM_LEFT:
                return function (a, c) {
                    a.y -= c.y
                };
            case T.LEFT:
                return function (a, c) {
                    a.y -= c.y / 2
                };
            default:
                return function (a, c) {
                    a.x -= c.x / 2;
                    a.y -= c.y / 2
                }
            }
        }, X = function (a, c, e) {
            this.elmt = a;
            this.scales = c instanceof u;
            this.bounds = new u(c.x, c.y, c.width, c.height);
            this.adjust = la(c instanceof l ? e : T.TOP_LEFT);
            this.position = new l(c.x, c.y);
            this.size = new l(c.width, c.height);
            this.style = a.style;
            this.naturalSize = new l(a.clientWidth, a.clientHeight)
        }, va = 100, B = J, U = c.getBrowser(), ea = c.getBrowserVersion(), G = !! a.createElement("canvas").getContext, ya = (a.documentElement || {}).style || {}, F = n, Ca = ["msTransform", "WebkitTransform", "MozTransform"], ma, Aa; ma = Ca.shift();)
        if ("undefined" !== typeof ya[ma]) {
            F = m;
            Aa = /webkit/i.test(ma);
            break
        }
    var ea = U == L.SAFARI && 4 > ea,
        Ba = G && !ea,
        Ua = !Ba && F,
        Va = n,
        Xa = "undefined" !== typeof a.documentMode ?
            "bicubic" : "nearest-neighbor";
    ua.prototype.toString = function () {
        return this.level + "/" + this.x + "_" + this.y
    };
    ua.prototype.drawHTML = function (a) {
        if (this.loaded) {
            this.elmt || (this.elmt = c.makeNeutralElement("img"), this.elmt.src = this.url, this.style = this.elmt.style, this.style.position = "absolute", this.style.msInterpolationMode = Xa, Ua && (this.style[ma + "Origin"] = "0px 0px"));
            var e = this.elmt,
                b = this.image,
                f = this.style,
                j = this.position,
                h = this.size;
            e.parentNode != a && a.appendChild(e);
            Ua ? f[ma] = ["matrix(", (h.x / b.width).toFixed(8),
                ",0,0,", (h.y / b.height).toFixed(8), ",", j.x.toFixed(8), Aa ? "," : "px,", j.y.toFixed(8), Aa ? ")" : "px)"
            ].join(z) : Va ? (b = a.clientWidth, a = a.clientHeight, f.width = b + "px", f.height = a + "px", f.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (h.x / b).toFixed(8), ",M22=", (h.y / a).toFixed(8), ",Dx=", j.x.toFixed(8), ",Dy=", j.y.toFixed(8), ")"].join(z)) : (j = j.apply(d.floor), h = h.apply(d.ceil), f.left = j.x + "px", f.top = j.y + "px", f.width = h.x + "px", f.height = h.y + "px");
            c.setElementOpacity(e, this.opacity)
        } else y.error("Attempting to draw tile " +
            this.toString() + " when it's not yet loaded.")
    };
    ua.prototype.drawCanvas = function (a) {
        if (this.loaded) {
            var c = this.position,
                e = this.size;
            a.globalAlpha = this.opacity;
            a.drawImage(this.image, c.x, c.y, e.x, e.y)
        } else y.error("Attempting to draw tile " + this.toString() + " when it's not yet loaded.")
    };
    ua.prototype.unload = function () {
        this.elmt && this.elmt.parentNode && this.elmt.parentNode.removeChild(this.elmt);
        this.image = this.elmt = h;
        this.loading = this.loaded = n
    };
    T = C.OverlayPlacement = {
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
    X.prototype.destroy = function () {
        var a = this.elmt,
            c = this.style;
        a.parentNode && a.parentNode.removeChild(a);
        c.top = z;
        c.left = z;
        c.position = z;
        this.scales && (c.width = z, c.height = z)
    };
    X.prototype.drawHTML = function (a) {
        var c = this.elmt,
            b = this.style,
            f = this.scales,
            j = this.naturalSize;
        c.parentNode != a && (a.appendChild(c), b.position = "absolute", j.x = c.clientWidth, j.y = c.clientHeight);
        var h = this.position,
            l = this.size;
        f || (l.x = j.x = j.x || c.clientWidth, l.y = j.y = j.y || c.clientHeight);
        this.adjust(h, l);
        e.transformOverlays && F ? (b[ma + "Origin"] = "0px 0px", b[ma] = ["translate(", h.x.toFixed(8), "px,", h.y.toFixed(8), "px)"].join(z), f && (c.clientWidth || (b.width = "100%"), c.clientHeight || (b.height = "100%"), b[ma] += [" scale(", (l.x / c.clientWidth).toFixed(8), ",", (l.y / c.clientHeight).toFixed(8), ")"].join(z))) : e.transformOverlays && Va ? (c = a.clientWidth, a = a.clientHeight, b.width = c + "px", b.height = a + "px", b.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (l.x / c).toFixed(8), ",M22=", (l.y / a).toFixed(8),
            ",Dx=", h.x.toFixed(8), ",Dy=", h.y.toFixed(8), ")"
        ].join(z)) : (h = h.apply(d.floor), l = l.apply(d.ceil), b.left = h.x + "px", b.top = h.y + "px", f && (b.width = l.x + "px", b.height = l.y + "px"))
    };
    X.prototype.update = function (a, c) {
        this.scales = a instanceof u;
        this.bounds = new u(a.x, a.y, a.width, a.height);
        this.adjust = la(a instanceof l ? c : T.TOP_LEFT)
    };
    r = C.Drawer = function (a, b, f) {
        function j(c) {
            ja[c] || (ja[c] = a.getPixelRatio(c));
            return ja[c]
        }

        function k(a, c, b) {
            a.loading = n;
            if (ya) y.error("Tile load callback in middle of drawing routine.");
            else if (b)
                if (c < D) y.log("Ignoring tile " + a + " loaded before reset: " + a.url);
                else {
                    a.loaded = m;
                    a.image = b;
                    c = V.length;
                    if (V.length >= va) {
                        for (var b = d.ceil(d.log(O) / d.log(2)), e = h, g = -1, f = V.length - 1; 0 <= f; f--) {
                            var j = V[f];
                            if (!(j.level <= b || j.beingDrawn))
                                if (e) {
                                    var l = j.lastTouchTime,
                                        t = e.lastTouchTime,
                                        B = j.level,
                                        u = e.level;
                                    if (l < t || l == t && B > u) e = j, g = f
                                } else e = j, g = f
                        }
                        e && 0 <= g && (e.unload(), c = g)
                    }
                    V[c] = a;
                    F = m
                } else y.log("Tile " + a + " failed to load: " + a.url), a.exists = n
        }

        function u(a, c, b) {
            if (!S[a]) return n;
            if (c === q || b === q) {
                var a = S[a],
                    e;
                for (e in a)
                    if (a.hasOwnProperty(e)) {
                        var c = a[e],
                            g;
                        for (g in c)
                            if (c.hasOwnProperty(g) && !c[g]) return n
                    }
                return m
            }
            return S[a][c] === q || S[a][c][b] === q || S[a][c][b] === m
        }

        function x(a, c, b, e) {
            S[a] ? (S[a][c] || (S[a][c] = {}), S[a][c][b] = e) : y.error("Setting coverage for a tile before its level's coverage has been reset: " + a)
        }

        function p(a) {
            for (var c = da.length - 1; 0 <= c; c--)
                if (da[c].elmt == a) return c;
            return -1
        }
        var r = c.getElement(f),
            s = c.makeNeutralElement(Ba ? "canvas" : "div"),
            E = Ba ? s.getContext("2d") : h,
            K = new t,
            A = new qa,
            v = a.minLevel,
            P = a.maxLevel,
            O = a.tileSize,
            G = a.tileOverlap,
            C = a.height / a.width,
            ka = {}, ja = {}, H = {}, V = [],
            S = {}, da = [],
            N = [],
            Ta = 0,
            D = 0,
            ya = n,
            F = m;
        this.elmt = r;
        this.profiler = A;
        s.style.width = "100%";
        s.style.height = "100%";
        s.style.position = "absolute";
        r.style.textAlign = "left";
        r.appendChild(s);
        this.addOverlay = function (a, b, e) {
            a = c.getElement(a);
            0 <= p(a) || (da.push(new X(a, b, e)), F = m)
        };
        this.updateOverlay = function (a, b, e) {
            a = c.getElement(a);
            a = p(a);
            0 <= a && (da[a].update(b, e), F = m)
        };
        this.removeOverlay = function (a) {
            a = c.getElement(a);
            a = p(a);
            0 <= a && (da[a].destroy(),
                da.splice(a, 1), F = m)
        };
        this.clearOverlays = function () {
            for (; 0 < da.length;) da.pop().destroy(), F = m
        };
        this.needsUpdate = function () {
            return F
        };
        this.numTilesLoaded = function () {
            return V.length
        };
        this.reset = function () {
            H = {};
            V = [];
            D = (new Date).getTime();
            F = m
        };
        this.update = function () {
            A.beginUpdate();
            ya = m;
            for (F = n; 0 < N.length;) {
                var f = N.pop();
                f.beingDrawn = n
            }
            var t = b.getContainerSize(),
                p = t.x,
                t = t.y;
            Ba ? (s.width = p, s.height = t, E.clearRect(0, 0, p, t)) : s.innerHTML = z;
            var p = b.getBounds(m),
                y = p.getTopLeft(),
                O = p.getBottomRight();
            if (e.wrapHorizontal || !(0 > O.x || 1 < y.x))
                if (e.wrapVertical || !(0 > O.y || y.y > C)) {
                    var V = Ta,
                        ja = U === L.CHROME,
                        qa = d.abs,
                        p = d.floor,
                        D = d.log,
                        R = d.max,
                        I = d.min,
                        t = b.deltaPixelsFromPoints,
                        aa = b.pixelFromPoint,
                        ma = a.getTileAtPoint,
                        W = e.alwaysBlend,
                        ba = 1E3 * e.blendTime,
                        Q = e.immediateRender,
                        pa = e.minZoomDimension,
                        T = e.wrapHorizontal,
                        ea = e.wrapVertical,
                        ha = e.wrapOverlays;
                    T || (y.x = R(y.x, 0), O.x = I(O.x, 1));
                    ea || (y.y = R(y.y, 0), O.y = I(O.y, C));
                    for (var na = h, ca = n, Z = (new Date).getTime(), ia = b.getCenter(), Ca = aa(ia), ga = t(j(0), n).x, Q = Q ? 1 : ga, R = R(v, p(D(pa || 64) / D(2))), pa =
                            t(j(0), m).x, D = I(P, p(D(pa / B) / D(2))), R = I(R, D); D >= R; D--) {
                        pa = n;
                        ga = t(j(D), m).x;
                        if (!ca && ga >= B || D == R) ca = pa = m;
                        else if (!ca) continue;
                        S[D] = {};
                        var ga = I(1, (ga - J) / J),
                            Ra = t(j(D), n).x,
                            Ra = Q / qa(Q - Ra),
                            Wa = ma(D, y),
                            Ha = ma(D, O),
                            Ia, Ea = D;
                        ka[Ea] || (ka[Ea] = a.getNumTiles(Ea));
                        Ia = ka[Ea];
                        Ea = Ia.x;
                        Ia = Ia.y;
                        T || (Ha.x = I(Ha.x, Ea - 1));
                        ea || (Ha.y = I(Ha.y, Ia - 1));
                        for (var wa = Wa.x; wa <= Ha.x; wa++)
                            for (var xa = Wa.y; xa <= Ha.y; xa++) {
                                var Y = D,
                                    oa = wa,
                                    ra = xa,
                                    f = Z,
                                    fa = Ea,
                                    ta = Ia;
                                H[Y] || (H[Y] = {});
                                H[Y][oa] || (H[Y][oa] = {});
                                if (!H[Y][oa][ra]) {
                                    var Ka = (fa + oa % fa) % fa,
                                        la = (ta +
                                            ra % ta) % ta,
                                        X = a.getTileBounds(Y, Ka, la),
                                        va = a.tileExists(Y, Ka, la),
                                        Aa = a.getTileUrl(Y, Ka, la);
                                    X.x += 1 * (oa - Ka) / fa;
                                    X.y += C * (ra - la) / ta;
                                    H[Y][oa][ra] = new ua(Y, oa, ra, X, va, Aa)
                                }
                                Y = H[Y][oa][ra];
                                Y.lastTouchTime = f;
                                f = Y;
                                Y = pa;
                                x(D, wa, xa, n);
                                f.exists && (ca && !Y && ((wa === q || xa === q ? u(D + 1) : u(D + 1, 2 * wa, 2 * xa) && u(D + 1, 2 * wa, 2 * xa + 1) && u(D + 1, 2 * wa + 1, 2 * xa) && u(D + 1, 2 * wa + 1, 2 * xa + 1)) ? x(D, wa, xa, m) : Y = m), Y && (fa = f.bounds.getTopLeft(), ra = f.bounds.getSize(), Y = aa(fa, m), oa = t(ra, m), G || (oa = oa.plus(new l(1, 1))), fa = aa(fa, n), ra = t(ra, n), ra = fa.plus(ra.divide(2)),
                                    ra = Ca.distanceTo(ra), f.position = Y, f.size = oa, f.distance = ra, f.visibility = Ra, f.loaded ? (f.blendStart || (f.blendStart = Z), Y = Z - f.blendStart, oa = 0 === ba ? 1 : I(1, Y / ba), W && (oa *= ga), f.opacity = oa, N.push(f), 1 <= oa ? (x(D, wa, xa, m), ja && f.lastDrawnTime !== V && x(D, wa, xa, n)) : Y < ba && (F = m), f.lastDrawnTime = Z) : f.loading || (na = !na || f.visibility > na.visibility || f.visibility == na.visibility && f.distance < na.distance ? f : na)))
                            }
                        if (u(D)) break
                    }
                    for (y = N.length - 1; 0 <= y; y--) f = N[y], Ba ? f.drawCanvas(E) : f.drawHTML(s), f.beingDrawn = m;
                    O = da.length;
                    for (y = 0; y <
                        O; y++) V = da[y], ja = V.bounds, qa = ja.getTopLeft(), ha && T && (qa.x += p(ia.x)), V.position = aa(qa, m), V.size = t(ja.getSize(), m), V.drawHTML(r);
                    na && (na.loading = K.loadImage(na.url, c.createCallback(h, k, na, Z)), F = m);
                    Ta = Z
                }
            ya = n;
            A.endUpdate()
        };
        this.idle = function () {}
    };
    var ta, Ja = function (a, b, e) {
            var f = c.makeNeutralElement("span");
            this.elmt = a;
            this.anchor = b;
            this.container = e;
            this.wrapper = f;
            f.style.display = "inline-block";
            f.appendChild(a);
            b == ta.NONE && (f.style.width = f.style.height = "100%");
            b == ta.TOP_RIGHT || b == ta.BOTTOM_RIGHT ? e.insertBefore(f,
                e.firstChild) : e.appendChild(f)
        }, Ya = c.getBrowser();
    ta = C.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4
    };
    Ja.prototype.destroy = function () {
        this.wrapper.removeChild(this.elmt);
        this.container.removeChild(this.wrapper)
    };
    Ja.prototype.isVisible = function () {
        return this.wrapper.style.display != E
    };
    Ja.prototype.setVisible = function (a) {
        this.wrapper.style.display = a ? "inline-block" : E
    };
    Ja.prototype.setOpacity = function (a) {
        this.elmt["----seadragon----"] && Ya == L.IE ? c.setElementOpacity(this.elmt,
            a, m) : c.setElementOpacity(this.wrapper, a, m)
    };
    C.Viewer = function (g) {
        function t(b) {
            b = a.createTextNode(b);
            L.innerHTML = z;
            L.appendChild(c.makeCenteredNode(b));
            b = b.parentNode.style;
            b.fontFamily = "verdana";
            b.fontSize = "13px";
            b.fontSizeAdjust = E;
            b.fontStyle = "normal";
            b.fontStretch = "normal";
            b.fontVariant = "normal";
            b.fontWeight = "normal";
            b.lineHeight = "1em";
            b.textAlign = "center";
            b.textDecoration = E
        }

        function k() {
            J && u();
            la = (new Date).getTime();
            b.setTimeout(function () {
                la > ua && t(j.getString("Messages.Loading"))
            }, 2E3);
            return la
        }

        function B(a, e, j) {
            ua = (new Date).getTime();
            a < la ? (y.log("Ignoring out-of-date open."), I.trigger("ignore", U)) : e ? (L.innerHTML = z, X = c.getElementSize(g), 0 === X.x || 0 === X.y ? b.setTimeout(function () {
                B(a, e, j)
            }, f) : (J = e, F = new pa(X, J.dimensions), N = new r(J, F, L), ya = new qa, U.source = J, U.viewport = F, U.drawer = N, U.profiler = ya, Da = n, La = m, x(s), I.trigger("open", U))) : (t(j), I.trigger("error", U))
        }

        function u() {
            U.source = J = h;
            U.viewport = F = h;
            U.drawer = N = h;
            U.profiler = ya = h;
            L.innerHTML = z
        }

        function x(a, c) {
            if (Da) return b.setTimeout(a, 1);
            var e =
                (new Date).getTime(),
                e = d.max(1, (c ? c : e) + 1E3 / 60 - e);
            return b.setTimeout(a, e)
        }

        function p() {
            if (J) {
                ya.beginUpdate();
                var a = c.getElementSize(g);
                !a.equals(X) && (0 < a.x && 0 < a.y) && (F.resize(a, m), X = a, I.trigger("resize", U));
                a = F.update();
                !Da && a && (I.trigger("animationstart", U), O());
                a ? (N.update(), I.trigger("animation", U)) : La || N.needsUpdate() ? (N.update(), La = n) : N.idle();
                Da && !a && (I.trigger("animationfinish", U), !Ma && v());
                Da = a;
                ya.endUpdate()
            }
        }

        function s() {
            if (J) {
                var a = (new Date).getTime();
                p();
                x(arguments.callee, a)
            }
        }

        function K(a) {
            for (var c =
                Q.length - 1; 0 <= c; c--)
                if (Q[c].elmt == a) return c;
            return -1
        }

        function q() {
            b.setTimeout(A, 20)
        }

        function A() {
            if (W) {
                for (var a = 1 - ((new Date).getTime() - T) / ga, a = d.min(1, a), a = d.max(0, a), c = Q.length - 1; 0 <= c; c--) Q[c].setOpacity(a);
                0 < a && q()
            }
        }

        function O() {
            W = n;
            for (var a = Q.length - 1; 0 <= a; a--) Q[a].setOpacity(1)
        }

        function v() {
            e.autoHideControls && (W = m, T = (new Date).getTime() + ca, b.setTimeout(q, ca))
        }

        function D() {
            Ma = m;
            O()
        }

        function G(a, c, b) {
            b || (Ma = n, !Da && v())
        }

        function C(a) {
            a = c.getEvent(a);
            27 === a.keyCode && U.setFullPage(n)
        }
        var U = this,
            V = c.getElement(g),
            g = c.makeNeutralElement("div"),
            L = c.makeNeutralElement("div"),
            ja = c.makeNeutralElement("div"),
            H = c.makeNeutralElement("div"),
            da = c.makeNeutralElement("div"),
            ka = c.makeNeutralElement("div"),
            J = h,
            N = h,
            F = h,
            ya = h,
            I = new fa,
            aa = new R(L),
            ma = new R(g),
            Q = [],
            W = m,
            T = h,
            Z = h,
            ca = 1E3,
            ga = 2E3,
            T = h,
            W = n,
            ea = a.body.style.width,
            ha = a.body.style.height,
            ia = a.body.style.overflow,
            Ba = a.documentElement.style.overflow,
            Ca = new l(1, 1),
            X = h,
            la = 0,
            ua = 0,
            va = h,
            Aa = h,
            Da = n,
            La = n,
            Ma = n;
        this.container = V;
        this.elmt = g;
        this.profiler = this.viewport =
            this.drawer = this.source = h;
        this.tracker = aa;
        this.isOpen = function () {
            return !!J
        };
        this.openDzi = function (a, b) {
            var e = k(),
                e = c.createCallback(h, B, e);
            switch (typeof a) {
            case "string":
                S.createFromXml(a, b, e);
                break;
            default:
                S.createFromJson(a, e)
            }
        };
        this.openTileSource = function (a) {
            var c = k();
            b.setTimeout(function () {
                B(c, a)
            }, 1)
        };
        this.close = function () {
            J && u()
        };
        this.addControl = function (a, b) {
            a = c.getElement(a);
            if (!(0 <= K(a))) {
                var e = h;
                switch (b) {
                case ta.TOP_RIGHT:
                    e = H;
                    a.style.position = "relative";
                    break;
                case ta.BOTTOM_RIGHT:
                    e = da;
                    a.style.position = "relative";
                    break;
                case ta.BOTTOM_LEFT:
                    e = ka;
                    a.style.position = "relative";
                    break;
                case ta.TOP_LEFT:
                    e = ja;
                    a.style.position = "relative";
                    break;
                default:
                    e = g, a.style.position = "absolute"
                }
                Q.push(new Ja(a, b, e))
            }
        };
        this.removeControl = function (a) {
            a = c.getElement(a);
            a = K(a);
            0 <= a && (Q[a].destroy(), Q.splice(a, 1))
        };
        this.clearControls = function () {
            for (; 0 < Q.length;) Q.pop().destroy()
        };
        this.getNavControl = function () {
            return Z
        };
        this.isDashboardEnabled = function () {
            for (var a = Q.length - 1; 0 <= a; a--)
                if (Q[a].isVisible()) return m;
            return n
        };
        this.isFullPage = function () {
            return g.parentNode == a.body
        };
        this.isMouseNavEnabled = function () {
            return aa.isTracking()
        };
        this.isVisible = function () {
            return g.style.visibility != P
        };
        this.setDashboardEnabled = function (a) {
            for (var c = Q.length - 1; 0 <= c; c--) Q[c].setVisible(a)
        };
        this.setFullPage = function (b) {
            if (b != U.isFullPage()) {
                var e = a.body,
                    f = e.style,
                    j = a.documentElement.style,
                    t = g.style,
                    B = L.style;
                b ? (ia = f.overflow, Ba = j.overflow, f.overflow = P, j.overflow = P, ea = f.width, ha = f.height, f.width = "100%", f.height = "100%", B.backgroundColor =
                    "black", B.color = "white", t.position = "fixed", t.zIndex = "99999999", e.appendChild(g), X = c.getWindowSize(), c.addEvent(a, "keydown", C), D()) : (f.overflow = ia, j.overflow = Ba, f.width = ea, f.height = ha, B.backgroundColor = z, B.color = z, t.position = "relative", t.zIndex = z, V.appendChild(g), X = c.getElementSize(V), c.removeEvent(a, "keydown", C), G());
                F && (e = F.getBounds(), F.resize(X), f = F.getBounds(), b ? Ca = new l(f.width / e.width, f.height / e.height) : (F.update(), F.zoomBy(d.max(Ca.x, Ca.y), h, m)), La = m, I.trigger("resize", U), p())
            }
        };
        this.setMouseNavEnabled =
            function (a) {
                aa.setTracking(a)
        };
        this.setVisible = function (a) {
            g.style.visibility = a ? z : P
        };
        this.showMessage = function (a, c) {
            c ? b.setTimeout(function () {
                !U.isOpen() && t(a)
            }, c) : t(a)
        };
        this.addEventListener = function (a, c) {
            I.addListener(a, c)
        };
        this.removeEventListener = function (a, c) {
            I.removeListener(a, c)
        };
        var na = L.style,
            Ga = g.style,
            Na = ja.style,
            Oa = H.style,
            Pa = da.style,
            Qa = ka.style;
        Ga.width = "100%";
        Ga.height = "100%";
        Ga.position = "relative";
        Ga.left = "0px";
        Ga.top = "0px";
        Ga.textAlign = "left";
        na.width = "100%";
        na.height = "100%";
        na.overflow =
            P;
        na.position = "absolute";
        na.top = "0px";
        na.left = "0px";
        Na.position = Oa.position = Pa.position = Qa.position = "absolute";
        Na.top = Oa.top = "0px";
        Na.left = Qa.left = "0px";
        Oa.right = Pa.right = "0px";
        Qa.bottom = Pa.bottom = "0px";
        aa.clickHandler = function (a, c, b, f) {
            F && b && (a = e.zoomPerClick, F.zoomBy(f ? 1 / a : a, F.pointFromPixel(c, m)), F.applyConstraints())
        };
        aa.pressHandler = function (a, c) {
            F && (va = c, Aa = F.getCenter())
        };
        aa.dragHandler = function (a, c, b) {
            F && (e.constrainDuringPan ? (a = c.minus(va), a = F.deltaPointsFromPixels(a.negate(), m), F.panTo(Aa.plus(a)),
                F.applyConstraints()) : F.panBy(F.deltaPointsFromPixels(b.negate(), m)))
        };
        aa.releaseHandler = function (a, c, b) {
            b && F && F.applyConstraints()
        };
        aa.scrollHandler = function (a, c, b) {
            F && (a = d.pow(e.zoomPerScroll, b), F.zoomBy(a, F.pointFromPixel(c, m)), F.applyConstraints())
        };
        aa.setTracking(m);
        ma.enterHandler = D;
        ma.exitHandler = G;
        ma.releaseHandler = function (a, c, b, e) {
            e || (Ma = n, !Da && v())
        };
        ma.setTracking(m);
        b.setTimeout(v, 1);
        g.appendChild(L);
        g.appendChild(ja);
        g.appendChild(H);
        g.appendChild(da);
        g.appendChild(ka);
        V.innerHTML = z;
        V.appendChild(g)
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
        getTileServerDomainName: function (b) {
            b = Math.floor(b / 1E3);
            return "tile" + (10 > b ? "0" : "") + b + ".gigapan.org"
        },
        getTilesPath: function (b, a) {
            return org.gigapan.utils.GigapanTiles.getTileServerDomainName(b) + ("/gigapans0/" + b + "/tiles" + (null == a ? "" : "." + a) + "/")
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
    org.gigapan.seadragon.GigapanTileSource = function (b, a, d, q, k) {
        Seadragon.TileSource.call(this, q, k, 256, 0, 8);
        var v = "http://" + b + "/gigapans0/" + a + "/tiles",
            p = ["0", "1", "2", "3"];
        null != d && 0 < d.length && (v += "." + d);
        this.getTileUrl = function (a, b, d) {
            8 > a ? a = 0 : 8 <= a && (a -= 8);
            for (var k = "r", a = 1 << a >> 1; a;) k += p[(b & a ? 1 : 0) + (d & a ? 2 : 0)], a >>= 1;
            b = v;
            for (d = 0; d < k.length - 3;) b += "/" + k.substr(d, 3), d += 3;
            return b + "/" + k + ".jpg"
        };
        this.getTileBounds = function (a, b, d) {
            a = 1 / this.dimensions.times(this.getLevelScale(a)).x;
            return new Seadragon.Rect((0 ===
                b ? 0 : this.tileSize * b - this.tileOverlap) * a, (0 === d ? 0 : this.tileSize * d - this.tileOverlap) * a, (this.tileSize + (0 === b ? 1 : 2) * this.tileOverlap) * a, (this.tileSize + (0 === d ? 1 : 2) * this.tileOverlap) * a)
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
if (org.gigapan.seadragon) {
    if ("object" != typeof org.gigapan.seadragon) throw orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object", alert(orgGigapanSeadragonExistsMessage), Error(orgGigapanSeadragonExistsMessage);
} else org.gigapan.seadragon = {}; if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
(function () {
    org.gigapan.seadragon.SeadragonUtils = function () {};
    org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect = function (b, a, d, q, k) {
        b /= k;
        a /= k;
        return new Seadragon.Rect(b, a, d / k - b, q / k - a)
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect = function (b, a, d, q, k) {
        return {
            xmin: b * k,
            ymin: a * k,
            xmax: d * k,
            ymax: q * k
        }
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonPointToGigapanPoint = function (b, a) {
        return new Seadragon.Point(b.x * a, b.y * a)
    };
    org.gigapan.seadragon.SeadragonUtils.convertGigapanPointToSeadragonPoint =
        function (b, a, d) {
            return new Seadragon.Point(b / d, a / d)
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonViewerCoordsToSeadragonCoords = function (b, a) {
        return a.viewport.pointFromPixel(b)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonViewerCoords = function (b, a) {
        var d = Seadragon.Utils.getElementPosition(a.elmt);
        return b.minus(d)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonCoords = function (b, a) {
        var d = this.convertPageCoordsToSeadragonViewerCoords(b, a);
        return this.convertSeadragonViewerCoordsToSeadragonCoords(d,
            a)
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
        var b = {};
        this.addEventListener = function (a, d) {
            a && (d && "function" == typeof d) && (b[a] || (b[a] = []), b[a].push(d))
        };
        this.removeEventListener = function (a, d) {
            if (a && b[a] && d && "function" == typeof d)
                for (var q = 0; q < b[a].length; q++)
                    if (d == b[a][q]) {
                        b[a].splice(q, 1);
                        break
                    }
        };
        this.publishEvent = function (a, d) {
            if (a) {
                var q = b[a];
                if (q)
                    for (var k = 0; k < q.length; k++) try {
                        if ("function" === typeof d) d(q[k]);
                        else if ("undefined" === typeof d) q[k]();
                        else console.log("EVENTS_MANAGER.publishEvent(): unexpected argument [" +
                            d + "]")
                    } catch (v) {
                        console.log(v.name + " while publishing event '" + a + "': " + v.message, v)
                    }
            }
        }
    }
})(); if (org) {
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
    org.gigapan.multitouch.Touch = function (b) {
        var a = (new Date).getTime(),
            d = b.identifier,
            q = new Seadragon.Point(b.pageX, b.pageY),
            k = new Seadragon.Point(b.pageX, b.pageY),
            v = !0;
        this.update = function (a) {
            q.x = k.x;
            q.y = k.y;
            k.x = a.pageX;
            k.y = a.pageY
        };
        this.getIdentifier = function () {
            return d
        };
        this.getCurrentPoint = function () {
            return k
        };
        this.getPreviousPoint = function () {
            return q
        };
        this.getDeltaFromPrevious = function () {
            return q.minus(k)
        };
        this.getStartingTimestamp = function () {
            return a
        };
        this.flagThisTouchAsNotBeingTheOnlyOne =
            function () {
                v = !1
        };
        this.isThisTheOnlyTouch = function () {
            return v
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
        var b = new org.gigapan.events.EventManager,
            a = 0,
            d = [],
            q = [],
            k = 1,
            v = null,
            p = !1,
            x = function (b) {
                var f = b.getIdentifier();
                d["t" + f] = b;
                a++;
                if (1 < a)
                    for (var h in d)(b = d[h]) && b.flagThisTouchAsNotBeingTheOnlyOne();
                p = !p && 1 == a
            }, f = function (a) {
                if (a) {
                    console.log("registerTouch(" + a.identifier + ")");
                    var b = d["t" + a.identifier];
                    if (b) b.update(a);
                    else {
                        var f = "t" + a.identifier;
                        (b = q[f]) ? (delete q[f], x(b), p = !1) : x(new org.gigapan.multitouch.Touch(a))
                    }
                }
            }, P = function (a) {
                p = !1;
                if (a) {
                    var b =
                        d["t" + a.identifier];
                    b ? b.update(a) : x(new org.gigapan.multitouch.Touch(a))
                }
            }, s = function (e, f) {
                if (e) {
                    var h = d["t" + e.identifier];
                    if (h) {
                        var m = "t" + e.identifier;
                        f && (q[m] = d[m]);
                        delete d[m];
                        a--;
                        console.log("unregisterTouch(" + h.getIdentifier() + "): size=[" + a + "]");
                        if (0 == a && p && h.isThisTheOnlyTouch()) {
                            var l = (new Date).getTime() - h.getStartingTimestamp(),
                                h = h.getCurrentPoint(),
                                k = new Seadragon.Point(h.x, h.y);
                            b.publishEvent("tap", function (a) {
                                a(k, l)
                            })
                        }
                    }
                }
                p = !1
            }, A = function () {
                var a = [],
                    b;
                for (b in d) a[a.length] = d[b];
                return a
            },
            E = function (a) {
                if (a) {
                    console.log("_onTouchStart(" + a + ")");
                    a.preventDefault();
                    for (var a = a.changedTouches, b = 0; b < a.length; b++) f(a.item(b))
                }
            };
        this.onTouchStart = E;
        this.onTouchStartMozilla = function (a) {
            a && (J(a), a.preventDefault(), f(a), z())
        };
        this.onTouchStartChrome = function (b) {
            b && (E(b), console.log("onTouchStartChrome(" + b + ") size=" + a), z())
        };
        var z = function () {
            if (2 == a) {
                k = 1;
                v = null;
                var b = A();
                if (b[0] && b[1]) {
                    var f = b[0].getCurrentPoint().distanceTo(b[1].getCurrentPoint());
                    b[0].distance = f;
                    b[1].distance = f;
                    b[0].scale =
                        1;
                    b[1].scale = 1
                }
            }
        };
        this.onTouchMove = function (b) {
            if (b) {
                b.preventDefault();
                p = !1;
                for (var b = b.changedTouches, f = 0; f < b.length; f++) P(b.item(f));
                1 == a && h(b.item(0).identifier)
            }
        };
        this.onTouchMoveMozilla = function (b) {
            if (b) {
                J(b);
                var f = d["t" + b.identifier];
                if ("undefined" !== typeof f && null != f && (f.getCurrentPoint().x != b.pageX || f.getCurrentPoint().y != b.pageY)) b.preventDefault(), p = !1, b.pageX = b.layerX, b.pageY = b.layerY, b.identifier = b.streamId, P(b), 1 == a ? h(b.identifier) : 2 == a && m()
            }
        };
        this.onTouchMoveChrome = function (b) {
            if (b) {
                b.preventDefault();
                p = !1;
                for (var b = b.changedTouches, f = 0; f < b.length; f++) P(b.item(f));
                1 == a ? h(b.item(0).identifier) : 2 == a ? m() : console.log("!!!!!!!!!!!!!!!onTouchMoveChrome(): size = " + a)
            }
        };
        var h = function (e) {
            if (1 == a && (e = d["t" + e])) {
                var f = e.getDeltaFromPrevious();
                b.publishEvent("pan", function (a) {
                    a(f)
                })
            }
        }, m = function () {
                if (2 == a) {
                    var b = A();
                    if (b[0] && b[1]) {
                        var f = b[0].distance,
                            d = b[0].getCurrentPoint().distanceTo(b[1].getCurrentPoint());
                        console.log("prev [" + f + "] new [" + d + "]");
                        f = d / f;
                        b[0].scale = f;
                        b[1].scale = f;
                        C(f)
                    } else console.log("AAAHHHH!!! theTouches.length=[" +
                        b.length + "]")
                }
            }, J = function (a) {
                a && (a.pageX = a.layerX, a.pageY = a.layerY, a.identifier = a.streamId)
            }, n = function (a) {
                if (a) {
                    var a = a.changedTouches,
                        b = 1 < a.length;
                    b && (p = !1);
                    for (var f = 0; f < a.length; f++) s(a.item(f), b)
                }
            };
        this.onTouchEndMozilla = function (a) {
            a && (J(a), s(a, !1))
        };
        this.onTouchEnd = function (a) {
            n(a)
        };
        this.onTouchCancel = function (a) {
            n(a)
        };
        this.onGestureStart = function (b) {
            b && (p = !1, b.preventDefault(), 2 == a && (k = 1, v = null))
        };
        this.onGestureChange = function (a) {
            a && (p = !1, a.preventDefault(), C(a.scale))
        };
        var C = function (f) {
            if (2 ==
                a) {
                var d = A();
                if (d[0] && d[1]) {
                    var h = Math.max(0.8, Math.min(1.2, 1 + f - k));
                    null == v && (v = d[0].getCurrentPoint().plus(d[1].getCurrentPoint()).divide(2));
                    b.publishEvent("pinch", function (a) {
                        a(h, d[0], d[1], v)
                    })
                }
                k = f
            }
        };
        this.onGestureEnd = function (b) {
            b && (p = !1, 2 == a && (k = 1, v = null))
        };
        this.addEventListener = b.addEventListener;
        this.removeEventListener = b.removeEventListener;
        this.publishEvent = b.publishEvent
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
    org.gigapan.viewers.SeadragonViewer = function (b, a, d) {
        function q() {
            la = (new Date).getTime();
            ua = Seadragon.Config.zoomPerSecond;
            T = !0;
            window.setTimeout(p, 10)
        }

        function k() {
            la = (new Date).getTime();
            ua = 1 / Seadragon.Config.zoomPerSecond;
            T = !0;
            window.setTimeout(p, 10)
        }

        function v() {
            T = !1
        }

        function p() {
            if (T && c.viewport) {
                var a = (new Date).getTime(),
                    b = Math.pow(ua, (a - la) / 1E3);
                c.viewport.zoomBy(b);
                c.viewport.applyConstraints();
                la = a;
                window.setTimeout(p, 10)
            }
        }

        function x() {
            c.viewport && (T = !1, c.viewport.zoomBy(Seadragon.Config.zoomPerClick /
                1), c.viewport.applyConstraints())
        }

        function f() {
            c.viewport && (T = !1, c.viewport.zoomBy(1 / Seadragon.Config.zoomPerClick), c.viewport.applyConstraints())
        }

        function P() {
            r.FooterControl.updateSize();
            O && r.SnapshotBrowser.updateSize()
        }

        function s() {
            var a = c.viewport.getCenter();
            fullScreenApi.supportsFullScreen && !isMobileDeviceUserAgent ? fullScreenApi.isFullScreen() ? (Z && !ha && A(!1), document.getElementById(b).style.height = K, document.getElementById(b).style.width = u, fullScreenApi.cancelFullScreen(document.getElementById(b),
                origWidth, origHeight), $("#take-snapshot-button").show()) : (origWidth = document.getElementById(b).style.width, origHeight = document.getElementById(b).style.height, fullScreenApi.requestFullScreen(document.getElementById(b)), $("#take-snapshot-button").hide(), Z && !ha && A(!0)) : c.isFullPage() ? (A(!1), c.setFullPage(!1), $("#take-snapshot-button").show()) : (c.setFullPage(!0), Z && !ha && (A(!0), $("#take-snapshot-button").hide()));
            window.setTimeout(function () {
                c.viewport.panTo(a)
            }, 1500)
        }

        function A(a) {
            a ? (r.GigapanWatermarkControl =
                new org.gigapan.viewer.GigapanWatermarkControl, c.addControl(r.GigapanWatermarkControl.getElement(), r.GigapanWatermarkControl.getSeadragonControlAnchor()), r.GigapanWatermarkControl.initialize()) : !ha && Z ? c.removeControl(r.GigapanWatermarkControl.getElement()) : ""
        }

        function E() {
            FB.ui({
                method: "feed",
                link: "http://www.gigapan.com/gigapans/" + pa,
                display: "popup"
            }, function () {})
        }

        function z() {
            window.open("http://twitter.com/intent/tweet?source=webclient&text=" + encodeURIComponent("http://www.gigapan.com/gigapans/" +
                pa), "Twitter", "height=400,width=500")
        }

        function h() {
            window.open("http://www.linkedin.com/cws/share?summary=" + gigapan.name + "&url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + pa) + "&title=" + gigapan.name, "LinkedIn", "height=400,width=500")
        }

        function m() {
            window.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + pa) + "&media=" + encodeURIComponent("http://api.gigapan.org/beta/gigapans/" + pa + "-600x400.jpg") + "&description=" + gigapan.name, "Pinterest",
                "height=400,width=500")
        }

        function J() {
            window.open("https://plus.google.com/share?url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + pa), "Google+", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500")
        }

        function n() {
            var c = window.location.hostname; - 1 != c.indexOf("localhost") || -1 != c.indexOf(".gigapan.") ? window.location = "/gigapans/" + a.id + "/prints/new" : window.open("http://www.gigapan.com/gigapans/" + a.id + "/prints/new")
        }

        function C() {
            S && r.GigapanRelatedControl.isVisible() && r.GigapanRelatedControl.toggleVisibility();
            D && D.isVisible() && D.setVisible(!1);
            r.SnapshotBrowser.toggleVisibility()
        }

        function e() {
            O && r.SnapshotBrowser.isVisible() && r.SnapshotBrowser.toggleVisibility();
            D && D.isVisible() && D.setVisible(!1);
            r.GigapanRelatedControl.toggleVisibility()
        }

        function j() {
            user && null != user && (!1 != user.logged_in || user.login && 0 < user.login.length) ? ($(".save-snapshot").unbind("click"), $(".cancel-snapshot").unbind("click"), $("#close-snapshot").unbind("click"), va || (D.setGigapanDimensions(a.width, a.height), O && r.SnapshotBrowser.isVisible() &&
                r.SnapshotBrowser.toggleVisibility()), y(), va = !va) : showLoginWindow("takeSnapshot")
        }

        function y() {
            D.setVisible(!D.isVisible());
            D.isVisible() ? (jQuery("#close-snapshot").unbind("click"), jQuery("#close-snapshot").click(function () {
                G()
            }), $("#snapshot_tool_dialog_window .save-snapshot").click(qa), $("#snapshot_tool_dialog_window .cancel-snapshot").click(G), O && r.SnapshotBrowser.isVisible() && r.SnapshotBrowser.toggleVisibility(), S && r.GigapanRelatedControl.isVisible() && r.GigapanRelatedControl.toggleVisibility()) :
                jQuery("#close-snapshot").unbind("click")
        }

        function qa() {
            var c = $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_name").val(),
                b = $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_description").val();
            if ("" != c && "" != b) {
                $("#saving_snapshot_spinner").css("display", "block");
                $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_name").val("");
                $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_description").val("");
                var f = D.getToolBoundsInGigapanCoords(),
                    e = f.getTopLeft(),
                    f = f.getBottomRight();
                $.ajax({
                    url: "/snapshots",
                    data: {
                        "snapshot[user_id]": user.id,
                        "snapshot[gigapan_id]": null == a.auth_key ? a.id : a.auth_key,
                        "snapshot[name]": c,
                        "snapshot[description]": b,
                        "snapshot[xmin]": e.x,
                        "snapshot[ymin]": e.y,
                        "snapshot[xmax]": f.x,
                        "snapshot[ymax]": f.y
                    },
                    type: "POST",
                    dataType: "json",
                    timeout: 15E3
                }).success(function () {
                    $(".save-snapshot").unbind("click");
                    $(".cancel-snapshot").unbind("click");
                    $("#close-snapshot").unbind("click")
                }).error(function () {
                    alert("Error creating snapshot")
                }).always(function () {
                    $("#loading_spinner").css("display",
                        "none");
                    y();
                    window.setTimeout(function () {
                        l();
                        C()
                    }, 100)
                })
            } else alert("Please add a Name and description for your snapshot.")
        }

        function l() {
            c.removeControl(r.SnapshotBrowser.getElement());
            r.SnapshotBrowser = new org.gigapan.viewer.SnapshotBrowser(b);
            c.addControl(r.SnapshotBrowser.getElement(), r.SnapshotBrowser.getSeadragonControlAnchor());
            r.SnapshotBrowser.initialize();
            r.SnapshotBrowser.addSnapshots(a.id, a.auth_key);
            r.SnapshotBrowser.addEventListener("take-snapshot-button-click", j)
        }

        function G() {
            $(".save-snapshot").unbind("click");
            $(".cancel-snapshot").unbind("click");
            $("#close-snapshot").unbind("click");
            y();
            va = !va
        }
        var u = "100%",
            K = "400",
            L, c = null,
            R = !1,
            H = new org.gigapan.multitouch.TouchManager,
            W = org.gigapan.seadragon.SeadragonUtils,
            ea = null,
            I = null,
            ca = isMobileDeviceUserAgent && !0,
            ga = !isMobileDeviceUserAgent && !0,
            ha = !0,
            Z = !1,
            ia = !1,
            fa = !0,
            t = !1,
            O = !1,
            V = !1,
            ja = !0,
            ka = !0,
            S = !0,
            N = !0,
            aa = !0,
            Q = !1,
            da = !1,
            D = null,
            pa = "";
        "undefined" != typeof a.printable && (da = a.printable);
        "undefined" != typeof a.snapshottable && (ja = a.snapshottable);
        "undefined" != typeof a.related &&
            (related = a.related);
        pa = null == a.auth_key ? a.id : a.auth_key;
        "undefined" != typeof a.options && ("undefined" != typeof a.options.showGigapanWatermarkOnFullscreen && (Z = a.options.showGigapanWatermarkOnFullscreen ? !0 : !1), "undefined" != typeof a.options.showGigapanWatermarkByDefault && (ha = a.options.showGigapanWatermarkByDefault ? !0 : !1), "undefined" != typeof a.options.showPrintButton && (ia = a.options.showPrintButton ? !0 : !1), "undefined" != typeof a.options.showResetButton && (fa = a.options.showResetButton ? !0 : !1), "undefined" != typeof a.options.showFullScreenButton &&
            (t = a.options.showFullScreenButton ? !0 : !1), "undefined" != typeof a.options.showSnapshotBrowser && (O = a.options.showSnapshotBrowser ? !0 : !1), "undefined" != typeof a.options.showSnapshotByDefault && (V = a.options.showSnapshotByDefault ? !0 : !1), "undefined" != typeof a.options.showRelatedGigapans && (S = a.options.showRelatedGigapans ? !0 : !1), "undefined" != typeof a.options.showThumbnailNavigation && (aa = a.options.showThumbnailNavigation ? !0 : !1), "undefined" != typeof a.options.showNavigationControl && (N = a.options.showNavigationControl ? !0 : !1), "undefined" != typeof a.options.showSocialSharing && (Q = a.options.showSocialSharing ? !0 : !1), "undefined" != typeof a.options.canCommentOnSnapshots && (ka = a.options.canCommentOnSnapshots ? !0 : !1));
        var r = {}, T = !1,
            ua = null,
            la = null,
            X;
        $(window).resize(function () {
            clearTimeout(X);
            X = setTimeout(P, 100)
        });
        document.onkeydown = function (a) {
            a = a || window.event;
            if (!$("#comment_comment").is(":focus")) switch (a.keyCode) {
            case 107:
            case 187:
                x();
                break;
            case 109:
            case 189:
                f();
                break;
            case 37:
                c.viewport && (c.viewport.panBy(new Seadragon.Point(-0.025,
                    0)), c.viewport.applyConstraints());
                break;
            case 38:
                c.viewport && (c.viewport.panBy(new Seadragon.Point(0, -0.025)), c.viewport.applyConstraints());
                break;
            case 39:
                c.viewport && (c.viewport.panBy(new Seadragon.Point(0.025, 0)), c.viewport.applyConstraints());
                break;
            case 40:
                c.viewport && (c.viewport.panBy(new Seadragon.Point(0, 0.025)), c.viewport.applyConstraints())
            }
        };
        this.setViewBounds = function (b, f, e, d, h) {
            var j = c.viewport.getBounds(),
                l = c.viewport.getHomeBounds(),
                t = org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(f,
                    e, d, h, a.width),
                f = !1;
            j.x < t.x && (j.y < t.y && j.x + j.width > t.x + t.width && j.y + j.height > t.y + t.height) && (f = !0);
            j.equals(l) || j.equals(t) || f ? c.viewport.fitBounds(t) : (c.viewport.fitBounds(l, !1), window.setTimeout(function () {
                c.viewport.fitBounds(t)
            }, 1E3 * Seadragon.Config.animationTime));
            if ("undefined" != typeof window[b]) return window[b]()
        };
        this.showNavigationControls = function () {
            c.addControl(r.GigapanNavigationControl.getElement(), r.GigapanNavigationControl.getSeadragonControlAnchor())
        };
        this.hideNavigationControls = function () {
            c.removeControl(r.GigapanNavigationControl.getElement())
        };
        this.addHotspot = function (b, f, e, d) {
            var h = document.createElement("div"),
                e = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(e.xmin, e.ymin, e.xmax, e.ymax, a.width);
            h.id = b;
            h.className = f;
            "undefined" != typeof d && (h.onclick = d.click, h.onmousedown = d.mousedown, h.ontouchstart = d.touchstart);
            c.drawer.addOverlay(h, e)
        };
        this.showSnapInclusion = function (b, f, e, d, h) {
            var j = document.createElement("div"),
                f = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(f, e, d, h, a.width);
            j.id = "overlay_" + b;
            j.className = "overlay";
            c.drawer.addOverlay(j, f)
        };
        this.hideSnapInclusion = function (a) {
            a = document.getElementById("overlay_" + a);
            c.drawer.removeOverlay(a)
        };
        var va = !1;
        this.takeSnapshotFromLogin = function () {
            j()
        };
        this.deleteSnapshot = function (a) {
            $.ajax({
                url: "/snapshots/" + a,
                data: {
                    id: a
                },
                type: "DELETE",
                dataType: "json",
                timeout: 15E3
            }).success(function () {
                alert("Snapshot successfully deleted.")
            }).error(function () {
                alert("Error deleting snapshot")
            }).always(function () {
                l();
                C()
            })
        };
        this.getViewBounds = function (b) {
            var f =
                c.viewport.getBounds(),
                f = new org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(f.x, f.y, f.x + f.width, f.y + f.height, a.width);
            return window[b](f.xmin, f.ymin, f.xmax, f.ymax)
        };
        this.zoomToFillContainer = function () {
            var b = W.convertGigapanRectToSeadragonRect(0, 0, a.width, a.height, a.width),
                f = c.viewport.pixelFromPoint(b.getTopLeft()),
                e = c.viewport.pixelFromPoint(b.getBottomRight()),
                b = new Seadragon.Rect(0, 0),
                d = c.viewport.getContainerSize(),
                b = new Seadragon.Point(Math.max(f.x, b.x), Math.max(f.y, b.y)),
                e = new Seadragon.Point(Math.min(e.x, d.x), Math.min(e.y, d.y)),
                d = f = null;
            e.x > b.x && e.y > b.y && (b = new Seadragon.Rect(b.x, b.y, e.x - b.x, e.y - b.y), f = b.getCenter(), b.width > b.height ? (b = 0.8 * b.height, d = new Seadragon.Point(1.5 * b, b)) : (b = 0.8 * b.width, d = new Seadragon.Point(b, 2 / 3 * b)));
            b = c.viewport.deltaPointsFromPixels(d);
            e = b.divide(2);
            f = c.viewport.pointFromPixel(f).minus(e);
            f = new Seadragon.Rect(f.x, f.y, b.x, b.y);
            c.viewport.fitBounds(f, !1)
        };
        H.addEventListener("tap", function (a) {
            if (c.isOpen() && c.viewport) {
                var b = Seadragon.Utils.getElementPosition(c.elmt),
                    a = a.minus(b);
                W.convertPageCoordsToSeadragonCoords(a, c)
            }
        });
        H.addEventListener("pan", function (a) {
            c.isOpen() && c.viewport && (a = c.viewport.deltaPointsFromPixels(a), c.viewport.panBy(a), c.viewport.applyConstraints())
        });
        H.addEventListener("pinch", function (a, b, f, e) {
            c.isOpen() && c.viewport && (b = W.convertPageCoordsToSeadragonCoords(e, c), c.viewport.zoomBy(a, b), c.viewport.applyConstraints())
        });
        "undefined" != typeof a.viewport && (ea = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(a.viewport.xmin,
            a.viewport.ymin, a.viewport.xmax, a.viewport.ymax, a.width));
        "undefined" != typeof a.embed && ("undefined" != typeof a.embed.width && (u = a.embed.width), "undefined" != typeof a.embed.height && (K = a.embed.height));
        L = org.gigapan.utils.GigapanTiles.getTileServerDomainName(a.id);
        L = new org.gigapan.seadragon.GigapanTileSource(L, a.id, a.auth_key, a.width, a.height);
        Seadragon.Config.visibilityRatio = 0.5;
        Seadragon.Config.minZoomImageRatio = 0.5;
        Seadragon.Config.autoHideControls = !1;
        Seadragon.Config.imagePath = "/embed_api/img/";
        Seadragon.Config.zoomPerScroll =
            1.075;
        Seadragon.Config.animationTime = 2;
        c = new Seadragon.Viewer(b);
        c.addEventListener("open", function () {
            var a = c.drawer.elmt;
            if (!R && (I = c.viewport.getCenter(), R = !0, -1 != navigator.userAgent.indexOf("Chrome") && -1 != navigator.userAgent.indexOf("Android") ? (Seadragon.Utils.addEvent(a, "touchstart", H.onTouchStartChrome), Seadragon.Utils.addEvent(a, "touchmove", H.onTouchMoveChrome), Seadragon.Utils.addEvent(a, "touchend", H.onTouchEnd), Seadragon.Utils.addEvent(a, "touchcancel", H.onTouchEnd)) : (Seadragon.Utils.addEvent(a,
                    "MozTouchDown", H.onTouchStartMozilla), Seadragon.Utils.addEvent(a, "MozTouchMove", H.onTouchMoveMozilla), Seadragon.Utils.addEvent(a, "MozTouchUp", H.onTouchEndMozilla), Seadragon.Utils.addEvent(a, "touchstart", H.onTouchStart), Seadragon.Utils.addEvent(a, "touchmove", H.onTouchMove), Seadragon.Utils.addEvent(a, "touchend", H.onTouchEnd), Seadragon.Utils.addEvent(a, "touchcancel", H.onTouchCancel), Seadragon.Utils.addEvent(a, "gesturestart", H.onGestureStart), Seadragon.Utils.addEvent(a, "gesturechange", H.onGestureChange),
                Seadragon.Utils.addEvent(a, "gestureend", H.onGestureEnd)), null != ea && c.viewport.fitBounds(ea, !0), ia && da && r.FooterControl.addEventListener("buy-print-click", n), Q && (r.FooterControl.addEventListener("show-share-button-click", r.FooterControl.toggleSocial), r.FooterControl.addEventListener("post-to-facebook-click", E), r.FooterControl.addEventListener("post-to-twitter-click", z), r.FooterControl.addEventListener("post-to-linkedin-click", h), r.FooterControl.addEventListener("post-to-pinterest-click", m), r.FooterControl.addEventListener("post-to-gplus-click",
                J)), O && (r.FooterControl.addEventListener("show-snapshots-button-click", C), ja ? r.SnapshotBrowser.addEventListener("take-snapshot-button-click", j) : $("#take-snapshot-button").remove()), S && r.FooterControl.addEventListener("show-explore-button-click", e), N && (ca && (r.GigapanMobileNavigationControl.addEventListener("zoom-plus-click", x), r.GigapanMobileNavigationControl.addEventListener("zoom-plus-mousedown", q), r.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseup", v), r.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseout",
                v), r.GigapanMobileNavigationControl.addEventListener("zoom-minus-click", f), r.GigapanMobileNavigationControl.addEventListener("zoom-minus-mousedown", k), r.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseup", v), r.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseout", v), fa && r.GigapanMobileNavigationControl.addEventListener("view-all-click", function () {
                c.viewport.goHome()
            }), t && r.GigapanMobileNavigationControl.addEventListener("full-screen-click", s)), ga && (r.GigapanNavigationControl.addEventListener("zoom-plus-click",
                x), r.GigapanNavigationControl.addEventListener("zoom-plus-mousedown", q), r.GigapanNavigationControl.addEventListener("zoom-plus-mouseup", v), r.GigapanNavigationControl.addEventListener("zoom-plus-mouseout", v), r.GigapanNavigationControl.addEventListener("zoom-minus-click", f), r.GigapanNavigationControl.addEventListener("zoom-minus-mousedown", k), r.GigapanNavigationControl.addEventListener("zoom-minus-mouseup", v), r.GigapanNavigationControl.addEventListener("zoom-minus-mouseout", v), fa && r.GigapanNavigationControl.addEventListener("view-all-click",
                function () {
                    c.viewport.goHome()
                }), t && r.GigapanNavigationControl.addEventListener("full-screen-click", s))), V && ja && (C(), window.setTimeout(C, 2E3)), "undefined" != window[d])) return window[d]()
        });
        c.addEventListener("resize", function () {
            if (isMobileDeviceUserAgent) {
                var b = c.viewport.getBounds();
                new org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(b.x, b.y, b.x + b.width, b.y + b.height, a.width);
                c.viewport.panTo(I)
            }
            fullScreenApi.supportsFullScreen && (!isMobileDeviceUserAgent && !fullScreenApi.isFullScreen()) &&
                (Z && !ha) && (A(!1), $("#take-snapshot-button").show())
        });
        c.addEventListener("animationfinish", function () {
            I = c.viewport.getCenter()
        });
        c.addEventListener("animation", function () {
            if (c && c.viewport && c.isOpen() && aa) {
                var a = c.viewport.getBounds(!0);
                r.ThumbnailNavigationControl.updateCurrentViewOutline(a)
            }
        });
        c.setDashboardEnabled(!1);
        c.openTileSource(L);
        "undefined" != typeof a.events && "undefined" != typeof a.events.animation && c.addEventListener("animation", a.events.animation);
        r.FooterControl = new org.gigapan.viewer.FooterControl({
            showPrintButton: ia && da,
            showSnapshotsButton: O,
            showShareButton: Q,
            autoExpandSocial: !1,
            showExploreButton: S
        });
        O && (r.SnapshotBrowser = new org.gigapan.viewer.SnapshotBrowser(b, ka), r.SnapshotBrowser.addSnapshots(a.id, a.auth_key), D = new org.gigapan.viewer.SnapshotTool("snapshot_tool_dialog_window_template", "dialog_title_bar", c, 1.5));
        N && (ka = {
            showViewAllButton: fa,
            showFullScreenButton: t
        }, ga && (r.GigapanNavigationControl = new org.gigapan.viewer.GigapanNavigationControl(ka)), ca && (r.GigapanMobileNavigationControl = new org.gigapan.viewer.GigapanMobileNavigationControl(ka)));
        ha && (r.GigapanWatermarkControl = new org.gigapan.viewer.GigapanWatermarkControl({
            id: null == a.auth_key ? a.id : a.auth_key
        }));
//        S && (r.GigapanRelatedControl = new org.gigapan.viewer.GigapanRelatedControl(related));
        aa && (r.ThumbnailNavigationControl = new org.gigapan.viewer.ThumbnailNavigationControl({
            id: a.id,
            width: a.width,
            height: a.height
        }));
        for (key in r) c.addControl(r[key].getElement(), r[key].getSeadragonControlAnchor());
        for (key in r) r[key].initialize();
//	    setTimeout(this.zoomToFillContainer, 10)	// removes default zoom behavior when loading the image <jps>
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) {
        var orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object";
        alert(orgGigapanViewerExistsMessage);
        throw Error(orgGigapanViewerExistsMessage);
    }
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.GigapanWatermarkControl = function (b) {
        var a = Seadragon.ControlAnchor.BOTTOM_RIGHT,
            d = "http://www.gigapan.com",
            q = document.createElement("div");
        q.id = "gigapan-watermark";
        this.getSeadragonControlAnchor = function () {
            return a
        };
        this.getElement = function () {
            return q
        };
        this.initialize = function () {
//			b && ("undefined" != typeof b.baseUrl && (d = b.baseUrl), "undefined" == typeof b.auth_key && "undefined" != b.id && (d += "/gigapans/" + b.id));
//			q.innerHTML = '<a href="' + d + '" target="_blank"><img alt="GigaPan - See More" title="GigaPan - See More" src="/images/viewer/GigaPanLogo.png"></a>'
			b && ("undefined" != typeof b.baseUrl && (d = b.baseUrl), "undefined" == typeof b.auth_key && "undefined" != b.id && (d += "/gigapans/" + b.id));
			q.innerHTML = ''
      }
    }
})(); if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.GigapanNavigationControl = function (b) {
        function a(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            d.publishEvent(b)
        }
        var d = new org.gigapan.events.EventManager,
            q = !0,
            k = !0,
            v = Seadragon.ControlAnchor.NONE,
            p = document.createElement("div");
        p.id = "gigapan-navigation";
        b && ("undefined" != typeof b.showViewAllButton && (q = b.showViewAllButton ? !0 : !1), "undefined" != typeof b.showFullScreenButton && (k = b.showFullScreenButton ? !0 : !1));
        this.getSeadragonControlAnchor = function () {
            return v
        };
        this.getElement = function () {
            return p
        };
        this.initialize = function () {
            p.innerHTML = '<div id="zoom-plus-button" class="zoom-plus-button navigation-element"></div><div id="zoom-minus-button" class="zoom-minus-button navigation-element"></div>';
            q ? p.innerHTML += '<div id="view-all-button" class="view-all-button navigation-element"></div>' : "";
            k ? p.innerHTML += '<div id="full-screen-button" class="full-screen-button navigation-element"></div>' : "";
            document.getElementById("zoom-plus-button").onclick =
                function (b) {
                    a(b, "zoom-plus-click")
            };
            document.getElementById("zoom-plus-button").onmousedown = function (b) {
                a(b, "zoom-plus-mousedown")
            };
            document.getElementById("zoom-plus-button").onmouseout = function (b) {
                a(b, "zoom-plus-mouseout")
            };
            document.getElementById("zoom-plus-button").onmouseup = function (b) {
                a(b, "zoom-plus-mouseup")
            };
            document.getElementById("zoom-minus-button").onclick = function (b) {
                a(b, "zoom-minus-click")
            };
            document.getElementById("zoom-minus-button").onmousedown = function (b) {
                a(b, "zoom-minus-mousedown")
            };
            document.getElementById("zoom-minus-button").onmouseup = function (b) {
                a(b, "zoom-minus-mouseup")
            };
            document.getElementById("zoom-minus-button").onmouseout = function (b) {
                a(b, "zoom-minus-mouseout")
            };
            document.onmousemove = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("slider-handle-mousemove", function (b) {
                    b(a)
                })
            };
            document.onmouseup = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ?
                    (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("slider-handle-mouseup", function (b) {
                    b(a)
                })
            };
            q && (document.getElementById("view-all-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("view-all-click", function (b) {
                    b(a)
                })
            });
            k && (document.getElementById("full-screen-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ?
                    (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("full-screen-click", function (b) {
                    b(a)
                })
            });
            var b = 50;
            $(".navigation-element").each(function () {
                b += $(this).height()
            });
            jQuery("#gigapan-navigation").css("height", b + "px");
            k || $("#view-all-button").css("top", parseFloat($("#view-all-button").css("top")) - 25 + "px")
        };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent = d.publishEvent
    }
})(); if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.GigapanMobileNavigationControl = function (b) {
        function a(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            d.publishEvent(b)
        }
        var d = new org.gigapan.events.EventManager,
            q = !0,
            k = !0,
            v = Seadragon.ControlAnchor.TOP_RIGHT,
            p = document.createElement("div");
        p.id = "gigapan-mobile-navigation";
        b && ("undefined" != typeof b.showViewAllButton && (q = b.showViewAllButton ? !0 : !1), "undefined" != typeof b.showFullScreenButton &&
            (k = b.showFullScreenButton ? !0 : !1));
        this.getSeadragonControlAnchor = function () {
            return v
        };
        this.getElement = function () {
            return p
        };
        this.initialize = function () {
            p.innerHTML = '<div id="mobile-zoom-plus-button" class="mobile-zoom-plus-button"><span class="clickable-nav-item"></span></div><div id="mobile-zoom-minus-button" class="mobile-zoom-minus-button"><span class="clickable-nav-item"></span></div>';
            k ? p.innerHTML += '<div id="mobile-full-screen-button" class="mobile-full-screen-button"><span class="clickable-nav-item"></span></div>' :
                "";
            q ? p.innerHTML += '<div id="mobile-view-all-button" class="mobile-view-all-button"><span class="clickable-nav-item"></span></div>' : "";
            document.getElementById("mobile-zoom-plus-button").onclick = function (b) {
                a(b, "zoom-plus-click")
            };
            document.getElementById("mobile-zoom-plus-button").onmousedown = function (b) {
                a(b, "zoom-plus-mousedown")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseout = function (b) {
                a(b, "zoom-plus-mouseout")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseup = function (b) {
                a(b,
                    "zoom-plus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onclick = function (b) {
                a(b, "zoom-minus-click")
            };
            document.getElementById("mobile-zoom-minus-button").onmousedown = function (b) {
                a(b, "zoom-minus-mousedown")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseup = function (b) {
                a(b, "zoom-minus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseout = function (b) {
                a(b, "zoom-minus-mouseout")
            };
            q && (document.getElementById("mobile-view-all-button").onclick = function (b) {
                a(b,
                    "view-all-click")
            });
            k && (document.getElementById("mobile-full-screen-button").onclick = function (b) {
                a(b, "full-screen-click")
            });
            var b = 0;
            $("#gigapan-mobile-navigation div").each(function () {
                b += $(this).height()
            });
            jQuery("#gigapan-mobile-navigation").css("height", b + "px");
            k || $("#view-all-button").css("top", parseFloat($("#view-all-button").css("top")) - 28 + "px")
        };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent = d.publishEvent
    }
})(); if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {}; if (!window.$) {
    var nojQueryMsg = "The jQuery library is required by org.gigapan.viewer.ControlPanel.js";
    alert(nojQueryMsg);
    throw Error(nojQueryMsg);
}
(function () {
    var b = window.$;
    org.gigapan.viewer.FooterControl = function (a) {
        function d(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            q.publishEvent(b)
        }
        var q = new org.gigapan.events.EventManager,
            k = Seadragon.ControlAnchor.NONE,
            v = !0,
            p = !0,
            x = !0,
            f = !1,
            P = !0,
            s = document.createElement("div");
        s.id = "footer-panel";
        s.className = "footer-panel";
        a && ("undefined" != typeof a.showPrintButton && (v = a.showPrintButton ? !0 : !1), "undefined" != typeof a.showSnapshotsButton &&
            (p = a.showSnapshotsButton ? !0 : !1), "undefined" != typeof a.showShareButton && (x = a.showShareButton ? !0 : !1), "undefined" != typeof a.showExploreButton && (P = a.showExploreButton ? !0 : !1));
        var a = '<div id="social-container"><div id="gp-facebook" class="social-button" title="Post to Facebook"></div><div id="gp-twitter" class="social-button" title="Tweet"></div><div id="gp-gplus" class="social-button" title="Share on Google+"></div><div id="gp-linkedin" class="social-button" title="Share on LinkedIn"></div><div id="gp-pinterest" class="social-button" title="Pin it!"></div></div>',
            A = "";
        p && (A += '<div id="show-snapshots-button" class="footer-panel-button show-snapshots-button-on" title="Snapshots"></div>');
        v && (A += '<div id="buy-print-button" class="footer-panel-button buy-print-button-on" title="Buy a Print"></div>');
        P && (A += '<div id="show-explore-button" class="footer-panel-action-button explore-button" title="Explore More"></div>');
        x && (A += '<div id="show-share-button" class="footer-panel-button share-button" title="Share this Gigapan"></div>' + a);
        b(s).html(A);
        this.getElement = function () {
            return s
        };
        this.getSeadragonControlAnchor = function () {
            return k
        };
        this.initialize = function () {
            v && (document.getElementById("buy-print-button").onclick = function (a) {
                d(a, "buy-print-click")
            });
            p && (document.getElementById("show-snapshots-button").onclick = function (a) {
                d(a, "show-snapshots-button-click")
            });
            P && (document.getElementById("show-explore-button").onclick = function (a) {
                d(a, "show-explore-button-click")
            });
            x && (document.getElementById("show-share-button").onclick = function (a) {
                    d(a, "show-share-button-click")
                }, document.getElementById("gp-facebook").onclick =
                function (a) {
                    d(a, "post-to-facebook-click")
                }, document.getElementById("gp-twitter").onclick = function (a) {
                    d(a, "post-to-twitter-click")
                }, document.getElementById("gp-linkedin").onclick = function (a) {
                    d(a, "post-to-linkedin-click")
                }, document.getElementById("gp-pinterest").onclick = function (a) {
                    d(a, "post-to-pinterest-click")
                }, document.getElementById("gp-gplus").onclick = function (a) {
                    d(a, "post-to-gplus-click")
                }, z());
            E();
            $("#footer-panel").parent().css("height", "0px")
        };
        this.isVisible = function () {
            return !0
        };
        this.toggleSocial =
            function () {
                f ? $("#social-container").css("display", "none") : $("#social-container").css("display", "block");
                f = !f;
                setTimeout(z, 100)
        };
        this.toggleVisibility = function () {
            b(s).animate({
                bottom: "-44px"
            }, 500);
            isControlPanelVisible = !isControlPanelVisible
        };
        var E = function () {
            b(s).width(b(window).width() - 5);
            z()
        }, z = function () {
                if (x) {
                    var a = 0;
                    $(".footer-panel-button").each(function () {
                        a += $(this).width()
                    });
                    $(".footer-panel-action-button").each(function () {
                        a += $(this).width()
                    });
                    b("#social-container").css("left", a + "px");
                    b("#gplus div").css({
                        "padding-left": "13px",
                        "padding-top": "17px"
                    })
                }
            };
        this.handleOrientationChange = function () {
            E();
            z()
        };
        this.updateSize = function () {
            E()
        };
        this.addEventListener = q.addEventListener;
        this.removeEventListener = q.removeEventListener;
        this.publishEvent = q.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {}; if (!window.$) throw nojQueryMsg = "The jQuery library is required by org.gigapan.viewer.SnapshotBrowser.js", alert(nojQueryMsg), Error(nojQueryMsg);
(function () {
    var b = window.$;
    b.ajaxSetup({
        type: "GET",
        dataType: "jsonp",
        timeout: 3E4,
        cache: !1,
        global: !1
    });
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone OS/i.test(navigator.userAgent);
    var a = 102,
        d = 5,
        q = !1,
        k = 0;
    org.gigapan.viewer.SnapshotBrowser = function (v, p) {
        function x(a) {
            return a.replace(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function (a) {
                return '<a href="' + a + '" target="_blank" class="snapshot_comment_link">' + a + "</a>"
            })
        }

        function f(a) {
            a = a || window.event;
            "function" === typeof a.preventDefault ?
                (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            var c = a.currentTarget ? a.currentTarget : a.srcElement;
            null == a || null == c ? K = selectedSnapshot : (c = c.id, c = c.slice(c.lastIndexOf("_") + 1, c.length), K = l[c]);
            "touchstart" == a.type && (ga = window.setTimeout(function () {
                s(K)
            }, 1E3));
            "touchend" == a.type && (window.clearTimeout(ga), P(K));
            "click" == a.type && (P(K), b(".snapshot").each(function () {
                $(this).removeClass("selected")
            }), b(a.currentTarget).addClass("selected"));
            "mouseover" == a.type && s(K);
            "mouseout" ==
                a.type && (b(".overlay").each(function () {
                    var a = $(this).attr("id"),
                        a = a.slice(a.lastIndexOf("_") + 1, a.length);
                    SDViewer.viewer.hideSnapInclusion(a)
                }), u || h());
            return !1
        }

        function P(a) {
            !0 == user.logged_in && null == user.login && (L || (L = !0, $.ajax({
                url: "/sessions/whoami",
                type: "GET",
                async: !0,
                dataType: "json",
                timeout: 2E4
            }).done(function (a) {
                user = a.user;
                L = !1
            })));
            selectedSnapshot = a;
            $(".bx-viewport").css("height", "62px");
            var b = 0.1 * (a.bounds.ymax - a.bounds.ymin);
            SDViewer.viewer.setViewBounds(null, a.bounds.xmin - b, a.bounds.ymin -
                b, a.bounds.xmax + b, a.bounds.ymax + b);
            u ? z(a) : u = !0;
            b = document.getElementById("snapshot-info-overlay");
            b || (b = document.createElement("div"), b.id = "snapshot-info-overlay", document.getElementById(R.id).parentNode.appendChild(b), b.style.display = "block");
            b.innerHTML = "";
            var e = document.createElement("div");
            e.className = "close_button";
            e.onclick = function () {
                u = !1;
                h()
            };
            var f = document.createElement("div");
            f.id = "snapshot_comments_container";
            var d = document.createElement("div");
            d.id = "snapshots_description";
            d.className =
                "snapshots_description";
            d.innerHTML = x(a.description);
            f.appendChild(d);
            if (null != a.comment_set)
                for (d = 0; d < a.comment_set.available; d++) {
                    var j = a.comment_set.items[d];
                    if (j) {
                        var k = j[0],
                            n = j[1],
                            j = document.createElement("div");
                        j.className = "snap_comment";
                        j.innerHTML = x(n.message);
                        var p = "",
                            p = "<br> by: <a class='white_link' href='/profiles/" + n.user.username + "'>" + n.user.username + "</a>";
                        j.innerHTML += p;
                        if (user.id == n.user.id || gigapan.gigapan.user_id == user.id) n = document.createElement("a"), n.id = "delete_snapshot_comment_" +
                            k, n.className = "delete_snapshot_comments_button", n.innerHTML = "delete", n.onclick = function () {
                                m(this.id);
                                return !1
                        }, j.appendChild(n);
                        f.appendChild(j)
                    }
                } else d = document.createElement("div"), d.className = "no_snapshot_comments", d.id = "no_snapshot_comments", d.innerHTML = "No Comments", f.appendChild(d);
            b.appendChild(e);
            b.appendChild(f);
            c ? (e = document.createElement("div"), e.id = "add_snapshot_comments_container", e.className = "add_snapshot_comments_container", user && null != user && (!1 != user.logged_in || user.login && 0 < user.login.length) ?
                (f = document.createElement("form"), f.id = "add-snapshot-comment-form", f.className = "add-snapshot-comment-form", f.action = "/comments", d = document.createElement("textarea"), d.id = "comment_comment", d.name = "comment[comment]", k = document.createElement("button"), k.id = "add_snapshot_comments_button", k.className = "add_snapshot_comments_button", k.innerHTML = "", k.onclick = function () {
                        5 > $("#comment_comment").val().length ? alert("Comments must be at least 5 characters long") : ($("#saving_comment_spinner").css("display", "block"),
                            $.ajax({
                                url: "/comments",
                                data: $("#add-snapshot-comment-form").serialize(),
                                type: "POST",
                                dataType: "json",
                                timeout: 25E3
                            }).success(function (a) {
                                var b = [];
                                b[0] = a.comment.id;
                                b[1] = {
                                    id: a.comment.id,
                                    message: a.comment.comment,
                                    user: {
                                        id: a.comment.user_id,
                                        login: user.login,
                                        username: user.login
                                    }
                                };
                                l[a.comment.commentable_id].comment_set && l[a.comment.commentable_id].comment_set.items ? (l[a.comment.commentable_id].comment_set.items.unshift(b), l[a.comment.commentable_id].comment_set.available += 1) : (l[a.comment.commentable_id].comment_set = {}, l[a.comment.commentable_id].comment_set.items = [], l[a.comment.commentable_id].comment_set.items.push(b), l[a.comment.commentable_id].comment_set.available = 1, (b = document.getElementById("no_snapshot_comments")) && b.parentNode.removeChild(b), $("#snapshot_" + a.comment.commentable_id).before('<span class="has_comments"></span>'));
                                b = document.createElement("div");
                                b.className = "snap_comment";
                                b.innerHTML = x(a.comment.comment);
                                var c = "",
                                    c = "<br> by: <a class='white_link' href='/profiles/" + user.login + "'>" + user.login +
                                        "</a>";
                                b.innerHTML += c;
                                c = document.createElement("a");
                                c.id = "delete_snapshot_comment_" + a.comment.id;
                                c.className = "delete_snapshot_comments_button";
                                c.innerHTML = "delete";
                                c.onclick = function () {
                                    m(this.id);
                                    return !1
                                };
                                b.appendChild(c);
                                document.getElementById("snapshot_comments_container").insertBefore(b, document.getElementById("snapshots_description").nextSibling);
                                $("#comment_comment").val("")
                            }).error(function () {
                                alert("There was an error creating your comment.")
                            }).always(function (a) {
                                $("#saving_comment_spinner").css("display",
                                    "none");
                                a.redirect && alert("There was an error creating your comment. Please make sure you are signed in and reload the page.")
                            }));
                        return !1
                    }, a = "<input id='comment_commentable_id' name='comment[commentable_id]' type='hidden' value='" + a.id + "'>", a = a + "<input id='comment_commentable_type' name='comment[commentable_type]' type='hidden' value='Snapshot'>" + ("<input id='comment_user_id' name='comment[user_id]' type='hidden' value='" + user.id + "'>"), a += "<input id='auth_key' name='comment[auth_key]' type='hidden' value='" +
                    $("#authenticity_token").val() + "'>", f.innerHTML = a, f.appendChild(d), f.appendChild(k), $(f).append("<img id='saving_comment_spinner' style='display:none;float:left;width:15px;height:15px;' class='loading' src='/images/spinner_small.gif' />"), e.appendChild(f)) : (a = document.createElement("button"), a.id = "login_to_comment_button", a.className = "login_to_comment_button", a.onclick = function () {
                    showLoginWindow("commentOnSnapshot")
                }, e.appendChild(a)), b.appendChild(e)) : $("#snapshot-info-overlay").css("height", "190px")
        }

        function s(a) {
            SDViewer.viewer.showSnapInclusion(a.id, a.bounds.xmin, a.bounds.ymin, a.bounds.xmax, a.bounds.ymax);
            u || z(a)
        }

        function A(b, c, e) {
            k = e;
            b = Math.floor($(".bx-viewport").width() / a);
            e * d + b > G.getSlideCount() - d && !q && ha(e)
        }

        function E() {}

        function z(a) {
            var b = document.createElement("div");
            b.className = "snapshot_name";
            b.innerHTML = a.name;
            var c = document.createElement("div");
            c.className = "snap_taken_by";
            var e = "",
                e = "<a class='white_link' href='/profiles/" + a.owner.username + "'>" + a.owner.username + "</a>";
            c.innerHTML =
                "Snapped by: " + e;
            if (user.id == a.owner.id || gigapan.gigapan.user_id == user.id) e = document.createElement("a"), e.id = "delete_snapshot_" + a.id, e.className = "delete_snapshot_comments_button", e.innerHTML = "delete", e.onclick = function () {
                var a = this.id,
                    a = a.slice(a.lastIndexOf("_") + 1, a.length);
                confirm("Are you sure you want to delete this snapshot") && SDViewer.viewer.deleteSnapshot(a);
                return !1
            }, c.appendChild(e);
            I.innerHTML = "";
            I.appendChild(b);
            I.appendChild(c)
        }

        function h() {
            var a = document.getElementById("snapshot-info-overlay");
            !u && a && a.parentNode.removeChild(a);
            I.innerHTML = "";
            (a = document.getElementById("view_add_comments")) && a.parentNode.removeChild(a);
            b(".snapshot").each(function () {
                $(this).removeClass("selected")
            })
        }

        function m(a) {
            var b = a.slice(a.lastIndexOf("_") + 1, a.length);
            confirm("Are you sure you want to delete this comment") && ($("#" + a).parent().append('<img style="float:right;padding-right: 10px;" class="loading" src="/images/spinner_small.gif">'), $.ajax({
                url: "/comments/" + b,
                data: {
                    id: b
                },
                type: "DELETE",
                dataType: "json",
                timeout: 25E3
            }).success(function () {
                alert("Comment successfully deleted.");
                if (l[selectedSnapshot.id].comment_set && l[selectedSnapshot.id].comment_set.items) {
                    for (i = 0; i < l[selectedSnapshot.id].comment_set.available; i++) l[selectedSnapshot.id].comment_set.items[i][0] == b && (l[selectedSnapshot.id].comment_set.items.splice(i, 1), l[selectedSnapshot.id].comment_set.available -= 1);
                    0 == l[selectedSnapshot.id].comment_set.available && ($("#snapshot_" + selectedSnapshot.id).siblings(".has_comments").remove(), $("#" + a).parent().parent().append("<div class='no_snapshot_comments' id='no_snapshot_comments'>No Comments</div>"),
                        l[selectedSnapshot.id].comment_set = null)
                }
                $("#" + a).parent().remove()
            }).error(function () {
                $("#" + a).parent().remove(".loading");
                alert("There was an error deleting the comment.")
            }))
        }
        var J = new org.gigapan.events.EventManager,
            n = !1,
            C = Seadragon.ControlAnchor.NONE,
            e = null,
            j = null,
            y = 1,
            qa = 0,
            l = [],
            G = null,
            u = !1,
            K = null,
            L = !1,
            c = "undefined" != p && null != p ? p : !0,
            R = document.createElement("div");
        R.id = "snapshot_browser";
        var H = document.createElement("div");
        H.id = "snapshot_scroller_container";
        var W = document.createElement("div");
        W.id = "take_snapshot_container";
        var ea = document.createElement("div");
        ea.id = "take-snapshot-button";
        ea.className = "take-snapshot-button";
        var I = document.createElement("div");
        I.id = "snapshot-details";
        I.className = "snapshot-details";
        b(W).append(ea);
        b(W).append(I);
        b(R).append(W);
        b(R).append(H);
        var ca = function () {
            j = e = null;
            y = 1;
            qa = 0;
            l = [];
            K = null;
            if (G) {
                G.destroySlider();
                var a = document.getElementById("bxslider-snapshots");
                a.parentNode.removeChild(a)
            }
        };
        this.getSeadragonControlAnchor = function () {
            return C
        };
        var ga;
        this.loadInitialSnapshots =
            function (a, b, c) {
                ca();
                e = a;
                j = b;
                Z(c, !1, 0)
        };
        this.addSnapshots = function (a, b) {
            ca();
            e = a;
            j = b;
            ha(0)
        };
        var ha = function (a) {
            b.ajax({
                url: "/beta/gigapans/" + (null != j ? j : e) + "/snapshots/page/" + y + "/per_page/25/most_recent.json",
                success: function (b) {
                    0 < b.count ? Z(b, 0 == a ? !1 : !0, a) : q = !0;
                    b.count < b.per_page && (q = !0)
                },
                error: function () {}
            })
        }, Z = function (a, c, h) {
                if (a && a.count && a.items) {
                    y++;
                    if (c) var k = document.getElementById("bxslider-snapshots");
                    else k = document.createElement("ul"), k.className = "bxslider-snapshots", k.id = "bxslider-snapshots",
                    H.appendChild(k);
                    for (var m = 0; m < a.count; m++) {
                        var u = a.items[m];
                        if (u) {
                            var n = u[0];
                            if ((u = u[1]) && n) {
                                var p = document.createElement("li"),
                                    s = document.createElement("img");
                                s.id = "snapshot_" + n;
                                s.className = "snapshot";
                                var K = -1 != window.location.hostname.indexOf("staging") ? "staging/" : "";
                                b(s).attr("src", "http://static.gigapan.org/snapshots0/" + K + e + "/images" + (null != j ? "." + j : "") + "/" + n + "-90x60.jpg");
                                s.onclick = f;
                                s.onmouseout = f;
                                s.onmouseover = f;
                                s.oncontextmenu = f;
                                null != u.comment_set && (K = document.createElement("span"), K.className =
                                    "has_comments", p.appendChild(K));
                                p.appendChild(s);
                                k.appendChild(p);
                                l[n] = u;
                                qa++
                            }
                        }
                    }
                }
                c ? G.reloadSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: A,
                    onSlidePrev: E,
                    startSlide: h,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                }) : G || (G = $("#bxslider-snapshots").bxSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: A,
                    onSlidePrev: E,
                    startSlide: 0,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                }))
            }, ia = function () {
                G && G.reloadSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: A,
                    onSlidePrev: E,
                    startSlide: k,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                })
            };
        this.isVisible = function () {
            return n
        };
        this.toggleVisibility = function () {
            n ? (b(R).fadeOut("fast"), u = !1, h()) : (ia(), b(R).fadeIn("slow"));
            n = !n
        };
        var fa = function () {
            b(R).width(b(window).width());
            b(H).width(b(window).width() - b(W).width());
            ia()
        };
        this.handleOrientationChange =
            function () {
                fa()
        };
        this.getElement = function () {
            return R
        };
        this.updateSize = function () {
            fa()
        };
        this.initialize = function () {
            document.getElementById("take-snapshot-button").onclick = function (a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                J.publishEvent("take-snapshot-button-click")
            };
            fa();
            $("#snapshot_browser").parent().css("height", "0px")
        };
        this.addEventListener = J.addEventListener;
        this.removeEventListener = J.removeEventListener;
        this.publishEvent = J.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.snapshot) {
    if ("object" != typeof org.gigapan.snapshot) {
        var orgGigapanSnapshotExistsMessage = "Error: failed to create org.gigapan.snapshot namespace: org.gigapan.snapshot already exists and is not an object";
        alert(orgGigapanSnapshotExistsMessage);
        throw Error(orgGigapanSnapshotExistsMessage);
    }
} else org.gigapan.snapshot = {}; if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.snapshot.SnapshotTool.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
if (!window.$) throw nojQueryMsg = "The jQuery library is required by org.gigapan.snapshot.SnapshotTool.js", alert(nojQueryMsg), Error(nojQueryMsg);
if (!window.org.gigapan.seadragon.SeadragonUtils) {
    var noSeadragonUtilsMsg = "The org.gigapan.seadragon.SeadragonUtils library is required by org.gigapan.snapshot.SnapshotTool.js";
    alert(noSeadragonUtilsMsg);
    throw Error(noSeadragonUtilsMsg);
}
(function () {
    function b(a, b, d) {
        Seadragon.MouseTracker.call(this, b);
        var p = null;
        this.pressHandler = function () {
            p = new Seadragon.Point(k(a).outerWidth(), k(a).outerHeight());
            d.setMouseNavEnabled(!1)
        };
        this.dragHandler = function (b, q, h) {
            b = k(a).position();
            h = new Seadragon.Point(b.left + h.x, b.top + h.y);
            b = d.viewport.getContainerSize().minus(p);
            0 > h.x ? h.x = 0 : h.x > b.x && (h.x = b.x);
            0 > h.y ? h.y = 0 : h.y > b.y && (h.y = b.y);
            k(a).css("left", h.x + "px");
            k(a).css("top", h.y + "px")
        };
        this.releaseHandler = function (a, b, f) {
            f && d.setMouseNavEnabled(!0)
        }
    }

    function a(a, b) {
        Seadragon.MouseTracker.call(this, a);
        this.viewer = b;
        this.theElement = a;
        this.pointsCoordinatesRangeRect = null;
        this.getCenterPointInPixelCoords = function (a) {
            var b = Seadragon.Utils.getElementSize(a).divide(2);
            return Seadragon.Utils.getElementPosition(a).minus(Seadragon.Utils.getElementPosition(this.viewer.elmt)).plus(b)
        };
        this.pressHandler = function () {
            this.viewer.setMouseNavEnabled(!1);
            this.elementLocationInPixelCoords = this.getCenterPointInPixelCoords(this.theElement)
        };
        this.dragHandler = function (a,
            b, f) {
            this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(f);
            this.viewer.drawer.updateOverlay(this.theElement, this.viewer.viewport.pointFromPixel(this.elementLocationInPixelCoords), Seadragon.OverlayPlacement.CENTER)
        };
        this.releaseHandler = function (a, b, f) {
            f && (this.elementLocationInPixelCoords = null, this.viewer.setMouseNavEnabled(!0))
        };
        this.setPointsCoordinatesRangeRect = function (a) {
            this.pointsCoordinatesRangeRect = a
        };
        this.getPointsCoordinatesRangeRect = function () {
            return this.pointsCoordinatesRangeRect
        };
        this.getPixelCoordinatesRangeRect = function () {
            var a = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getTopLeft()),
                b = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getBottomRight());
            return new Seadragon.Rect(a.x, a.y, b.x - a.x, b.y - a.y)
        }
    }

    function d(b, d, k, p) {
        a.call(this, b, d);
        this.theElement = b;
        this.handles = k;
        this.handlePositionListener = p;
        this.pressHandlerSuper = this.pressHandler;
        this.pressHandler = function (a, b) {
            this.pressHandlerSuper.apply(this, arguments);
            this.theElement.className =
                "snapshot_tool_bounds_selector_active"
        };
        this.dragHandler = function (a, b, f) {
            this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(f);
            f = d.viewport.pointFromPixel(this.elementLocationInPixelCoords);
            b = Seadragon.Utils.getElementSize(this.theElement);
            a = d.viewport.deltaPointsFromPixels(b);
            b = b.divide(2);
            b = d.viewport.deltaPointsFromPixels(b);
            f = f.minus(b);
            if (this.getPointsCoordinatesRangeRect()) {
                var m = this.getPointsCoordinatesRangeRect().getTopLeft(),
                    p = this.getPointsCoordinatesRangeRect().getBottomRight();
                f.x < m.x && (f.x = m.x);
                f.x + a.x > p.x && (f.x = p.x - a.x);
                f.y < m.y && (f.y = m.y);
                f.y + a.y > p.y && (f.y = p.y - a.y)
            }
            m = new Seadragon.Rect(f.x, f.y, a.x, a.y);
            this.viewer.drawer.updateOverlay(this.theElement, m);
            m = Array(8);
            m[0] = f;
            m[1] = f.plus(new Seadragon.Point(b.x, 0));
            m[2] = f.plus(new Seadragon.Point(a.x, 0));
            m[3] = f.plus(new Seadragon.Point(a.x, b.y));
            m[4] = f.plus(a);
            m[5] = f.plus(new Seadragon.Point(b.x, a.y));
            m[6] = f.plus(new Seadragon.Point(0, a.y));
            m[7] = f.plus(new Seadragon.Point(0, b.y));
            for (a = 0; a < k.length; a++) this.viewer.drawer.updateOverlay(this.handles[a],
                m[a], Seadragon.OverlayPlacement.CENTER);
            this.handlePositionListener && this.handlePositionListener(m)
        };
        this.releaseHandlerSuper = this.releaseHandler;
        this.releaseHandler = function (a, b, f, d) {
            this.releaseHandlerSuper.apply(this, arguments);
            this.theElement.className = "snapshot_tool_bounds_selector"
        }
    }

    function q(b, d, k, q, E, z, h, m) {
        a.call(this, k[b], q);
        this.activeHandleIndex = b;
        this.oppositeHandleIndex = d;
        this.handleElements = k;
        this.activeHandleElement = k[b];
        this.oppositeHandleElement = k[d];
        this.bounds = E;
        this.handlePositionListener =
            z;
        this.willConstrainSnapshotAspectRatio = h;
        this.snapshotAspectRatio = m;
        this.boundRectMinHeightInPixels = this.boundRectMinWidthInPixels = 20;
        this.cumulativeDelta = null;
        this.xSign = [-1, 0, 1, 1, 1, 0, -1, -1][b];
        this.ySign = [-1, -1, -1, 0, 1, 1, 1, 0][b];
        this.isDraggingTopOrBottomEdge = 0 == this.xSign;
        this.isDraggingLeftOrRightEdge = 0 == this.ySign;
        this.willConstrainSnapshotAspectRatio && (1 <= this.snapshotAspectRatio ? this.boundRectMinWidthInPixels = this.snapshotAspectRatio * this.boundRectMinHeightInPixels : this.boundRectMinHeightInPixels /=
            this.snapshotAspectRatio);
        this.computeSign = function (a, b) {
            return 0 > a - b ? -1 : 0 < a - b ? 1 : 0
        };
        this.pressHandlerSuper = this.pressHandler;
        this.pressHandler = function (a, b) {
            this.pressHandlerSuper.apply(this, arguments);
            this.activeHandleElement.className = "snapshot_tool_bounds_handle_active";
            this.activeHandleElementInPixelCoords = this.getCenterPointInPixelCoords(this.activeHandleElement);
            this.oppositeHandleElementInPixelCoords = this.getCenterPointInPixelCoords(this.oppositeHandleElement);
            this.cumulativeDelta = new Seadragon.Point(0,
                0);
            this.originalActiveHandleElementPositionInPixelCoords = new Seadragon.Point(this.activeHandleElementInPixelCoords.x, this.activeHandleElementInPixelCoords.y);
            this.mousePositionInPixelCoords = new Seadragon.Point(this.originalActiveHandleElementPositionInPixelCoords.x, this.originalActiveHandleElementPositionInPixelCoords.y)
        };
        this.dragHandlerSuper = this.dragHandler;
        this.dragHandler = function (a, b, f, e) {
            this.cumulativeDelta = this.cumulativeDelta.plus(f);
            this.mousePositionInPixelCoords = this.originalActiveHandleElementPositionInPixelCoords.plus(this.cumulativeDelta);
            var d = v.convertGigapanRectToSeadragonRect(0, 0, p, x, p),
                k = q.viewport.pixelFromPoint(d.getTopLeft()),
                m = q.viewport.pixelFromPoint(d.getBottomRight()),
                l = q.viewport.pixelFromPoint(d.getTopLeft()),
                d = q.viewport.pixelFromPoint(d.getBottomRight());
            if (h)
                if (this.isDraggingTopOrBottomEdge) {
                    var s = Math.min(this.oppositeHandleElementInPixelCoords.x - l.x, d.x - this.oppositeHandleElementInPixelCoords.x),
                        s = 2 * (s / this.snapshotAspectRatio);
                    l.y = Math.max(l.y, this.oppositeHandleElementInPixelCoords.y - s);
                    d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y +
                        s)
                } else this.isDraggingLeftOrRightEdge ? (s = Math.min(this.oppositeHandleElementInPixelCoords.y - l.y, d.y - this.oppositeHandleElementInPixelCoords.y), s = 2 * s * this.snapshotAspectRatio, l.x = Math.max(l.x, this.oppositeHandleElementInPixelCoords.x - s), d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x + s)) : (this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x ? (d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y + (m.x - this.oppositeHandleElementInPixelCoords.x) /
                        this.snapshotAspectRatio), l.y = Math.max(l.y, this.oppositeHandleElementInPixelCoords.y - (m.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio)) : (d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y - (k.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio), l.y = Math.max(l.y, this.oppositeHandleElementInPixelCoords.y + (k.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio)), this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y ?
                    (d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x + (m.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio), l.x = Math.max(l.x, this.oppositeHandleElementInPixelCoords.x - (m.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio)) : (d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x - (k.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio), l.x = Math.max(l.x, this.oppositeHandleElementInPixelCoords.x + (k.y - this.oppositeHandleElementInPixelCoords.y) *
                        this.snapshotAspectRatio)));
            this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x ? l.x = Math.max(l.x, this.oppositeHandleElementInPixelCoords.x) : d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x);
            this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y ? l.y = Math.max(l.y, this.oppositeHandleElementInPixelCoords.y) : d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y);
            l = new Seadragon.Point(Math.min(Math.max(this.mousePositionInPixelCoords.x,
                l.x), d.x), Math.min(Math.max(this.mousePositionInPixelCoords.y, l.y), d.y));
            d = Seadragon.Utils.getElementSize(E);
            l = this.oppositeHandleElementInPixelCoords.minus(l).apply(Math.abs);
            this.isDraggingTopOrBottomEdge ? l.x = d.x : this.isDraggingLeftOrRightEdge && (l.y = d.y);
            this.willConstrainSnapshotAspectRatio && (this.isDraggingTopOrBottomEdge ? l.x = l.y * this.snapshotAspectRatio : this.isDraggingLeftOrRightEdge ? l.y = l.x / this.snapshotAspectRatio : (d = new Seadragon.Point(l.x, l.x / this.snapshotAspectRatio), s = new Seadragon.Point(l.y *
                this.snapshotAspectRatio, l.y), l = d.y >= l.y ? d : s));
            l.x = Math.max(this.boundRectMinWidthInPixels, l.x);
            l.y = Math.max(this.boundRectMinHeightInPixels, l.y);
            s = d = null;
            this.isDraggingTopOrBottomEdge ? (this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * l.y, l = l.x / 2, d = new Seadragon.Point(this.oppositeHandleElementInPixelCoords.x - l, Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)), s = new Seadragon.Point(this.oppositeHandleElementInPixelCoords.x +
                l, Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y))) : this.isDraggingLeftOrRightEdge ? (this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * l.x, l = l.y / 2, d = new Seadragon.Point(Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x), this.oppositeHandleElementInPixelCoords.y - l), s = new Seadragon.Point(Math.max(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                this.oppositeHandleElementInPixelCoords.y + l)) : (this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * l.x, this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * l.y, d = new Seadragon.Point(Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x), Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)), s = new Seadragon.Point(Math.max(this.activeHandleElementInPixelCoords.x,
                this.oppositeHandleElementInPixelCoords.x), Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)));
            if (!(this.activeHandleElementInPixelCoords.x < k.x || this.activeHandleElementInPixelCoords.y < k.y || this.activeHandleElementInPixelCoords.x > m.x || this.activeHandleElementInPixelCoords.y > m.y)) {
                this.dragHandlerSuper.apply(this, arguments);
                k = this.viewer.viewport.pointFromPixel(d);
                m = q.viewport.deltaPointsFromPixels(s.minus(d));
                l = new Seadragon.Rect(k.x, k.y, m.x, m.y);
                this.viewer.drawer.updateOverlay(this.bounds,
                    l);
                l = m.divide(2);
                d = k.plus(l);
                m = Array(8);
                m[0] = k;
                m[1] = d.minus(new Seadragon.Point(0, l.y));
                m[2] = d.plus(new Seadragon.Point(l.x, -l.y));
                m[3] = d.plus(new Seadragon.Point(l.x, 0));
                m[4] = d.plus(l);
                m[5] = d.plus(new Seadragon.Point(0, l.y));
                m[6] = d.plus(new Seadragon.Point(-l.x, l.y));
                m[7] = d.minus(new Seadragon.Point(l.x, 0));
                for (k = 0; k < this.handleElements.length; k++) this.viewer.drawer.updateOverlay(this.handleElements[k], m[k], Seadragon.OverlayPlacement.CENTER);
                this.handlePositionListener && this.handlePositionListener(m)
            }
        };
        this.releaseHandlerSuper = this.releaseHandler;
        this.releaseHandler = function (a, b, d, e) {
            this.releaseHandlerSuper.apply(this, arguments);
            this.activeHandleElement.className = "snapshot_tool_bounds_handle";
            this.cumulativeDelta = new Seadragon.Point(0, 0)
        }
    }
    var k = window.$,
        v = org.gigapan.seadragon.SeadragonUtils,
        p = null,
        x = null;
    org.gigapan.viewer.SnapshotTool = function (a, P, s, A) {
        var E = null,
            z = null,
            h = Array(8),
            m = Array(h.length),
            J = Array(h.length),
            n = null,
            C = null,
            e = !1,
            j = void 0 !== A,
            y = j ? Math.abs(A) : 1.5,
            qa = Seadragon.ControlAnchor.NONE,
            E = document.createElement("div");
        E.id = "snapshot_tool_dialog_window";
        E.className = "snapshot_tool_dialog_window";
        k("#" + a).contents().clone().appendTo(E);
        z = document.createElement("div");
        z.id = "snapshot_tool_bounds_selector";
        z.className = "snapshot_tool_bounds_selector";
        k.each(h, function (a) {
            h[a] = document.createElement("div");
            h[a].id = "snapshot_tool_bounds_handle_" + a;
            h[a].className = "snapshot_tool_bounds_handle"
        });
        var l = function (a) {
            if (a)
                for (var b = 0; b < a.length; b++) m[b] = a[b]
        };
        (a = k(E).find("." + P).get()[0]) || (a =
            E);
        n = new b(E, a, s);
        n.setTracking(!0);
        s.addEventListener("resize", function () {
            var a = new Seadragon.Point(k(E).outerWidth(), k(E).outerHeight()),
                b = k(E).position(),
                b = new Seadragon.Point(b.left, b.top),
                e = new Seadragon.Point(0, 0),
                a = s.viewport.getContainerSize().minus(a);
            b.x < e.x ? b.x = e.x : b.x > a.x && (b.x = a.x);
            b.y < e.y ? b.y = e.y : b.y > a.y && (b.y = a.y)
        });
        C = new d(z, s, h, l);
        C.setTracking(!0);
        k.each(h, function (a) {
            J[a] = new q(a, 8 <= a + 4 ? a - 4 : a + 4, h, s, z, l, j, y);
            J[a].setTracking(!0)
        });
        var G = function (a) {
            C.setTracking(!a);
            k.each(h, function (b) {
                J[b].setTracking(!a)
            });
            var b = a ? "snapshot_tool_bounds_handle_disabled" : "snapshot_tool_bounds_handle";
            z.className = a ? "snapshot_tool_bounds_selector_disabled" : "snapshot_tool_bounds_selector";
            k.each(h, function (a) {
                h[a].className = b
            })
        };
        s.addEventListener("animationstart", function () {
            G(!0)
        });
        s.addEventListener("animationfinish", function () {
            G(!1)
        });
        this.initialize = function () {};
        this.getElement = function () {
            return E
        };
        this.getSeadragonControlAnchor = function () {
            return qa
        };
        this.setGigapanDimensions = function (a, b) {
            p = a;
            x = b;
            var e = new Seadragon.Rect(0,
                0, 1, b / a);
            C.setPointsCoordinatesRangeRect(e);
            k.each(J, function (a) {
                J[a].setPointsCoordinatesRangeRect(e)
            })
        };
        this.getToolBoundsInGigapanCoords = function () {
            var a = v.convertSeadragonPointToGigapanPoint(m[0], p),
                b = v.convertSeadragonPointToGigapanPoint(m[4], p);
            return new Seadragon.Rect(a.x, a.y, b.x - a.x, b.y - a.y)
        };
        this.isVisible = function () {
            return e
        };
        this.setVisible = function (a) {
            if (a && !e) {
                var a = v.convertGigapanRectToSeadragonRect(0, 0, p, x, p),
                    b = s.viewport.pixelFromPoint(a.getTopLeft()),
                    d = s.viewport.pixelFromPoint(a.getBottomRight()),
                    c = new Seadragon.Rect(0, 0),
                    a = s.viewport.getContainerSize(),
                    c = new Seadragon.Point(Math.max(b.x, c.x), Math.max(b.y, c.y)),
                    f = new Seadragon.Point(Math.min(d.x, a.x), Math.min(d.y, a.y)),
                    j = a = null;
                f.x > c.x && f.y > c.y ? (b = new Seadragon.Rect(c.x, c.y, f.x - c.x, f.y - c.y), a = b.getCenter(), b.width > b.height ? (b = 0.75 * b.height, j = new Seadragon.Point(y * b, b)) : (b = 0.75 * b.width, j = new Seadragon.Point(b, 2 / 3 * b))) : (b = d.minus(b), a = b.divide(2), j = new Seadragon.Point(0.75 * b.x, 0.75 * b.y));
                d = s.viewport.deltaPointsFromPixels(j);
                b = d.divide(2);
                a =
                    s.viewport.pointFromPixel(a);
                c = a.minus(b);
                d = new Seadragon.Rect(c.x, c.y, d.x, d.y);
                s.drawer.addOverlay(z, d);
                m[0] = c;
                m[1] = a.minus(new Seadragon.Point(0, b.y));
                m[2] = a.plus(new Seadragon.Point(b.x, -b.y));
                m[3] = a.plus(new Seadragon.Point(b.x, 0));
                m[4] = a.plus(b);
                m[5] = a.plus(new Seadragon.Point(0, b.y));
                m[6] = a.plus(new Seadragon.Point(-b.x, b.y));
                m[7] = a.minus(new Seadragon.Point(b.x, 0));
                k.each(h, function (a) {
                    s.drawer.addOverlay(h[a], m[a], Seadragon.OverlayPlacement.CENTER)
                });
                s.addControl(E, Seadragon.ControlAnchor.NONE);
                e = !0
            } else !a && e && (s.removeControl(E), s.drawer.removeOverlay(z), k.each(h, function (a) {
                s.drawer.removeOverlay(h[a])
            }), e = !1)
        }
    };
    b.prototype = new Seadragon.MouseTracker;
    b.prototype.constructor = b;
    a.prototype = new Seadragon.MouseTracker;
    a.prototype.constructor = a;
    d.prototype = new a(null, null);
    d.prototype.constructor = d;
    q.prototype = new a(null, null);
    q.prototype.constructor = q
})();
(function () {
    var b = {
        supportsFullScreen: !1,
        isFullScreen: function () {
            return !1
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: "",
        prefix: ""
    }, a = ["webkit", "moz", "o", "ms", "khtml"];
    if ("undefined" != typeof document.cancelFullScreen) b.supportsFullScreen = !0;
    else
        for (var d = 0, q = a.length; d < q; d++)
            if (b.prefix = a[d], "undefined" != typeof document[b.prefix + "CancelFullScreen"]) {
                b.supportsFullScreen = !0;
                break
            } b.supportsFullScreen && (b.fullScreenEventName = b.prefix + "fullscreenchange", b.isFullScreen =
        function () {
            switch (this.prefix) {
            case "":
                return document.fullScreen;
            case "webkit":
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + "FullScreen"]
            }
        }, b.requestFullScreen = function (a) {
            a.style.height = "100%";
            a.style.width = "100%";
            return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
        }, b.cancelFullScreen = function (a, b, d) {
            a.style.height = d;
            a.style.width = b;
            return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        });
    "undefined" !=
        typeof jQuery && (jQuery.fn.requestFullScreen = function () {
            return this.each(function () {
                b.supportsFullScreen && b.requestFullScreen(this)
            })
        });
    window.fullScreenApi = b
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
    org.gigapan.viewer.GigapanRelatedControl = function (b) {
        function a() {
            k ? jQuery(v).css({
                display: "none"
            }) : jQuery(v).css({
                display: "block"
            });
            k = !k
        }
        var d = new org.gigapan.events.EventManager,
            q = Seadragon.ControlAnchor.NONE,
            k = !1,
            v = document.createElement("div");
        v.id = "related-screen-overlay";
        v.innerHTML = "<h2>Explore More</h2>";
        this.getSeadragonControlAnchor = function () {
            return q
        };
        this.getElement = function () {
            return v
        };
        this.toggleVisibility = function () {
            a()
        };
        this.isVisible = function () {
            return k
        };
        this.initialize =
            function () {
                if (b)
                    for (var d = 8 < b.length ? 8 : b.length, k = 0; k < d; k++) {
                        var f = b[k],
                            q = document.createElement("div"),
                            s = document.createElement("span");
                        s.className = "related-title";
                        var A = "",
                            A = 20 < f.name.length ? f.name.substr(0, 18) + "..." : f.name;
                        s.innerHTML = A;
                        q.className = "related-gigapan";
                        q.id = "gigapan_" + f.id;
                        A = document.createElement("img");
                        A.id = "image_" + f.id;
                        A.className = "related-image";
                        A.src = f.thumbnail_url;
                        q.appendChild(A);
                        q.appendChild(s);
                        q.onclick = function () {
                            var a = this.id,
                                a = a.substr(a.indexOf("_") + 1, a.length - 1);
                            window.location = "/gigapans/" + a
                        };
                        v.appendChild(q)
                    }
                d = document.createElement("div");
                d.className = "close_button";
                d.onclick = function () {
                    a()
                };
                v.appendChild(d);
                $("#related-screen-overlay").parent().css("height", "0px")
        };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent = d.publishEvent
    }
})(); if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {}; if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function () {
    org.gigapan.viewer.ThumbnailNavigationControl = function (b) {
        var a = new org.gigapan.events.EventManager,
            d = document.createElement("div");
        d.id = "thumbnail-navigation";
        var q = Seadragon.ControlAnchor.NONE,
            k = null;
        this.getSeadragonControlAnchor = function () {
            return q
        };
        this.getElement = function () {
            return d
        };
        this.initialize = function () {
            d = document.getElementById("thumbnail-navigation");
            d.innerHTML = '<div id="thumbnail-navigation-area"><div id="thumbnail-navigation-area-image"></div><div id="thumbnail-navigation-area-current-view-outline"></div><div id="thumbnail-navigation-area-shadow"></div></div>';
            var a = b.width / b.height,
                q = 250,
                f = Math.floor(1 / a * q);
            250 < f && (f = 250, q = Math.floor(f * a));
            k = {
                width: q,
                height: f
            };
            a = ("undefined" == typeof b.baseThumbnailUrl ? "http://static.gigapan.org" : b.baseThumbnailUrl) + "/gigapans0/" + b.id + "/images/" + b.id + "-" + k.width + "x" + k.height + ".jpg";
            b && (d = document.getElementById("thumbnail-navigation-area-image"), d.setAttribute("style", "width: " + k.width + "px; height: " + k.height + 'px; background: url("' + a + '") no-repeat;'), d = document.getElementById("thumbnail-navigation-area"), d.setAttribute("style",
                "width: " + k.width + "px; height: " + k.height + "px;"), d = document.getElementById("thumbnail-navigation-area-current-view-outline"), d.setAttribute("style", "width: " + k.width + "px; height: " + k.height + "px;"), d = document.getElementById("thumbnail-navigation-area-shadow"), d.setAttribute("style", "width: " + (k.width - 2) + "px; height: " + (k.height - 2) + "px;"))
        };
        this.isVisible = function () {
            return panel.is(":visible")
        };
        this.toggleVisibility = function () {
            this.isVisible() ? this.hide() : this.show()
        };
        this.show = function () {
            panel.show()
        };
        this.hide = function () {
            panel.hide()
        };
        this.fadeIn = function () {
            panel.fadeIn(v)
        };
        this.fadeOut = function () {
            panel.fadeOut()
        };
        var v = function () {};
        this.handleOrientationChange = function () {};
        this.updateSize = function () {};
        this.updateCurrentViewOutline = function (a) {
            var b = k.width,
                d = k.height,
                q = b / d,
                s = jQuery("#thumbnail-navigation-area-current-view-outline");
            s.css("left", Math.round(Math.min(b, b * a.x)) + "px");
            s.css("top", Math.round(Math.min(d, d * a.y * q)) + "px");
            s.css("width", Math.round(Math.max(0, b * a.width)) + "px");
            s.css("height",
                Math.round(Math.max(0, d * a.height * q)) + "px")
        };
        this.addEventListener = a.addEventListener;
        this.removeEventListener = a.removeEventListener;
        this.publishEvent = a.publishEvent
    }
})();