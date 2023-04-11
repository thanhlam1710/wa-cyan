/*!
 * ScriptName: common.js
 * Version: 1.14
 *
 * FoodConnection
 * http://foodconnection.jp/
 * http://foodconnection.vn/
 *
 */



/*
 * Catch errors
 *
 */

window.onerror = function (message, url, line, column, error) {
	if (message.indexOf("Script error.") > -1) return;

	if ($("html").hasClass("fc-debugger")) {
		var uid = md5(message + url + line + column),
			filename = url,
			consoleHTML = "",
			msg = "",
			total = 0,
			$blkConsole = $("#fc-console .console-main > .console-block:first-child[data-uid='" + uid + "']");

		consoleHTML += '<div id="fc-console">';
			consoleHTML += '<div class="console-title">FC Console</div>';
			consoleHTML += '<div class="console-clear">Clear</div>';
			consoleHTML += '<div class="console-main">';
			consoleHTML += '</div>';
		consoleHTML += '</div>';

		if ($("#fc-console").length < 1) $("body").append(consoleHTML);

		if (typeof url !== "undefined") {
			var fname = url.replace("\\", "/"); // correct slashes
			if (fname.lastIndexOf("/")) fname = fname.substr(fname.lastIndexOf("/") + 1);
			filename = fname.substr(0, fname.lastIndexOf(".")) + "." + fname.substr(fname.lastIndexOf(".") + 1);
			if (filename.length < 3) filename = url;
		}

		msg += '<div class="console-block" data-uid="' + uid + '" data-count="1">';
			msg += '<div class="console-message">' + message + '</div>';
			msg += '<div class="console-stacktrace">';
				msg += '<div class="console-file">Script: <a href="' + url + '" target="_blank">' + filename + '</a></div>';
				msg += '<div class="console-line">Line: <strong>' + line + '</strong></div>';
				msg += '<div class="console-column">Column: <strong>' + column + '</strong></div>';
			msg += '</div>';
			msg += '<div class="console-error">' + error + '</div>';
		msg += '</div>';

		if ($blkConsole.length > 0) {
			var count = $blkConsole.attr("data-count");
			if (count !== undefined && !isNaN(count) && Number(count) >= 0) {
				count = Number(count);
				count++;

				$blkConsole.attr("data-count", count);
			} else $blkConsole.attr("data-count", 1);
		} else $("#fc-console .console-main").prepend(msg);

		$("#fc-console .console-main > .console-block").each(function() {
			var count = $(this).attr("data-count");
			if (count !== undefined && !isNaN(count) && Number(count) >= 0) total += Number(count);
			else total++;
		});

		$("#fc-console .console-title").attr("data-total", total);
	}
};



$(document).ready(function() {
	var UA = navigator.userAgent;
	if (UA.indexOf("iPhone") < 0 && UA.indexOf("Android") < 0) $(".telhref").contents().unwrap(); // remove link [tel] on desktop
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) $("html.mobile-no-animate").addClass("noanimated"); // to remove transition
	else $("html.mobile-no-animate").removeClass("noanimated");

	// fix bg parallax on mobile
	if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
	else $(".bg-parallax").css("background-attachment", "");



	var clipboardData = new Clipboard(".copy", {
		// container: $(".copy").get(0),
		text: function(trigger) {
			var _text_ = document.title + " " + location.href,
				_viewport_ = $("meta[name='viewport']").attr("content");

			if ($(trigger).attr("data-copy") && $(trigger).attr("data-copy").length > 0) _text_ = $(trigger).attr("data-copy");

			if (_viewport_ && /(?:user-scalable\s*=\s*yes)/i.test(_viewport_)) $("meta[name='viewport']").attr("content", _viewport_.replace(/(?:user-scalable\s*=\s*yes)/i, "user-scalable=no")); // disabled zoom

			if ($(trigger).attr("data-replace-text")) $(trigger).html($(trigger).attr("data-replace-text"));
			else if ($(trigger).attr("data-replace-image")) {
				if ($(trigger).children("img").length > 0) {
					var _imgReplace_ = $(trigger).attr("data-replace-image");

					if ($(trigger).children("img").hasClass("btn")) {
						$(trigger).children("img").addClass("copy-change");

						_imgReplace_ =
							_imgReplace_
								.replace(/^(.*?)(_on)?\.(.*?)$/, "$1_on.$3");
					}

					$(trigger).children("img").attr("src", _imgReplace_);
				} else $(trigger).html('<img src="' + $(trigger).attr("data-replace-image") + '" />');
			}

			$(trigger).addClass("copied");

			if (_viewport_) $("meta[name='viewport']").attr("content", _viewport_); // enabled zoom

			return _text_;
		}
	});

	clipboardData
		.on("success", function() {
			var offsetX = window.scrollX || window.pageXOffset || window.document.documentElement.scrollLeft,
				offsetY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

			// firefox jump - fixed
			window.scroll(offsetX, offsetY); // started

			setTimeout(function() { // step 1
				window.scroll(offsetX, offsetY);
			}, 20);

			setTimeout(function() { // step 2
				window.scroll(offsetX, offsetY);
			}, 15);

			setTimeout(function() { // step 3
				window.scroll(offsetX, offsetY);
			}, 10);

			setTimeout(function() { // step 4
				window.scroll(offsetX, offsetY);
			}, 5);

			setTimeout(function() { // step 5
				window.scroll(offsetX, offsetY);
			}, 0);

			window.scroll(offsetX, offsetY); // final
		})
		.on("error", function() {
		});

	$("body")
		.on("click", "#fc-console .console-title", function() {
			$(this).parents("#fc-console").toggleClass("active");
		})
		.on("click", "#fc-console .console-clear", function() {
			$("#fc-console").removeClass("active");
			$("#fc-console .console-main").empty();
			$("#fc-console .console-title").removeAttr("data-total");
		})
		.on("click", ".copy", function(e) {
			e.preventDefault();

			$(this).removeAttr("data-clipboard-text");
		});



	// BEGIN: bxSlider plugin
	if ($(".bxSlider").length) {
		if ($.fn.bxSlider) {
			$(".bxSlider").each(function() {
				var $bxSliderData = {
						mode: $.inArray($(this).attr("data-mode"), ["horizontal", "vertical", "fade"]) >= 0 ? $(this).attr("data-mode") : "fade",
						auto: $.inArray($(this).attr("data-auto"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						controls: $.inArray($(this).attr("data-controls"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						randomStart: $.inArray($(this).attr("data-randomStart"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						infiniteLoop: $.inArray($(this).attr("data-infiniteLoop"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						responsive: $.inArray($(this).attr("data-responsive"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						touchEnabled: $.inArray($(this).attr("data-touchEnabled"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						ticker: $.inArray($(this).attr("data-ticker"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						tickerHover: $.inArray($(this).attr("data-tickerHover"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						pager: $.inArray($(this).attr("data-pager"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						pagerCustom: typeof $(this).attr("data-pagerCustom") != "undefined" && $(this).attr("data-pagerCustom").length > 0 ? $(this).attr("data-pagerCustom") : null,
						pagerSelector: typeof $(this).attr("data-pagerSelector") != "undefined" ? $(this).attr("data-pagerSelector") : null,
						useCSS: $.inArray($(this).attr("data-useCSS"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						autoHover: $.inArray($(this).attr("data-autoHover"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						preloadImages: $.inArray($(this).attr("data-preloadImages"), ["all", "visible"]) >= 0 ? $(this).attr("data-preloadImages") : "visible",
						hideControlOnEnd: $.inArray($(this).attr("data-hideControlOnEnd"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						captions: $.inArray($(this).attr("data-captions"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						clickContinue: $.inArray($(this).attr("data-clickContinue"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						speed: typeof $(this).attr("data-speed") != "undefined" ? parseInt($(this).attr("data-speed")) : 1000,
						pause: typeof $(this).attr("data-pause") != "undefined" ? parseInt($(this).attr("data-pause")) : 4000,
						slideMargin: typeof $(this).attr("data-slideMargin") != "undefined" ? parseInt($(this).attr("data-slideMargin")) : 0,
						startSlide: typeof $(this).attr("data-startSlide") != "undefined" ? parseInt($(this).attr("data-startSlide")) : 0,
						autoDelay: typeof $(this).attr("data-autoDelay") != "undefined" ? parseInt($(this).attr("data-autoDelay")) : 0,
						minSlides: typeof $(this).attr("data-minSlides") != "undefined" ? parseInt($(this).attr("data-minSlides")) : 1,
						maxSlides: typeof $(this).attr("data-maxSlides") != "undefined" ? parseInt($(this).attr("data-maxSlides")) : 1,
						moveSlides: typeof $(this).attr("data-moveSlides") != "undefined" ? parseInt($(this).attr("data-moveSlides")) : 0,
						slideWidth: typeof $(this).attr("data-slideWidth") != "undefined" ? parseInt($(this).attr("data-slideWidth")) : 0,
						autoDirection: $.inArray($(this).attr("data-autoDirection"), ["next", "prev"]) >= 0 ? $(this).attr("data-autoDirection") : "next",
						preloadImages: $.inArray($(this).attr("data-preloadImages"), ["all", "visible"]) >= 0 ? $(this).attr("data-preloadImages") : "visible",
						adaptiveHeight: $.inArray($(this).attr("data-adaptiveHeight"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
						adaptiveHeightSpeed: typeof $(this).attr("data-adaptiveHeightSpeed") != "undefined" ? parseInt($(this).attr("data-adaptiveHeightSpeed")) : 500,
						nextSelector: typeof $(this).attr("data-nextSelector") != "undefined" ? $(this).attr("data-nextSelector") : null,
						prevSelector: typeof $(this).attr("data-prevSelector") != "undefined" ? $(this).attr("data-prevSelector") : null,
						nextText: typeof $(this).attr("data-nextText") != "undefined" ? $(this).attr("data-nextText") : "Next",
						prevText: typeof $(this).attr("data-prevText") != "undefined" ? $(this).attr("data-prevText") : "Prev",
						easing: typeof $(this).attr("data-easing") != "undefined" ? $(this).attr("data-easing") : null
					};

				if (typeof $(this).attr("data-auto") == "undefined") $bxSliderData.auto = true;
				if (typeof $(this).attr("data-infiniteLoop") == "undefined") $bxSliderData.infiniteLoop = true;
				if (typeof $(this).attr("data-responsive") == "undefined") $bxSliderData.responsive = true;
				if (typeof $(this).attr("data-touchEnabled") == "undefined") $bxSliderData.touchEnabled = true;
				if (typeof $(this).attr("data-useCSS") == "undefined" && $bxSliderData.mode === "fade") $bxSliderData.useCSS = true;
				if (typeof $(this).attr("data-controls") == "undefined" && ($bxSliderData.pagerCustom !== null || $bxSliderData.pagerSelector !== null)) $bxSliderData.pager = true;
				if (typeof $(this).attr("data-controls") == "undefined" && ($bxSliderData.nextSelector !== null || $bxSliderData.nextSelector !== null)) $bxSliderData.controls = true;
				if (typeof $(this).attr("data-nextText") == "undefined" && $bxSliderData.nextSelector !== null) $bxSliderData.nextText = "";
				if (typeof $(this).attr("data-prevText") == "undefined" && $bxSliderData.prevSelector !== null) $bxSliderData.prevText = "";

				if ($bxSliderData.ticker === true) {
					$bxSliderData.mode = $.inArray($bxSliderData.mode, ["horizontal", "vertical"]) >= 0 ? $bxSliderData.mode : "horizontal";
					$bxSliderData.auto = false;
					$bxSliderData.autoStart = true;
					$bxSliderData.autoDelay = 0;
					$bxSliderData.autoHover = false;
					$bxSliderData.useCSS = false;
				}

				var $bxSlider = $(this).bxSlider({
						mode: $bxSliderData.mode,
						auto: $bxSliderData.auto,
						controls: $bxSliderData.controls,
						randomStart: $bxSliderData.randomStart,
						infiniteLoop: $bxSliderData.infiniteLoop,
						responsive: $bxSliderData.responsive,
						touchEnabled: $bxSliderData.touchEnabled,
						ticker: $bxSliderData.ticker,
						tickerHover: $bxSliderData.tickerHover,
						pager: $bxSliderData.pager,
						pagerCustom: $bxSliderData.pagerCustom,
						useCSS: $bxSliderData.useCSS,
						autoHover: $bxSliderData.autoHover,
						preloadImages: $bxSliderData.preloadImages,
						hideControlOnEnd: $bxSliderData.hideControlOnEnd,
						captions: $bxSliderData.captions,
						speed: $bxSliderData.speed,
						pause: $bxSliderData.pause,
						slideMargin: $bxSliderData.slideMargin,
						startSlide: $bxSliderData.startSlide,
						autoDelay: $bxSliderData.autoDelay,
						minSlides: $bxSliderData.minSlides,
						maxSlides: $bxSliderData.maxSlides,
						moveSlides: $bxSliderData.moveSlides,
						slideWidth: $bxSliderData.slideWidth,
						autoDirection: $bxSliderData.autoDirection,
						preloadImages: $bxSliderData.preloadImages,
						adaptiveHeight: $bxSliderData.adaptiveHeight,
						adaptiveHeightSpeed: $bxSliderData.adaptiveHeightSpeed,
						nextSelector: $bxSliderData.nextSelector,
						prevSelector: $bxSliderData.prevSelector,
						nextText: $bxSliderData.nextText,
						prevText: $bxSliderData.prevText,
						easing: $bxSliderData.easing,
						onSlideAfter: function() {
							if (($bxSliderData.ticker !== true && $bxSliderData.tickerHover !== true) && $bxSliderData.auto !== false && $bxSliderData.clickContinue) {
								$bxSlider.stopAuto();
								$bxSlider.startAuto();
							}
						}
					});

				if ($(this).parents(".bxSlider-pager").length) {
					$(this).parents(".bxSlider-pager").on("mouseenter", "a[data-slide-index]", function() {
						var $idx = $(this).attr("data-slide-index");
						if ($idx != $bxSlider.getCurrentSlide()) $bxSlider.goToSlide($idx);
					});
				}

				if ($bxSliderData.autoHover === true) {
					$(this).hover(function() {
						$bxSlider.stopAuto();
					}, function() {
						$bxSlider.startAuto();
					});
				}

				$(window).resize(function() {
					if (!$($bxSlider).hasClass("no-reload")) $bxSlider.reloadSlider();
				});
			});
		} else console.error("required libs bxSlider");
	}
	// END: bxSlider plugin

	// BEGIN: slide fading
	if ($(".slide-fade").length > 0) {
		$(".slide-fade").each(function() {
			var $this = $(this),
				__idx__ = $(".slide-fade").index($this),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000,
				$delay = typeof $this.attr("data-delay") != "undefined" ? parseInt($this.attr("data-delay")) : false;

			if ($timer < $duration) $timer = $duration * 2;

			if (!$this.children(".active").length > 0) {
				$this.children().hide();
				$this.children().eq(0).show().addClass("active");

				if ($this.siblings(".slide-page").length > 0) $this.siblings(".slide-page").children().eq(0).addClass("active");
			} else {
				if ($this.siblings(".slide-page").length > 0) $this.siblings(".slide-page").children().eq($this.children(".active").index()).addClass("active");
			}

			if ($(this).siblings(".slide-page").length > 0) {
				$(this).siblings(".slide-page").children().each(function(i) {
					$(this).attr("data", i);
				});
			}

			if (!$(this).hasClass("stop")) {
				// $slideFadeTimer[__idx__] = setInterval(function() {
					// slideFade($this, $duration);
				// }, $timer);

				$(this).parents(".slideParent").addClass("move-start").attr("data", $this.children(".active").index());

				if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);
				$slideFadeTimer[__idx__] = setTimeout(function() {
					slideFade($this, $duration);
				}, $delay ? $delay : $timer);
			}
		});

		/*
		 * TODO:
		 * --- removeClass/addClass
		 * .move-next
		 * .move-prev
		 * .move-first
		 * .move-last
		 *
		 */

		$("body").on("click", ".slide-btn > .slide-next", function() {
			var $btn = $(this),
				$this = $btn.parent().siblings(".slide-fade"),
				__idx__ = $(".slide-fade").index($this),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if ($timer < $duration) $timer = $duration * 2;

			if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
				// if ($slideFadeTimer[__idx__]) clearInterval($slideFadeTimer[__idx__]);
				if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);

				$btn.addClass("clicked");

				$this.children(".active").stop().fadeOut($duration, function() {
					$(this).removeClass("active").removeAttr("style").hide();
				});

				if ($this.children(".active").next().length) {
					$this.children(".active").next().stop().fadeIn($duration, function() {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						// $slideFadeTimer[__idx__] = setInterval(function() {
						$slideFadeTimer[__idx__] = setTimeout(function() {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				} else {
					if (!$this.hasClass("once")) {
						$this.children().eq(0).stop().fadeIn($duration, function() {
							$(this).addClass("active").removeAttr("style").show();
							$btn.removeClass("clicked");

							// $slideFadeTimer[__idx__] = setInterval(function() {
							$slideFadeTimer[__idx__] = setTimeout(function() {
								$this.siblings(".slide-btn").children(".slide-next").click();
							}, $timer);
						});
					}
				}
			}
		});
		$("body").on("click", ".slide-btn > .slide-prev", function() {
			var $btn = $(this),
				$this = $btn.parent().siblings(".slide-fade"),
				__idx__ = $(".slide-fade").index($this),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if ($timer < $duration) $timer = $duration * 2;

			if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
				// if ($slideFadeTimer[__idx__]) clearInterval($slideFadeTimer[__idx__]);
				if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);

				$btn.addClass("clicked");

				$this.children(".active").stop().fadeOut($duration, function() {
					$(this).removeClass("active").removeAttr("style").hide();
				});

				if ($this.children(".active").prev().length) {
					$this.children(".active").prev().stop().fadeIn($duration, function() {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						// $slideFadeTimer[__idx__] = setInterval(function() {
						$slideFadeTimer[__idx__] = setTimeout(function() {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				} else {
					$this.children().last().stop().fadeIn($duration, function() {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						// $slideFadeTimer[__idx__] = setInterval(function() {
						$slideFadeTimer[__idx__] = setTimeout(function() {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				}
			}
		});

		$("body").on("click", ".slide-page > *", function() {
			var $page = $(this).parent(),
				$idx = $(this).index(),
				$this = $(this).parents(".slideParent").length ? $(this).parents(".slideParent").find(".slide-fade") : $(this).siblings(".slide-fade"),
				__idx__ = $(".slide-fade").index($this),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if ($timer < $duration) $timer = $duration * 2;

			if ($this.length) {
				if (!$page.hasClass("clicked") && !$this.hasClass("stop")) {
					if ($(this).siblings(".active").length > 0) {
						var idxOld = parseInt($(this).siblings(".active").attr("data")),
							idxNew = parseInt($(this).attr("data")),
							beside = idxOld - idxNew === 1 || idxNew - idxOld === 1;

						$(this).parents(".slideParent").removeClass("move-start move-next move-prev move-first move-last");

						if (idxNew > idxOld) {
							$(this).parents(".slideParent").addClass("move-next").attr("data", idxNew);

							if ($(this).is(":last-child")) $(this).parents(".slideParent").addClass("move-last");
						} else {
							$(this).parents(".slideParent").addClass("move-prev").attr("data", idxNew);

							if ($(this).is(":first-child")) $(this).parents(".slideParent").addClass("move-first");
						}
					}

					if ($this.children().eq($idx).length > 0) {
						if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);

						$this.siblings(".slide-page").children(".active").removeClass("active");
						$(this).addClass("active");

						$page.addClass("clicked");

						$this.children(".active").stop().fadeOut($duration, function() {
							$(this).removeClass("active").removeAttr("style").hide();
						});

						$this.children().eq($idx).stop().fadeIn($duration, function() {
							$(this).addClass("active").removeAttr("style").show();
							$page.removeClass("clicked");

							// $slideFadeTimer[__idx__] = setInterval(function() {
								// slideFade($this, $duration);
							// }, $timer);

							$slideFadeTimer[__idx__] = setTimeout(function() {
								slideFade($this, $duration);
							}, $timer);
						});
					} else console.info("Slide not found");
				}
			} else console.info(".slideParent or .slide-fade not found!");
		});
	}
	// BEGIN: slide fading

	// navigation animate
	if ($(".nav-animate").length) {
		$(".nav-animate").each(function() {
			var $timerNav,
				$navNull = $(this).hasClass("nav-null"),
				$navWidth = $(this).find("li").first().outerWidth(),
				$navPosX = $navNull ? 0 : $(this).find("li").first().position().left,
				// $navML = 0,
				$navMR = 0;

			if ($(this).find("li.active").length) {
				$navWidth = $(this).find("li.active").outerWidth(),
				$navPosX = $(this).find("li.active").position().left;

				// $navML = $(this).find("li.active").next().length ? parseInt($(this).find("li.active").next().css("margin-left"), 10),
				$navMR = $(this).find("li.active").prev().length ? parseInt($(this).find("li.active").prev().css("margin-right"), 10) : 0;
			} else {
				if (!$navNull) $(this).find("li").first().addClass("active");

				// $navML = parseInt($(this).find("li").first().css("margin-left"), 10),
				// $navMR = parseInt($(this).find("li").first().css("margin-right"), 10);
			}

			$navWidth += $navMR;
			$navPosX -= $navMR;

			$(this).children("span").css({
				width: $navWidth,
				left: $navPosX
			});

			if ($navNull) $(this).children("span").css("opacity", 0);

			$(this).find("li").mouseover(function() {
				var $navW = $(this).outerWidth(),
					$navX = $(this).position().left,
					// $nML = $(this).next().length ? parseInt($(this).next().css("margin-left"), 10),
					$nMR = $(this).prev().length ? parseInt($(this).prev().css("margin-right"), 10) : 0;

				if ($navNull) {
					clearTimeout($timerNav);

					$navPosX = $navX - $nMR;

					$(this).parents(".nav-animate").children("span").css("opacity", 1);
					console.log($navPosX);
				}

				$(this).parents(".nav-animate").children("span").stop().animate({
					width: $navW + $nMR,
					left: $navX - $nMR
				}, "fast");
			}).mouseleave(function() {
				var $span = $(this).parents(".nav-animate").children("span");

				if ($navNull) {
					clearTimeout($timerNav);
					$timerNav = setTimeout(function() {
						console.log($navPosX);
						$span.stop().fadeOut(100, function() {
							$(this).removeAttr("style").css({
								opacity: 0,
								width: $navWidth,
								left: $navPosX
							})
						});
					}, 500);
				} else {
					$span.stop().animate({
						width: $navWidth,
						left: $navPosX
					}, "fast");
				}
			});
		});
	}


	// BEGIN: toggle
	if ($(".toggle").length > 0) {
		$("body").on("click", ".toggle-link", function() {
			var $toggleDuration = 500,
				$toggleElm = $(this).parents(".toggle").first();

			if (typeof $toggleElm.attr("data-duration") != "undefined") {
				if ($.inArray($toggleElm.attr("data-duration"), ["slow", "normal", "fast"]) >= 0) $toggleDuration = $toggleElm.attr("data-duration");
				else $toggleDuration = parseInt($toggleElm.attr("data-duration"));
			}

			if ($(this).parents(".single").length > 0) {
				$(this).parents(".single").find(".toggle-main").stop().slideUp($toggleDuration, function() {
					$(this).removeAttr("style");
					$(this).parents(".toggle").first().removeClass("active");
				});
			}

			if ($(this).parents(".toggle").first().hasClass("active")) {
				$(this).siblings(".toggle-main").stop().slideUp($toggleDuration, function() {
					$(this).removeAttr("style");
					$(this).parents(".toggle").first().removeClass("active");
				});
			} else {
				$(this).siblings(".toggle-main").stop().slideDown($toggleDuration, function() {
					$(this).removeAttr("style");
					$(this).parents(".toggle").first().addClass("active");

					// if ($(this).find("[class*=heightLine]").length) heightLine();

					$(window).trigger("resize");
				});

				if ($(this).siblings(".toggle-main").find("[class*=heightLine]").length) heightLine();
			}
		});
	}
	// END: toggle

	// BEGIN: tabs - switch
	if ($(".tabs-switch").length) {
		$(".tabs-switch").each(function() {
			var $tabsSwitch = $(this),
				$tabLink = $tabsSwitch.find(".tab-link"),
				$tabContent = $tabsSwitch.find(".tab-content");

			$tabLink.children().each(function() {
				if ($(this).find("img").length > 0 && $(this).find("img").hasClass("btn")) {
					$(this).data("src", $(this).find("img").attr("src"));

					$(this).find("img").attr("src").match(/^(.*)(\.{1}.*)/g);
					$(this).data("active", RegExp.$1 + "_on" + RegExp.$2);
				}
			});

			$tabContent.children().hide();

			if (!$tabsSwitch.hasClass("stop")) {
				$tabLink.each(function() {
					// TODO: active by [data-active]
					var hash = window.location.hash || location.hash;
					if (hash) {
						if ($(this).children("[data-tab-anchor='" + hash + "']").length) $(this).children("[data-tab-anchor='" + hash + "']").addClass("active");
						else $(this).children().first().addClass("active");
					} else if (!$(this).children(".active").length) $(this).children().first().addClass("active");

					$(this).children(".active").find("img").attr("src", $(this).children(".active").data("active")).removeClass("btn");
				});

				if ($tabLink.children(".active").hasClass("all")) $tabContent.children().show();
				else $tabContent.children().eq($tabLink.children(".active").index()).show();
			}

			if ($(".bxSlider").length > 0) $(window).trigger("resize");
		});

		$("body").on("click", ".tab-link > *", function() {
			var $this = $(this),
				$idxAll = $this.parents(".tab-link").children(".all").length > 0 ? $this.parents(".tab-link").children(".all").index() : false,
				$idx = $this.index(),
				$act = $this.parents(".tab-link").children(".active"),
				$tabMode = $.inArray($this.parents(".tabs-switch").attr("data"), ["fade", "slide", "block"]) >= 0 ? $this.parents(".tabs-switch").attr("data") : "block",
				$tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 300,
				$tabContent = $this.parents(".tabs-switch").children(".tab-content"),
				$tabIdx = $this.attr("data-active") ? $this.attr("data-active") : false,
				$autoScroll = $.inArray($this.parents(".tabs-switch").attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
				$itself = $.inArray($this.parents(".tabs-switch").attr("data-toggle"), ["true", "on", "enable", "enabled", "1"]) >= 0 && $this.hasClass("active") ? true : false,
				$itHide = $tabContent.children().eq($idx).is(":hidden");

			if ($tabIdx) {
				$this.parents(".tabs-switch").find(".tab-link").each(function() {
					var $tabBtn = $(this).children("[data-active='" + $tabIdx + "']");

					$(this).children(".active").find("img").attr("src", $(this).children(".active").data("src"));
					$(this).children(".active").removeClass("active");

					if ($itself) {
						if ($itHide) $tabBtn.addClass("active");
						else $tabBtn.removeClass("active");
					} else $tabBtn.addClass("active");

					// if (!$tabBtn.find("img").hasClass("active")) $tabBtn.find("img").attr("src", $tabBtn.data("active"));
					if ($tabBtn.find("img").hasClass("btn")) $tabBtn.find("img").attr("src", $tabBtn.data("active")).removeClass("btn");
				});
			} else {
				if (/^(.*?)_on\.(.*?)$/.test($act.find("img").attr("src"))) $act.find("img").addClass("btn");

				$act.find("img").attr("src", $act.data("src"));
				$act.removeClass("active");

				if ($itself) {
					if ($itHide) $this.addClass("active");
					else $this.removeClass("active");
				} else $this.addClass("active");

				// if (!$this.find("img").hasClass("active")) $this.find("img").attr("src", $this.data("active"));
				if ($this.find("img").hasClass("btn")) $this.find("img").attr("src", $this.data("active")).removeClass("btn");
			}

			if (!$this.parents(".tab-link").hasClass("clicked")) {
				$this.parents(".tab-link").addClass("clicked");

				if ($this.hasClass("all")) {
					if ($tabMode == "fade") {
						$tabContent.children().stop().fadeIn($tabDuration, function() {
							$(this).removeAttr("style").show();

							if ($(this).find("[class*=heightLine]").length) heightLine();

							if ($this.children("a").length) $this.children("a").click();

							$tabContent.css({
								minHeight: ""
							});

							$(window).trigger("resize");

							$this.parents(".tab-link").removeClass("clicked");
						});
					} else if ($tabMode == "slide") {
						$tabContent.children().slideDown($tabDuration, function() {
							$(this).removeAttr("style").show();

							if ($(this).find("[class*=heightLine]").length) heightLine();

							if ($this.children("a").length) $this.children("a").click();

							$(window).trigger("resize");

							$this.parents(".tab-link").removeClass("clicked");
						});
					} else {
						$tabDuration = $(this).parents(".tabs-switch").attr("data-duration") ? parseInt($(this).parents(".tabs-switch").attr("data-duration")) : 0;

						$tabContent.children().stop().show($tabDuration, function() {
							$(this).removeAttr("style").show();

							if ($(this).find("[class*=heightLine]").length) heightLine();

							if ($this.children("a").length) $this.children("a").click();

							$(window).trigger("resize");

							$this.parents(".tab-link").removeClass("clicked");
						});
					}
				} else {
					if ($idxAll !== false && $idxAll >= 0 && $idx >= $idxAll) $idx -= 1;

					if ($tabMode == "fade") {
						if ($itself) {
							$tabContent.children().eq($idx).stop().fadeToggle($tabDuration, function() {
								if ($itHide) $(this).removeAttr("style").show();
								else $(this).removeAttr("style").hide();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$tabContent.css({
									minHeight: ""
								});

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						} else {
							$tabContent.css({
								minHeight: $tabContent.outerHeight()
							});

							$tabContent.children().stop().fadeOut($tabDuration, function() {
								$(this).removeAttr("style").hide();
							});
							$tabContent.children().eq($idx).stop().delay($tabDuration).fadeIn($tabDuration, function() {
								$(this).removeAttr("style").show();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$tabContent.css({
									minHeight: ""
								});

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						}
					} else if ($tabMode == "slide") {
						if ($itself) {
							$tabContent.children().eq($idx).stop().slideToggle($tabDuration, function() {
								if ($itHide) $(this).removeAttr("style").show();
								else $(this).removeAttr("style").hide();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						} else {
							$tabContent.children().stop().slideUp($tabDuration, function() {
								$(this).removeAttr("style").hide();
							}).siblings().eq($idx).stop().slideDown($tabDuration, function() {
								$(this).removeAttr("style").show();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						}
					} else {
						$tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 0;

						if ($itself) {
							$tabContent.children().eq($idx).stop().toggle($tabDuration, function() {
								if ($itHide) $(this).removeAttr("style").show();
								else $(this).removeAttr("style").hide();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						} else {
							$tabContent.children().stop().hide($tabDuration, function() {
								$(this).removeAttr("style").hide();
							}).siblings().eq($idx).stop().show($tabDuration, function() {
								$(this).removeAttr("style").show();

								if ($(this).find("[class*=heightLine]").length) heightLine();

								if ($this.children("a").length) $this.children("a").click();

								$(window).trigger("resize");

								$this.parents(".tab-link").removeClass("clicked");
							});
						}
					}
				}

				if ($(".bxSlider").length > 0) {
					setTimeout(function() {
						$(window).trigger("resize");
					}, 50);
				}

				if ($autoScroll) {
					var $offsetY = $tabContent.offset().top,
						$navOffset = 0;

					if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

					if ($(".nav-target").length) {
						if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

						$("html, body").stop().animate({
							scrollTop: $offsetY - $navOffset
						}, 500);
					} else {
						$("html, body").stop().animate({
							scrollTop: $offsetY - $navOffset
						}, 500);
					}
				}
			}
		});
	}
	// END: tab - switch

	// BEGIN: RSS
	if (typeof rss === "object" && isObjectVar(rss)) {
		var objRss = {};

		for (var r in rss) {
			if (!isNaN(parseFloat(r)) && isFinite(r)) objRss = rss; // multiple
			else objRss[0] = rss; // single
		}
		for (var rssNum in objRss) { // eaching
			var rssData = objRss[rssNum];
			if (typeof rssData != "undefined" && typeof rssData == "object") {
				if (typeof rssData.dateFormat == "undefined") {
					rssData.dateFormat = {
						year: "-",
						month: "-",
						date: ""
					}
				}
				if (typeof rssData.imageSize == "undefined") {
					rssData.imageSize = {
						width: 300,
						height: 200
					}
				}
				if (typeof rssData.elm != "undefined" && $(rssData.elm).length) {
					var content = typeof rssData.template != "undefined" ? rssData.template : "",
						rssCallbacks = typeof rssData.done === "function" ? rssData.done : function() {};

					var $rssLoop = $(rssData.elm).feed({
							Path		: typeof rssData.url != "undefined" ? rssData.url : "shared/rss/rss.php", //rss.phpの場所。階層が変わる時のみ変更。
							key			: rssData.key, //RSSのURL。
							indention	: typeof rssData.indention != "undefined" ? rssData.indention : false, //本文のソースを表示するかどうか
							MAX			: typeof rssData.max != "undefined" ? rssData.max : 3, //記事の最大数。
							titleMax	: typeof rssData.titleMax != "undefined" ? rssData.titleMax : 10, //タイトルの最大文字数。
							postMax		: typeof rssData.postMax != "undefined" ? rssData.postMax : 50, //本文の最大文字数。
							endtext		: typeof rssData.endText != "undefined" ? rssData.endText : "...", //最大文字数を超えた後に追加するテキスト。
							Datetype	: rssData.dateFormat, //日付の形式　例)○○年○○月○○日
							Image		: typeof rssData.image != "undefined" ? (rssData.image === true ? "yes" : rssData.image) : "no", //画像付きの記事かどうか　yes、もしくはnoで。
							ImageSize	: rssData.imageSize, //表示する画像のサイズ　width=横幅　height="縦幅"
							noImage		: typeof rssData.noImage != "undefined" ? (rssData.noImage === true ? "yes" : rssData.noImage) : "no", //No-image画像が必要かどうか　yes、もしくはnoで。
							noImage_src : typeof rssData.noImageSRC != "undefined" ? rssData.noImageSRC : "shared/img/index/no_image.jpg", //No-image画像のパス。
							source		: function (LINK, TITLE, DATE, POST, IMAGE, CATEGORY, AUTHOR, COUNT) {
								var post = "";

								if (typeof rssData.template != "undefined") {
									post =
										rssData.template
											.replace(/{title}/ig, TITLE)
											.replace(/{name}/ig, TITLE)
											.replace(/{content}/ig, POST)
											.replace(/{desc}/ig, POST)
											.replace(/{date}/ig, DATE)
											.replace(/{image}/ig, IMAGE)
											.replace(/{img}/ig, IMAGE)
											.replace(/{photo}/ig, IMAGE)
											.replace(/{pic}/ig, IMAGE)
											.replace(/{picture}/ig, IMAGE)
											.replace(/{url}/ig, LINK)
											.replace(/{link}/ig, LINK)
											.replace(/{cat}/ig, CATEGORY)
											.replace(/{category}/ig, CATEGORY)
											.replace(/{user}/ig, AUTHOR)
											.replace(/{creator}/ig, AUTHOR)
											.replace(/{author}/ig, AUTHOR)
											.replace(/{count}/ig, COUNT)
											.replace(/{total}/ig, COUNT);
								}

								return post;
							}
						}, rssCallbacks);
				} else console.error(rssData.elm + " not found", rssData);
			}
		}
	}
	// END: RSS

	// BEGIN: gmap
	if (typeof gmap === "object" && isObjectVar(gmap)) {
		var _dialogs_ = [],
			_dialogsOpen_ = true;

		function init() {
			var errorsMap = {
					mapDiv: false,
					latLong: false
				},
				objData = {}; // single || multiMap || multiPoint


			// checking
			if (typeof gmap.maps != "undefined" && Object.keys(gmap.maps).length > 0) { // multi map
				if (typeof gmap.maps[0] == "undefined") { // associative array
					if (typeof gmap.maps.mapDiv == "undefined" || gmap.maps.mapDiv == "") errorsMap.mapDiv = 1;
					else if ((typeof gmap.maps.latitude == "undefined" && typeof gmap.maps.latitude != "number") || (typeof gmap.maps.longitude == "undefined" && typeof gmap.maps.longitude != "number")) errorsMap.latLong = 1;
				} else { // object
					for (var s in gmap.maps) { // loop
						if (typeof gmap.maps[s].mapDiv == "undefined" || gmap.maps[s].mapDiv == "") {
							errorsMap.mapDiv = 2;
							break;
						} else if ((typeof gmap.maps[s].latitude == "undefined" && typeof gmap.maps[s].latitude != "number") || (typeof gmap.maps[s].longitude == "undefined" && typeof gmap.maps[s].longitude != "number")) {
							errorsMap.latLong = 2;
							break;
						}
					}
				}
			} else { // single map
				if (typeof gmap.mapDiv == "undefined" || gmap.mapDiv == "") errorsMap.mapDiv = 3;
				else if ((typeof gmap.latitude == "undefined" && typeof gmap.latitude != "number") || (typeof gmap.longitude == "undefined" || typeof gmap.longitude != "number")) errorsMap.latLong = 3;
			}


			if (errorsMap.mapDiv || errorsMap.latLong) {
				console.info("ERROR", errorsMap);
				return false;
			} else {
				// if ()
				var init = initMap(gmap);
				// console.log(init);
			}

			/*
			 * initialize
			 *
			 */

			function initMap(data) {
				var dataMap = {
						mapDiv: false,
						latitude: false,
						longitude: false,

						center: false,

						zoom: 17,
						minZoom: 2,
						zoomControl: true,
						disableDoubleClickZoom: true,
						mapTypeControl: true,
						scaleControl: true,
						scrollwheel: false,
						panControl: true,
						streetViewControl: true,
						draggable: true,
						overviewMapControl: true,

						styles: false,
						style: false,

						name: false,
						desc: false,
						tel: false,
						email: false,

						url: false,
						logo: false,
						size: false,
						scale: false,
						origin: false,
						anchor: false,
						optimized: false,

						clickable: false,
						hover: false,
						html: false,

						multi: false
					};

				// BEGIN: configs default
				if (typeof data.zoom != "undefined" && typeof data.zoom == "number") dataMap.zoom = data.zoom;
				if (typeof data.minZoom != "undefined" && typeof data.minZoom == "number") dataMap.minZoom = data.minZoom;
				if (typeof data.zoomControl != "undefined" && typeof data.zoomControl == "boolean") dataMap.zoomControl = data.zoomControl;
				if (typeof data.disableDoubleClickZoom != "undefined" && typeof data.disableDoubleClickZoom == "boolean") dataMap.disableDoubleClickZoom = data.disableDoubleClickZoom;
				if (typeof data.mapTypeControl != "undefined" && typeof data.mapTypeControl == "boolean") dataMap.mapTypeControl = data.mapTypeControl;
				if (typeof data.scaleControl != "undefined" && typeof data.scaleControl == "boolean") dataMap.scaleControl = data.scaleControl;
				if (typeof data.scrollwheel != "undefined" && typeof data.scrollwheel == "boolean") dataMap.scrollwheel = data.scrollwheel;
				if (typeof data.panControl != "undefined" && typeof data.panControl == "boolean") dataMap.panControl = data.panControl;
				if (typeof data.streetViewControl != "undefined" && typeof data.streetViewControl == "boolean") dataMap.streetViewControl = data.streetViewControl;
				if (typeof data.draggable != "undefined" && typeof data.draggable == "boolean") dataMap.draggable = data.draggable;
				if (typeof data.overviewMapControl != "undefined" && typeof data.overviewMapControl == "boolean") dataMap.overviewMapControl = data.overviewMapControl;

				if (typeof data.name != "undefined" && data.name != "") dataMap.name = data.name;
				if (typeof data.desc != "undefined" && data.desc != "") dataMap.desc = data.desc;
				if (typeof data.tel != "undefined" && data.tel != "") dataMap.tel = data.tel;
				if (typeof data.email != "undefined" && data.email != "") dataMap.email = data.email;
				if (typeof data.url != "undefined" && data.url != "") dataMap.url = data.url;
				if (typeof data.logo != "undefined" && data.logo != "") dataMap.logo = data.logo;
				if (typeof data.size != "undefined" && typeof data.size.width != "undefined" && data.size.width != "") dataMap.sizeWidth = data.size.width;
				if (typeof data.size != "undefined" && typeof data.size.height != "undefined" && data.size.height != "") dataMap.sizeHeight = data.size.height;
				if (typeof data.scale != "undefined" && typeof data.scale.width != "undefined" && data.scale.width != "") dataMap.scaleWidth = data.scale.width;
				if (typeof data.scale != "undefined" && typeof data.scale.height != "undefined" && data.scale.height != "") dataMap.scaleHeight = data.scale.height;
				if (typeof data.origin != "undefined" && typeof data.origin.x != "undefined" && data.origin.x != "") dataMap.originX = data.origin.x;
				if (typeof data.origin != "undefined" && typeof data.origin.y != "undefined" && data.origin.y != "") dataMap.originY = data.origin.y;
				if (typeof data.anchor != "undefined" && typeof data.anchor.x != "undefined" && data.anchor.x != "") dataMap.anchorX = data.anchor.x;
				if (typeof data.anchor != "undefined" && typeof data.anchor.y != "undefined" && data.anchor.y != "") dataMap.anchorY = data.anchor.y;
				if (typeof data.optimized != "undefined" && data.optimized != "") dataMap.optimized = data.optimized;

				if (typeof data.clickable != "undefined" && data.clickable != "") dataMap.clickable = data.clickable;
				if (typeof data.html != "undefined" && data.html != "") dataMap.html = data.html;
				if (typeof data.hover != "undefined" && typeof data.hover == "boolean") dataMap.hover = data.hover;

				if (typeof data.multi != "undefined" && Object.keys(data.multi).length > 0) dataMap.multi = data.multi;

				if (typeof data.styles != "undefined") dataMap.styles = data.styles;
				else if (typeof data.style != "undefined") {
					dataMap.style = {};
					if (typeof data.style.hue != "undefined") dataMap.style.hue = data.style.hue;
					if (typeof data.style.gamma != "undefined") dataMap.style.gamma = data.style.gamma;
					if (typeof data.style.lightness != "undefined") dataMap.style.lightness = data.style.lightness;
					if (typeof data.style.saturation != "undefined") dataMap.style.saturation = data.style.saturation;
				}
				// END: configs default

				dataMap.mapDiv = data.mapDiv;
				dataMap.latitude = data.latitude;
				dataMap.longitude = data.longitude;

				if (typeof data.maps != "undefined" && Object.keys(data.maps).length > 0) { // multi map
					var objMap = {};
					if (typeof data.maps[0] == "undefined") objMap[0] = data.maps; // object
					else objMap = data.maps; // array

					for (var g in objMap) { // loop
						var obj = objMap[g];

						// BEGIN: override configs
						if (typeof obj.zoom != "undefined" && typeof obj.zoom == "number") dataMap.zoom = obj.zoom;
						if (typeof obj.minZoom != "undefined" && typeof obj.minZoom == "number") dataMap.minZoom = obj.minZoom;
						if (typeof obj.zoomControl != "undefined" && typeof obj.zoomControl == "boolean") dataMap.zoomControl = obj.zoomControl;
						if (typeof obj.disableDoubleClickZoom != "undefined" && typeof obj.disableDoubleClickZoom == "boolean") dataMap.disableDoubleClickZoom = obj.disableDoubleClickZoom;
						if (typeof obj.mapTypeControl != "undefined" && typeof obj.mapTypeControl == "boolean") dataMap.mapTypeControl = obj.mapTypeControl;
						if (typeof obj.scaleControl != "undefined" && typeof obj.scaleControl == "boolean") dataMap.scaleControl = obj.scaleControl;
						if (typeof obj.scrollwheel != "undefined" && typeof obj.scrollwheel == "boolean") dataMap.scrollwheel = obj.scrollwheel;
						if (typeof obj.panControl != "undefined" && typeof obj.panControl == "boolean") dataMap.panControl = obj.panControl;
						if (typeof obj.streetViewControl != "undefined" && typeof obj.streetViewControl == "boolean") dataMap.streetViewControl = obj.streetViewControl;
						if (typeof obj.draggable != "undefined" && typeof obj.draggable == "boolean") dataMap.draggable = obj.draggable;
						if (typeof obj.overviewMapControl != "undefined" && typeof obj.overviewMapControl == "boolean") dataMap.overviewMapControl = obj.overviewMapControl;

						if (typeof obj.styles != "undefined") dataMap.styles = obj.styles;
						else if (typeof obj.style != "undefined") {
							dataMap.style = {};
							if (typeof obj.style.hue != "undefined") dataMap.style.hue = obj.style.hue;
							if (typeof obj.style.gamma != "undefined") dataMap.style.gamma = obj.style.gamma;
							if (typeof obj.style.lightness != "undefined") dataMap.style.lightness = obj.style.lightness;
							if (typeof obj.style.saturation != "undefined") dataMap.style.saturation = obj.style.saturation;
						}

						if (typeof obj.name != "undefined" && obj.name != "") dataMap.name = obj.name;
						if (typeof obj.desc != "undefined" && obj.desc != "") dataMap.desc = obj.desc;
						if (typeof obj.tel != "undefined" && obj.tel != "") dataMap.tel = obj.tel;
						if (typeof obj.email != "undefined" && obj.email != "") dataMap.email = obj.email;
						if (typeof obj.url != "undefined" && obj.url != "") dataMap.url = obj.url;
						if (typeof obj.logo != "undefined" && obj.logo != "") dataMap.logo = obj.logo;
						if (typeof obj.sizeWidth != "undefined" && obj.sizeWidth != "") dataMap.sizeWidth = obj.sizeWidth;
						if (typeof obj.sizeHeight != "undefined" && obj.sizeHeight != "") dataMap.sizeHeight = obj.sizeHeight;
						if (typeof obj.scaleWidth != "undefined" && obj.scaleWidth != "") dataMap.scaleWidth = obj.scaleWidth;
						if (typeof obj.scaleHeight != "undefined" && obj.scaleHeight != "") dataMap.scaleHeight = obj.scaleHeight;
						if (typeof obj.originX != "undefined" && obj.originX != "") dataMap.originX = obj.originX;
						if (typeof obj.originY != "undefined" && obj.originY != "") dataMap.originY = obj.originY;
						if (typeof obj.anchorX != "undefined" && obj.anchorX != "") dataMap.anchorX = obj.anchorX;
						if (typeof obj.anchorY != "undefined" && obj.anchorY != "") dataMap.anchorY = obj.anchorY;
						if (typeof obj.optimized != "undefined" && obj.optimized != "") dataMap.optimized = obj.optimized;
						// END: override configs

						if (typeof obj.clickable != "undefined" && obj.clickable != "") dataMap.clickable = obj.clickable;
						if (typeof obj.html != "undefined" && obj.html != "") dataMap.html = obj.html;
						if (typeof obj.hover != "undefined" && typeof obj.hover == "boolean") dataMap.hover = obj.hover;
						if (typeof obj.multi != "undefined" && Object.keys(obj.multi).length > 0) dataMap.multi = obj.multi;

						dataMap.mapDiv = obj.mapDiv;
						dataMap.latitude = obj.latitude;
						dataMap.longitude = obj.longitude;

						if (typeof obj.center != "undefined") {
							dataMap.center = {};
							if (typeof obj.center.latitude != "undefined") dataMap.center.latitude = obj.center.latitude;
							if (typeof obj.center.longitude != "undefined") dataMap.center.longitude = obj.center.longitude;
						} else	{
							dataMap.center = {
								latitude: obj.latitude,
								longitude: obj.longitude
							};
						}

						loadMap(dataMap);
					}
				} else { // single map
					if (typeof data.center != "undefined") {
						dataMap.center = {};
						if (typeof data.center.latitude != "undefined") dataMap.center.latitude = data.center.latitude;
						if (typeof data.center.longitude != "undefined") dataMap.center.longitude = data.center.longitude;
					} else {
						dataMap.center = {
							latitude: data.latitude,
							longitude: data.longitude
						};
					}

					loadMap(dataMap);
				}

				return dataMap;
			}

			function loadMap(data) {
				var elm = data.mapDiv;

				elm = elm.substring(0, 1) == "#" ? elm.substring(1) : elm; // remove hash

				var mapElement = document.getElementById(elm),
					styleOptions = [],
					mapOptions = {
						center: new google.maps.LatLng(data.center.latitude, data.center.longitude),
						zoom: data.zoom,
						minZoom: data.minZoom,
						zoomControl: data.zoomControl,
						zoomControlOptions: {
							style: google.maps.ZoomControlStyle.DEFAULT,
						},
						disableDoubleClickZoom: data.disableDoubleClickZoom,
						scaleControl: data.scaleControl,
						scrollwheel: data.scrollwheel,
						panControl: data.panControl,
						streetViewControl: data.streetViewControl,
						draggable: data.draggable,
						mapTypeControl: data.mapTypeControl,
						mapTypeControlOptions: {
							style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
						},
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						overviewMapControl: data.overviewMapControl,
						overviewMapControlOptions: {
							opened: false,
						}
					},
					googleMap = new google.maps.Map(mapElement, mapOptions);

				if (data.multi === false) {
					var arr = {};

					if (typeof data["name"] != "undefined") arr["name"] = data["name"];
					if (typeof data["desc"] != "undefined") arr["desc"] = data["desc"];
					if (typeof data["tel"] != "undefined") arr["tel"] = data["tel"];
					if (typeof data["email"] != "undefined") arr["email"] = data["email"];
					if (typeof data["url"] != "undefined") arr["url"] = data["url"];
					if (typeof data["logo"] != "undefined") arr["logo"] = data["logo"];
					if (typeof data["sizeWidth"] != "undefined") arr["sizeWidth"] = data["sizeWidth"];
					if (typeof data["sizeHeight"] != "undefined") arr["sizeHeight"] = data["sizeHeight"];
					if (typeof data["scaleWidth"] != "undefined") arr["scaleWidth"] = data["scaleWidth"];
					if (typeof data["scaleHeight"] != "undefined") arr["scaleHeight"] = data["scaleHeight"];
					if (typeof data["originX"] != "undefined") arr["originX"] = data["originX"];
					if (typeof data["originY"] != "undefined") arr["originY"] = data["originY"];
					if (typeof data["anchorX"] != "undefined") arr["anchorX"] = data["anchorX"];
					if (typeof data["anchorY"] != "undefined") arr["anchorY"] = data["anchorY"];
					if (typeof data["optimized"] != "undefined") arr["optimized"] = data["optimized"];
					if (typeof data["clickable"] != "undefined") arr["clickable"] = data["clickable"];
					if (typeof data["html"] != "undefined") arr["html"] = data["html"];
					if (typeof data["hover"] != "undefined") arr["hover"] = data["hover"];

					arr["longitude"] = data["longitude"];
					arr["latitude"] = data["latitude"];

					setMaps(arr, googleMap, data.center);
				} else {
					for (i = 0; i < Object.keys(data.multi).length; i++) {
						var arr = data.multi[i];

						if (typeof data["clickable"] != "undefined") arr["clickable"] = data.clickable;
						if (typeof data["html"] != "undefined") arr["html"] = data.html;
						if (typeof data["hover"] != "undefined") arr["hover"] = data.hover;

						if (typeof arr["size"] != "undefined") {
							if (typeof arr["size"]["width"] != "undefined") arr["sizeWidth"] = arr["size"]["width"];
							if (typeof arr["size"]["height"] != "undefined") arr["sizeHeight"] = arr["size"]["height"];

							delete arr["size"];
						}
						if (typeof arr["scale"] != "undefined") {
							if (typeof arr["scale"]["width"] != "undefined") arr["scaleWidth"] = arr["scale"]["width"];
							if (typeof arr["scale"]["height"] != "undefined") arr["scaleHeight"] = arr["scale"]["height"];

							delete arr["scale"];
						}
						if (typeof arr["origin"] != "undefined") {
							if (typeof arr["origin"]["x"] != "undefined") arr["originX"] = arr["origin"]["x"];
							if (typeof arr["origin"]["y"] != "undefined") arr["originY"] = arr["origin"]["y"];

							delete arr["origin"];
						}
						if (typeof arr["anchor"] != "undefined") {
							if (typeof arr["anchor"]["x"] != "undefined") arr["anchorX"] = arr["anchor"]["x"];
							if (typeof arr["anchor"]["y"] != "undefined") arr["anchorY"] = arr["anchor"]["y"];

							delete arr["anchor"];
						}
						if (typeof arr["optimized"] != "undefined") arr["optimized"] = arr["optimized"];
						setMaps(arr, googleMap, data.center);
					}
				}

				// stylers
				if (data.styles !== false) styleOptions = data.styles;
				else if (data.style !== false) {
					if (typeof data.style.hue != "undefined" || typeof data.style.gamma != "undefined" || typeof data.style.lightness != "undefined" || typeof data.style.saturation != "undefined") {
						if (typeof styleOptions[0] == "undefined") styleOptions[0] = {};
						if (typeof styleOptions[0].stylers == "undefined") styleOptions[0].stylers = [];
					}

					if (typeof data.style.hue != "undefined") {
						styleOptions[0].stylers.push({
							hue: data.style.hue
						});
					}
					if (typeof data.style.gamma != "undefined") {
						styleOptions[0].stylers.push({
							gamma: data.style.gamma
						});
					}
					if (typeof data.style.lightness != "undefined") {
						styleOptions[0].stylers.push({
							lightness: data.style.lightness
						});
					}
					if (typeof data.style.saturation != "undefined") {
						styleOptions[0].stylers.push({
							saturation: data.style.saturation
						});
					}
				}

				var styledMapOptions = {
						name: "MAP"
					},
					sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);

				googleMap.mapTypes.set("sample", sampleType);
				googleMap.setMapTypeId("sample");

				// force reset
				googleMap.setZoom(data.zoom);
				googleMap.setCenter(new google.maps.LatLng(data.center.latitude, data.center.longitude));
			}
			function setMaps(obj, map, center) {
				var options = {};

				if (obj["html"] !== false) {
					if (typeof obj["name"] != "undefined") options["title"] = obj["name"];
					if (typeof obj["desc"] != "undefined") options["desc"] = obj["desc"];
					if (typeof obj["tel"] != "undefined") options["tel"] = obj["tel"];
					if (typeof obj["email"] != "undefined") options["email"] = obj["email"];
					if (typeof obj["url"] != "undefined") options["web"] = obj["url"];
				}

				if (typeof obj["logo"] != "undefined") {
					var optIcon = {};

					optIcon["url"] = obj["logo"];

					if (typeof obj["sizeWidth"] != "undefined" && typeof obj["sizeHeight"] != "undefined" && Number.isInteger(obj["sizeWidth"]) && Number.isInteger(obj["sizeHeight"])) optIcon["size"] = new google.maps.Size(obj["sizeWidth"], obj["sizeHeight"]);

					if (typeof obj["scaleWidth"] != "undefined" && typeof obj["scaleHeight"] != "undefined" && Number.isInteger(obj["scaleWidth"]) && Number.isInteger(obj["scaleHeight"])) optIcon["scaledSize"] = new google.maps.Size(obj["scaleWidth"], obj["scaleHeight"]);

					if (typeof obj["originX"] != "undefined" && typeof obj["originY"] != "undefined" && Number.isInteger(obj["originX"]) && Number.isInteger(obj["originY"])) optIcon["origin"] = new google.maps.Point(obj["originX"], obj["originY"]);

					if (typeof obj["anchorX"] != "undefined" && typeof obj["anchorY"] != "undefined" && Number.isInteger(obj["anchorX"]) && Number.isInteger(obj["anchorY"])) optIcon["anchor"] = new google.maps.Point(obj["anchorX"], obj["anchorY"]);

					if (typeof obj["optimized"] != "undefined") optIcon["optimized"] = obj["optimized"];

					if (typeof optIcon["size"] != "undefined" && typeof optIcon["origin"] != "undefined" && typeof optIcon["anchor"] != "undefined") options["icon"] = optIcon;
					else options["icon"] = obj["logo"] ? new google.maps.MarkerImage(obj["logo"]) : null;
				}

				options["position"] = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
				options["map"] = map;

				var marker = new google.maps.Marker(options);
				gmarkers[gnum] = marker;
				gnum++;

				if (obj["html"] !== false) {
					var dialog = new google.maps.InfoWindow(),
						infoWindowVisible = (function() {
							var currentlyVisible = false;
							return function(visible) {
								for (var z in visible) {
									if (/closure_uid/i.test(z)) {
										currentlyVisible = visible[z];

										break;
									}
								}

								return currentlyVisible;


								if (visible !== undefined) currentlyVisible = visible;
								return currentlyVisible;
							};
						}()),
						dialogShow = (function() {
							return function() {
								var vCheck = infoWindowVisible(marker);
								if (vCheck == _dialogsOpen_) {
									dialog.close();
									_dialogsOpen_ = true;
								} else {
									var tpl = {};
									tpl["name"] = typeof obj["name"] != "undefined" ? obj["name"] : "";
									tpl["desc"] = typeof obj["desc"] != "undefined" ? obj["desc"] : "";
									tpl["tel"] = typeof obj["tel"] != "undefined" ? obj["tel"] : "";
									tpl["email"] = typeof obj["email"] != "undefined" ? obj["email"] : "";
									tpl["url"] = typeof obj["url"] != "undefined" ? obj["url"] : "";

									var html =
										obj["html"]
											.replace(/{name}/ig, tpl["name"])
											.replace(/{title}/ig, tpl["name"])

											.replace(/{txt}/ig, tpl["desc"])
											.replace(/{text}/ig, tpl["desc"])
											.replace(/{desc}/ig, tpl["desc"])
											.replace(/{description}/ig, tpl["desc"])

											.replace(/{tel}/ig, tpl["tel"])
											.replace(/{telephone}/ig, tpl["tel"])
											.replace(/{phone}/ig, tpl["tel"])
											.replace(/{moible}/ig, tpl["tel"])

											.replace(/{mail}/ig, tpl["email"])
											.replace(/{email}/ig, tpl["email"])

											.replace(/{url}/ig, tpl["url"])
											.replace(/{web}/ig, tpl["url"])
											.replace(/{website}/ig, tpl["url"]);

									_dialogs_.forEach(function(d, ix) {
										google.maps.event.trigger(d, "closeclick");
										d.close(map, marker);
									});

									dialog = new google.maps.InfoWindow({
										content: html
									});

									// reset
									_dialogs_ = [];
									_dialogs_.push(dialog);

									dialog.open(map, marker);
									_dialogsOpen_ = vCheck;
								}
							};
						}());

					// _dialogs_.push(dialog);

					// events
					google.maps.event.addListener(marker, "click", function() {
						if (obj["clickable"] == "link" && typeof obj["url"] != "undefined" && obj["url"] != "") {
							if (!isExternal(obj["url"]) && $(obj["url"]).length) {
								$("html, body").stop().animate({
									scrollTop: $(obj["url"]).offset().top
								}, 500);
							} else window.open(obj["url"], "_parent");
						} else if (obj["clickable"] == "popup" && isHTML(obj.html)) {
							map.panTo(marker.getPosition());
							dialogShow();
						}
					});
					google.maps.event.addListener(dialog, "closeclick", function() {
						infoWindowVisible(marker);
					});

					if (obj["hover"] === true && obj["clickable"] == "link") {
						google.maps.event.addListener(marker, "mouseover", function() {
							dialogShow();
						});

						google.maps.event.addListener(marker, "mouseout", function() {
							dialog.close();
							infoWindowVisible(false);
						});
					}
				}

				/*
				window.onresize = function(event) {
					google.maps.event.trigger(map, "resize");
					map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
				};
				*/

				// always center
				google.maps.event.addDomListener(window, "resize", function() {
					var center = map.getCenter();
					google.maps.event.trigger(map, "resize");
					// map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
					map.setCenter(center);
				});

				google.maps.event.addListenerOnce(map, "idle", function() {
					google.maps.event.trigger(map, "resize");
					map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
				});

				// google.maps.event.trigger(map, "resize"); // onload

				$(window).resize(function() {
					google.maps.event.trigger(map, "resize");
				});
			}
		}
		google.maps.event.addDomListener(window, "load", init);
	}
	// END: gmap

	// BEGIN: rollover button
	$("body").on({
		mouseover: function() {
			if (!$(this).data("src-original")) $(this).data("src-original", $(this).attr("src"));

			$(this).attr("src").match(/^(.*)(\.{1}.*)/g);

			var $src = RegExp.$1 + "_on" + RegExp.$2;

			$(this).attr("src", $src); // update src
		}, mouseout: function() {
			if ($(this).hasClass("copy-change")) {
				var _src_ = $(this).attr("src");

				_src_ = _src_.replace(/^(.*?)_on\.(.*)$/, "$1.$2");

				$(this)
					.attr("src", _src_) // update src
					.removeClass("copy-change");
			} else if ($(this).data("src-original")) $(this).attr("src", $(this).data("src-original")); // update src

			$(this).removeData("src-original");
		}
	}, "img.btn");
	// END: rollover button

	// BEGIN: smooth scroll
	$("body").on("click", "a[href*='#']:not([href='#'])", function(e) {
		// .nav-fixed: elm sẽ cố định
		// .nav-target: tọa độ sẽ tính
		// .nav-pin: elm sẽ gắn .fixed
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname && !$(this).hasClass("unsmooth")) {
			var ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g,
				hash = this.hash.replace(ptnHash, "\\$1"),
				$anchor = $(hash);

			$anchor = $anchor.length > 0 ? $anchor : $("[name=" + hash.slice(1) +"]");

			if ($anchor.length) {
				e.preventDefault();

				if ($anchor.parents(".tab-content").first().length > 0) $anchor = $anchor.parents(".tab-content").first();

				var $offsetY = $anchor.offset().top,
					$navOffset = 0;

				if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				if ($(".tabs-switch").length) {
					$(".tabs-switch").each(function() {
						var $tabsSwitch = $(this),
							$tabLink = $tabsSwitch.children(".tab-link");

						if ($tabLink.children("[data-tab-anchor='" + hash + "']").length) $tabLink.children("[data-tab-anchor='" + hash + "']").click(); // trigger for set active tab
					});
				}

				if ($(".nav-target").length) {
					// $("html, body").stop().animate({
						// scrollTop: $(".nav-target").offset().top + 10
					// }, 100, function() {
						if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

						$("html, body").stop().animate({
							scrollTop: $offsetY - $navOffset
						}, 500);
					// });
				} else {
					$("html, body").stop().animate({
						scrollTop: $offsetY - $navOffset
					}, 500);
				}

				// window.location.hash = hash; // update location

				return false;
			}
		}
	});
	// END: smooth scroll

	// BEGIN: scroll to top
	if ($(window).scrollTop() > 0) $("#pagetop").addClass("visible");
	else $("#pagetop").removeClass("visible");

	$("body").on("click", "#pagetop", function() {
		if (!$(this).hasClass("in-scroll")) {
			$(this).addClass("in-scroll");

			var $scrollDuration = $.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0 || parseInt($(this).attr("data-duration")) > 0 ? $(this).attr("data-duration") : "slow";

			$("html, body").stop().animate({
				scrollTop: 0
			}, $scrollDuration, function() {
				$("#pagetop").removeClass("in-scroll");
			});
		}
	});
	// END: scroll to top

	// BEGIN: text vertical
	$(".txt-vertical").each(function() {
		if (!$(this).hasClass("all-str")) {
			var $regex = /(\d{1,2})/g;

			if ($(this).hasClass("per-line")) $regex = /(\d)/g;

			$(this).html(function(idx, val) {
				return val.replace($regex, '<span class="int">$1</span>');
			});
		}

		if ($(this).children(".txt-normal").length) {
			$(this).children(".txt-normal").html(function(idx, val) {
				var $characters = $.trim(val).split("");
				return '<span class="int">' + $characters.join('</span><span class="int">') + '</span>';
			});
		}
	});
	$(".txt-vertical-x").each(function() {
		$(this).html($(this).text().replace(/(.)/g, "<span>$1</span>"));
	});
	// END: text vertical

	// BEGIN: social button
	var __socialsHTML__ = "",
		__socialsLang = $("html").attr("lang") !== undefined && $.trim($("html").attr("lang")).length == 2 ? $.trim($("html").attr("lang")).toLowerCase() : "ja",
		$socialsLine = "",
		$socialsTwitter = "",
		$socialsFacebook = "",
		$socialsGooglePlus = "",
		locationURL = window.location.href || location.href;

	$socialsTwitter += '<div class="social-twitter">';
		$socialsTwitter += '<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>';
		$socialsTwitter += '<script type="text/javascript">!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
	$socialsTwitter += '</div>';

	$socialsFacebook += '<div class="social-facebook">';
		$socialsFacebook += '<div class="fb-like" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>';
	$socialsFacebook += '</div>';

	$socialsGooglePlus += '<div class="social-google">';
		$socialsGooglePlus += '<div class="g-plusone" data-size="medium"></div>';
	$socialsGooglePlus += '</div>';

	$socialsLine += '<div class="social-line">';
		$socialsLine += '<div class="line-it-button" data-lang="' + __socialsLang + '" data-type="like" data-url="' + locationURL + '" data-share="true" style="display: none;">';
			$socialsLine += '<script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer"></script>';
		$socialsLine += '</div>';
	$socialsLine += '</div>';

	if ($("#socialbuttons").length) {
		var $socialsOrder = typeof $("#socialbuttons").attr("data") != "undefined" ? $("#socialbuttons").attr("data").split("") : false;

		if (typeof $socialsOrder == "object" && $socialsOrder.length) {
			for (var socialsType in $socialsOrder) {
				if ($.trim(socialsType).length > 0) {
					socialsType = socialsType.toLowerCase();

					if ($socialsOrder[socialsType].toLocaleLowerCase() === "f") __socialsHTML__ += $socialsFacebook;
					else if ($socialsOrder[socialsType].toLocaleLowerCase() === "t") __socialsHTML__ += $socialsTwitter;
					else if ($socialsOrder[socialsType].toLocaleLowerCase() === "g") __socialsHTML__ += $socialsGooglePlus;
					else if ($socialsOrder[socialsType].toLocaleLowerCase() === "l") __socialsHTML__ += $socialsLine;
				}
			}
		} else {
			__socialsHTML__ += $socialsTwitter;
			__socialsHTML__ += $socialsFacebook;
			__socialsHTML__ += $socialsGooglePlus;
			__socialsHTML__ += $socialsLine;
		}

		$("#socialbuttons").html(__socialsHTML__);
	}
	// END: social button

	/* fix smoothscroll on IE - jumpy fixed background */
	if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
		$("body.ie-smoothscroll")
			.on("mousewheel", function (e) {
				if (event.preventDefault) event.preventDefault();
				else event.returnValue = false;

				var delta = null,
					offsetX = window.scrollX || window.pageXOffset || window.document.documentElement.scrollLeft,
					offsetY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

				if (e.wheelDelta) delta = e.wheelDelta;
				else if (e.originalEvent) {
					if (e.originalEvent.wheelDelta) delta = e.originalEvent.wheelDelta;
					else if (e.originalEvent.deltaY) delta = 0 - e.originalEvent.deltaY;
					else if (e.originalEvent.detail) delta = e.originalEvent.detail * -40;
				} else if (event.originalEvent) {
					if (event.originalEvent.wheelDelta) delta = event.originalEvent.wheelDelta;
					else if (event.originalEvent.deltaY) delta = 0 - event.originalEvent.deltaY;
					else if (event.originalEvent.detail) delta = event.originalEvent.detail * -40;
				}

				if (delta !== null) window.scrollTo(0, offsetY - delta);
			});
	}

	// scrollBefore(); // smoothscroll before page loaded

	$("body").on({
		mouseup: function() {
			// $("html").addClass("break-jump");
			$(this).removeClass("scrollable");
		}, mousedown: function() {
			// $("html").addClass("break-jump");
			$(this).addClass("scrollable");
		}, mouseleave: function() {
			// $("html").addClass("break-jump");
			$(this).removeClass("scrollable");
		}
	}, ".gmap");

	// BEGIN: .pagination
	$(".pagination").each(function() {
		initPager($(this));
	});

	$(".pagination")
		.on("click", ".page-link .page-first", function() {
			var $pagination = $(this).parents(".pagination").first(),
				$pageContent = $pagination.children(".page-content"),
				$pageLink = $pagination.children(".page-link"),
				mode = $pagination.attr("data-mode") !== "undefined" && $.inArray($pagination.attr("data-mode"), ["fade", "slide", "block"]) >= 0 ? $pagination.attr("data-mode") : "block",
				duration = typeof $pagination.attr("data-duration") !== "undefined" && $pagination.attr("data-duration").length > 0 ? parseInt($pagination.attr("data-duration"), 10) : (mode == "block" ? 0 : 300),
				scrollable = typeof $pagination.attr("data-scroll") !== "undefined" && $.inArray($pagination.attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
				navOffset = 0;

			if (!$pagination.hasClass("clicked")) {
				$pagination.addClass("clicked");

				if ($(".nav-fixed").length > 0) navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				if (mode == "fade") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().fadeOut(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().first().stop().delay(duration).fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().first().stop().fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else if (mode == "slide") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().slideUp(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().first().stop().delay(duration).slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().first().stop().slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().hide(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().first().stop().delay(duration).show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().first().stop().show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				}

				$pageLink.find(".page-item.active").removeClass("active");
				$pageLink.each(function() {
					$(this).find(".page-item").first().addClass("active");
				});
			}
		})
		.on("click", ".page-link .page-last", function() {
			var $pagination = $(this).parents(".pagination").first(),
				$pageContent = $pagination.children(".page-content"),
				$pageLink = $pagination.children(".page-link"),
				mode = $pagination.attr("data-mode") !== "undefined" && $.inArray($pagination.attr("data-mode"), ["fade", "slide", "block"]) >= 0 ? $pagination.attr("data-mode") : "block",
				duration = typeof $pagination.attr("data-duration") !== "undefined" && $pagination.attr("data-duration").length > 0 ? parseInt($pagination.attr("data-duration"), 10) : (mode == "block" ? 0 : 300),
				scrollable = typeof $pagination.attr("data-scroll") !== "undefined" && $.inArray($pagination.attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
				navOffset = 0;

			if (!$pagination.hasClass("clicked")) {
				$pagination.addClass("clicked");

				if ($(".nav-fixed").length > 0) navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				if (mode == "fade") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().fadeOut(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().last().stop().delay(duration).fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().last().stop().fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else if (mode == "slide") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().slideUp(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().last().stop().delay(duration).slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().last().stop().slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().hide(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().last().stop().delay(duration).show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().last().stop().show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				}

				$pageLink.find(".page-item.active").removeClass("active");
				$pageLink.each(function() {
					$(this).find(".page-item").last().addClass("active");
				});
			}
		})
		.on("click", ".page-link .page-next", function() {
			var $pagination = $(this).parents(".pagination").first(),
				navOffset = 0;

			if (!$pagination.hasClass("clicked")) {
				$pagination.addClass("clicked");

				if ($(".nav-fixed").length > 0) navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				var $pageContent = $pagination.children(".page-content"),
					$pageLink = $pagination.children(".page-link"),
					mode = $pagination.attr("data-mode") !== "undefined" && $.inArray($pagination.attr("data-mode"), ["fade", "slide", "block"]) >= 0 ? $pagination.attr("data-mode") : "block",
					duration = typeof $pagination.attr("data-duration") !== "undefined" && $pagination.attr("data-duration").length > 0 ? parseInt($pagination.attr("data-duration"), 10) : (mode == "block" ? 0 : 300),
					scrollable = typeof $pagination.attr("data-scroll") !== "undefined" && $.inArray($pagination.attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					$pageCurrent = $pageLink.find(".page-item.active"),
					$pageClone = $pageLink.clone(),
					idx = 0;

				$pageClone.find(".page-first, .page-last, .page-next, .page-prev, .page-ellipse").remove();

				idx = $pageClone.find(".page-item.active").index();

				$pageLink.find(".page-item.active").removeClass("active");

				if ($pageClone.find(".page-item.active").next(".page-item").length > 0) {
					if (mode == "fade") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().fadeOut(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx + 1).stop().delay(duration).fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx + 1).stop().fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else if (mode == "slide") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().slideUp(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx + 1).stop().delay(duration).slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx + 1).stop().slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().hide(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx + 1).stop().delay(duration).show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx + 1).stop().show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					}

					$pageCurrent.next(".page-item").addClass("active");
				} else {
					if (mode == "fade") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().fadeOut(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().first().stop().delay(duration).fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().first().stop().fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else if (mode == "slide") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().slideUp(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().first().stop().delay(duration).slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().first().stop().slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().hide(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().first().stop().delay(duration).show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().first().stop().show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					}

					$pageLink.each(function() {
						$(this).find(".page-item").first().addClass("active");
					});
				}
			}
		})
		.on("click", ".page-link .page-prev", function() {
			var $pagination = $(this).parents(".pagination").first(),
				navOffset = 0;

			if (!$pagination.hasClass("clicked")) {
				$pagination.addClass("clicked");

				if ($(".nav-fixed").length > 0) navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				var $pageContent = $pagination.children(".page-content"),
					$pageLink = $pagination.children(".page-link"),
					mode = $pagination.attr("data-mode") !== "undefined" && $.inArray($pagination.attr("data-mode"), ["fade", "slide", "block"]) >= 0 ? $pagination.attr("data-mode") : "block",
					duration = typeof $pagination.attr("data-duration") !== "undefined" && $pagination.attr("data-duration").length > 0 ? parseInt($pagination.attr("data-duration"), 10) : (mode == "block" ? 0 : 300),
					scrollable = typeof $pagination.attr("data-scroll") !== "undefined" && $.inArray($pagination.attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					$pageCurrent = $pageLink.find(".page-item.active"),
					$pageClone = $pageLink.clone(),
					idx = 0;

				$pageClone.find(".page-first, .page-last, .page-next, .page-prev, .page-ellipse").remove();

				idx = $pageClone.find(".page-item.active").index();

				$pageLink.find(".page-item.active").removeClass("active");

				if ($pageClone.find(".page-item.active").prev(".page-item").length > 0) {
					if (mode == "fade") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().fadeOut(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx - 1).stop().delay(duration).fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx - 1).stop().fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else if (mode == "slide") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().slideUp(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx - 1).stop().delay(duration).slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx - 1).stop().slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().hide(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().eq(idx - 1).stop().delay(duration).show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().eq(idx - 1).stop().show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					}

					$pageCurrent.prev(".page-item").addClass("active");
				} else {
					if (mode == "fade") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().fadeOut(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().last().stop().delay(duration).fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().last().stop().fadeIn(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else if (mode == "slide") {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().slideUp(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().last().stop().delay(duration).slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().last().stop().slideDown(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					} else {
						if ($pageContent.children().length > 1) {
							$pageContent.children().stop().hide(duration, function() {
								$(this).removeAttr("style").removeClass("active");
							}).siblings().last().stop().delay(duration).show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						} else {
							$pageContent.children().last().stop().show(duration, function() {
								$(this).removeAttr("style").addClass("active");

								if (scrollable) {
									$("body, html").stop().animate({
										scrollTop: $pagination.offset().top - navOffset
									}, 300);
								}

								$pagination.removeClass("clicked");
							});
						}
					}

					$pageLink.each(function() {
						$(this).find(".page-item").last().addClass("active");
					});
				}
			}
		})
		.on("click", ".page-link .page-item", function() {
			var $pagination = $(this).parents(".pagination").first(),
				navOffset = 0;

			if (!$pagination.hasClass("clicked")) {
				$pagination.addClass("clicked");

				if ($(".nav-fixed").length > 0) navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

				$(this).addClass("current");

				var $pageContent = $pagination.children(".page-content"),
					mode = $pagination.attr("data-mode") !== "undefined" && $.inArray($pagination.attr("data-mode"), ["fade", "slide", "block"]) >= 0 ? $pagination.attr("data-mode") : "block",
					duration = typeof $pagination.attr("data-duration") !== "undefined" && $pagination.attr("data-duration").length > 0 ? parseInt($pagination.attr("data-duration"), 10) : (mode == "block" ? 0 : 300),
					scrollable = typeof $pagination.attr("data-scroll") !== "undefined" && $.inArray($pagination.attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					$pageClone = $pagination.children(".page-link").find(".page-item.current").parents(".page-link").first().clone(),
					idx = 0;

				$pageClone.find(".page-first, .page-last, .page-next, .page-prev, .page-ellipse").remove();

				idx = $pageClone.find(".page-item.current").index();

				if (mode == "fade") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().fadeOut(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().eq(idx).stop().delay(duration).fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().eq(idx).stop().fadeIn(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else if (mode == "slide") {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().slideUp(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().eq(idx).stop().delay(duration).slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().eq(idx).stop().slideDown(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				} else {
					if ($pageContent.children().length > 1) {
						$pageContent.children().stop().hide(duration, function() {
							$(this).removeAttr("style").removeClass("active");
						}).siblings().eq(idx).stop().delay(duration).show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					} else {
						$pageContent.children().eq(idx).stop().show(duration, function() {
							$(this).removeAttr("style").addClass("active");

							if (scrollable) {
								$("body, html").stop().animate({
									scrollTop: $pagination.offset().top - navOffset
								}, 300);
							}

							$pagination.removeClass("clicked");
						});
					}
				}

				$pagination.children(".page-link").find(".page-item.current").removeClass("current");
				$pagination.children(".page-link").find(".page-item.active").removeClass("active");
				$pagination.children(".page-link").each(function() {
					$(this).find(".page-item").eq(idx).addClass("active");
				});
			}
		})
		.on("click", ".page-link li.disabled", function() {
		});
	// END: .pagination
});

// user agents
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

var fbTimer = null,
	fbCodes = {},
	fbPage = document.querySelectorAll(".fb-page");

if (fbPage.length > 0) {
	for (var i in fbPage) {
		if (fbPage[i].constructor === HTMLDivElement) fbCodes[i] = fbPage[i].outerHTML;
	}
}

$(window).resize(function() {
	// fix bg parallax on mobile
	if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
	else $(".bg-parallax").css("background-attachment", "");

	$(".pagination").removeClass("clicked");

	if ($("#fb-root").attr("data-resize")) {
		if (fbTimer != null) clearTimeout(fbTimer);

		// delay for document is loaded
		fbTimer = setTimeout(function() {
			if (typeof FB !== "undefined") {
				$(".fb-page").each(function(i) {
					if (fbCodes[i]) $(this).replaceWith(fbCodes[i]);
				});

				FB.XFBML.parse();
			}
		}, 1000);
	}
}).on("scroll resize", function() {
	if ($(this).scrollTop() > 0) $("#pagetop").addClass("visible");
	else $("#pagetop").removeClass("visible");

	if ($(".nav-fixed").length) {
		var $navPinY = $(".nav-target").length ? $(".nav-target").offset().top - $(".nav-fixed").outerHeight() - 1 : $(".nav-fixed").offset().top;
		if ($(this).scrollTop() > $navPinY || ($navPinY < 0 && $(this).scrollTop() > 0)) {
			if ($(".nav-pin").length) $(".nav-pin").addClass("fixed");
			else $(".nav-fixed").addClass("fixed");
		} else {
			if ($(".nav-pin").length) $(".nav-pin").removeClass("fixed");
			else $(".nav-fixed").removeClass("fixed");
		}
	}
}).on("load", function() {
	// scrollBefore();
});

var scrollBefore = function() {
	var hash = window.location.hash || location.hash,
		ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g;

	if (hash) {
		hash = hash.replace(ptnHash, "\\$1");
		if ($(hash).length > 0) {
			if ($(".tabs-switch").length > 0) {
				if ($(hash).length > 0 && $(hash).parents(".tab-content").first().length > 0) {
					var tabChild = $(hash);
					$(hash).parents().each(function() {
						if ($(this).attr("class") !== undefined && $.inArray("tab-content", $(this).attr("class").split(" ")) >= 0) return false;
						else tabChild = $(this);
					});

					setTimeout(function() {
						tabChild.parents(".tabs-switch").first().children(".tab-link").children().eq(tabChild.index()).click(); // trigger tab in multiple dim
					}, 10);
				} else {
					$(".tabs-switch").each(function() {
						var $tabLink = $(this).children(".tab-link");

						if ($tabLink.children(hash).length > 0) {
							setTimeout(function() {
								$tabLink.children(hash).click(); // trigger for set active tab
							}, 10);
						}
					});
				}
			}


			if ($(".bxSlider").length > 0) $(window).trigger("resize");

			setTimeout(function() {
				if ($(".nav-fixed").length > 0) {
					var offsetY = $(hash).offset().top,
						navHeight = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height"), 10) : $(".nav-fixed").outerHeight();

					// if ($(".nav-pin").length > 0) offsetY -= $(".nav-pin").outerHeight();

					window.scroll(0, offsetY - navHeight);

					// re-updated offset
					if ($(".nav-target").length > 0) {
						var reupdated = true;
						$(window).scroll(function() {
							if (reupdated && $(this).scrollTop() >= $(".nav-target").offset().top) {
								reupdated = false;

								navHeight = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height"), 10) : $(".nav-fixed").outerHeight();

								window.scroll(0, $(hash).offset().top - navHeight);
							}
						});
					}
				} else window.scrollTo(0, $(hash).offset().top);
			}, 10);

			$("a[href='" + hash + "']").click();
		} // else window.scrollTo(0, _offsetY);
	}
};

scrollBefore(); // DOM loaded



/*
 * Plugins/Functions
 *
 */

// check object is variable or DOM elements
function isObjectVar(obj) {
	return ((typeof obj != "undefined") && (typeof obj === "object") && (obj.nodeType !== 1) && (typeof obj.ownerDocument !== "object"));
}

(function($) {
	// BEGIN: $.feed
	$.fn.feed = function (option, callbacks) {
		var option = $.extend({
			Path		: "",
			BOX			: $(this),
			key			: 0,
			MAX			: 5,
			titleMax	: 40,
			postMax		: 100,
			endtext		: "...",
			indention	: "no",
			Datetype	: { year: "年", month: "月", date: "日" },
			Image		: "no",
			ImageSize	: { width: "200", height: "150"}, //表示する画像のサイズ
			noImage		: "no",
			noImage_src : "shared/img/shared/no_image.jpg",
			source		: "",
			done		: false
		}, option);

		$.support.cors = true; // fixed no transport error
		$.ajax({
			url: option["Path"],
			crossDomain: true,
			cache: false,
			async: false,
			type: "POST",
			dataType: "xml",
			data: {
				key: option["key"]
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + ": " + errorThrown);

				return false;
			}, success: function(data) {
				var cnt = 0,
					imgTbl = [],
					img = "",
					src = "",
					ss = "",
					category = "", // FCV - added
					author = "", // FCV - added
					html = "";

			$(option["BOX"]["selector"]).empty(); // clear template - FCV added

			//要素を全て配列に
			$(data).find("item").each(function(){
				var title = $("title",this).text(), //タイトル
					link = $("link",this).text(), //リンク先
					category = $("category",this).text(), // FCV - added
					author = $("dc\\:creator",this).text(), // FCV - added
					ex = $("description",this).text(); //注釈文章

					//本文のソースを表示するかどうか
					if(option.indention === "yes") ex = $('content\\:encoded',this).text();

					//スペースを削除
					ex.replace(/\s+/g, "");
					ex.replace(" ", "");

					//タイトルが1行に収まらない場合、調整
					if (title.length > option.titleMax) {
						var rename = title.substring(0,option.titleMax-1) + option.endtext;
						title = rename;
					}

					//本文の調整
					if (ex.length > option.postMax) {
						var retxt = ex.substring(0,option.postMax-1) + option.endtext;
						ex = retxt;
					}

					//日付取得
					// ISO date string - regex
					// ^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$
					var pubDate = $("pubDate",this).text().length > 0 ? true : false,
						Datetxt = pubDate ? $("pubDate",this).text() : $("dc\\:date",this).text(),
						dateISO = pubDate ? new Date() : new Date(Datetxt),
						year = pubDate ? Datetxt.substring(12, 16) : dateISO.getMonth() + 1,
						month = pubDate ? Datetxt.substring(8, 11) : dateISO.getDate(),
						date = pubDate ? Datetxt.substring(5, 7) : dateISO.getFullYear();

					//英語表記の月を日本語に変換
					if (month == "Jan") month = "01";
					if (month == "Feb") month = "02";
					if (month == "Mar") month = "03";
					if (month == "Apr") month = "04";
					if (month == "May") month = "05";
					if (month == "Jun") month = "06";
					if (month == "Jul") month = "07";
					if (month == "Aug") month = "08";
					if (month == "Sep") month = "09";
					if (month == "Oct") month = "10";
					if (month == "Nov") month = "11";
					if (month == "Dec") month = "12";

					//日付の形式
					date = year + option.Datetype.year + month + option.Datetype.month + date + option.Datetype.date;

					//画像の取得
					if(option.Image !== "no") {

						ss = $(this).find('[nodeName="content:encoded"]').context.textContent;
						html = $.parseHTML( ss );

						imgTbl.length = 0;


						var AllImage = $(html).find("img");

						for (i=0, Max=AllImage.length; i<Max; i++) {
							//絵文字を除外する
							if (!$(AllImage)[i].src.match("s.w.org")) Array.prototype.push.apply(imgTbl, [$(AllImage)[i].src]);
						}

						if (imgTbl[0]) src = imgTbl[0];
						else src = option.noImage_src; //no-image画像

						if (option.noImage === "yes") {
							img = '<span style="display:block; background: url(' + src + ') no-repeat center center; background-size:cover; width:' + option.ImageSize.width + 'px; height:' + option.ImageSize.height + 'px;"></span>';
						}

						if (option.noImage === "no") {
							if ($(html).find("img")[0]) img = '<span style="display:block; background: url(' + src + ') no-repeat center center; background-size:cover; width:' + option.ImageSize.width + 'px; height:' + option.ImageSize.height + 'px;"></span>';
							else img = '<span class="no-image" style="display:none;"></span>';
						}
					}

					//出力のソース
					if(!title.match("PR")) {
						var postdata = option.source,
							post = postdata(link,title,date,ex,img,category,author,cnt); // FCV - modified

						$(option.BOX.selector).append(post);
					}

					//終了フラグ
					cnt++;
					if(cnt > (option.MAX -1)) return false;
				});
			}
		}).done(function() {
			if (typeof callbacks === "function") callbacks.call(this);
		});
	};
	// END: $.feed

	// BEGIN: $.fcvScroll
	$.fn.fcvScroll = function(options) {
		var options = $.extend({
			selector: ".section", // selector
			delay: 50, // time delay (ms)
			duration: 400, // time duration (ms)
			reference: .9,
		}, options);

		if (options.selector) {
			var $wrapper = $(this),
				$offsetSelectors = [],
				$scrollDown = true,
				$scrollPos = $(window).scrollTop(),
				$scrollTimer = null;

			$wrapper.find(options.selector).each(function(i) {
				$offsetSelectors.push($(this).offset().top); // offsetY fined
			});

			$(window).scroll(function() {
				$scrollDown = $(window).scrollTop() >= $scrollPos;
				$scrollPos = $(window).scrollTop();

				clearTimeout($scrollTimer);

				if ($.inArray($(window).scrollTop(), $offsetSelectors) < 0) { // not in area fined
					$scrollTimer = setTimeout(function() { // fcv-snap
						var $scrollTop = $(window).scrollTop(),
							$posY = $(window).height() * options.reference,
							$position = 0,
							$target;

							if ($scrollDown) { // direction down
								$position = $scrollTop + $posY - 1;
								$wrapper.find(options.selector).each(function() {
									var $offsetY = $(this).offset().top;
									if (($offsetY > $scrollTop) && ($offsetY <= $position)) {
										$target = $(this);
										return false;
									}
								});
							} else { // direction up
								$position = $scrollTop - $posY + 1;
								$wrapper.find(options.selector).each(function() {
									var $offsetY = $(this).offset().top;
									if (($offsetY < $scrollTop) && ($offsetY >= $position)) {
										$target = $(this);
										return false;
									}
								});
							}

							if ($target) {
								$("html, body").stop().animate({
									scrollTop: $target.offset().top
								}, options.duration, function() {
									clearTimeout($scrollTimer);
								});
							}
					}, options.delay);
				}
			}).resize(function() {
				if ($(options.selector).hasClass("minHeight")) {
					$(options.selector).css({
						minHeight: $(window).height()
					});
				} else {
					$(options.selector).css({
						height: $(window).height()
					});
				}
			}).trigger("resize");
		} else console.error("Missing selector");

		return this;
	};
	// END: $.fcvScroll
})(jQuery);

var gmarkers = [],
	gnum = 0;



// BEGIN: heightLine
function heightLine() {

	this.className="heightLine";
	this.parentClassName="heightLineParent"
	reg = new RegExp(this.className+"-([a-zA-Z0-9-_]+)", "i");
	objCN =new Array();
	var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
	for(var i = 0; i < objAll.length; i++) {
		if (typeof objAll[i].className == "string") {
			var eltClass = objAll[i].className.split(/\s+/);
			for(var j = 0; j < eltClass.length; j++) {
				if(eltClass[j] == this.className) {
					if(!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				}else if(eltClass[j] == this.parentClassName){
					if(!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				}else if(eltClass[j].match(reg)){
					var OCN = eltClass[j].match(reg)
					if(!objCN[OCN]) objCN[OCN]=new Array();
					objCN[OCN].push(objAll[i]);
					break;
				}
			}
		}
	}

	//check font size
	var e = document.createElement("div");
	var s = document.createTextNode("S");
	e.appendChild(s);
	e.style.classname="check-fontsize";
	e.style.visibility="hidden";
	e.style.position="absolute";
	e.style.top="0";
	document.body.appendChild(e);
	var defHeight = e.offsetHeight;

	changeBoxSize = function(){
		for(var key in objCN){
			if (objCN.hasOwnProperty(key)) {
				//parent type
				if(key == "parent CN"){
					for(var i=0 ; i<objCN[key].length ; i++){
						var max_height=0;
						var CCN = objCN[key][i].childNodes;
						for(var j=0 ; j<CCN.length ; j++){
							if(CCN[j] && CCN[j].nodeType == 1){
								CCN[j].style.height="auto";
								max_height = max_height>CCN[j].offsetHeight?max_height:CCN[j].offsetHeight;
							}
						}
						for(var j=0 ; j<CCN.length ; j++){
							if(CCN[j].style){
								var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
								var newheight = max_height;
								if(stylea.paddingTop)newheight -= stylea.paddingTop.replace("px","");
								if(stylea.paddingBottom)newheight -= stylea.paddingBottom.replace("px","");
								if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","");
								if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
								CCN[j].style.height =newheight+"px";
							}
						}
					}
				}else{
					var max_height=0;
					for(var i=0 ; i<objCN[key].length ; i++){
						objCN[key][i].style.height="auto";
						max_height = max_height>objCN[key][i].offsetHeight?max_height:objCN[key][i].offsetHeight;
					}
					for(var i=0 ; i<objCN[key].length ; i++){
						if(objCN[key][i].style){
							var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
								var newheight = max_height;
								if(stylea.paddingTop)newheight-= stylea.paddingTop.replace("px","");
								if(stylea.paddingBottom)newheight-= stylea.paddingBottom.replace("px","");
								if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","")
								if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
								objCN[key][i].style.height =newheight+"px";
						}
					}
				}
			}
		}
	}

	checkBoxSize = function(){
		if(defHeight != e.offsetHeight){
			changeBoxSize();
			defHeight= e.offsetHeight;
		}

		// var elm = document.querySelector(".check-fontsize");
		// if (elm) elm.parentNode.removeChild(elm);
	}
	changeBoxSize();
	setInterval(checkBoxSize,1000)
	window.onresize=changeBoxSize;
}

function addEvent(elm,listener,fn){
	try{
		elm.addEventListener(listener,fn,false);
	}catch(e){
		elm.attachEvent("on"+listener,fn);
	}
}
addEvent(window, "load", heightLine);
// END: heightLine

(function() { // DOM loaded
	// facebook
	var fbRoot = document.getElementById("fb-root");
	if (fbRoot) {
		var fbScript = document.createElement("script"),
			fbScriptContent = "",
			fbVersion = fbRoot.getAttribute("data-version") ? fbRoot.getAttribute("data-version") : "v2.12",
			fbLanguage = fbRoot.getAttribute("data-language") ? fbRoot.getAttribute("data-language") : "ja_JP";

		fbVersion = fbVersion.substr(0, 1).toLowerCase() == "v" ? fbVersion.substr(1) : fbVersion;

		fbScriptContent += '(function(d, s, id) {';
			fbScriptContent += 'var js, fjs = d.getElementsByTagName(s)[0];';
			fbScriptContent += 'if (d.getElementById(id)) return;';
			fbScriptContent += 'js = d.createElement(s);';
			fbScriptContent += 'js.id = id;';
			fbScriptContent += 'js.src = "https://connect.facebook.net/' + fbLanguage + '/sdk.js#xfbml=1&version=v' + fbVersion + '";';
			fbScriptContent += 'fjs.parentNode.insertBefore(js, fjs);';
		fbScriptContent += '}(document, "script", "facebook-jssdk"));';

		fbScript.innerHTML = fbScriptContent;
		document.body.appendChild(fbScript);
	}

	// WOW js
	if (typeof window["WOW"] === "function") {
		var wowData = {
				box: typeof $("body").attr("data-wow-box") != "undefined" ? $("body").attr("data-wow-box") : "wow",
				animate: typeof $("body").attr("data-wow-animate") != "undefined" ? $("body").attr("data-wow-animate") : "animated",
				offset: typeof $("body").attr("data-wow-offset") != "undefined" ? parseInt($("body").attr("data-wow-offset")) : 0,
				mobile: $.inArray($("body").attr("data-wow-mobile"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
				live: $.inArray($("body").attr("data-wow-live"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
				callback: function() {},
				scrollContainer: null
			};

		if (typeof $("body").attr("data-wow-offset") == "undefined") wowData.mobile = true;
		if (typeof $("body").attr("data-wow-live") == "undefined") wowData.live = true;

		new WOW(wowData).init();
	}
})();

// conflicts
if (!Object.keys) {
	Object.keys = (function() {
		"use strict";
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({
				toString: null
			}).propertyIsEnumerable("toString"),
			dontEnums = [
				"toString",
				"toLocaleString",
				"valueOf",
				"hasOwnProperty",
				"isPrototypeOf",
				"propertyIsEnumerable",
				"constructor"
			],
			dontEnumsLength = dontEnums.length;

		return function(obj) {
			if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
				throw new TypeError("Object.keys called on non-object");
			}

			var result = [],
				prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}

function isHTML(str) {
	var a = document.createElement("div");
	a.innerHTML = str;
	for (var child = a.childNodes, i = child.length; i--;) {
		if (child[i].nodeType == 1) return true;
	}
	return false;
}

// BEGIN: slide fading
var $slideFadeTimer = {};

function slideFadeStart(elm) {
	var $this = elm,
		__idx__ = $(".slide-fade").index($this),
		$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
		$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000,
		$delay = typeof $this.attr("data-delay") != "undefined" ? parseInt($this.attr("data-delay")) : false;

	if ($timer < $duration) $timer = $duration * 2;

	$this.removeClass("stop");
	if (!$this.children(".active").length) {
		$this.children().hide();
		$this.children().eq(0).show().addClass("active");

		if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq(0).addClass("active");
	} else {
		if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq($this.children(".active").index()).addClass("active");
	}

	// $slideFadeTimer[__idx__] = setInterval(function() {
		// slideFade($this, $duration);
	// }, $timer);

	$this.parents(".slideParent").addClass("move-start").attr("data", $this.children(".active").index());

	if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);
	$slideFadeTimer[__idx__] = setTimeout(function() {
		slideFade($this, $duration);
	}, $delay ? $delay : $timer);
}

function slideFade(elm, duration) {
	var elmActive = elm.children(".active"),
		slideContinue = elm.hasClass("stop") || (elm.hasClass("once") && elmActive.next().length < 1) ? false : true;

	if (slideContinue) {
		var __idx__ = $(".slide-fade").index(elm),
			timer = typeof elm.attr("data-timer") != "undefined" ? parseInt(elm.attr("data-timer")) : 4000;

		if (elmActive.next().length) {
			if (typeof elmActive.next().attr("data-duration") != "undefined") duration = parseInt(elmActive.next().attr("data-duration"));
		} else {
			if (typeof elm.children().eq(0).attr("data-duration") != "undefined") duration = parseInt(elm.children().eq(0).attr("data-duration"));
		}

		if ($slideFadeTimer[__idx__]) clearTimeout($slideFadeTimer[__idx__]);

		elmActive.stop().fadeOut(duration, function() {
			$(this).removeClass("active").removeAttr("style").hide();
		});

		elm.parents(".slideParent").removeClass("move-start move-next move-prev move-first move-last");

		if (elmActive.next().length > 0) {
			if (typeof elmActive.next().attr("data-timer") != "undefined") timer = parseInt(elmActive.next().attr("data-timer"));
			if (timer < duration) timer = duration * 2;

			if (elm.siblings(".slide-page").length > 0) {
				elm.siblings(".slide-page").children(".active").removeClass("active");
				elm.siblings(".slide-page").children().eq(elmActive.next().index()).addClass("active");
			}

			elm.parents(".slideParent").addClass("move-next").attr("data", elmActive.next().index());
			if (elmActive.next().is(":last-child")) elm.parents(".slideParent").addClass("move-last");

			elmActive.next().stop().fadeIn(duration, function() {
				$(this).addClass("active").removeAttr("style").show();

				if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
				if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");

				if ($(this).next().length < 1 && elm.hasClass("once")) elm.addClass("slide-finished");

				$slideFadeTimer[__idx__] = setTimeout(function() {
					slideFade(elm, duration);
				}, timer);
			});
		} else {
			if (typeof elm.children().eq(0).attr("data-timer") != "undefined") timer = parseInt(elm.children().eq(0).attr("data-timer"));
			if (timer < duration) timer = duration * 2;

			if (elm.siblings(".slide-page").length > 0) {
				elm.siblings(".slide-page").children(".active").removeClass("active");
				elm.siblings(".slide-page").children().eq(0).addClass("active");
			}

			elm.parents(".slideParent").addClass("move-first").attr("data", 0);

			elm.children().eq(0).stop().fadeIn(duration, function() {
				$(this).addClass("active").removeAttr("style").show();

				if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
				if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");

				if ($(this).next().length < 1 && elm.hasClass("once")) elm.addClass("slide-finished");

				$slideFadeTimer[__idx__] = setTimeout(function() {
					slideFade(elm, duration);
				}, timer);
			});
		}
	} else elm.addClass("slide-finished");
}
// END: slide fading

// BEGIN: .pagination
function reloadPager(elm) {
	if (elm) {
		if (elm instanceof jQuery && elm.length > 0) {
			elm.each(function() {
				initPager($(this));
			});
		}
	} else {
		$(".pagination").each(function() {
			initPager($(this));
		});
	}
}
function initPager(elm) {
	// if (elm.children(".page-content").children().length > 0) {
		var $pagination = elm,
			$pageContent = $pagination.children(".page-content"),
			total = $pageContent.children().length;

		var dataPage = {
			first: typeof $pagination.attr("data-first") !== "undefined" && $pagination.attr("data-first").length > 0 ? $pagination.attr("data-first") : false,
			last: typeof $pagination.attr("data-last") !== "undefined" && $pagination.attr("data-last").length > 0 ? $pagination.attr("data-last") : false,
			next: typeof $pagination.attr("data-next") !== "undefined" && $pagination.attr("data-next").length > 0 ? $pagination.attr("data-next") : false,
			prev: typeof $pagination.attr("data-prev") !== "undefined" && $pagination.attr("data-prev").length > 0 ? $pagination.attr("data-prev") : false,
			active: typeof $pagination.attr("data-active") !== "undefined" && $pagination.attr("data-active").length > 0 ? parseInt($pagination.attr("data-active"), 10) : 1,
			max: typeof $pagination.attr("data-max") !== "undefined" && $pagination.attr("data-max").length > 0 ? parseInt($pagination.attr("data-max"), 10) : false,
			page: typeof $pagination.attr("data-page") !== "undefined" && $.inArray($pagination.attr("data-page"), ["top", "bottom", "both"]) >= 0 ? $pagination.attr("data-page") : false
		};

		if (dataPage.active > total) dataPage.active = 1;

		if (dataPage.max) { // && $pageContent.children().length > 0
			if ($pageContent.children(".page-wrap").length > 0) {
				if ($pageContent.children(".page-wrap").children().length > 0) $pageContent.children(".page-wrap").children().unwrap();
				else $pageContent.children(".page-wrap").remove();
			}

			$pageContent.children().not(".page-wrap").each(function(i) {
				if (i % dataPage.max === 0) $pageContent.append('<div class="page-wrap" />');

				$(this).appendTo($pageContent.children(".page-wrap").last());
			});

			total = $pageContent.children().length;
		}

		if ($pagination.children(".page-link").length > 0) $pagination.children(".page-link").remove();

		if (dataPage.page && total > 0) {
			if (dataPage.page == "top") $pagination.prepend('<div class="page-link" />');
			else if (dataPage.page == "bottom") $pagination.append('<div class="page-link" />');
			else {
				$pagination.prepend('<div class="page-link" />');
				$pagination.append('<div class="page-link" />');
			}

			$pagination.children(".page-link").each(function(p) {
				var $pageLink = $(this);

				var htmlItem = [];
				htmlItem.push('<ul>');
					if (dataPage.first) htmlItem.push('<li class="page-first">' + dataPage.first + '</li>');
					if (dataPage.prev) htmlItem.push('<li class="page-prev">' + dataPage.prev + '</li>');
					for (var i = 1; i <= total; i++) {
						// if (i == dataPage.active) htmlItem.push('<li class="page-item active">' + i + '</li>');
						// else htmlItem.push('<li class="page-item">' + i + '</li>');
						htmlItem.push('<li class="page-item">' + i + '</li>');
					}
					if (dataPage.next) htmlItem.push('<li class="page-next">' + dataPage.next + '</li>');
					if (dataPage.last) htmlItem.push('<li class="page-last">' + dataPage.last + '</li>');
				htmlItem.push('</ul>');

				htmlItem = htmlItem.join("\n");
				$pageLink.html(htmlItem);

				var scrollable = $pagination.attr("data-scroll"),
					duration = $pagination.attr("data-duration"),
					modeable = $pagination.attr("data-mode");

				$pagination.attr("data-scroll", false); // off scroll on first loaded
				$pagination.attr("data-duration", 0); // off duration on first loaded
				$pagination.attr("data-mode", false); // off mode on first loaded

				if (p >= $pagination.children(".page-link").length - 1) { // last
					setTimeout(function() {
						$pageLink.find(".page-item").eq(dataPage.active - 1).click();
					}, 1);
				} // else $pageLink.find(".page-item").eq(dataPage.active - 1).addClass("active");
			});

			// re-setting for data-scroll
			if (typeof scrollable === "undefined") $pagination.removeAttr("data-scroll");
			else $pagination.attr("data-scroll", scrollable);

			// re-setting for data-duration
			if (typeof duration === "undefined") $pagination.removeAttr("data-duration");
			else $pagination.attr("data-duration", duration);

			// re-setting for data-mode
			if (typeof modeable === "undefined") $pagination.removeAttr("data-mode");
			else $pagination.attr("data-mode", modeable);
		} else {
			$pageContent.children(".page-wrap").first().addClass("active"); // show
		}
	// }
}
// END: .pagination

var checkDomain = function(url) {
	if (url.indexOf('//') === 0) url = location.protocol + url;
	return url.toLowerCase().replace(/([a-z])?:\/\//, "$1").split("/")[0];
};
var isExternal = function(url) {
	return ((url.indexOf(":") > -1 || url.indexOf("//") > -1) && checkDomain(location.href) !== checkDomain(url));
};

var Cookie = {};
Cookie.set = function(cname, cvalue, exdays) {
	if (!exdays) exdays = 1;

	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
Cookie.get = function(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};
Cookie.remove = function (cname) {
	this.set(cname, null, 0);
};



/*************************************************
 *
 * Libraries
 *
 ************************************************/



/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.2
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */

!function(){"use strict";function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD="function"==typeof define&&define.amd,ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}(root.JS_MD5_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(r){return new Md5(!0).update(r)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(r){return t.create().update(r)};for(var r=0;r<OUTPUT_TYPES.length;++r){var e=OUTPUT_TYPES[r];t[e]=createOutputMethod(e)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"==typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null===t||void 0===t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};Md5.prototype.update=function(t){if(!this.finalized){var r,e=typeof t;if("string"!==e){if("object"!==e)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw ERROR;r=!0}for(var s,i,o=0,h=t.length,f=this.blocks,a=this.buffer8;h>o;){if(this.hashed&&(this.hashed=!1,f[0]=f[16],f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),r)if(ARRAY_BUFFER)for(i=this.start;h>o&&64>i;++o)a[i++]=t[o];else for(i=this.start;h>o&&64>i;++o)f[i>>2]|=t[o]<<SHIFT[3&i++];else if(ARRAY_BUFFER)for(i=this.start;h>o&&64>i;++o)s=t.charCodeAt(o),128>s?a[i++]=s:2048>s?(a[i++]=192|s>>6,a[i++]=128|63&s):55296>s||s>=57344?(a[i++]=224|s>>12,a[i++]=128|s>>6&63,a[i++]=128|63&s):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++o)),a[i++]=240|s>>18,a[i++]=128|s>>12&63,a[i++]=128|s>>6&63,a[i++]=128|63&s);else for(i=this.start;h>o&&64>i;++o)s=t.charCodeAt(o),128>s?f[i>>2]|=s<<SHIFT[3&i++]:2048>s?(f[i>>2]|=(192|s>>6)<<SHIFT[3&i++],f[i>>2]|=(128|63&s)<<SHIFT[3&i++]):55296>s||s>=57344?(f[i>>2]|=(224|s>>12)<<SHIFT[3&i++],f[i>>2]|=(128|s>>6&63)<<SHIFT[3&i++],f[i>>2]|=(128|63&s)<<SHIFT[3&i++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++o)),f[i>>2]|=(240|s>>18)<<SHIFT[3&i++],f[i>>2]|=(128|s>>12&63)<<SHIFT[3&i++],f[i>>2]|=(128|s>>6&63)<<SHIFT[3&i++],f[i>>2]|=(128|63&s)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>2]|=EXTRA[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>29,this.hash()}},Md5.prototype.hash=function(){var t,r,e,s,i,o,h=this.blocks;this.first?(t=h[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,s=(-1732584194^2004318071&t)+h[1]-117830708,s=(s<<12|s>>>20)+t<<0,e=(-271733879^s&(-271733879^t))+h[2]-1126478375,e=(e<<17|e>>>15)+s<<0,r=(t^e&(s^t))+h[3]-1316259209,r=(r<<22|r>>>10)+e<<0):(t=this.h0,r=this.h1,e=this.h2,s=this.h3,t+=(s^r&(e^s))+h[0]-680876936,t=(t<<7|t>>>25)+r<<0,s+=(e^t&(r^e))+h[1]-389564586,s=(s<<12|s>>>20)+t<<0,e+=(r^s&(t^r))+h[2]+606105819,e=(e<<17|e>>>15)+s<<0,r+=(t^e&(s^t))+h[3]-1044525330,r=(r<<22|r>>>10)+e<<0),t+=(s^r&(e^s))+h[4]-176418897,t=(t<<7|t>>>25)+r<<0,s+=(e^t&(r^e))+h[5]+1200080426,s=(s<<12|s>>>20)+t<<0,e+=(r^s&(t^r))+h[6]-1473231341,e=(e<<17|e>>>15)+s<<0,r+=(t^e&(s^t))+h[7]-45705983,r=(r<<22|r>>>10)+e<<0,t+=(s^r&(e^s))+h[8]+1770035416,t=(t<<7|t>>>25)+r<<0,s+=(e^t&(r^e))+h[9]-1958414417,s=(s<<12|s>>>20)+t<<0,e+=(r^s&(t^r))+h[10]-42063,e=(e<<17|e>>>15)+s<<0,r+=(t^e&(s^t))+h[11]-1990404162,r=(r<<22|r>>>10)+e<<0,t+=(s^r&(e^s))+h[12]+1804603682,t=(t<<7|t>>>25)+r<<0,s+=(e^t&(r^e))+h[13]-40341101,s=(s<<12|s>>>20)+t<<0,e+=(r^s&(t^r))+h[14]-1502002290,e=(e<<17|e>>>15)+s<<0,r+=(t^e&(s^t))+h[15]+1236535329,r=(r<<22|r>>>10)+e<<0,t+=(e^s&(r^e))+h[1]-165796510,t=(t<<5|t>>>27)+r<<0,s+=(r^e&(t^r))+h[6]-1069501632,s=(s<<9|s>>>23)+t<<0,e+=(t^r&(s^t))+h[11]+643717713,e=(e<<14|e>>>18)+s<<0,r+=(s^t&(e^s))+h[0]-373897302,r=(r<<20|r>>>12)+e<<0,t+=(e^s&(r^e))+h[5]-701558691,t=(t<<5|t>>>27)+r<<0,s+=(r^e&(t^r))+h[10]+38016083,s=(s<<9|s>>>23)+t<<0,e+=(t^r&(s^t))+h[15]-660478335,e=(e<<14|e>>>18)+s<<0,r+=(s^t&(e^s))+h[4]-405537848,r=(r<<20|r>>>12)+e<<0,t+=(e^s&(r^e))+h[9]+568446438,t=(t<<5|t>>>27)+r<<0,s+=(r^e&(t^r))+h[14]-1019803690,s=(s<<9|s>>>23)+t<<0,e+=(t^r&(s^t))+h[3]-187363961,e=(e<<14|e>>>18)+s<<0,r+=(s^t&(e^s))+h[8]+1163531501,r=(r<<20|r>>>12)+e<<0,t+=(e^s&(r^e))+h[13]-1444681467,t=(t<<5|t>>>27)+r<<0,s+=(r^e&(t^r))+h[2]-51403784,s=(s<<9|s>>>23)+t<<0,e+=(t^r&(s^t))+h[7]+1735328473,e=(e<<14|e>>>18)+s<<0,r+=(s^t&(e^s))+h[12]-1926607734,r=(r<<20|r>>>12)+e<<0,i=r^e,t+=(i^s)+h[5]-378558,t=(t<<4|t>>>28)+r<<0,s+=(i^t)+h[8]-2022574463,s=(s<<11|s>>>21)+t<<0,o=s^t,e+=(o^r)+h[11]+1839030562,e=(e<<16|e>>>16)+s<<0,r+=(o^e)+h[14]-35309556,r=(r<<23|r>>>9)+e<<0,i=r^e,t+=(i^s)+h[1]-1530992060,t=(t<<4|t>>>28)+r<<0,s+=(i^t)+h[4]+1272893353,s=(s<<11|s>>>21)+t<<0,o=s^t,e+=(o^r)+h[7]-155497632,e=(e<<16|e>>>16)+s<<0,r+=(o^e)+h[10]-1094730640,r=(r<<23|r>>>9)+e<<0,i=r^e,t+=(i^s)+h[13]+681279174,t=(t<<4|t>>>28)+r<<0,s+=(i^t)+h[0]-358537222,s=(s<<11|s>>>21)+t<<0,o=s^t,e+=(o^r)+h[3]-722521979,e=(e<<16|e>>>16)+s<<0,r+=(o^e)+h[6]+76029189,r=(r<<23|r>>>9)+e<<0,i=r^e,t+=(i^s)+h[9]-640364487,t=(t<<4|t>>>28)+r<<0,s+=(i^t)+h[12]-421815835,s=(s<<11|s>>>21)+t<<0,o=s^t,e+=(o^r)+h[15]+530742520,e=(e<<16|e>>>16)+s<<0,r+=(o^e)+h[2]-995338651,r=(r<<23|r>>>9)+e<<0,t+=(e^(r|~s))+h[0]-198630844,t=(t<<6|t>>>26)+r<<0,s+=(r^(t|~e))+h[7]+1126891415,s=(s<<10|s>>>22)+t<<0,e+=(t^(s|~r))+h[14]-1416354905,e=(e<<15|e>>>17)+s<<0,r+=(s^(e|~t))+h[5]-57434055,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~s))+h[12]+1700485571,t=(t<<6|t>>>26)+r<<0,s+=(r^(t|~e))+h[3]-1894986606,s=(s<<10|s>>>22)+t<<0,e+=(t^(s|~r))+h[10]-1051523,e=(e<<15|e>>>17)+s<<0,r+=(s^(e|~t))+h[1]-2054922799,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~s))+h[8]+1873313359,t=(t<<6|t>>>26)+r<<0,s+=(r^(t|~e))+h[15]-30611744,s=(s<<10|s>>>22)+t<<0,e+=(t^(s|~r))+h[6]-1560198380,e=(e<<15|e>>>17)+s<<0,r+=(s^(e|~t))+h[13]+1309151649,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~s))+h[4]-145523070,t=(t<<6|t>>>26)+r<<0,s+=(r^(t|~e))+h[11]-1120210379,s=(s<<10|s>>>22)+t<<0,e+=(t^(s|~r))+h[2]+718787259,e=(e<<15|e>>>17)+s<<0,r+=(s^(e|~t))+h[9]-343485551,r=(r<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=s+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+s<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,s=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,s=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&s,s>>8&255,s>>16&255,s>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,r,e,s="",i=this.array(),o=0;15>o;)t=i[o++],r=i[o++],e=i[o++],s+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|r>>>4)]+BASE64_ENCODE_CHAR[63&(r<<2|e>>>6)]+BASE64_ENCODE_CHAR[63&e];return t=i[o],s+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"=="};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&define(function(){return exports}))}();



/*!
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}e.exports=o},{}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}var r=t("./closest");e.exports=o},{"./closest":1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return l(document.body,t,e,n)}var c=t("./is"),l=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),e=o.toString()}return e}e.exports=o},{}],6:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],7:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if(void 0!==o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function t(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=o+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function t(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function t(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function t(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function t(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function t(){this.removeFake()}},{key:"action",set:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:5}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if(void 0!==o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var s=i(e),u=i(n),f=i(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){r(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===d(e.container)?e.container:document.body}},{key:"listenClick",value:function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})}},{key:"onClick",value:function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),container:this.container,trigger:n,emitter:this})}},{key:"defaultAction",value:function t(e){return l("action",e)}},{key:"defaultTarget",value:function t(e){var n=l("target",e);if(n)return document.querySelector(n)}},{key:"defaultText",value:function t(e){return l("text",e)}},{key:"destroy",value:function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),e}(u.default);t.exports=p})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});



var vhUnitFix = function(selectors) {
	var self = this;

	if (/(chrome|android|crios)/i.test(navigator.userAgent)) {
		this.getElements(selectors);
		this.fixAll();

		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		window.addEventListener("resize", function() {
			if (self.windowWidth !== window.innerWidth && self.windowHeight !== window.innerHeight) {
				self.windowWidth = window.innerWidth;
				self.windowHeight = window.innerHeight;
				self.fixAll();
			}
		});
	}

	self.prototype = {
		getElements: function(selectors) {
			this.elements = [];
			selectors = this.isArray(selectors) ? selectors : [selectors];

			for (var i = 0; i < selectors.length; i++) {
				var selector = selectors[i].selector;
				var elements = document.querySelectorAll(selector);

				for (var j = 0; j < elements.length; j++) {
					this.elements.push({
						domElement: elements[j],
						vh: selectors[i].vh
					});
				}
			}
		},
		isArray: function(array) {
			return Object.prototype.toString.call(array) === "[object Array]";
		},
		fixAll: function() {
			for (var i = 0; i < this.elements.length; i++) {
				var element = this.elements[i];
				element.domElement.style.height = (window.innerHeight * element.vh / 100) + "px";
			}
		}
	};
};
/*
vhUnitFix.prototype.getElements = function(selectors) {
	this.elements = [];
	selectors = this.isArray(selectors) ? selectors : [selectors];

	for (var i = 0; i < selectors.length; i++) {
		var selector = selectors[i].selector;
		var elements = document.querySelectorAll(selector);

		for (var j = 0; j < elements.length; j++) {
			this.elements.push({
				domElement: elements[j],
				vh: selectors[i].vh
			});
		}
	}
};
vhUnitFix.prototype.isArray = function(array) {
	return Object.prototype.toString.call(array) === "[object Array]";
};
vhUnitFix.prototype.fixAll = function() {
	for (var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		element.domElement.style.height = (window.innerHeight * element.vh / 100) + "px";
	}
};
*/

var options = [{
		selector: ".Bears",
		vh: 150,
	}];
// var vhUnitFix = new vhUnitFix(options);