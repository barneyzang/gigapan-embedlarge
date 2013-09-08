/**
 * Gigapan user interface
 * Drawn from gigapan.js -- removed some unused code, but left close to original to incorporate future improvements
 */
var Gigapan = {
	setup : function() {
		/* tooltips*/ 
		var shared = { /* Shared Styles*/
			show : 'mouseover',
			hide : 'mouseout',
			api : {
				onRender : function() {
					$(this.elements.tooltip).css('z-index', 10000);
				}
			},
			position : {
				my : 'top left',
				at : 'bottom right'
			},
			style : {
				classes : 'ui-tooltip-white ui-tooltip-shadow ui-tooltip-rounded',
				'font-size' : 14
			}
		}
	},
	/* Fix for Firefox */
	detectFirefox : function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("firefox") != -1) {
			return true;
		} else {
			return false;
		}
	},
	keyCode : function(e) {
		var code = e.keyCode ? e.keyCode : e.which ? e.which : false;
		return code;

	},
	Form : {
		setup : function() {
			$("input[placeholder]").each(Placeholder);
			$("textarea[placeholder]").each(Placeholder);
			$(".button").each(buttonBehavior);
			$("input.txt, textarea").each(textFocus);
			$(".custom-select").customDrop();
		}
	},
	Lightbox : {
		setup : function() {
			$("a[name=modal]").bind("click", popupModal);

			function popupModal(e) {
				e.preventDefault();
				var thisClass = $(this).parent().attr("class");
				if(thisClass == "contactForm") {
					ajax_form_request();
				}
				if($.browser.msie) {
					var id = (this.hash);
				} else {
					var id = $(this).attr("href");
				}
				var id = $(id);
				if(!id) {
					return;
				}
				id.append(['<a href="#" name="nomodal" class="close-window">Close window</a>', '<span class="tl"></span>', '<span class="tr"></span>', '<span class="t"></span>', '<span class="bl"></span>', '<span class="br"></span>', '<span class="b"></span>', '<span class="r"></span>', '<span class="l"></span>'].join(""));
				$.fn.centerInClient = function(options) {
					var opt = {
						forceAbsolute : false,
						container : window,
						completeHandler : null
					};
					$.extend(opt, options);
					return this.each(function(i) {
						var el = $(this);
						var jWin = $(opt.container);
						var isWin = opt.container == window;
						if(opt.forceAbsolute) {
							if(isWin) {
								el.remove().appendTo("body");
							} else {
								el.remove().appendTo(jWin.get(0));
							}
						}
						el.css("position", "absolute");
						var heightFudge = isWin ? 2 : 1.8;
						var x = ( isWin ? jWin.width() : jWin.outerWidth()) / 2 - el.outerWidth() / 2;
						var y = ( isWin ? jWin.height() : jWin.outerHeight()) / heightFudge - el.outerHeight() / 2;
						el.css("left", x + jWin.scrollLeft());
						el.css("top", y + jWin.scrollTop());
						if(opt.completeHandler) {
							opt.completeHandler(this);
						}
					});
				};
				$(id).centerInClient();
				var maskHeight = $(document).height();
				var maskWidth = $(window).width();
				$("#mask").css({
					width : maskWidth,
					height : maskHeight
				});
				$("#mask").css("filter", "alpha(opacity=40)");
				$("#mask").fadeTo(500, 0.4);
				$(id).fadeIn(500);
			}

			//Close Button
			$('a.close-window, #mask, .cancel-this').live('click', function(e) {
				//When clicking on the close or mask layer...
				$('.window').fadeOut(function() {
					$('a.close-window').hide();
					$('#mask').hide();
					// Clear the forms id when the modal is closed
					$('.windows #forms').empty();
				});
				e.preventDefault();
			});
		}
	},
	Detail : {
		setup : function() {
			Gigapan.Detail.addComment();
			Gigapan.Detail.action();
			Gigapan.Detail.sharing();
		},
		addComment : function() {
			$("body.detail .section-about a.add").click(function() {
				$("body.detail .section-about form").toggle();
				return false;
			});
			$("body.detail .section-about a.cancel").click(function() {
				$("body.detail .section-about form").toggle();
				return false;
			});
		},
		sharing : function() {
			var actions = $('body.detail .share-action');
			$(actions).hide();
			$("div#detail-share a").each(function(e) {
				$(this).bind('click', function(e) {
					var $this = $(this);
					var id =  $this.attr("href").replace("#", "");

					$this.addClass('active').siblings('a').removeClass('active');

					if(id !== "" && $(id) !== undefined) {
						var thisID = $("#" + id);
						thisID.show().siblings('div').hide();

						// Prevent default action:
						if($(this).is(".share-link, .share-facebook")) {
								return false;
							} 
						}
				});
			});
		},
		action : function() {
			var actions = $("body.detail .detail-action");
			$(actions).hide();
			$("body.detail #content .nav a").each(function() {
				$(this).bind('click', function(e) {

					var id = $(this).attr("href").replace("#", "");

					if(id !== "") {
						$(actions).each(function(e) {
							if($(this).attr("id") !== id) {
								$(this).hide();
							}
						});
						if($(id) !== undefined) {
							$("#" + id).toggle();
							// Exception: prevent default action on all
							// links except google-earth
							if($(this).is(".detail-google-earth, a.rss-icon, a.detail-competitions")) {
								return true;
							} else {
								e.preventDefault();
							}
						}
					}
				});
			});
		}
	}
};

var timerCount = 0;
var forceShowSDViewer = false;	// <jps>
var isMobileDeviceUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone OS/i.test(navigator.userAgent) ;

var SDViewer = {
	gigapan: {

	},
	initialize: function (gigapan){
		this.gigapan = gigapan;
		this.isTakingSnapshot = false;
	},
	render: function(viewer){
		// load the gigapan
		if (typeof this.gigapan.id != 'undefined') 
		{
			var gigapanId = this.gigapan.id;
			var authKey = (!this.gigapan.is_private) ? null : this.gigapan.auth_key;
				viewer = new org.gigapan.viewers.SeadragonViewer('gigapan-viewer', {
					id: this.gigapan.id,
					auth_key: authKey,
					width: this.gigapan.width,
					height: this.gigapan.height,
					levels: this.gigapan.levels,
					title: this.gigapan.title,
					printable: this.gigapan.allow_others_to_print,
					snapshottable: this.gigapan.snapshottable,
					related: this.gigapan.related_gigapans,
					embed: {
						width: "100%",
						height: "500"
					},
					options: {
						showGigapanWatermarkByDefault: false,
						showGigapanWatermarkOnFullscreen: true,
						showNavigationControl: true,
						showFullScreenButton: true,
						showResetButton: true,
						showPrintButton: true,
						showSnapshotBrowser: false,
						showSnapshotByDefault: false,
						showRelatedGigapans: false,
						showThumbnailNavigation: false
					}
				});


/*
			viewer = new org.gigapan.viewers.SeadragonViewer("gigapan-viewer", {
				id: this.gigapan.id,
				auth_key: this.gigapan.auth_key,
				width: this.gigapan.width,
				height: this.gigapan.height,
				levels: this.gigapan.levels,
				embed: {
					showWatermarkOnFullScreen: true,
					showPrintButton: true,
					showResetButton: false,
					showFullScreenButton: true
				}
			});
*/
			this.viewer = viewer;
			sdViewerLoaded(viewer);
		}
		else
		{
			alert("Failed to load gigapan " );
		}
	},
	addSnapshot : function(data) {
		snapshots.push(data);
		var snapshotScroller = document.getElementById("snapshot-scroller");
		var firstSnapshot = snapshotScroller.firstChild;
		var length = snapshots.length;

		var img = document.createElement('img');
		img.id = "snapshot_" + (length - 1);
		img.className = "snapshot";
		img.src = "http://static.gigapan.org/gigapans0/" + this.gigapan.id + "/images." + this.gigapan.auth_key + "/" + this.gigapan.id + "-90x60-" + Math.floor(data["external_snapshot"]["xmin"]) + "-" + Math.floor(data["external_snapshot"]["xmax"]) + "-" + Math.floor(data["external_snapshot"]["ymin"]) + "-" + Math.floor(data["external_snapshot"]["ymax"]) + ".jpg";

		img.onclick = snapshotEventHandler;
		img.onmouseout = snapshotEventHandler;
		img.onmouseover = snapshotEventHandler;
		img.ontouchstart = snapshotEventHandler;
		img.ontouchmove = snapshotEventHandler;
		img.ontouchend = snapshotEventHandler;
		img.ontouchcancel = snapshotEventHandler;
		img.oncontextmenu = snapshotEventHandler;
		snapshotScroller.insertBefore(img, firstSnapshot);
		},
	commentOnSnapshot : function(){
		$("#snapshot_"+selectedSnapshot.id).trigger("click");
	},
	takeSnapshot : function() {

	SDViewer.viewer.takeSnapshotFromLogin();

	},
	zoomToSnapshot : function() {
		if((SDViewer.viewer ) || timerCount > 5) {
			clearInterval(timer);
			window.setTimeout(function(){onSnapshotClick(currentSnapshot.snapshot.id)}, 1000);
			//scrollToSnapshot(currentSnapshotIndex);
		} else {
			timerCount++;
		}
	}
};

function drawSnapshotBoundry(x1,y1,x2,y2){
	// Pass the xy values of the current view - so we don't draw the snapshot rectangle in empty space...
	var startx = 0;
	var starty = 60;
	var snapWidth = 420;
	var snapHeight = 280;
	var viewerH = SDViewer.gigapan.height;
	var viewerW = SDViewer.gigapan.height;

	if( (x1<0 || y1<0) && ( x2 > viewerH || y2 > viewerW) ){
	// We're beyond the edges of the image - make a small boundry
		//console.log("Outside");
		snapHeight = 200;
		snapWidth = (snapHeight*3)/2;

		if(y2 > SDViewer.gigapan.height){
			// We've panned up, beyond the bottom of the image...
			startx = 100;
			starty = 0;
		}

		if(x1<0){

		}
	}else{
	// We should be within the image bounds, so draw as normal.
		//console.log("Inside");
		startx = ($("#gigapan-viewer").width() / 2 )-210;
		// Leave all other dimentions as default.
	}

	SnapshotHandler.setSelection(startx, starty, startx+snapWidth, starty+snapHeight, true); // 3:2 ratio, like existing snapshots
	SnapshotHandler.update();
}

function getViewBounds(x1,y1,x2,y2){
	return {
		"xmin": x1,
		"ymin": y1,
		"xmax": x2,
		"ymax": y2
	}
}

function setViewerContainerSize(viewer)
{
	$("#gigapan-viewer").width('100%');		//	$("#gigapan-viewer").width($(window).width()-155);
	$("#gigapan-viewer").height('100%');	//	$("#gigapan-viewer").height('400px');
}

function sdViewerLoaded(viewer)
{
  // Do whatever we need to when the viewer is loaded!
  setViewerContainerSize(viewer);
}

var Viewer = {
	fl_vars : {
		suffix : ".jpg",
		cleft : "0",
		ctop : "0",
		alphaTweenSpeed : "1",
		bitmapSmoothing : "1",
		centerLine : "0",
		debugAnalyzer : "0",
		debugWires : "0",
		debugTool : "0",
		doubleClickZoomRange : "5",
		doubleClickTweenEquation : "easeOutQuart",
		doubleClickTweenSpeed : "1.5",
		embedded : "0",
		fullScreenAllow : "1",
		keyZoomSpeed : "3",
		keyPanSpeed : "20",
		loginURL : "session.xml",
		loginFlashEnabled : "1",
		maxMemory : "200",
		notifyWhenLoaded : "1",
		scaleConstraint : "2",
		simultaneousTileLoad : "8",
		snapShotInternal : "0",
		startHideControls : "0",
		startHideWatermark : "1",
		tileDirectlyToStage : "0",
		tileSize : "256",
		viewerLoadedCallback : "flashBrowserLoaded",
		xmlFileRead : "0",
		useExternalMouseWheel : 1,
		mouseWheelExternalFunction : "mouseWheelExternalFunction"
	},
	fl_attrs : {
		id : "flash_viewer",
		name : "giapanflashviewer",
		wmode : "transparent"
	},
	initialize : function(gigapan) {
		this.gigapan = gigapan;
		if( typeof (debugTool) != "undefined") {
			this.fl_vars.debugTool = debugTool;
			this.fl_vars.debugAnalyzer = debugTool;
		}
		if( typeof (baseURL) != "undefined") {
			this.fl_vars.baseURL = baseURL;
		}
		if( typeof (createAccountURL) != "undefined") {
			this.fl_vars.createAccountURL = createAccountURL;
		}
		if( typeof (emailReminderURL) != "undefined") {
			this.fl_vars.emailReminderURL = emailReminderURL;
		}
	},
	render : function() {
		this.fl_vars.url = this.gigapan.tile_server_path;
		this.fl_vars.width = this.gigapan.width;
		this.fl_vars.height = this.gigapan.height;
		this.fl_vars.nlevels = this.gigapan.levels;
		this.fl_vars.cright = this.gigapan.width;
		this.fl_vars.cbottom = this.gigapan.height;
		this.fl_vars.gigapanId = this.gigapan.is_private ? this.gigapan.auth_key: this.gigapan.id;
		var params = {
			allowfullscreen : "true",
			quality : "high",
			wmode : "transparent",
			allowscriptaccess : "always"
		};
		if( typeof (flash_viewer) == "undefined") {
			flash_viewer = "http://www.gigapan.org/viewer/GigaPan.swf";
		}
//		swfobject.embedSWF(flash_viewer, "flashholder", "100%", "400", "9.0.28.0", "/viewer/js/expressInstall.swf", this.fl_vars, params, this.fl_attrs, embedCallback);
		swfobject.embedSWF(flash_viewer, "flashholder", "100%", "100%", "9.0.28.0", "http://www.gigapan.org/viewer/js/expressInstall.swf", this.fl_vars, params, this.fl_attrs, embedCallback);
	},
	setUserID : function(userID) {
		if(userID) {
			this.viewer.passFlashUserID(userID);
		}
	},
	takeSnapshot : function() {
		$('#take-snapshot').bind('click', function() {
			document.getElementById("flash_viewer").startTakingSnapshot();
			$("#noSnapshot").hide();
			return false;
		});
	},
	zoomToSnapshot : function(snapshot) {
		var bb = (snapshot.ymax - snapshot.ymin) * 0.02;
		return this.viewer.setViewBounds("onSnapshotClickSetViewBoundsReturn", snapshot.xmin - bb, snapshot.ymin - bb, snapshot.xmax + bb, snapshot.ymax + bb);
	}
};

function embedCallback(e) {
	if(!e.success) {
		viewer = document.getElementById("flashholder");
		div = document.createElement("div");
		div.setAttribute("class", "user-warning");
		h1 = document.createElement("h1");
		h1_content = document.createTextNode("This content requires Adobe Flash.");
		h1.appendChild(h1_content);
		div.appendChild(h1);
		p = document.createElement("p");
		a = document.createElement("a");
		a.setAttribute("href", "http://www.adobe.com/go/getflashplayer");
		p.appendChild(a);
		img = document.createElement("img");
		img.setAttribute("src", "/images/get_flash_player.gif");
		a.appendChild(img);
		div.appendChild(p);
		if ( isMobileDeviceUserAgent) {
		if (typeof(ios_url) != 'undefined') {
  		  if (ios_url) {
		      h1 = document.createElement("h1");
		      h1_content = document.createTextNode("iOS devices can view the Gigapan here: ");
		      h1.appendChild(h1_content);	
		      div.appendChild(h1);
		      h1 = document.createElement("h1");
		      a = document.createElement("a");
		      a.setAttribute("href", ios_url);
		      a.setAttribute("target", "_blank");
		      h1.appendChild(a);
		      a_content = document.createTextNode(ios_url);
		      a.appendChild(a_content);		
		      div.appendChild(h1);
		  }
		}
	    }
		viewer.appendChild(div);
	}
}

function refreshSnapshots() {
	var FS = Filmstrip;
	// Get the most recent JSON
	$.ajax({
		url : snapshots.url,
		dataType : 'json',
		data : {
			page : 1,
			per_page : snapshots.per_page
		},
		success : function(response) {
			FS.prepend_snapshots(response);
			if (typeof snapshot != 'undefined') {
				FS.render_snapshots(snapshot);
			}
		}
	});
}

/* Home Page specific */

function goToPanorama() {
	window.location.href = "/" + "gigapans/" + gigaID;
}

var isFlashBrowserLoaded = false;
var beforeZoomInPauseDuration = 4000;
var afterZoomInPauseDuration = 4000;
var afterZoomOutPauseDuration = 4000;
var beforeZoomInAttractLoopTimeoutId = null;
var afterZoomInAttractLoopTimeoutId = null;
var afterZoomOutAttractLoopTimeoutId = null;

function doAttractLoopZoomIn() {
	if(isFlashBrowserLoaded) {
		if(Viewer.snapshot) {
			// zoom to this snapshot
			document.getElementById('flash_viewer').setViewBounds('afterAttractLoopZoomIn', Viewer.snapshot.xmin, Viewer.snapshot.ymin, Viewer.snapshot.xmax, Viewer.snapshot.ymax);
		}
	}
}

function afterAttractLoopZoomIn() {
	// pause and then zoom back out
	clearTimeout(afterZoomInAttractLoopTimeoutId);
	afterZoomInAttractLoopTimeoutId = setTimeout(doAttractLoopZoomOut, afterZoomInPauseDuration);
}

function doAttractLoopZoomOut() {
	// zoom out to show the full pano
	document.getElementById('flash_viewer').setViewBounds('afterAttractLoopZoomOut', 0, 0, Viewer.gigapan.width, Viewer.gigapan.height);
}

function afterAttractLoopZoomOut() {
	clearTimeout(afterZoomOutAttractLoopTimeoutId);
}

function testReady() {
	if((isFlashBrowserLoaded && _loaded) || timerCount > 5) {
		clearInterval(timer);
		zoomToSnapshot(currentSnapshot.snapshot);
		//Gigapan.Filmstrip.setupCurrentSnapshot(currentSnapshot);
	} else {
		timerCount++;
	}
}

var SnapshotHandler ;
$(window).load(function() {
  Gigapan.setup();

	if (forceShowSDViewer || isMobileDeviceUserAgent){
		var viewerElmt = document.getElementById("gigapan-viewer");
		// create and initialize the viewer
		if (viewerElmt) {
			if (typeof (gigapan) != "undefined") {
				SDViewer.initialize(gigapan.gigapan);
			}
			if( typeof (snapshot) != "undefined") {
				SDViewer.snapshot = snapshot.snapshot;
			}

			SDViewer.render(viewerElmt);
			//SDViewer.takeSnapshot();

			if (typeof (currentSnapshot) != 'undefined') {
				timer = setInterval(SDViewer.zoomToSnapshot, 1000);
			}

			$(window).bind('resize', function(e) {
				window.resizeEvt;
				$(window).resize(function() {
					clearTimeout(window.resizeEvt);
					window.resizeEvt = setTimeout(function() {
							setViewerContainerSize(SDViewer.viewer);
							// scrollToSnapshot(currentSnapshotIndex);	// <jps>
						}, 250); // Trigger the resize event 250 milliseconds after the user has stopped resizing
				});
			});
			
			// experiments with tryint to force "view-all" at first load <jps>
			// SDViewer.viewer.setViewBounds('hideSnapInclusion', 0, 0, 0, 0); // (SDViewer.gigapan.width();
		}

//		if( gigapan.gigapan.allow_others_to_print == false){
			$("#mobile-buy-print-button").remove();
//		}
		$("#flashholder").remove();
		$("#actions-button-block").remove();
//		$(".gigapan-view .gigapan-actions").css("padding", "0 40px 0 40px");

	}else{
		$("#gigapan-viewer").remove();
		viewer = document.getElementById("flashholder");
		if(viewer) {
			if( typeof (gigapan) != "undefined") {
				Viewer.initialize(gigapan.gigapan);
			}
			if( typeof (snapshot) != "undefined") {
				Viewer.snapshot = snapshot.snapshot;
			}
			Viewer.render();
		}
	}
});

function showDefaultFeedbackForm() {
	$("custom_feedback").hide();
	$("form_area").show();
}

function cancelEvent(e) {
	e = e ? e : window.event;
	if(e.stopPropagation) {
		e.stopPropagation();
	}
	if(e.preventDefault) {
		e.preventDefault();
	}
	e.cancelBubble = true;
	e.cancel = true;
	e.returnValue = false;
	return false;
}

function mouseWheel(e) {
	e = e ? e : window.event;
	var raw = e.detail ? e.detail : e.wheelDelta;
	var normal = e.detail ? e.detail * -1 : e.wheelDelta / 40;
	var delta = 0;
	if(normal > 3) {
		delta = 3;
	} else {
		if(delta < -3) {
			delta = -3;
		} else {
			delta = normal;
		}
	}
	document.getElementById("flash_viewer").mouseWheelExternalFunction(delta);
	cancelEvent(e);
}

Placeholder = function Placeholder() {
	if(!this.length) {
		return;
	}
	var c = "placeholder", hasNativeSupport = c in document.createElement("input");
	if($.browser.opera && $.browser.version < "11.50") {
		hasNativeSupport = false;
	}
	if(!hasNativeSupport) {
		$("form").submit(function() {
			var $this = $(this);
			$this.find("input[placeholder], textarea[placeholder]").each(function() {
				var e = $(this);
				if(e.attr("value") === e.attr("placeholder")) {
					e.val("");
				}
			});
		});
	}
	return this.each(function() {
		var e = $(this), d = e.attr("placeholder"), ispassword = e.attr("type") === "password";
		var placeholderOnFocus = function() {
			if(e.hasClass(c)) {
				if(!hasNativeSupport) {
					e.val("");
				}
				e.removeClass(c);
			}
		};
		var placeholderOnBlur = function(event) {
			if(!e.val() || e.val() === d) {
				if(!hasNativeSupport) {
					if(!ispassword) {
						e.addClass(c).val(d);
					} else {
						showInput(fakePassw);
						hideInput(e);
					}
				} else {
					e.addClass(c);
				}
			}
		};
		var hideInput = function(e) {
			e.css({
				position : "absolute",
				left : "-9999em"
			});
		};
		var showInput = function(e) {
			return e.removeAttr("style");
		};
		if(!ispassword || hasNativeSupport) {
			e.bind("focus.placeholder", placeholderOnFocus);
		} else {
			var inputCssClass = (e[0].className) ? " " + e[0].className : "", size = (e[0].size) ? "size=" + e[0].size : "";
			var fakePassw = $('<input type="text" class="' + c + inputCssClass + '" value="' + d + '"' + size + ' tabindex="-1" />');
			fakePassw.bind("focus.placeholder", function() {
				e.trigger("focus.placeholder");
			});
			e.before(fakePassw).bind("focus.placeholder", function() {
				showInput(e);
				hideInput(fakePassw);
			});
		}
		e.bind("blur.placeholder", placeholderOnBlur).trigger("blur.placeholder");
	});
};
var ie6 = false;
if($.browser.msie && $.browser.version.substr(0, 1) < 7) {
	ie6 = true;
}
var methods = {}, lists = [], keyMap = {
	left : 37,
	up : 38,
	right : 39,
	down : 40,
	enter : 13
}, dropdownTemplate = ['<div class="custom-select">', '<a href="#" class="current-selected">', "{{ label }}", "</a>", '<div class="custom-select-wrapper">', '<div class="cd_options">', "<ul>", "</ul>", "</div>", '<div class="bottom"></div>', "</div>", "</div>"].join(""), optionTemplate = '<li class="{{ current }}"><a href="#" class="selected" dropdown-value="{{ value }}">{{ text }}</a></li>', defaults = {
	startSpeed : "fast",
	change : false
}, keysBound = false;
methods.init = function(settings) {
	settings = $.extend({}, defaults, settings);
	return this.each(function() {
		var $select = $(this), $original = $select.find(":selected").first(), $options = $select.find("option"), data = $select.data("customDrop") || {}, id = $select.attr("id") || $select.attr("name"), $dk = false, theme;
		data.settings = settings;
		data.id = id;
		data.$original = $original;
		data.$select = $select;
		data.value = _notBlank($select.val()) || _notBlank($original.attr("value"));
		data.label = $original.text();
		data.options = $options;
		$dk = _build(dropdownTemplate, data);
		$select.before($dk);
		$dk = $(".custom-select").fadeIn(settings.startSpeed);
		data.$dk = $dk;
		$select.data("customDrop", data);
		$dk.data("customDrop", data);
		lists[lists.length] = $select;
		$dk.bind("focus.customDrop", function(e) {
			$dk.addClass("focus");
		}).bind("blur.customDrop", function(e) {
			$dk.removeClass("open focus");
		});
		setTimeout(function() {
			$select.hide();
		}, 0);
	});
};
methods.reset = function() {
	for(var i = 0, l = lists.length; i < l; i++) {
		var listData = lists[i].data("customDrop"), $dk = listData.$dk, $current = $dk.find("li").first();
		$dk.find(".current-selected").text(listData.label);
		$dk.find(".cd_options ul").animate({
			scrollTop : 0
		}, 0);
		_setCurrent($current, $dk);
		_updateFields($current, $dk, true);
	}
};
jQuery.fn.customDrop = function(method) {
	if(!ie6) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			if( typeof method === "object" || !method) {
				return methods.init.apply(this, arguments);
			}
		}
	}
};
function _handleKeyBoardNav(e, $dk) {
	var code = e.keyCode, data = $dk.data("customDrop"), options = $dk.find(".cd_options"), open = $dk.hasClass("open"), current = $dk.find(".cd_option_current"), first = options.find("li").first(), last = options.find("li").last(), next, prev;
	switch (code) {
		case keyMap.enter:
			if(open) {
				_updateFields(current.find("a"), $dk);
				_closeDropdown($dk);
			} else {
				_openDropdown($dk);
			}
			e.preventDefault();
			break;
		case keyMap.up:
			prev = current.prev("li");
			if(open) {
				if(prev.length) {
					_setCurrent(prev, $dk);
				} else {
					_setCurrent(last, $dk);
				}
			} else {
				_openDropdown($dk);
			}
			e.preventDefault();
			break;
		case keyMap.down:
			if(open) {
				next = current.next("li").first();
				if(next.length) {
					_setCurrent(next, $dk);
				} else {
					_setCurrent(first, $dk);
				}
			} else {
				_openDropdown($dk);
			}
			e.preventDefault();
			break;
		default:
			break;
	}
}

function _updateFields(option, $dk, reset) {
	var value, label, data;
	value = option.attr("dropdown-value");
	label = option.text();
	data = $dk.data("customDrop");
	$select = data.$select;
	$select.val(value);
	$dk.find(".current-selected").text(label);
	reset = reset || false;
	if(data.settings.change && !reset) {
		data.settings.change.call($select, value, label);
	}
}

function _setCurrent($current, $dk) {
	$dk.find(".cd_option_current").removeClass("cd_option_current");
	$current.addClass("cd_option_current");
	_setScrollPos($dk, $current);
}

function _setScrollPos($dk, anchor) {
	var height = anchor.prevAll("li").outerHeight() * anchor.prevAll("li").length;
	$dk.find(".cd_options ul").animate({
		scrollTop : height + "px"
	}, 0);
}

function _closeDropdown($dk) {
	$dk.removeClass("open");
}

function _openDropdown($dk) {
	var data = $dk.data("customDrop");
	$dk.find(".cd_options").css({
		top : $dk.find(".current-selected").outerHeight() - 1
	});
	$dk.toggleClass("open");
}

function _build(tpl, view) {
	var template = tpl, options = [], $dk;
	template = template.replace("{{ id }}", view.id);
	template = template.replace("{{ label }}", view.label);
	if(view.options && view.options.length) {
		for(var i = 0, l = view.options.length; i < l; i++) {
			var $option = $(view.options[i]), current = "cd_option_current", oTemplate = optionTemplate;
			oTemplate = oTemplate.replace("{{ value }}", $option.val());
			oTemplate = oTemplate.replace("{{ current }}", (_notBlank($option.val()) === view.value) ? current : "");
			oTemplate = oTemplate.replace("{{ text }}", $option.text());
			options[options.length] = oTemplate;
		}
	}
	$dk = $(template);
	$dk.find(".cd_options ul").html(options.join(""));
	return $dk;
}

function _notBlank(text) {
	return ($.trim(text).length > 0) ? text : false;
}

$(function() {
	$(".current-selected, .custom-select-wrapper").live("click", function(e) {
		var $dk = $(this).parents(".custom-select").first();
		_openDropdown($dk);
		e.preventDefault();
		return false;
	});
	$(".cd_options a").live(($.browser.msie ? "mousedown" : "click"), function(e) {
		var $option = $(this), $dk = $option.parents(".custom-select").first(), data = $dk.data("customDrop");
		_closeDropdown($dk);
		_updateFields($option, $dk);
		_setCurrent($option.parent(), $dk);
		e.preventDefault();
		return false;
	});
	$(document).bind("keydown.cd_nav", function(e) {
		var $open = $(".custom-select.open"), $focused = $(".custom-select.focus"), $dk = null;
		if($open.length) {
			$dk = $open;
		} else {
			if($focused.length && !$open.length) {
				$dk = $focused;
			}
		}
		if($dk) {
			_handleKeyBoardNav(e, $dk);
		}
	});
});
buttonBehavior = function buttonBehavior() {
	$(this).bind("mouseup mousedown", function() {
		$(this).toggleClass("mousedown");
	});
};
textFocus = function textFocus() {
	$("input[type=text]").bind("focus blur", function() {
		$(this).toggleClass("focus_class");
	});
};
function flashBrowserLoaded() {
	Viewer.viewer = document.getElementById('flash_viewer');
	Viewer.viewer.enableViewer();
	if(Viewer.viewer.addEventListener) {
		Viewer.viewer.addEventListener('DOMMouseScroll', mouseWheel, false);
		Viewer.viewer.addEventListener('mousewheel', mouseWheel, false);
	} else {
		Viewer.viewer.attachEvent("onmousewheel", mouseWheel);
	}
	isFlashBrowserLoaded = true;
	if(userID) {
		Viewer.setUserID(userID);
	}
	Viewer.takeSnapshot();
	if( typeof (redirectPage) != 'undefined') {
		if(redirectPage) {
			clearTimeout(beforeZoomInAttractLoopTimeoutId);
			beforeZoomInAttractLoopTimeoutId = setTimeout(doAttractLoopZoomIn, beforeZoomInPauseDuration);
			gigaID = Viewer.gigapan.id;
		}
	}

	if( typeof (currentSnapshot) != 'undefined') {
		onSnapshotClick(currentSnapshot.snapshot.id);
//	    scrollToSnapshot(currentSnapshotIndex);
	}
}

// This is the *total* width of a snapshot--the image, plus right margin (90 + 15).
var snapshotWidth = 105;
var scrollRight = true;

function snapshotsInView() {
	//Outer Box
	var viewport = $('#gigapan-carousel')[0];
	return Math.floor(viewport.clientWidth / snapshotWidth);
}

/*
// Zero snapshots? Hide the controls.
if(snapshots.items.length <= 0) {
	$("#prev, #next").hide();
}
*/

function scrollToSnapshot (index){
	// Moves the carousel to the selected snapshot.
	// Only really relevant for the snapshot view page (/gigapans/gigaID/snapshots/snapID )
	var dl = $('#snapshots')[0];
	var viewport = $('#gigapan-carousel')[0];

	var l = ((dl.style.left) ? parseInt(dl.style.left) : 0);
	var target = -Math.floor(index * snapshotWidth) ;
	if( (snapshotsInView() < index) && (l > target) ){
		// If the snapshot is not in the initial view
		var imageSum = snapshots.total_entries;
		var maxPos = (imageSum * -snapshotWidth);
		var moveTo = 0;
		moveTo = -(Math.floor(Math.abs((target/viewport.clientWidth)))*viewport.clientWidth);
		$(dl).animate({"left" : moveTo}, 1200);
		if(imageSum > snapshotsInView()) {
		  dl.style.width = maxPos * -1 + "px";
		}
	}
}

// Filmstrip Scroll
function snapshotScroll(amount, refresh) {
	var imageSum = snapshots.total_entries;
	//Inner Box
	var dl = $('#snapshots')[0];
	//Outer Box
	var c = $('#gigapan-carousel')[0];

	var l = ((dl.style.left) ? parseInt(dl.style.left) : 0);
	var pos = l + parseInt(amount);
	var pos0 = pos;

	//How many snapshots in view
	var viewport = $('#gigapan-carousel')[0];
	var inView = Math.floor(viewport.clientWidth / snapshotWidth);
	var maxPos = (imageSum * -snapshotWidth);
	// prevent left side from going too far right
	if(pos > 0) {
		pos = 0;
	} else if(pos < c.clientWidth - dl.clientWidth) {
		pos = c.clientWidth - dl.clientWidth;
    // To account for 8px variation,
    // Set position to initial pos0 for animation.
    if(pos == 8) {
      pos = pos0;
    }
	}
  // Animate scroll
  $(dl).animate({"left" : pos}, 1200);

  // Toggle "filter" class (reduces opacity) depending on position.
  // if position is max, toggleClass of #next.
  // if position is 0, toggleClass of #prev.
  $('#next').toggleClass('filter', (pos - maxPos) == (c.clientWidth))
  $('#prev').toggleClass('filter', (pos >= 0))

	if(imageSum > inView) {
		dl.style.width = maxPos * -1 + "px";
	}
}

/**
 * Filmstrip Viewer on Gigapan show page
 */
var Filmstrip = {
	api_url : null,
	rendering : false,	// <jps>
	min_page : null,
	max_page : null,
	prev : function() {
		if( typeof (currentSnapshot) != "undefined" && !Filmstrip.rendering && snapshots.current_page - 1 < Filmstrip.min_page) {
			Filmstrip.rendering = true;
			Filmstrip.min_page = snapshots.current_page - 1;
			Filmstrip.fetch(snapshots.current_page - 1, 40);
		}
		return snapshotScroll(snapshotsInView() * snapshotWidth, true);
	},
	next : function() {
		if(snapshots.items.length < snapshots.total_entries && !Filmstrip.rendering && snapshots.current_page + 1 > Filmstrip.max_page) {
			Filmstrip.rendering = true;
			Filmstrip.max_page = snapshots.current_page + 1;
			Filmstrip.fetch(snapshots.current_page + 1, 40);
		}
		return snapshotScroll(-1 * snapshotsInView() * snapshotWidth, true);
	},
	render_snapshots : function(items) {
		var content = '';
		for( i = 0, len = items.length; i < len; i++) {
			var snapshot = items[i].snapshot;
			content += '<li id="' + snapshot.id + '_slide" class="rs-carousel-item">' + 
//						'<a title="View snapshot: ' + snapshot.name + '" id="' + snapshot.id + '_comment" href="#" class="snapshot_title">' + snapshot.truncated_name + '</a>' + 
						'<a title="View snapshot: ' + snapshot.name + '" id="' + snapshot.id + '_thumbnail" class="photo" href="#"><img src="' + snapshot.thumbnail_uri + '" id="' + snapshot.id + '_img"></a>' + 
//						'<a title="View Snapshot" id="' + snapshot.id + '_comment_count" href="#" class="comments">' + snapshot.comment_count + '</a>' + 
						'</li>';
		}
		return content;
	},
	append_snapshots : function(items) {
		var content = this.render_snapshots(items);
		document.getElementById('snapshots').innerHTML += content;
		snapshots.items = snapshots.items.concat(items);
	},
	prepend_snapshots : function(items) {
		var content = this.render_snapshots(items);
		document.getElementById('snapshots').innerHTML = content;
		snapshots.items = items.concat(snapshots.items)
	},
	fetch : function(page, per_page) {
		$.ajax({
			type : "GET",
			url : this.api_url,
			data : {
				page : page,
				per_page : per_page
			},
			beforeSend: function(){
			$('#loading').show();
			},
			complete: function(){
			$('#loading').hide();
			},
			success : function(data) {
				var new_items = data;
				if(snapshots.current_page < page) {
					Filmstrip.append_snapshots(new_items);
					snapshots.current_page = page;
				} else {
					Filmstrip.prepend_snapshots(new_items);
					snapshots.current_page--;
				}
				Filmstrip.rendering = false;
			}
		});
	},
	setup : function() {
		this.append_snapshots(snapshots.items);
		this.min_page = snapshots.current_page;
		this.max_page = snapshots.current_page;
	}
};