/*!
 * ScriptName: common.js
 * Version: 0.6.5
 *
 * Scripts for SP Team
 *
 * FCV - http://foodconnection.jp/
 *
 */

$(document).ready(function () {
	var UA = navigator.userAgent;
	if (UA.indexOf("iPhone") < 0 && UA.indexOf("Android") < 0) $(".telhref").contents().unwrap(); // remove link [tel] on desktop

	// fix bg parallax on mobile
	if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
	else $(".bg-parallax").css("background-attachment", "");




	if (window.Clipboard && !/\{\s*\[native code\]\s*\}/.test("" + Clipboard)) {
		var clipboardData = new Clipboard(".copy", {
			container: $(".copy").get(0),
			text: function (trigger) {
				var _text_ = document.title + " " + location.href,
					_viewport_ = $("meta[name='viewport']").attr("content");

				if ($(trigger).attr("data-copy") && $(trigger).attr("data-copy").length > 0) _text_ = $(trigger).attr("data-copy");

				if (_viewport_ && /(?:user-scalable\s*=\s*yes)/i.test(_viewport_)) $("meta[name='viewport']").attr("content", _viewport_.replace(/(?:user-scalable\s*=\s*yes)/i, "user-scalable=no")); // disabled zoom

				if ($(trigger).attr("data-replace-text")) $(trigger).html($(trigger).attr("data-replace-text"));
				else if ($(trigger).attr("data-replace-image")) {
					if ($(trigger).children("img").length > 0) $(trigger).children("img").attr("src", $(trigger).attr("data-replace-image"));
					else $(trigger).html('<img src="' + $(trigger).attr("data-replace-image") + '" />');
				}

				$(trigger).addClass("copied");

				if (_viewport_) $("meta[name='viewport']").attr("content", _viewport_); // enabled zoom

				return _text_;
			}
		});

		clipboardData
			.on("success", function () {
				var offsetX = window.scrollX || window.pageXOffset || window.document.documentElement.scrollLeft,
					offsetY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

				// firefox jump - fixed
				setTimeout(function () {
					window.scrollTo(offsetX, offsetY);
				}, 0);
			})
			.on("error", function () {
			});


	}

	$("body")

		.on("click", ".copy", function (e) {
			e.preventDefault();

			$(this).removeAttr("data-clipboard-text");
		});


	// BEGIN: bxSlider plugin
	var $bxSlider = {},
		$bxSliderData = {};

	if ($(".bxSlider").length) {
		if ($.fn.bxSlider) {
			$(".bxSlider").each(function (i) {
				$bxSliderData[i] = {
					mode: $.inArray($(this).attr("data-mode"), ["horizontal", "vertical", "fade"]) >= 0 ? $(this).attr("data-mode") : "fade",
					auto: $.inArray($(this).attr("data-auto"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					controls: $.inArray($(this).attr("data-controls"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					randomStart: $.inArray($(this).attr("data-randomStart"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					infiniteLoop: $.inArray($(this).attr("data-infiniteLoop"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					ticker: $.inArray($(this).attr("data-ticker"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					tickerHover: $.inArray($(this).attr("data-tickerHover"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					pager: $.inArray($(this).attr("data-pager"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					pagerCustom: typeof $(this).attr("data-pagerCustom") != "undefined" && $(this).attr("data-pagerCustom").length > 0 ? $(this).attr("data-pagerCustom") : null,
					pagerSelector: typeof $(this).attr("data-pagerSeletoggle-mainctor") != "undefined" ? $(this).attr("data-pagerSelector") : null,
					useCSS: $.inArray($(this).attr("data-useCSS"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					autoHover: $.inArray($(this).attr("data-autoHover"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					preloadImages: $.inArray($(this).attr("data-preloadImages"), ["all", "visible"]) >= 0 ? $(this).attr("data-preloadImages") : "visible",
					hideControlOnEnd: $.inArray($(this).attr("data-hideControlOnEnd"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					captions: $.inArray($(this).attr("data-captions"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					clickContinue: $.inArray($(this).attr("data-clickContinue"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					speed: typeof $(this).attr("data-speed") != "undefined" ? parseInt($(this).attr("data-speed")) : 1500,
					pause: typeof $(this).attr("data-pause") != "undefined" ? parseInt($(this).attr("data-pause")) : 4000,
					slideMargin: typeof $(this).attr("data-slideMargin") != "undefined" ? parseInt($(this).attr("data-slideMargin")) : 0,
					startSlide: typeof $(this).attr("data-startSlide") != "undefined" ? parseInt($(this).attr("data-startSlide")) : 0,
					autoDelay: typeof $(this).attr("data-autoDelay") != "undefined" ? parseInt($(this).attr("data-autoDelay")) : 0,
					minSlides: typeof $(this).attr("data-minSlides") != "undefined" ? parseInt($(this).attr("data-minSlides")) : 1,
					maxSlides: typeof $(this).attr("data-maxSlides") != "undefined" ? parseInt($(this).attr("data-maxSlides")) : 1,
					moveSlides: typeof $(this).attr("data-moveSlides") != "undefined" ? parseInt($(this).attr("data-moveSlides")) : 0,
					slideWidth: typeof $(this).attr("data-slideWidth") != "undefined" ? parseInt($(this).attr("data-slideWidth")) : 0,
					autoDirection: $.inArray($(this).attr("data-autoDirection"), ["next", "prev"]) >= 0 ? $(this).attr("data-autoDirection") : "next",
					adaptiveHeight: $.inArray($(this).attr("data-adaptiveHeight"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
					adaptiveHeightSpeed: typeof $(this).attr("data-adaptiveHeightSpeed") != "undefined" ? parseInt($(this).attr("data-adaptiveHeightSpeed")) : 500,
					nextSelector: typeof $(this).attr("data-nextSelector") != "undefined" ? $(this).attr("data-nextSelector") : null,
					prevSelector: typeof $(this).attr("data-prevSelector") != "undefined" ? $(this).attr("data-prevSelector") : null,
					nextText: typeof $(this).attr("data-nextText") != "undefined" ? $(this).attr("data-nextText") : "Next",
					prevText: typeof $(this).attr("data-prevText") != "undefined" ? $(this).attr("data-prevText") : "Prev",
					easing: typeof $(this).attr("data-easing") != "undefined" ? $(this).attr("data-easing") : null
				};

				if (typeof $(this).attr("data-auto") == "undefined") $bxSliderData[i].auto = true;
				if (typeof $(this).attr("data-infiniteLoop") == "undefined") $bxSliderData[i].infiniteLoop = true;
				if (typeof $(this).attr("data-useCSS") == "undefined" && $bxSliderData[i].mode === "fade") $bxSliderData[i].useCSS = true;
				if (typeof $(this).attr("data-controls") == "undefined" && ($bxSliderData[i].pagerCustom !== null || $bxSliderData[i].pagerSelector !== null)) $bxSliderData[i].pager = true;
				if (typeof $(this).attr("data-controls") == "undefined" && ($bxSliderData[i].nextSelector !== null || $bxSliderData[i].nextSelector !== null)) $bxSliderData[i].controls = true;
				if (typeof $(this).attr("data-nextText") == "undefined" && $bxSliderData[i].nextSelector !== null) $bxSliderData[i].nextText = "";
				if (typeof $(this).attr("data-prevText") == "undefined" && $bxSliderData[i].prevSelector !== null) $bxSliderData[i].prevText = "";

				if ($bxSliderData[i].ticker === true) {
					$bxSliderData[i].mode = $.inArray($bxSliderData[i].mode, ["horizontal", "vertical"]) >= 0 ? $bxSliderData[i].mode : "horizontal";
					$bxSliderData[i].auto = false;
					$bxSliderData[i].autoStart = true;
					$bxSliderData[i].autoDelay = 0;
					$bxSliderData[i].autoHover = false;
					$bxSliderData[i].useCSS = false;
				}

				$bxSlider[i] = $(this).bxSlider({
					mode: $bxSliderData[i].mode,
					auto: $bxSliderData[i].auto,
					controls: $bxSliderData[i].controls,
					randomStart: $bxSliderData[i].randomStart,
					infiniteLoop: $bxSliderData[i].infiniteLoop,
					ticker: $bxSliderData[i].ticker,
					tickerHover: $bxSliderData[i].tickerHover,
					pager: $bxSliderData[i].pager,
					pagerCustom: $bxSliderData[i].pagerCustom,
					useCSS: $bxSliderData[i].useCSS,
					autoHover: $bxSliderData[i].autoHover,
					preloadImages: $bxSliderData[i].preloadImages,
					hideControlOnEnd: $bxSliderData[i].hideControlOnEnd,
					captions: $bxSliderData[i].captions,
					speed: $bxSliderData[i].speed,
					pause: $bxSliderData[i].pause,
					slideMargin: $bxSliderData[i].slideMargin,
					startSlide: $bxSliderData[i].startSlide,
					autoDelay: $bxSliderData[i].autoDelay,
					minSlides: $bxSliderData[i].minSlides,
					maxSlides: $bxSliderData[i].maxSlides,
					moveSlides: $bxSliderData[i].moveSlides,
					slideWidth: $bxSliderData[i].slideWidth,
					autoDirection: $bxSliderData[i].autoDirection,
					adaptiveHeight: $bxSliderData[i].adaptiveHeight,
					adaptiveHeightSpeed: $bxSliderData[i].adaptiveHeightSpeed,
					nextSelector: $bxSliderData[i].nextSelector,
					prevSelector: $bxSliderData[i].prevSelector,
					nextText: $bxSliderData[i].nextText,
					prevText: $bxSliderData[i].prevText,
					easing: $bxSliderData[i].easing,
					onSlideAfter: function ($slideElement, oldIndex, newIndex) {
						if (($bxSliderData[i].ticker !== true && $bxSliderData[i].tickerHover !== true) && $bxSliderData[i].auto !== false && $bxSliderData[i].clickContinue) {
							$bxSlider[i].stopAuto();
							$bxSlider[i].startAuto();
						}
					}
				});

				if ($(this).parents(".bxSlider-pager").length) {
					$(this).parents(".bxSlider-pager").on("mouseenter", "a[data-slide-index]", function () {
						var $idx = $(this).attr("data-slide-index");
						if ($idx != $bxSlider[i].getCurrentSlide()) $bxSlider[i].goToSlide($idx);
					});
				}
				$(window).resize(function () {
					if (!$($bxSlider[i]).hasClass("no-reload")) $bxSlider[i].reloadSlider();
				});
			});
		} else console.error("");
	}
	// END: bxSlider plugin

	// BEGIN: slide fading
	if ($(".slide-fade").length) {
		var $slideFadeTimer = {};

		$(".slide-fade").each(function () {
			if (!$(this).hasClass("stop")) {
				var $this = $(this),
					$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
					$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

				if (!$this.children(".active").length) {
					$this.children().hide();
					$this.children().eq(0).show().addClass("active");

					if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq(0).addClass("active");
				} else {
					if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq($this.children(".active").index()).addClass("active");
				}

				$slideFadeTimer[$this.index()] = setInterval(function () {
					slideFade($this, $duration);
				}, $timer);
			}
		});

		$("body").on("click", ".slide-btn > .slide-next", function () {
			var $btn = $(this),
				$this = $btn.parent().siblings(".slide-fade"),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
				clearInterval($slideFadeTimer[$this.index()]);

				$btn.addClass("clicked");

				$this.children(".active").stop().fadeOut($duration, function () {
					$(this).removeClass("active").removeAttr("style").hide();
				});

				if ($this.children(".active").next().length) {
					$this.children(".active").next().stop().fadeIn($duration, function () {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						$slideFadeTimer[$this.index()] = setInterval(function () {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				} else {
					$this.children().eq(0).stop().fadeIn($duration, function () {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						$slideFadeTimer[$this.index()] = setInterval(function () {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				}
			}
		});
		$("body").on("click", ".slide-btn > .slide-prev", function () {
			var $btn = $(this),
				$this = $btn.parent().siblings(".slide-fade"),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
				clearInterval($slideFadeTimer[$this.index()]);

				$btn.addClass("clicked");

				$this.children(".active").stop().fadeOut($duration, function () {
					$(this).removeClass("active").removeAttr("style").hide();
				});

				if ($this.children(".active").prev().length) {
					$this.children(".active").prev().stop().fadeIn($duration, function () {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						$slideFadeTimer[$this.index()] = setInterval(function () {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				} else {
					$this.children().last().stop().fadeIn($duration, function () {
						$(this).addClass("active").removeAttr("style").show();
						$btn.removeClass("clicked");

						$slideFadeTimer[$this.index()] = setInterval(function () {
							$this.siblings(".slide-btn").children(".slide-next").click();
						}, $timer);
					});
				}
			}
		});

		$("body").on("click", ".slide-page > *", function () {
			var $page = $(this).parent(),
				$idx = $(this).index(),
				$this = $(this).parents(".slideParent").length ? $(this).parents(".slideParent").find(".slide-fade") : $(this).siblings(".slide-fade"),
				$duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
				$timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

			if ($this.length) {
				if (!$page.hasClass("clicked") && !$this.hasClass("stop")) {
					if ($this.children().eq($idx).length) {
						clearInterval($slideFadeTimer[$this.index()]);

						$this.siblings(".slide-page").children(".active").removeClass("active");
						$(this).addClass("active");

						$page.addClass("clicked");

						$this.children(".active").stop().fadeOut($duration, function () {
							$(this).removeClass("active").removeAttr("style").hide();
						});

						$this.children().eq($idx).stop().fadeIn($duration, function () {
							$(this).addClass("active").removeAttr("style").show();
							$page.removeClass("clicked");

							$slideFadeTimer[$this.index()] = setInterval(function () {
								slideFade($this, $duration);
							}, $timer);
						});
					} else console.info("Slide not found");
				}
			} else console.info(".slideParent or .slide-fade not found!");
		});

		function slideFade(elm, duration) {
			elm.children(".active").stop().fadeOut(duration, function () {
				$(this).removeClass("active").removeAttr("style").hide();
			});

			if (elm.children(".active").next().length) {
				if (elm.siblings(".slide-page").length) {
					elm.siblings(".slide-page").children(".active").removeClass("active");
					elm.siblings(".slide-page").children().eq(elm.children(".active").next().index()).addClass("active");
				}

				elm.children(".active").next().stop().fadeIn(duration, function () {
					$(this).addClass("active").removeAttr("style").show();

					if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
					if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");
				});
			} else {
				if (elm.siblings(".slide-page").length) {
					elm.siblings(".slide-page").children(".active").removeClass("active");
					elm.siblings(".slide-page").children().eq(0).addClass("active");
				}

				elm.children().eq(0).stop().fadeIn(duration, function () {
					$(this).addClass("active").removeAttr("style").show();

					if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
					if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");
				});
			}
		}
	}
	// BEGIN: slide fading

	// navigation animate
	if ($(".nav-animate").length) {
		$(".nav-animate").each(function () {
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

			$(this).find("li").mouseover(function () {
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
			}).mouseleave(function () {
				var $span = $(this).parents(".nav-animate").children("span");

				if ($navNull) {
					clearTimeout($timerNav);
					$timerNav = setTimeout(function () {
						console.log($navPosX);
						$span.stop().fadeOut(100, function () {
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
	if ($(".toggle").length) {
		$toggleDuration = 500;
		$(".toggle").each(function () {
			if (typeof $(this).attr("data-duration") != "undefined") {
				if ($.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0) $toggleDuration = $(this).attr("data-duration");
				else $toggleDuration = parseInt($(this).attr("data-duration"));
			}
		});

		$(".toggle-link").click(function () {
			var idx = false;
			if ($(this).parents(".bxSlider").length) {
				idx = $(".bxSlider").index($(this).parents(".bxSlider"));
				$bxSlider[idx].stopAuto();
			}

			if ($(this).parents(".toggle").hasClass("active")) {
				$(this).siblings(".toggle-main").stop().slideUp($toggleDuration, function () {
					$(this).removeAttr("style");
					$(this).parents(".toggle").removeClass("active");

					if (idx !== false) {
						$bxSliderData[idx].startSlide = $bxSlider[idx].getCurrentSlide();
						$bxSlider[idx].reloadSlider($bxSliderData[idx]);
						$bxSlider[idx].startAuto();
					}
				});
			} else {
				$(this).siblings(".toggle-main").stop().slideDown($toggleDuration, function () {
					$(this).removeAttr("style");
					$(this).parents(".toggle").addClass("active");

					if (idx !== false) {
						$bxSliderData[idx].startSlide = $bxSlider[idx].getCurrentSlide();
						$bxSlider[idx].reloadSlider($bxSliderData[idx]);
						$bxSlider[idx].startAuto();
					}

					// if ($(this).find("[class*=heightLine]").length) heightLine();
				});

				if ($(this).siblings(".toggle-main").find("[class*=heightLine]").length) heightLine();
			}
		})
	}
	// END: toggle

	// BEGIN: tabs - switch
	if ($(".tabs-switch").length) {
		$(".tabs-switch").each(function () {
			var $tabsSwith = $(this),
				$tabLink = $tabsSwith.find(".tab-link"),
				$tabContent = $tabsSwith.find(".tab-content");

			$tabLink.children().each(function () {
				if ($(this).find("img").length && !$(this).find("img").hasClass("over") && !$(this).find("img").hasClass("non-over")) {
					$(this).data("src", $(this).find("img").attr("src"));

					$(this).find("img").attr("src").match(/^(.*)(\.{1}.*)/g);
					$(this).data("active", RegExp.$1 + "_on" + RegExp.$2);
				}
			});

			$tabContent.children().hide();

			$tabLink.each(function () {
				// TODO: active by [data-active]
				if (location.hash) {
					if ($(this).children("[data-tab-anchor='" + location.hash + "']").length) $(this).children("[data-tab-anchor='" + location.hash + "']").addClass("active");
					else $(this).children().first().addClass("active");
				} else if (!$(this).children(".active").length) $(this).children().first().addClass("active");

				$(this).children(".active").find("img").attr("src", $(this).children(".active").data("active"));
			});

			$tabContent.children().eq($tabLink.children(".active").index()).show();
		});

		$("body").on("click", ".tab-link > *", function () {
			var $this = $(this),
				$idx = $this.index(),
				$act = $this.parent().children(".active"),
				$tabMode = $.inArray($this.parents(".tabs-switch").attr("data"), ["fade", "slide", "block"]) >= 0 ? $this.parents(".tabs-switch").attr("data") : "block",
				$tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 300,
				$tabContent = $this.parents(".tabs-switch").children(".tab-content"),
				$tabIdx = $this.attr("data-active") ? $this.attr("data-active") : false,
				$autoScroll = $.inArray($this.parents(".tabs-switch").attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false;

			if ($tabIdx) {
				$this.parents(".tabs-switch").find(".tab-link").each(function () {
					var $tabBtn = $(this).children("[data-active='" + $tabIdx + "']");

					$(this).children(".active").find("img").attr("src", $(this).children(".active").data("src"));
					$(this).children(".active").removeClass("active");

					$tabBtn.addClass("active");
					if (!$tabBtn.find("img").hasClass("active")) $tabBtn.find("img").attr("src", $tabBtn.data("active"));
				});
			} else {
				$act.find("img").attr("src", $act.data("src"));
				$act.removeClass("active");
				$this.addClass("active");
				if (!$this.find("img").hasClass("active")) $this.find("img").attr("src", $this.data("active"));
			}

			if (!$this.parents(".tab-link").hasClass("clicked")) {
				if ($tabMode == "fade") {
					$tabContent.css({
						minHeight: $tabContent.outerHeight()
					});

					$tabContent.children().stop().fadeOut($tabDuration, function () {
						$(this).removeAttr("style").hide();
					});
					$tabContent.children().eq($idx).stop().delay($tabDuration).fadeIn($tabDuration, function () {
						$(this).removeAttr("style").show();

						if ($(this).find("[class*=heightLine]").length) heightLine();

						if ($this.children("a").length) $this.children("a").click();

						$tabContent.css({
							minHeight: ""
						});

						$this.parents(".tab-link").removeClass("clicked");
					});
				} else if ($tabMode == "slide") {
					$tabContent.children().stop().slideUp($tabDuration, function () {
						$(this).removeAttr("style").hide();
					}).siblings().eq($idx).stop().slideDown($tabDuration, function () {
						$(this).removeAttr("style").show();

						if ($(this).find("[class*=heightLine]").length) heightLine();

						if ($this.children("a").length) $this.children("a").click();

						$this.parents(".tab-link").removeClass("clicked");
					});
				} else {
					$tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 0;

					$tabContent.children().stop().hide($tabDuration, function () {
						$(this).removeAttr("style").hide();
					}).siblings().eq($idx).stop().show($tabDuration, function () {
						$(this).removeAttr("style").show();

						if ($(this).find("[class*=heightLine]").length) heightLine();

						if ($this.children("a").length) $this.children("a").click();

						$this.parents(".tab-link").removeClass("clicked");
					});
				}

				setTimeout(function () {
					$(window).trigger("resize");
				}, $tabDuration + 10);

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
			//			$this.parents(".tab-link").addClass("clicked");
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
						rssCallbacks = typeof rssData.done === "function" ? rssData.done : function () { };

					var $rssLoop = $(rssData.elm).feed({
						Path: typeof rssData.url != "undefined" ? rssData.url : "shared/rss/rss.php", //rss.phpの場所。階層が変わる時のみ変更。
						key: rssData.key, //RSSのURL。
						indention: typeof rssData.indention != "undefined" ? rssData.indention : false, //本文のソースを表示するかどうか
						MAX: typeof rssData.max != "undefined" ? rssData.max : 3, //記事の最大数。
						titleMax: typeof rssData.titleMax != "undefined" ? rssData.titleMax : 10, //タイトルの最大文字数。
						postMax: typeof rssData.postMax != "undefined" ? rssData.postMax : 50, //本文の最大文字数。
						endtext: typeof rssData.endText != "undefined" ? rssData.endText : "...", //最大文字数を超えた後に追加するテキスト。
						Datetype: rssData.dateFormat, //日付の形式　例)○○年○○月○○日
						Image: typeof rssData.image != "undefined" ? (rssData.image === true ? "yes" : rssData.image) : "no", //画像付きの記事かどうか　yes、もしくはnoで。
						ImageSize: rssData.imageSize, //表示する画像のサイズ　width=横幅　height="縦幅"
						noImage: typeof rssData.noImage != "undefined" ? (rssData.noImage === true ? "yes" : rssData.noImage) : "no", //No-image画像が必要かどうか　yes、もしくはnoで。
						noImage_src: typeof rssData.noImageSRC != "undefined" ? rssData.noImageSRC : "shared/img/index/no_image.jpg", //No-image画像のパス。
						source: function (LINK, TITLE, DATE, POST, IMAGE, CATEGORY, AUTHOR, COUNT) {
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

					style: false,

					name: false,
					desc: false,
					tel: false,
					email: false,

					url: false,
					logo: false,

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

				if (typeof data.clickable != "undefined" && data.clickable != "") dataMap.clickable = data.clickable;
				if (typeof data.html != "undefined" && data.html != "") dataMap.html = data.html;
				if (typeof data.hover != "undefined" && typeof data.hover == "boolean") dataMap.hover = data.hover;

				if (typeof data.multi != "undefined" && Object.keys(data.multi).length > 0) dataMap.multi = data.multi;

				if (typeof data.style != "undefined") {
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

						if (typeof obj.style != "undefined") {
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
						} else {
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

						setMaps(arr, googleMap, data.center);
					}
				}

				// stylers
				if (data.style !== false) {
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

				if (typeof obj["logo"] != "undefined") options["icon"] = new google.maps.MarkerImage(obj["logo"]);

				options["position"] = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
				options["map"] = map;

				var marker = new google.maps.Marker(options);

				if (obj["html"] !== false) {
					var dialog = new google.maps.InfoWindow(),
						infoWindowVisible = (function () {
							var currentlyVisible = false;
							return function (visible) {
								if (visible !== undefined) currentlyVisible = visible;
								return currentlyVisible;
							};
						}()),
						dialogShow = (function () {
							return function () {
								if (infoWindowVisible()) {
									dialog.close();
									infoWindowVisible(false);
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

									dialog = new google.maps.InfoWindow({
										content: html
									});
									dialog.open(map, marker);
									infoWindowVisible(true);
								}
							};
						}());

					// events
					google.maps.event.addListener(marker, "click", function () {
						if (obj["clickable"] == "link" && typeof obj["url"] != "undefined" && obj["url"] != "") {
							if (!isExternal(obj["url"]) && $(obj["url"]).length) {
								$("html, body").stop().animate({
									scrollTop: $(obj["url"]).offset().top
								}, 500);
							} else window.open(obj["url"], "_parent");
						} else if (obj["clickable"] == "popup" && isHTML(obj.html)) dialogShow();
					});
					google.maps.event.addListener(dialog, "closeclick", function () {
						infoWindowVisible(false);
					});

					if (obj["hover"] === true && obj["clickable"] == "link") {
						google.maps.event.addListener(marker, "mouseover", function () {
							dialogShow();
						});
						google.maps.event.addListener(marker, "mouseout", function () {
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
				google.maps.event.addDomListener(window, "resize", function () {
					var center = map.getCenter();
					google.maps.event.trigger(map, "resize");
					// map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
					map.setCenter(center);
				});

				google.maps.event.addListenerOnce(map, "idle", function () {
					google.maps.event.trigger(map, "resize");
					map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
				});

				// google.maps.event.trigger(map, "resize"); // onload
			}
		}
		google.maps.event.addDomListener(window, "load", init);
	}
	// END: gmap

	// BEGIN: rollover button
	$("body").on({
		mouseover: function () {
			if (!$(this).data("src-original")) $(this).data("src-original", $(this).attr("src"));

			$(this).attr("src").match(/^(.*)(\.{1}.*)/g);

			var $src = RegExp.$1 + "_on" + RegExp.$2;

			$(this).attr("src", $src); // update src
		}, mouseout: function () {
			if ($(this).data("src-original")) {
				$(this).attr("src", $(this).data("src-original")); // update src
				$(this).removeData("src-original")
			}
		}
	}, "img.btn");
	// END: rollover button



	// BEGIN: scroll to top
	if ($(window).scrollTop() > 0) $("#pagetop").addClass("visible");
	else $("#pagetop").removeClass("visible");

	$("body").on("click", "#pagetop", function () {
		if (!$(this).hasClass("in-scroll")) {
			$(this).addClass("in-scroll");

			var $scrollDuration = $.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0 || parseInt($(this).attr("data-duration")) > 0 ? $(this).attr("data-duration") : "slow";

			$("html, body").stop().animate({
				scrollTop: 0
			}, $scrollDuration, function () {
				$("#pagetop").removeClass("in-scroll");
			});
		}
	});
	// END: scroll to top

	// BEGIN: text vertical
	$(".txt-vertical").each(function () {
		if (!$(this).hasClass("all-str")) {
			var $regex = /(\d{1,1})/g;

			if ($(this).hasClass("per-line")) $regex = /(\d)/g;

			$(this).html(function (idx, val) {
				return val.replace($regex, '<span class="int">$1</span>');
			});
		}

		if ($(this).children(".txt-normal").length) {
			$(this).children(".txt-normal").html(function (idx, val) {
				var $characters = $.trim(val).split("");
				return '<span class="int">' + $characters.join('</span><span class="int">') + '</span>';
			});
		}
	});
	$(".txt-vertical-x").each(function () {
		$(this).html($(this).text().replace(/(.)/g, "<span>$1</span>"));
	});
	// END: text vertical

	// BEGIN: social button
	var __socialsHTML__ = "",
		__socialsLang = $("html").attr("lang") !== undefined && $.trim($("html").attr("lang")).length == 2 ? $.trim($("html").attr("lang")).toLowerCase() : "ja",
		$socialsLine = "",
		$socialsTwitter = "",
		$socialsFacebook = "",
		locationURL = window.location.href || location.href;

	$socialsTwitter += '<div class="twitter">';
	$socialsTwitter += '<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>';
	$socialsTwitter += '<script type="text/javascript">!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
	$socialsTwitter += '</div>';

	$socialsFacebook += '<div class="facebook">';
	$socialsFacebook += '<div class="fb-like" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>';
	$socialsFacebook += '</div>';

	$socialsLine += '<div class="line-social">';
	$socialsLine += '<div class="line-it-button" data-lang="' + __socialsLang + '" data-type="like" data-url="' + locationURL + '" style="display: none;">';
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
					else if ($socialsOrder[socialsType].toLocaleLowerCase() === "l") __socialsHTML__ += $socialsLine;
				}
			}
		} else {
			__socialsHTML__ += $socialsTwitter;
			__socialsHTML__ += $socialsFacebook;
			__socialsHTML__ += $socialsLine;
		}

		$("#socialbuttons").html(__socialsHTML__);
	}
	// END: social button

	/* fix smoothscroll on IE */
	if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
		$("body").on("mousewheel", function (e) {
			event.preventDefault();
			window.scrollTo(0, window.pageYOffset - event.wheelDelta);
		});
	}

	// scrollBefore(); // smoothscroll before page loaded

	$("body").on({
		mouseup: function () {
			$(this).removeClass("scrollable");
		}, mousedown: function () {
			$(this).addClass("scrollable");
		}, mouseleave: function () {
			$(this).removeClass("scrollable");
		}
	}, ".gmap");
});

// user agents
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

$(window).resize(function () {
	// fix bg parallax on mobile
	if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
	else $(".bg-parallax").css("background-attachment", "");
}).on("scroll resize", function () {
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
}).on("load", function () {
	// scrollBefore();
});

var scrollBefore = function () {
	if (location.hash) {
		var ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g,
			hash = location.hash;

		hash = hash.replace(ptnHash, "\\$1");
		if ($(hash).length) {
			if ($(".nav-fixed").length) {
				var $offsetY = $(hash).offset().top;

				// if ($(".nav-pin").length) $offsetY -= $(".nav-pin").outerHeight();
				$offsetY -= $(".nav-fixed").outerHeight();

				setTimeout(function () {
					window.scroll(0, $offsetY);
				}, 10);

				$("a[href=" + hash + "]").click();
			}
		}
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

(function ($) {
	// BEGIN: $.feed
	$.fn.feed = function (option, callbacks) {
		var option = $.extend({
			Path: "",
			BOX: $(this),
			key: 0,
			MAX: 5,
			titleMax: 40,
			postMax: 100,
			endtext: "...",
			indention: "no",
			Datetype: { year: "年", month: "月", date: "日" },
			Image: "no",
			ImageSize: { width: "200", height: "150" }, //表示する画像のサイズ
			noImage: "no",
			noImage_src: "shared/img/shared/no_image.jpg",
			source: "",
			done: false
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
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus + ": " + errorThrown);

				return false;
			}, success: function (data) {
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
				$(data).find("item").each(function () {
					var title = $("title", this).text(), //タイトル
						link = $("link", this).text(), //リンク先
						category = $("category", this).text(), // FCV - added
						author = $("dc\\:creator", this).text(), // FCV - added
						ex = $("description", this).text(); //注釈文章

					//本文のソースを表示するかどうか
					if (option.indention === "yes") ex = $('content\\:encoded', this).text();

					//スペースを削除
					ex.replace(/\s+/g, "");
					ex.replace(" ", "");

					//タイトルが1行に収まらない場合、調整
					if (title.length > option.titleMax) {
						var rename = title.substring(0, option.titleMax - 1) + option.endtext;
						title = rename;
					}

					//本文の調整
					if (ex.length > option.postMax) {
						var retxt = ex.substring(0, option.postMax - 1) + option.endtext;
						ex = retxt;
					}

					//日付取得
					// ISO date string - regex
					// ^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$
					var pubDate = $("pubDate", this).text().length > 0 ? true : false,
						Datetxt = pubDate ? $("pubDate", this).text() : $("dc\\:date", this).text(),
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
					if (option.Image !== "no") {

						ss = $(this).find('[nodeName="content:encoded"]').context.textContent;
						html = $.parseHTML(ss);

						imgTbl.length = 0;


						var AllImage = $(html).find("img");

						for (i = 0, Max = AllImage.length; i < Max; i++) {
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
					if (!title.match("PR")) {
						var postdata = option.source,
							post = postdata(link, title, date, ex, img, category, author, cnt); // FCV - modified

						$(option.BOX.selector).append(post);
					}

					//終了フラグ
					cnt++;
					if (cnt > (option.MAX - 1)) return false;
				});
			}
		}).done(function () {
			if (typeof callbacks === "function") callbacks.call(this);
		});
	};
	// END: $.feed

	// BEGIN: $.fcvScroll
	$.fn.fcvScroll = function (options) {
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

			$wrapper.find(options.selector).each(function (i) {
				$offsetSelectors.push($(this).offset().top); // offsetY fined
			});

			$(window).scroll(function () {
				$scrollDown = $(window).scrollTop() >= $scrollPos;
				$scrollPos = $(window).scrollTop();

				clearTimeout($scrollTimer);

				if ($.inArray($(window).scrollTop(), $offsetSelectors) < 0) { // not in area fined
					$scrollTimer = setTimeout(function () { // fcv-snap
						var $scrollTop = $(window).scrollTop(),
							$posY = $(window).height() * options.reference,
							$position = 0,
							$target;

						if ($scrollDown) { // direction down
							$position = $scrollTop + $posY - 1;
							$wrapper.find(options.selector).each(function () {
								var $offsetY = $(this).offset().top;
								if (($offsetY > $scrollTop) && ($offsetY <= $position)) {
									$target = $(this);
									return false;
								}
							});
						} else { // direction up
							$position = $scrollTop - $posY + 1;
							$wrapper.find(options.selector).each(function () {
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
							}, options.duration, function () {
								clearTimeout($scrollTimer);
							});
						}
					}, options.delay);
				}
			}).resize(function () {
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

	// END: $.toggle 
	$('.box-tg01').hide();
	$('.btn-tg01').click(function () {
		var active = $(this).attr("role");
		if ($(this).hasClass('close')) {
			$('.box-tg01').slideUp(500);
			$('.btn-tg01').removeClass('open').addClass('close');
			$(this).removeClass('close').addClass('open');
			$("#" + active).stop(1, 1).delay(100).slideDown(500);
		}
		else {
			$("#" + active).slideUp(500);
			$('.btn-tg01').removeClass('open').addClass('close');
		}
	});

	// END: $.toggle


})(jQuery);

// BEGIN: heightLine
function heightLine() {

	this.className = "heightLine";
	this.parentClassName = "heightLineParent"
	reg = new RegExp(this.className + "-([a-zA-Z0-9-_]+)", "i");
	objCN = new Array();
	var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
	for (var i = 0; i < objAll.length; i++) {
		if (typeof objAll[i].className == "string") {
			var eltClass = objAll[i].className.split(/\s+/);
			for (var j = 0; j < eltClass.length; j++) {
				if (eltClass[j] == this.className) {
					if (!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				} else if (eltClass[j] == this.parentClassName) {
					if (!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				} else if (eltClass[j].match(reg)) {
					var OCN = eltClass[j].match(reg)
					if (!objCN[OCN]) objCN[OCN] = new Array();
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
	e.style.classname = "check-fontsize";
	e.style.visibility = "hidden";
	e.style.position = "absolute";
	e.style.top = "0";
	document.body.appendChild(e);
	var defHeight = e.offsetHeight;

	changeBoxSize = function () {
		for (var key in objCN) {
			if (objCN.hasOwnProperty(key)) {
				//parent type
				if (key == "parent CN") {
					for (var i = 0; i < objCN[key].length; i++) {
						var max_height = 0;
						var CCN = objCN[key][i].childNodes;
						for (var j = 0; j < CCN.length; j++) {
							if (CCN[j] && CCN[j].nodeType == 1) {
								CCN[j].style.height = "auto";
								max_height = max_height > CCN[j].offsetHeight ? max_height : CCN[j].offsetHeight;
							}
						}
						for (var j = 0; j < CCN.length; j++) {
							if (CCN[j].style) {
								var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
								var newheight = max_height;
								if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
								if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
								if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "");
								if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
								CCN[j].style.height = newheight + "px";
							}
						}
					}
				} else {
					var max_height = 0;
					for (var i = 0; i < objCN[key].length; i++) {
						objCN[key][i].style.height = "auto";
						max_height = max_height > objCN[key][i].offsetHeight ? max_height : objCN[key][i].offsetHeight;
					}
					for (var i = 0; i < objCN[key].length; i++) {
						if (objCN[key][i].style) {
							var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
							var newheight = max_height;
							if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
							if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
							if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "")
							if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
							objCN[key][i].style.height = newheight + "px";
						}
					}
				}
			}
		}
	}

	checkBoxSize = function () {
		if (defHeight != e.offsetHeight) {
			changeBoxSize();
			defHeight = e.offsetHeight;
		}

		// var elm = document.querySelector(".check-fontsize");
		// if (elm) elm.parentNode.removeChild(elm);
	}
	changeBoxSize();
	setInterval(checkBoxSize, 1000)
	window.onresize = changeBoxSize;
}

function addEvent(elm, listener, fn) {
	try {
		elm.addEventListener(listener, fn, false);
	} catch (e) {
		elm.attachEvent("on" + listener, fn);
	}
}
addEvent(window, "load", heightLine);
// END: heightLine

(function () { // DOM loaded
	// facebook
	if (document.getElementById("fb-root")) {
		var fbScript = document.createElement("script"),
			fbScriptContent = "";

		fbScriptContent += '(function(d, s, id) {';
		fbScriptContent += 'var js, fjs = d.getElementsByTagName(s)[0];';
		fbScriptContent += 'if (d.getElementById(id)) return;';
		fbScriptContent += 'js = d.createElement(s);';
		fbScriptContent += 'js.id = id;';
		fbScriptContent += 'js.src = "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.12";';
		fbScriptContent += 'fjs.parentNode.insertBefore(js, fjs);';
		fbScriptContent += '}(document, "script", "facebook-jssdk"));';

		fbScript.innerHTML = fbScriptContent;
		document.body.appendChild(fbScript);
	}

	// WOW js
	if (typeof window["WOW"] === "function") {
		var $wowData = {
			box: typeof $("body").attr("data-wow-box") != "undefined" ? $("body").attr("data-wow-box") : "wow",
			animate: typeof $("body").attr("data-wow-animate") != "undefined" ? $("body").attr("data-wow-animate") : "animated",
			offset: typeof $("body").attr("data-wow-offset") != "undefined" ? parseInt($("body").attr("data-wow-offset")) : 0,
			mobile: $.inArray($("body").attr("data-wow-mobile"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
			live: $.inArray($("body").attr("data-wow-live"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false,
			callback: function () { },
			scrollContainer: null
		};

		if (typeof $("body").attr("data-wow-offset") == "undefined") $wowData.mobile = true;
		if (typeof $("body").attr("data-wow-live") == "undefined") $wowData.live = true;

		new WOW($wowData).init();
	}
})();

// conflicts
if (!Object.keys) {
	Object.keys = (function () {
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

		return function (obj) {
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

$(function () {
	if ($("#menu_toggle").hasClass("nav-style01")) {
		$('body').removeClass('navOpen');
		$(".navBtn").click(function () {
			if ($('body').hasClass('navOpen')) {
				$('body').addClass('navClose');
				$('body').removeClass('navOpen');
			} else {
				$('body').addClass('navOpen');
				$('body').removeClass('navClose');
			}
		});

		$(".close_btn,#menu_toggle a").click(function () {
			$('body').removeClass('navOpen');
			$('body').addClass('navClose');
			if ($("+div", this).css("display") == "none") {
				$("+div", this).hide();
			}
		});
	}
	else {
		$('body').removeClass('navOpen');
		$(".navBtn").click(function () {
			if ($('body').hasClass('navOpen')) {
				$('body').addClass('navClose');
				$('body').removeClass('navOpen');
				$(".menu_toggle").slideToggle();
			} else {
				$('body').addClass('navOpen');
				$('body').removeClass('navClose');
				$(".menu_toggle").slideToggle();
			}
		});

		$(".close_btn,#menu_toggle a").click(function () {
			$('body').removeClass('navOpen');
			$(".menu_toggle").slideToggle();
			if ($("+div", this).css("display") == "none") {
				$("+div", this).hide();
			}
		});
	}
});


function isHTML(str) {
	var a = document.createElement("div");
	a.innerHTML = str;
	for (var child = a.childNodes, i = child.length; i--;) {
		if (child[i].nodeType == 1) return true;
	}
	return false;
}

var checkDomain = function (url) {
	if (url.indexOf('//') === 0) url = location.protocol + url;
	return url.toLowerCase().replace(/([a-z])?:\/\//, "$1").split("/")[0];
};
var isExternal = function (url) {
	return ((url.indexOf(":") > -1 || url.indexOf("//") > -1) && checkDomain(location.href) !== checkDomain(url));
};

var Cookie = function () {
};
Cookie.prototype.set = function (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
Cookie.prototype.get = function (cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
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


	/**
	 * BxSlider v4.1.2 - Fully loaded, responsive content slider
	 * http://bxslider.com
	 *
	 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
	 * Written while drinking Belgian ales and listening to jazz
	 *
	 * Released under the MIT license - http://opensource.org/licenses/MIT
	 */

	; (function ($) {

		var plugin = {};

		var defaults = {

			// GENERAL
			mode: 'horizontal',
			slideSelector: '',
			infiniteLoop: true,
			hideControlOnEnd: false,
			speed: 1500,
			easing: null,
			slideMargin: 0,
			startSlide: 0,
			randomStart: false,
			captions: false,
			ticker: false,
			tickerHover: false,
			adaptiveHeight: false,
			adaptiveHeightSpeed: 500,
			video: false,
			useCSS: true,
			preloadImages: 'visible',
			responsive: true,
			slideZIndex: 50,
			wrapperClass: 'bx-wrapper',

			// TOUCH
			touchEnabled: true,
			swipeThreshold: 50,
			oneToOneTouch: true,
			preventDefaultSwipeX: true,
			preventDefaultSwipeY: false,

			// PAGER
			pager: true,
			pagerType: 'full',
			pagerShortSeparator: ' / ',
			pagerSelector: null,
			buildPager: null,
			pagerCustom: null,

			// CONTROLS
			controls: true,
			nextText: 'Next',
			prevText: 'Prev',
			nextSelector: null,
			prevSelector: null,
			autoControls: false,
			startText: 'Start',
			stopText: 'Stop',
			autoControlsCombine: false,
			autoControlsSelector: null,

			// AUTO
			auto: false,
			pause: 4000,
			autoStart: true,
			autoDirection: 'next',
			autoHover: false,
			autoDelay: 0,
			autoSlideForOnePage: false,

			// CAROUSEL
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 0,
			slideWidth: 0,

			// CALLBACKS
			onSliderLoad: function () { },
			onSlideBefore: function () { },
			onSlideAfter: function () { },
			onSlideNext: function () { },
			onSlidePrev: function () { },
			onSliderResize: function () { }
		}

		$.fn.bxSlider = function (options) {

			if (this.length == 0) return this;

			// support mutltiple elements
			if (this.length > 1) {
				this.each(function () { $(this).bxSlider(options) });
				return this;
			}

			// create a namespace to be used throughout the plugin
			var slider = {};
			// set a reference to our slider element
			var el = this;
			plugin.el = this;

			/**
			 * Makes slideshow responsive
			 */
			// first get the original window dimens (thanks alot IE)
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();



			/**
			 * ===================================================================================
			 * = PRIVATE FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Initializes namespace settings to be used throughout plugin
			 */
			var init = function () {
				// merge user-supplied options with the defaults
				slider.settings = $.extend({}, defaults, options);
				// parse slideWidth setting
				slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
				// store the original children
				slider.children = el.children(slider.settings.slideSelector);
				// check if actual number of slides is less than minSlides / maxSlides
				if (slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
				if (slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
				// if random start, set the startSlide setting to random number
				if (slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
				// store active slide information
				slider.active = { index: slider.settings.startSlide }
				// store if the slider is in carousel mode (displaying / moving multiple slides)
				slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
				// if carousel, force preloadImages = 'all'
				if (slider.carousel) slider.settings.preloadImages = 'all';
				// calculate the min / max width thresholds based on min / max number of slides
				// used to setup and update carousel slides dimensions
				slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
				slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				// store the current state of the slider (if currently animating, working is true)
				slider.working = false;
				// initialize the controls object
				slider.controls = {};
				// initialize an auto interval
				slider.interval = null;
				// determine which property to use for transitions
				slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
				// determine if hardware acceleration can be used
				slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function () {
					// create our test div element
					var div = document.createElement('div');
					// css transition properties
					var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
					// test for each property
					for (var i in props) {
						if (div.style[props[i]] !== undefined) {
							slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
							slider.animProp = '-' + slider.cssPrefix + '-transform';
							return true;
						}
					}
					return false;
				}());
				// if vertical mode always make maxSlides and minSlides equal
				if (slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
				// save original style data
				el.data("origStyle", el.attr("style"));
				el.children(slider.settings.slideSelector).each(function () {
					$(this).data("origStyle", $(this).attr("style"));
				});
				// perform all DOM / CSS modifications
				setup();
			}

			/**
			 * Performs all DOM and CSS modifications
			 */
			var setup = function () {
				// wrap el in a wrapper
				el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
				// store a namspace reference to .bx-viewport
				slider.viewport = el.parent();
				// add a loading div to display while images are loading
				slider.loader = $('<div class="bx-loading" />');
				slider.viewport.prepend(slider.loader);
				// set el to a massive width, to hold any needed slides
				// also strip any margin and padding from el
				el.css({
					width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
					position: 'relative'
				});
				// if using CSS, add the easing property
				if (slider.usingCSS && slider.settings.easing) {
					el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
					// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
				} else if (!slider.settings.easing) {
					slider.settings.easing = 'swing';
				}
				var slidesShowing = getNumberSlidesShowing();
				// make modifications to the viewport (.bx-viewport)
				slider.viewport.css({
					width: '100%',
					overflow: 'hidden',
					position: 'relative'
				});
				slider.viewport.parent().css({
					maxWidth: getViewportMaxWidth()

				});
				// make modification to the wrapper (.bx-wrapper)
				if (!slider.settings.pager) {
					slider.viewport.parent().css({
						margin: '0 auto 0px'
					});
				}
				// apply css to all slider children
				slider.children.css({
					'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
					listStyle: 'none',
					position: 'relative'
				});
				// apply the calculated width after the float is applied to prevent scrollbar interference
				slider.children.css('width', getSlideWidth());
				// if slideMargin is supplied, add the css
				if (slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
				if (slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
				// if "fade" mode, add positioning and z-index CSS
				if (slider.settings.mode == 'fade') {
					slider.children.css({
						position: 'absolute',
						zIndex: 0,
						display: 'none'
					});
					// prepare the z-index on the showing element
					slider.children.eq(slider.settings.startSlide).css({ zIndex: slider.settings.slideZIndex, display: 'block' });
				}
				// create an element to contain all slider controls (pager, start / stop, etc)
				slider.controls.el = $('<div class="bx-controls" />');
				// if captions are requested, add them
				if (slider.settings.captions) appendCaptions();
				// check if startSlide is last slide
				slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
				// if video is true, set up the fitVids plugin
				if (slider.settings.video) el.fitVids();
				// set the default preload selector (visible)
				var preloadSelector = slider.children.eq(slider.settings.startSlide);
				if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
				// only check for control addition if not in "ticker" mode
				if (!slider.settings.ticker) {
					// if pager is requested, add it
					if (slider.settings.pager) appendPager();
					// if controls are requested, add them
					if (slider.settings.controls) appendControls();
					// if auto is true, and auto controls are requested, add them
					if (slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
					// if any control option is requested, add the controls wrapper
					if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
					// if ticker mode, do not allow a pager
				} else {
					slider.settings.pager = false;
				}
				// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
				loadElements(preloadSelector, start);
			}

			var loadElements = function (selector, callback) {
				var total = selector.find('img, iframe').length;
				if (total == 0) {
					callback();
					return;
				}
				var count = 0;
				selector.find('img, iframe').each(function () {
					$(this).one('load', function () {
						if (++count == total) callback();
					}).each(function () {
						if (this.complete) $(this).load();
					});
				});
			}

			/**
			 * Start the slider
			 */
			var start = function () {
				// if infinite loop, prepare additional slides
				if (slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker) {
					var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
					var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
					var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
					el.append(sliceAppend).prepend(slicePrepend);
				}
				// remove the loading DOM element
				slider.loader.remove();
				// set the left / top position of "el"
				setSlidePosition();
				// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
				if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
				// set the viewport height
				slider.viewport.height(getViewportHeight());
				// make sure everything is positioned just right (same as a window resize)
				el.redrawSlider();
				// onSliderLoad callback
				slider.settings.onSliderLoad(slider.active.index);
				// slider has been fully initialized
				slider.initialized = true;
				// bind the resize call to the window
				if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
				// if auto is true and has more than 1 page, start the show
				if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
				// if ticker is true, start the ticker
				if (slider.settings.ticker) initTicker();
				// if pager is requested, make the appropriate pager link active
				if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
				// check for any updates to the controls (like hideControlOnEnd updates)
				if (slider.settings.controls) updateDirectionControls();
				// if touchEnabled is true, setup the touch events
				if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
			}

			/**
			 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
			 */
			var getViewportHeight = function () {
				var height = 0;
				// first determine which children (slides) should be used in our height calculation
				var children = $();
				// if mode is not "vertical" and adaptiveHeight is false, include all children
				if (slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight) {
					children = slider.children;
				} else {
					// if not carousel, return the single active child
					if (!slider.carousel) {
						children = slider.children.eq(slider.active.index);
						// if carousel, return a slice of children
					} else {
						// get the individual slide index
						var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
						// add the current slide to the children
						children = slider.children.eq(currentIndex);
						// cycle through the remaining "showing" slides
						for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
							// if looped back to the start
							if (currentIndex + i >= slider.children.length) {
								children = children.add(slider.children.eq(i - 1));
							} else {
								children = children.add(slider.children.eq(currentIndex + i));
							}
						}
					}
				}
				// if "vertical" mode, calculate the sum of the heights of the children
				if (slider.settings.mode == 'vertical') {
					children.each(function (index) {
						height += $(this).outerHeight();
					});
					// add user-supplied margins
					if (slider.settings.slideMargin > 0) {
						height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
					}
					// if not "vertical" mode, calculate the max height of the children
				} else {
					height = Math.max.apply(Math, children.map(function () {
						return $(this).outerHeight(false);
					}).get());
				}

				if (slider.viewport.css('box-sizing') == 'border-box') {
					height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
						parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
				} else if (slider.viewport.css('box-sizing') == 'padding-box') {
					height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
				}

				return height;
			}

			/**
			 * Returns the calculated width to be used for the outer wrapper / viewport
			 */
			var getViewportMaxWidth = function () {
				var width = '100%';
				if (slider.settings.slideWidth > 0) {
					if (slider.settings.mode == 'horizontal') {
						width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
					} else {
						width = slider.settings.slideWidth;
					}
				}
				return width;
			}

			/**
			 * Returns the calculated width to be applied to each slide
			 */
			var getSlideWidth = function () {
				// start with any user-supplied slide width
				var newElWidth = slider.settings.slideWidth;
				// get the current viewport width
				var wrapWidth = slider.viewport.width();
				// if slide width was not supplied, or is larger than the viewport use the viewport width
				if (slider.settings.slideWidth == 0 ||
					(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
					slider.settings.mode == 'vertical') {
					newElWidth = wrapWidth;
					// if carousel, use the thresholds to determine the width
				} else if (slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal') {
					if (wrapWidth > slider.maxThreshold) {
						// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
					} else if (wrapWidth < slider.minThreshold) {
						newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
					}
				}
				return newElWidth;
			}

			/**
			 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
			 */
			var getNumberSlidesShowing = function () {
				var slidesShowing = 1;
				if (slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0) {
					// if viewport is smaller than minThreshold, return minSlides
					if (slider.viewport.width() < slider.minThreshold) {
						slidesShowing = slider.settings.minSlides;
						// if viewport is larger than minThreshold, return maxSlides
					} else if (slider.viewport.width() > slider.maxThreshold) {
						slidesShowing = slider.settings.maxSlides;
						// if viewport is between min / max thresholds, divide viewport width by first child width
					} else {
						var childWidth = slider.children.first().width() + slider.settings.slideMargin;
						slidesShowing = Math.floor((slider.viewport.width() +
							slider.settings.slideMargin) / childWidth);
					}
					// if "vertical" mode, slides showing will always be minSlides
				} else if (slider.settings.mode == 'vertical') {
					slidesShowing = slider.settings.minSlides;
				}
				return slidesShowing;
			}

			/**
			 * Returns the number of pages (one full viewport of slides is one "page")
			 */
			var getPagerQty = function () {
				var pagerQty = 0;
				// if moveSlides is specified by the user
				if (slider.settings.moveSlides > 0) {
					if (slider.settings.infiniteLoop) {
						pagerQty = Math.ceil(slider.children.length / getMoveBy());
					} else {
						// use a while loop to determine pages
						var breakPoint = 0;
						var counter = 0
						// when breakpoint goes above children length, counter is the number of pages
						while (breakPoint < slider.children.length) {
							++pagerQty;
							breakPoint = counter + getNumberSlidesShowing();
							counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
						}
					}
					// if moveSlides is 0 (auto) divide children length by sides showing, then round up
				} else {
					pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
				}
				return pagerQty;
			}

			/**
			 * Returns the number of indivual slides by which to shift the slider
			 */
			var getMoveBy = function () {
				// if moveSlides was set by the user and moveSlides is less than number of slides showing
				if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
					return slider.settings.moveSlides;
				}
				// if moveSlides is 0 (auto)
				return getNumberSlidesShowing();
			}

			/**
			 * Sets the slider's (el) left or top position
			 */
			var setSlidePosition = function () {
				// if last slide, not infinite loop, and number of children is larger than specified maxSlides
				if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
					if (slider.settings.mode == 'horizontal') {
						// get the last child's position
						var lastChild = slider.children.last();
						var position = lastChild.position();
						// set the left position
						setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
					} else if (slider.settings.mode == 'vertical') {
						// get the last showing index's position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						var position = slider.children.eq(lastShowingIndex).position();
						// set the top position
						setPositionProperty(-position.top, 'reset', 0);
					}
					// if not last slide
				} else {
					// get the position of the first showing slide
					var position = slider.children.eq(slider.active.index * getMoveBy()).position();
					// check for last slide
					if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
					// set the repective position
					if (position != undefined) {
						if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
						else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
					}
				}
			}

			/**
			 * Sets the el's animating property position (which in turn will sometimes animate el).
			 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
			 *
			 * @param value (int)
			 *  - the animating property's value
			 *
			 * @param type (string) 'slider', 'reset', 'ticker'
			 *  - the type of instance for which the function is being
			 *
			 * @param duration (int)
			 *  - the amount of time (in ms) the transition should occupy
			 *
			 * @param params (array) optional
			 *  - an optional parameter containing any variables that need to be passed in
			 */
			var setPositionProperty = function (value, type, duration, params) {
				// use CSS transform
				if (slider.usingCSS) {
					// determine the translate3d value
					var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
					// add the CSS transition-duration
					el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
					if (type == 'slide') {
						// set the property value
						el.css(slider.animProp, propValue);
						// bind a callback method - executes when CSS transition completes
						el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
							// unbind the callback
							el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
							updateAfterSlideTransition();
						});
					} else if (type == 'reset') {
						el.css(slider.animProp, propValue);
					} else if (type == 'ticker') {
						// make the transition use 'linear'
						el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
						el.css(slider.animProp, propValue);
						// bind a callback method - executes when CSS transition completes
						el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
							// unbind the callback
							el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
							// reset the position
							setPositionProperty(params['resetValue'], 'reset', 0);
							// start the loop again
							tickerLoop();
						});
					}
					// use JS animate
				} else {
					var animateObj = {};
					animateObj[slider.animProp] = value;
					if (type == 'slide') {
						el.animate(animateObj, duration, slider.settings.easing, function () {
							updateAfterSlideTransition();
						});
					} else if (type == 'reset') {
						el.css(slider.animProp, value)
					} else if (type == 'ticker') {
						el.animate(animateObj, speed, 'linear', function () {
							setPositionProperty(params['resetValue'], 'reset', 0);
							// run the recursive loop after animation
							tickerLoop();
						});
					}
				}
			}

			/**
			 * Populates the pager with proper amount of pages
			 */
			var populatePager = function () {
				var pagerHtml = '';
				var pagerQty = getPagerQty();
				// loop through each pager item
				for (var i = 0; i < pagerQty; i++) {
					var linkContent = '';
					// if a buildPager function is supplied, use it to get pager link value, else use index + 1
					if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager)) {
						linkContent = slider.settings.buildPager(i);
						slider.pagerEl.addClass('bx-custom-pager');
					} else {
						linkContent = i + 1;
						slider.pagerEl.addClass('bx-default-pager');
					}
					// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
					// add the markup to the string
					pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
				};
				// populate the pager element with pager links
				slider.pagerEl.html(pagerHtml);
			}

			/**
			 * Appends the pager to the controls element
			 */
			var appendPager = function () {
				if (!slider.settings.pagerCustom) {
					// create the pager DOM element
					slider.pagerEl = $('<div class="bx-pager" />');
					// if a pager selector was supplied, populate it with the pager
					if (slider.settings.pagerSelector) {
						$(slider.settings.pagerSelector).html(slider.pagerEl);
						// if no pager selector was supplied, add it after the wrapper
					} else {
						slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
					}
					// populate the pager
					populatePager();
				} else {
					slider.pagerEl = $(slider.settings.pagerCustom);
				}
				// assign the pager click binding
				slider.pagerEl.on('click', 'a', clickPagerBind);
			}

			/**
			 * Appends prev / next controls to the controls element
			 */
			var appendControls = function () {
				slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
				slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
				// bind click actions to the controls
				slider.controls.next.bind('click', clickNextBind);
				slider.controls.prev.bind('click', clickPrevBind);
				// if nextSlector was supplied, populate it
				if (slider.settings.nextSelector) {
					$(slider.settings.nextSelector).append(slider.controls.next);
				}
				// if prevSlector was supplied, populate it
				if (slider.settings.prevSelector) {
					$(slider.settings.prevSelector).append(slider.controls.prev);
				}
				// if no custom selectors were supplied
				if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
					// add the controls to the DOM
					slider.controls.directionEl = $('<div class="bx-controls-direction" />');
					// add the control elements to the directionEl
					slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
					// slider.viewport.append(slider.controls.directionEl);
					slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
				}
			}

			/**
			 * Appends start / stop auto controls to the controls element
			 */
			var appendControlsAuto = function () {
				slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
				slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
				// add the controls to the DOM
				slider.controls.autoEl = $('<div class="bx-controls-auto" />');
				// bind click actions to the controls
				slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
				slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
				// if autoControlsCombine, insert only the "start" control
				if (slider.settings.autoControlsCombine) {
					slider.controls.autoEl.append(slider.controls.start);
					// if autoControlsCombine is false, insert both controls
				} else {
					slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
				}
				// if auto controls selector was supplied, populate it with the controls
				if (slider.settings.autoControlsSelector) {
					$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
					// if auto controls selector was not supplied, add it after the wrapper
				} else {
					slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
				}
				// update the auto controls
				updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
			}

			/**
			 * Appends image captions to the DOM
			 */
			var appendCaptions = function () {
				// cycle through each child
				slider.children.each(function (index) {
					// get the image title attribute
					var title = $(this).find('img:first').attr('title');
					// append the caption
					if (title != undefined && ('' + title).length) {
						$(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
					}
				});
			}

			/**
			 * Click next binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickNextBind = function (e) {
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				el.goToNextSlide();
				e.preventDefault();
			}

			/**
			 * Click prev binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPrevBind = function (e) {
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				el.goToPrevSlide();
				e.preventDefault();
			}

			/**
			 * Click start binding
			 *
			 * @param e (event)
			 *  - DOM event object
	
			 */
			var clickStartBind = function (e) {
				el.startAuto();
				e.preventDefault();
			}

			/**
			 * Click stop binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickStopBind = function (e) {
				el.stopAuto();
				e.preventDefault();
			}

			/**
			 * Click pager binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPagerBind = function (e) {
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				var pagerLink = $(e.currentTarget);
				if (pagerLink.attr('data-slide-index') !== undefined) {
					var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
					// if clicked pager link is not active, continue with the goToSlide call
					if (pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
					e.preventDefault();
				}
			}

			/**
			 * Updates the pager links with an active class
			 *
			 * @param slideIndex (int)
			 *  - index of slide to make active
			 */
			var updatePagerActive = function (slideIndex) {
				// if "short" pager type
				var len = slider.children.length; // nb of children
				if (slider.settings.pagerType == 'short') {
					if (slider.settings.maxSlides > 1) {
						len = Math.ceil(slider.children.length / slider.settings.maxSlides);
					}
					slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
					return;
				}
				// remove all pager active classes
				slider.pagerEl.find('a').removeClass('active');
				// apply the active class for all pagers
				slider.pagerEl.each(function (i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
			}

			/**
			 * Performs needed actions after a slide transition
			 */
			var updateAfterSlideTransition = function () {
				// if infinte loop is true
				if (slider.settings.infiniteLoop) {
					var position = '';
					// first slide
					if (slider.active.index == 0) {
						// set the new position
						position = slider.children.eq(0).position();
						// carousel, last slide
					} else if (slider.active.index == getPagerQty() - 1 && slider.carousel) {
						position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
						// last slide
					} else if (slider.active.index == slider.children.length - 1) {
						position = slider.children.eq(slider.children.length - 1).position();
					}
					if (position) {
						if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
						else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
					}
				}
				// declare that the transition is complete
				slider.working = false;
				// onSlideAfter callback
				slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}

			/**
			 * Updates the auto controls state (either active, or combined switch)
			 *
			 * @param state (string) "start", "stop"
			 *  - the new state of the auto show
			 */
			var updateAutoControls = function (state) {
				// if autoControlsCombine is true, replace the current control with the new state
				if (slider.settings.autoControlsCombine) {
					slider.controls.autoEl.html(slider.controls[state]);
					// if autoControlsCombine is false, apply the "active" class to the appropriate control
				} else {
					slider.controls.autoEl.find('a').removeClass('active');
					slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
				}
			}

			/**
			 * Updates the direction controls (checks if either should be hidden)
			 */
			var updateDirectionControls = function () {
				if (getPagerQty() == 1) {
					slider.controls.prev.addClass('disabled');
					slider.controls.next.addClass('disabled');
				} else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
					// if first slide
					if (slider.active.index == 0) {
						slider.controls.prev.addClass('disabled');
						slider.controls.next.removeClass('disabled');
						// if last slide
					} else if (slider.active.index == getPagerQty() - 1) {
						slider.controls.next.addClass('disabled');
						slider.controls.prev.removeClass('disabled');
						// if any slide in the middle
					} else {
						slider.controls.prev.removeClass('disabled');
						slider.controls.next.removeClass('disabled');
					}
				}
			}

			/**
			 * Initialzes the auto process
			 */
			var initAuto = function () {
				// if autoDelay was supplied, launch the auto show using a setTimeout() call
				if (slider.settings.autoDelay > 0) {
					var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
					// if autoDelay was not supplied, start the auto show normally
				} else {
					el.startAuto();
				}
				// if autoHover is requested
				if (slider.settings.autoHover) {
					// on el hover
					el.hover(function () {
						// if the auto show is currently playing (has an active interval)
						if (slider.interval) {
							// stop the auto show and pass true agument which will prevent control update
							el.stopAuto(true);
							// create a new autoPaused value which will be used by the relative "mouseout" event
							slider.autoPaused = true;

						}
					}, function () {
						// if the autoPaused value was created be the prior "mouseover" event
						if (slider.autoPaused) {
							// start the auto show and pass true agument which will prevent control update
							el.startAuto(true);
							// reset the autoPaused value
							slider.autoPaused = null;
						}
					});
				}
			}

			/**
			 * Initialzes the ticker process
			 */
			var initTicker = function () {
				var startPosition = 0;
				// if autoDirection is "next", append a clone of the entire slider
				if (slider.settings.autoDirection == 'next') {
					el.append(slider.children.clone().addClass('bx-clone'));
					// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
				} else {
					el.prepend(slider.children.clone().addClass('bx-clone'));
					var position = slider.children.first().position();
					startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
				}
				setPositionProperty(startPosition, 'reset', 0);
				// do not allow controls in ticker mode
				slider.settings.pager = false;
				slider.settings.controls = false;
				slider.settings.autoControls = false;
				// if autoHover is requested
				if (slider.settings.tickerHover && !slider.usingCSS) {
					// on el hover
					slider.viewport.hover(function () {
						el.stop();
					}, function () {
						// calculate the total width of children (used to calculate the speed ratio)
						var totalDimens = 0;
						slider.children.each(function (index) {
							totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
						});
						// calculate the speed ratio (used to determine the new speed to finish the paused animation)
						var ratio = slider.settings.speed / totalDimens;
						// determine which property to use
						var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
						// calculate the new speed
						var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
						tickerLoop(newSpeed);
					});
				}
				// start the ticker loop
				tickerLoop();
			}

			/**
			 * Runs a continuous loop, news ticker-style
			 */
			var tickerLoop = function (resumeSpeed) {
				speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
				var position = { left: 0, top: 0 };
				var reset = { left: 0, top: 0 };
				// if "next" animate left position to last child, then reset left to 0
				if (slider.settings.autoDirection == 'next') {
					position = el.find('.bx-clone').first().position();
					// if "prev" animate left position to 0, then reset left to first non-clone child
				} else {
					reset = slider.children.first().position();
				}
				var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
				var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
				var params = { resetValue: resetValue };
				setPositionProperty(animateProperty, 'ticker', speed, params);
			}

			/**
			 * Initializes touch events
			 */
			var initTouch = function () {
				// initialize object to contain all touch values
				slider.touch = {
					start: { x: 0, y: 0 },
					end: { x: 0, y: 0 }
				}
				slider.viewport.bind('touchstart', onTouchStart);
			}

			/**
			 * Event handler for "touchstart"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchStart = function (e) {
				if (slider.working) {
					e.preventDefault();
				} else {
					// record the original position when touch starts
					slider.touch.originalPos = el.position();
					var orig = e.originalEvent;
					// record the starting touch x, y coordinates
					slider.touch.start.x = orig.changedTouches[0].pageX;
					slider.touch.start.y = orig.changedTouches[0].pageY;
					// bind a "touchmove" event to the viewport
					slider.viewport.bind('touchmove', onTouchMove);
					// bind a "touchend" event to the viewport
					slider.viewport.bind('touchend', onTouchEnd);
				}
			}

			/**
			 * Event handler for "touchmove"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchMove = function (e) {
				var orig = e.originalEvent;
				// if scrolling on y axis, do not prevent default
				var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
				var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
				// x axis swipe
				if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
					e.preventDefault();
					// y axis swipe
				} else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
					e.preventDefault();
				}
				if (slider.settings.mode != 'fade' && slider.settings.oneToOneTouch) {
					var value = 0;
					// if horizontal, drag along x axis
					if (slider.settings.mode == 'horizontal') {
						var change = orig.changedTouches[0].pageX - slider.touch.start.x;
						value = slider.touch.originalPos.left + change;
						// if vertical, drag along y axis
					} else {
						var change = orig.changedTouches[0].pageY - slider.touch.start.y;
						value = slider.touch.originalPos.top + change;
					}
					setPositionProperty(value, 'reset', 0);
				}
			}

			/**
			 * Event handler for "touchend"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchEnd = function (e) {
				slider.viewport.unbind('touchmove', onTouchMove);
				var orig = e.originalEvent;
				var value = 0;
				// record end x, y positions
				slider.touch.end.x = orig.changedTouches[0].pageX;
				slider.touch.end.y = orig.changedTouches[0].pageY;
				// if fade mode, check if absolute x distance clears the threshold
				if (slider.settings.mode == 'fade') {
					var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
					if (distance >= slider.settings.swipeThreshold) {
						slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}
					// not fade mode
				} else {
					var distance = 0;
					// calculate distance and el's animate property
					if (slider.settings.mode == 'horizontal') {
						distance = slider.touch.end.x - slider.touch.start.x;
						value = slider.touch.originalPos.left;
					} else {
						distance = slider.touch.end.y - slider.touch.start.y;
						value = slider.touch.originalPos.top;
					}
					// if not infinite loop and first / last slide, do not attempt a slide transition
					if (!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))) {
						setPositionProperty(value, 'reset', 200);
					} else {
						// check if distance clears threshold
						if (Math.abs(distance) >= slider.settings.swipeThreshold) {
							distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
							el.stopAuto();
						} else {
							// el.animate(property, 200);
							setPositionProperty(value, 'reset', 200);
						}
					}
				}
				slider.viewport.unbind('touchend', onTouchEnd);
			}

			/**
			 * Window resize event callback
			 */
			var resizeWindow = function (e) {
				// don't do anything if slider isn't initialized.
				if (!slider.initialized) return;
				// get the new window dimens (again, thank you IE)
				var windowWidthNew = $(window).width();
				var windowHeightNew = $(window).height();
				// make sure that it is a true window resize
				// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
				// are resized. Can you just die already?*
				if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
					// set the new window dimens
					windowWidth = windowWidthNew;
					windowHeight = windowHeightNew;
					// update all dynamic elements
					el.redrawSlider();
					// Call user resize handler
					slider.settings.onSliderResize.call(el, slider.active.index);
				}
			}

			/**
			 * ===================================================================================
			 * = PUBLIC FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Performs slide transition to the specified slide
			 *
			 * @param slideIndex (int)
			 *  - the destination slide's index (zero-based)
			 *
			 * @param direction (string)
			 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
			 */
			el.goToSlide = function (slideIndex, direction) {
				// if plugin is currently in motion, ignore request
				if (slider.working || slider.active.index == slideIndex) return;
				// declare that plugin is in motion
				slider.working = true;
				// store the old index
				slider.oldIndex = slider.active.index;
				// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
				if (slideIndex < 0) {
					slider.active.index = getPagerQty() - 1;
					// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
				} else if (slideIndex >= getPagerQty()) {
					slider.active.index = 0;
					// set active index to requested slide
				} else {
					slider.active.index = slideIndex;
				}
				// onSlideBefore, onSlideNext, onSlidePrev callbacks
				slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				if (direction == 'next') {
					slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				} else if (direction == 'prev') {
					slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				}
				// check if last slide
				slider.active.last = slider.active.index >= getPagerQty() - 1;
				// update the pager with active class
				if (slider.settings.pager) updatePagerActive(slider.active.index);
				// // check for direction control update
				if (slider.settings.controls) updateDirectionControls();
				// if slider is set to mode: "fade"
				if (slider.settings.mode == 'fade') {
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if (slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()) {
						slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
					}
					// fade out the visible child and reset its z-index value
					slider.children.filter(':visible').fadeOut(slider.settings.speed).css({ zIndex: 0 });
					// fade in the newly requested slide
					slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function () {
						$(this).css('zIndex', slider.settings.slideZIndex);
						updateAfterSlideTransition();
					});
					// slider mode is not "fade"
				} else {
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if (slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()) {
						slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
					}
					var moveBy = 0;
					var position = { left: 0, top: 0 };
					// if carousel and not infinite loop
					if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
						if (slider.settings.mode == 'horizontal') {
							// get the last child position
							var lastChild = slider.children.eq(slider.children.length - 1);
							position = lastChild.position();
							// calculate the position of the last slide
							moveBy = slider.viewport.width() - lastChild.outerWidth();
						} else {
							// get last showing index position
							var lastShowingIndex = slider.children.length - slider.settings.minSlides;
							position = slider.children.eq(lastShowingIndex).position();
						}
						// horizontal carousel, going previous while on first slide (infiniteLoop mode)
					} else if (slider.carousel && slider.active.last && direction == 'prev') {
						// get the last child position
						var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
						var lastChild = el.children('.bx-clone').eq(eq);
						position = lastChild.position();
						// if infinite loop and "Next" is clicked on the last slide
					} else if (direction == 'next' && slider.active.index == 0) {
						// get the last clone position
						position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
						slider.active.last = false;
						// normal non-zero requests
					} else if (slideIndex >= 0) {
						var requestEl = slideIndex * getMoveBy();
						position = slider.children.eq(requestEl).position();
					}

					/* If the position doesn't exist
					 * (e.g. if you destroy the slider on a next click),
					 * it doesn't throw an error.
					 */
					if ("undefined" !== typeof (position)) {
						var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
						// plugin values to be animated
						setPositionProperty(value, 'slide', slider.settings.speed);
					}
				}
			}

			/**
			 * Transitions to the next slide in the show
			 */
			el.goToNextSlide = function () {
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.last) return;
				var pagerIndex = parseInt(slider.active.index) + 1;
				el.goToSlide(pagerIndex, 'next');
			}

			/**
			 * Transitions to the prev slide in the show
			 */
			el.goToPrevSlide = function () {
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
				var pagerIndex = parseInt(slider.active.index) - 1;
				el.goToSlide(pagerIndex, 'prev');
			}

			/**
			 * Starts the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.startAuto = function (preventControlUpdate) {
				// if an interval already exists, disregard call
				if (slider.interval) return;
				// create an interval
				slider.interval = setInterval(function () {
					slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
				}, slider.settings.pause);
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
			}

			/**
			 * Stops the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.stopAuto = function (preventControlUpdate) {
				// if no interval exists, disregard call
				if (!slider.interval) return;
				// clear the interval
				clearInterval(slider.interval);
				slider.interval = null;
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
			}

			/**
			 * Returns current slide index (zero-based)
			 */
			el.getCurrentSlide = function () {
				return slider.active.index;
			}

			/**
			 * Returns current slide element
			 */
			el.getCurrentSlideElement = function () {
				return slider.children.eq(slider.active.index);
			}

			/**
			 * Returns number of slides in show
			 */
			el.getSlideCount = function () {
				return slider.children.length;
			}

			/**
			 * Update all dynamic slider elements
			 */
			el.redrawSlider = function () {
				// resize all children in ratio to new screen size
				slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
				// adjust the height
				slider.viewport.css('height', getViewportHeight());
				// update the slide position
				if (!slider.settings.ticker) setSlidePosition();
				// if active.last was true before the screen resize, we want
				// to keep it last no matter what screen size we end on
				if (slider.active.last) slider.active.index = getPagerQty() - 1;
				// if the active index (page) no longer exists due to the resize, simply set the index as last
				if (slider.active.index >= getPagerQty()) slider.active.last = true;
				// if a pager is being displayed and a custom pager is not being used, update it
				if (slider.settings.pager && !slider.settings.pagerCustom) {
					populatePager();
					updatePagerActive(slider.active.index);
				}
			}

			/**
			 * Destroy the current instance of the slider (revert everything back to original state)
			 */
			el.destroySlider = function () {
				// don't do anything if slider has already been destroyed
				if (!slider.initialized) return;
				slider.initialized = false;
				$('.bx-clone', this).remove();
				slider.children.each(function () {
					$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
				});
				$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
				$(this).unwrap().unwrap();
				if (slider.controls.el) slider.controls.el.remove();
				if (slider.controls.next) slider.controls.next.remove();
				if (slider.controls.prev) slider.controls.prev.remove();
				if (slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
				$('.bx-caption', this).remove();
				if (slider.controls.autoEl) slider.controls.autoEl.remove();
				clearInterval(slider.interval);
				if (slider.settings.responsive) $(window).unbind('resize', resizeWindow);
			}

			/**
			 * Reload the slider (revert all DOM changes, and re-initialize)
			 */
			el.reloadSlider = function (settings) {
				if (settings != undefined) options = settings;
				el.destroySlider();
				init();
			}

			init();

			// returns the current jQuery object
			return this;
		}

	})(jQuery);

$(document).ready(function () {
	var clipboardData = new Clipboard(".copy", {
		// container: $(".copy").get(0),
		text: function (trigger) {
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
		.on("success", function () {
			var offsetX = window.scrollX || window.pageXOffset || window.document.documentElement.scrollLeft,
				offsetY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

			// firefox jump - fixed
			window.scroll(offsetX, offsetY); // started

			setTimeout(function () { // step 1
				window.scroll(offsetX, offsetY);
			}, 20);

			setTimeout(function () { // step 2
				window.scroll(offsetX, offsetY);
			}, 15);

			setTimeout(function () { // step 3
				window.scroll(offsetX, offsetY);
			}, 10);

			setTimeout(function () { // step 4
				window.scroll(offsetX, offsetY);
			}, 5);

			setTimeout(function () { // step 5
				window.scroll(offsetX, offsetY);
			}, 0);

			window.scroll(offsetX, offsetY); // final
		})
		.on("error", function () {
		});
})


/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.2
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */


!function () { "use strict"; function Md5(t) { if (t) blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks, this.buffer8 = buffer8; else if (ARRAY_BUFFER) { var r = new ArrayBuffer(68); this.buffer8 = new Uint8Array(r), this.blocks = new Uint32Array(r) } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0 } var ERROR = "input is invalid type", WINDOW = "object" == typeof window, root = WINDOW ? window : {}; root.JS_MD5_NO_WINDOW && (WINDOW = !1); var WEB_WORKER = !WINDOW && "object" == typeof self, NODE_JS = !root.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node; NODE_JS ? root = global : WEB_WORKER && (root = self); var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports, AMD = "function" == typeof define && define.amd, ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, HEX_CHARS = "0123456789abcdef".split(""), EXTRA = [128, 32768, 8388608, -2147483648], SHIFT = [0, 8, 16, 24], OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), blocks = [], buffer8; if (ARRAY_BUFFER) { var buffer = new ArrayBuffer(68); buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer) } (root.JS_MD5_NO_NODE_JS || !Array.isArray) && (Array.isArray = function (t) { return "[object Array]" === Object.prototype.toString.call(t) }), !ARRAY_BUFFER || !root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (t) { return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer }); var createOutputMethod = function (t) { return function (r) { return new Md5(!0).update(r)[t]() } }, createMethod = function () { var t = createOutputMethod("hex"); NODE_JS && (t = nodeWrap(t)), t.create = function () { return new Md5 }, t.update = function (r) { return t.create().update(r) }; for (var r = 0; r < OUTPUT_TYPES.length; ++r) { var e = OUTPUT_TYPES[r]; t[e] = createOutputMethod(e) } return t }, nodeWrap = function (method) { var crypto = eval("require('crypto')"), Buffer = eval("require('buffer').Buffer"), nodeMethod = function (t) { if ("string" == typeof t) return crypto.createHash("md5").update(t, "utf8").digest("hex"); if (null === t || void 0 === t) throw ERROR; return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(t)).digest("hex") : method(t) }; return nodeMethod }; Md5.prototype.update = function (t) { if (!this.finalized) { var r, e = typeof t; if ("string" !== e) { if ("object" !== e) throw ERROR; if (null === t) throw ERROR; if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t); else if (!(Array.isArray(t) || ARRAY_BUFFER && ArrayBuffer.isView(t))) throw ERROR; r = !0 } for (var s, i, o = 0, h = t.length, f = this.blocks, a = this.buffer8; h > o;) { if (this.hashed && (this.hashed = !1, f[0] = f[16], f[16] = f[1] = f[2] = f[3] = f[4] = f[5] = f[6] = f[7] = f[8] = f[9] = f[10] = f[11] = f[12] = f[13] = f[14] = f[15] = 0), r) if (ARRAY_BUFFER) for (i = this.start; h > o && 64 > i; ++o)a[i++] = t[o]; else for (i = this.start; h > o && 64 > i; ++o)f[i >> 2] |= t[o] << SHIFT[3 & i++]; else if (ARRAY_BUFFER) for (i = this.start; h > o && 64 > i; ++o)s = t.charCodeAt(o), 128 > s ? a[i++] = s : 2048 > s ? (a[i++] = 192 | s >> 6, a[i++] = 128 | 63 & s) : 55296 > s || s >= 57344 ? (a[i++] = 224 | s >> 12, a[i++] = 128 | s >> 6 & 63, a[i++] = 128 | 63 & s) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++o)), a[i++] = 240 | s >> 18, a[i++] = 128 | s >> 12 & 63, a[i++] = 128 | s >> 6 & 63, a[i++] = 128 | 63 & s); else for (i = this.start; h > o && 64 > i; ++o)s = t.charCodeAt(o), 128 > s ? f[i >> 2] |= s << SHIFT[3 & i++] : 2048 > s ? (f[i >> 2] |= (192 | s >> 6) << SHIFT[3 & i++], f[i >> 2] |= (128 | 63 & s) << SHIFT[3 & i++]) : 55296 > s || s >= 57344 ? (f[i >> 2] |= (224 | s >> 12) << SHIFT[3 & i++], f[i >> 2] |= (128 | s >> 6 & 63) << SHIFT[3 & i++], f[i >> 2] |= (128 | 63 & s) << SHIFT[3 & i++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++o)), f[i >> 2] |= (240 | s >> 18) << SHIFT[3 & i++], f[i >> 2] |= (128 | s >> 12 & 63) << SHIFT[3 & i++], f[i >> 2] |= (128 | s >> 6 & 63) << SHIFT[3 & i++], f[i >> 2] |= (128 | 63 & s) << SHIFT[3 & i++]); this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.start = i - 64, this.hash(), this.hashed = !0) : this.start = i } return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this } }, Md5.prototype.finalize = function () { if (!this.finalized) { this.finalized = !0; var t = this.blocks, r = this.lastByteIndex; t[r >> 2] |= EXTRA[3 & r], r >= 56 && (this.hashed || this.hash(), t[0] = t[16], t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.bytes << 3, t[15] = this.hBytes << 3 | this.bytes >> 29, this.hash() } }, Md5.prototype.hash = function () { var t, r, e, s, i, o, h = this.blocks; this.first ? (t = h[0] - 680876937, t = (t << 7 | t >>> 25) - 271733879 << 0, s = (-1732584194 ^ 2004318071 & t) + h[1] - 117830708, s = (s << 12 | s >>> 20) + t << 0, e = (-271733879 ^ s & (-271733879 ^ t)) + h[2] - 1126478375, e = (e << 17 | e >>> 15) + s << 0, r = (t ^ e & (s ^ t)) + h[3] - 1316259209, r = (r << 22 | r >>> 10) + e << 0) : (t = this.h0, r = this.h1, e = this.h2, s = this.h3, t += (s ^ r & (e ^ s)) + h[0] - 680876936, t = (t << 7 | t >>> 25) + r << 0, s += (e ^ t & (r ^ e)) + h[1] - 389564586, s = (s << 12 | s >>> 20) + t << 0, e += (r ^ s & (t ^ r)) + h[2] + 606105819, e = (e << 17 | e >>> 15) + s << 0, r += (t ^ e & (s ^ t)) + h[3] - 1044525330, r = (r << 22 | r >>> 10) + e << 0), t += (s ^ r & (e ^ s)) + h[4] - 176418897, t = (t << 7 | t >>> 25) + r << 0, s += (e ^ t & (r ^ e)) + h[5] + 1200080426, s = (s << 12 | s >>> 20) + t << 0, e += (r ^ s & (t ^ r)) + h[6] - 1473231341, e = (e << 17 | e >>> 15) + s << 0, r += (t ^ e & (s ^ t)) + h[7] - 45705983, r = (r << 22 | r >>> 10) + e << 0, t += (s ^ r & (e ^ s)) + h[8] + 1770035416, t = (t << 7 | t >>> 25) + r << 0, s += (e ^ t & (r ^ e)) + h[9] - 1958414417, s = (s << 12 | s >>> 20) + t << 0, e += (r ^ s & (t ^ r)) + h[10] - 42063, e = (e << 17 | e >>> 15) + s << 0, r += (t ^ e & (s ^ t)) + h[11] - 1990404162, r = (r << 22 | r >>> 10) + e << 0, t += (s ^ r & (e ^ s)) + h[12] + 1804603682, t = (t << 7 | t >>> 25) + r << 0, s += (e ^ t & (r ^ e)) + h[13] - 40341101, s = (s << 12 | s >>> 20) + t << 0, e += (r ^ s & (t ^ r)) + h[14] - 1502002290, e = (e << 17 | e >>> 15) + s << 0, r += (t ^ e & (s ^ t)) + h[15] + 1236535329, r = (r << 22 | r >>> 10) + e << 0, t += (e ^ s & (r ^ e)) + h[1] - 165796510, t = (t << 5 | t >>> 27) + r << 0, s += (r ^ e & (t ^ r)) + h[6] - 1069501632, s = (s << 9 | s >>> 23) + t << 0, e += (t ^ r & (s ^ t)) + h[11] + 643717713, e = (e << 14 | e >>> 18) + s << 0, r += (s ^ t & (e ^ s)) + h[0] - 373897302, r = (r << 20 | r >>> 12) + e << 0, t += (e ^ s & (r ^ e)) + h[5] - 701558691, t = (t << 5 | t >>> 27) + r << 0, s += (r ^ e & (t ^ r)) + h[10] + 38016083, s = (s << 9 | s >>> 23) + t << 0, e += (t ^ r & (s ^ t)) + h[15] - 660478335, e = (e << 14 | e >>> 18) + s << 0, r += (s ^ t & (e ^ s)) + h[4] - 405537848, r = (r << 20 | r >>> 12) + e << 0, t += (e ^ s & (r ^ e)) + h[9] + 568446438, t = (t << 5 | t >>> 27) + r << 0, s += (r ^ e & (t ^ r)) + h[14] - 1019803690, s = (s << 9 | s >>> 23) + t << 0, e += (t ^ r & (s ^ t)) + h[3] - 187363961, e = (e << 14 | e >>> 18) + s << 0, r += (s ^ t & (e ^ s)) + h[8] + 1163531501, r = (r << 20 | r >>> 12) + e << 0, t += (e ^ s & (r ^ e)) + h[13] - 1444681467, t = (t << 5 | t >>> 27) + r << 0, s += (r ^ e & (t ^ r)) + h[2] - 51403784, s = (s << 9 | s >>> 23) + t << 0, e += (t ^ r & (s ^ t)) + h[7] + 1735328473, e = (e << 14 | e >>> 18) + s << 0, r += (s ^ t & (e ^ s)) + h[12] - 1926607734, r = (r << 20 | r >>> 12) + e << 0, i = r ^ e, t += (i ^ s) + h[5] - 378558, t = (t << 4 | t >>> 28) + r << 0, s += (i ^ t) + h[8] - 2022574463, s = (s << 11 | s >>> 21) + t << 0, o = s ^ t, e += (o ^ r) + h[11] + 1839030562, e = (e << 16 | e >>> 16) + s << 0, r += (o ^ e) + h[14] - 35309556, r = (r << 23 | r >>> 9) + e << 0, i = r ^ e, t += (i ^ s) + h[1] - 1530992060, t = (t << 4 | t >>> 28) + r << 0, s += (i ^ t) + h[4] + 1272893353, s = (s << 11 | s >>> 21) + t << 0, o = s ^ t, e += (o ^ r) + h[7] - 155497632, e = (e << 16 | e >>> 16) + s << 0, r += (o ^ e) + h[10] - 1094730640, r = (r << 23 | r >>> 9) + e << 0, i = r ^ e, t += (i ^ s) + h[13] + 681279174, t = (t << 4 | t >>> 28) + r << 0, s += (i ^ t) + h[0] - 358537222, s = (s << 11 | s >>> 21) + t << 0, o = s ^ t, e += (o ^ r) + h[3] - 722521979, e = (e << 16 | e >>> 16) + s << 0, r += (o ^ e) + h[6] + 76029189, r = (r << 23 | r >>> 9) + e << 0, i = r ^ e, t += (i ^ s) + h[9] - 640364487, t = (t << 4 | t >>> 28) + r << 0, s += (i ^ t) + h[12] - 421815835, s = (s << 11 | s >>> 21) + t << 0, o = s ^ t, e += (o ^ r) + h[15] + 530742520, e = (e << 16 | e >>> 16) + s << 0, r += (o ^ e) + h[2] - 995338651, r = (r << 23 | r >>> 9) + e << 0, t += (e ^ (r | ~s)) + h[0] - 198630844, t = (t << 6 | t >>> 26) + r << 0, s += (r ^ (t | ~e)) + h[7] + 1126891415, s = (s << 10 | s >>> 22) + t << 0, e += (t ^ (s | ~r)) + h[14] - 1416354905, e = (e << 15 | e >>> 17) + s << 0, r += (s ^ (e | ~t)) + h[5] - 57434055, r = (r << 21 | r >>> 11) + e << 0, t += (e ^ (r | ~s)) + h[12] + 1700485571, t = (t << 6 | t >>> 26) + r << 0, s += (r ^ (t | ~e)) + h[3] - 1894986606, s = (s << 10 | s >>> 22) + t << 0, e += (t ^ (s | ~r)) + h[10] - 1051523, e = (e << 15 | e >>> 17) + s << 0, r += (s ^ (e | ~t)) + h[1] - 2054922799, r = (r << 21 | r >>> 11) + e << 0, t += (e ^ (r | ~s)) + h[8] + 1873313359, t = (t << 6 | t >>> 26) + r << 0, s += (r ^ (t | ~e)) + h[15] - 30611744, s = (s << 10 | s >>> 22) + t << 0, e += (t ^ (s | ~r)) + h[6] - 1560198380, e = (e << 15 | e >>> 17) + s << 0, r += (s ^ (e | ~t)) + h[13] + 1309151649, r = (r << 21 | r >>> 11) + e << 0, t += (e ^ (r | ~s)) + h[4] - 145523070, t = (t << 6 | t >>> 26) + r << 0, s += (r ^ (t | ~e)) + h[11] - 1120210379, s = (s << 10 | s >>> 22) + t << 0, e += (t ^ (s | ~r)) + h[2] + 718787259, e = (e << 15 | e >>> 17) + s << 0, r += (s ^ (e | ~t)) + h[9] - 343485551, r = (r << 21 | r >>> 11) + e << 0, this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = r - 271733879 << 0, this.h2 = e - 1732584194 << 0, this.h3 = s + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + r << 0, this.h2 = this.h2 + e << 0, this.h3 = this.h3 + s << 0) }, Md5.prototype.hex = function () { this.finalize(); var t = this.h0, r = this.h1, e = this.h2, s = this.h3; return HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] }, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function () { this.finalize(); var t = this.h0, r = this.h1, e = this.h2, s = this.h3; return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & s, s >> 8 & 255, s >> 16 & 255, s >> 24 & 255] }, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function () { this.finalize(); var t = new ArrayBuffer(16), r = new Uint32Array(t); return r[0] = this.h0, r[1] = this.h1, r[2] = this.h2, r[3] = this.h3, t }, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function () { for (var t, r, e, s = "", i = this.array(), o = 0; 15 > o;)t = i[o++], r = i[o++], e = i[o++], s += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[63 & (t << 4 | r >>> 4)] + BASE64_ENCODE_CHAR[63 & (r << 2 | e >>> 6)] + BASE64_ENCODE_CHAR[63 & e]; return t = i[o], s += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[t << 4 & 63] + "==" }; var exports = createMethod(); COMMON_JS ? module.exports = exports : (root.md5 = exports, AMD && define(function () { return exports })) }();



!function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { var e; e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t() } }(function () { var t, e, n; return function t(e, n, o) { function i(a, c) { if (!n[a]) { if (!e[a]) { var l = "function" == typeof require && require; if (!c && l) return l(a, !0); if (r) return r(a, !0); var s = new Error("Cannot find module '" + a + "'"); throw s.code = "MODULE_NOT_FOUND", s } var u = n[a] = { exports: {} }; e[a][0].call(u.exports, function (t) { var n = e[a][1][t]; return i(n || t) }, u, u.exports, t, e, n, o) } return n[a].exports } for (var r = "function" == typeof require && require, a = 0; a < o.length; a++)i(o[a]); return i }({ 1: [function (t, e, n) { function o(t, e) { for (; t && t.nodeType !== i;) { if ("function" == typeof t.matches && t.matches(e)) return t; t = t.parentNode } } var i = 9; if ("undefined" != typeof Element && !Element.prototype.matches) { var r = Element.prototype; r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector } e.exports = o }, {}], 2: [function (t, e, n) { function o(t, e, n, o, r) { var a = i.apply(this, arguments); return t.addEventListener(n, a, r), { destroy: function () { t.removeEventListener(n, a, r) } } } function i(t, e, n, o) { return function (n) { n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n) } } var r = t("./closest"); e.exports = o }, { "./closest": 1 }], 3: [function (t, e, n) { n.node = function (t) { return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType }, n.nodeList = function (t) { var e = Object.prototype.toString.call(t); return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0])) }, n.string = function (t) { return "string" == typeof t || t instanceof String }, n.fn = function (t) { return "[object Function]" === Object.prototype.toString.call(t) } }, {}], 4: [function (t, e, n) { function o(t, e, n) { if (!t && !e && !n) throw new Error("Missing required arguments"); if (!c.string(e)) throw new TypeError("Second argument must be a String"); if (!c.fn(n)) throw new TypeError("Third argument must be a Function"); if (c.node(t)) return i(t, e, n); if (c.nodeList(t)) return r(t, e, n); if (c.string(t)) return a(t, e, n); throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList") } function i(t, e, n) { return t.addEventListener(e, n), { destroy: function () { t.removeEventListener(e, n) } } } function r(t, e, n) { return Array.prototype.forEach.call(t, function (t) { t.addEventListener(e, n) }), { destroy: function () { Array.prototype.forEach.call(t, function (t) { t.removeEventListener(e, n) }) } } } function a(t, e, n) { return l(document.body, t, e, n) } var c = t("./is"), l = t("delegate"); e.exports = o }, { "./is": 3, delegate: 2 }], 5: [function (t, e, n) { function o(t) { var e; if ("SELECT" === t.nodeName) t.focus(), e = t.value; else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) { var n = t.hasAttribute("readonly"); n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value } else { t.hasAttribute("contenteditable") && t.focus(); var o = window.getSelection(), i = document.createRange(); i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = o.toString() } return e } e.exports = o }, {}], 6: [function (t, e, n) { function o() { } o.prototype = { on: function (t, e, n) { var o = this.e || (this.e = {}); return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this }, once: function (t, e, n) { function o() { i.off(t, o), e.apply(n, arguments) } var i = this; return o._ = e, this.on(t, o, n) }, emit: function (t) { var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, i = n.length; for (o; o < i; o++)n[o].fn.apply(n[o].ctx, e); return this }, off: function (t, e) { var n = this.e || (this.e = {}), o = n[t], i = []; if (o && e) for (var r = 0, a = o.length; r < a; r++)o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]); return i.length ? n[t] = i : delete n[t], this } }, e.exports = o }, {}], 7: [function (e, n, o) { !function (i, r) { if ("function" == typeof t && t.amd) t(["module", "select"], r); else if (void 0 !== o) r(n, e("select")); else { var a = { exports: {} }; r(a, i.select), i.clipboardAction = a.exports } }(this, function (t, e) { "use strict"; function n(t) { return t && t.__esModule ? t : { default: t } } function o(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } var i = n(e), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, a = function () { function t(t, e) { for (var n = 0; n < e.length; n++) { var o = e[n]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } } return function (e, n, o) { return n && t(e.prototype, n), o && t(e, o), e } }(), c = function () { function t(e) { o(this, t), this.resolveOptions(e), this.initSelection() } return a(t, [{ key: "resolveOptions", value: function t() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "" } }, { key: "initSelection", value: function t() { this.text ? this.selectFake() : this.target && this.selectTarget() } }, { key: "selectFake", value: function t() { var e = this, n = "rtl" == document.documentElement.getAttribute("dir"); this.removeFake(), this.fakeHandlerCallback = function () { return e.removeFake() }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px"; var o = window.pageYOffset || document.documentElement.scrollTop; this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText() } }, { key: "removeFake", value: function t() { this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null) } }, { key: "selectTarget", value: function t() { this.selectedText = (0, i.default)(this.target), this.copyText() } }, { key: "copyText", value: function t() { var e = void 0; try { e = document.execCommand(this.action) } catch (t) { e = !1 } this.handleResult(e) } }, { key: "handleResult", value: function t(e) { this.emitter.emit(e ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) } }, { key: "clearSelection", value: function t() { this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges() } }, { key: "destroy", value: function t() { this.removeFake() } }, { key: "action", set: function t() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy"; if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"') }, get: function t() { return this._action } }, { key: "target", set: function t(e) { if (void 0 !== e) { if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element'); if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'); if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'); this._target = e } }, get: function t() { return this._target } }]), t }(); t.exports = c }) }, { select: 5 }], 8: [function (e, n, o) { !function (i, r) { if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r); else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener")); else { var a = { exports: {} }; r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports } }(this, function (t, e, n, o) { "use strict"; function i(t) { return t && t.__esModule ? t : { default: t } } function r(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e } function c(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) } function l(t, e) { var n = "data-clipboard-" + t; if (e.hasAttribute(n)) return e.getAttribute(n) } var s = i(e), u = i(n), f = i(o), d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, h = function () { function t(t, e) { for (var n = 0; n < e.length; n++) { var o = e[n]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } } return function (e, n, o) { return n && t(e.prototype, n), o && t(e, o), e } }(), p = function (t) { function e(t, n) { r(this, e); var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return o.resolveOptions(n), o.listenClick(t), o } return c(e, t), h(e, [{ key: "resolveOptions", value: function t() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === d(e.container) ? e.container : document.body } }, { key: "listenClick", value: function t(e) { var n = this; this.listener = (0, f.default)(e, "click", function (t) { return n.onClick(t) }) } }, { key: "onClick", value: function t(e) { var n = e.delegateTarget || e.currentTarget; this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s.default({ action: this.action(n), target: this.target(n), text: this.text(n), container: this.container, trigger: n, emitter: this }) } }, { key: "defaultAction", value: function t(e) { return l("action", e) } }, { key: "defaultTarget", value: function t(e) { var n = l("target", e); if (n) return document.querySelector(n) } }, { key: "defaultText", value: function t(e) { return l("text", e) } }, { key: "destroy", value: function t() { this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null) } }], [{ key: "isSupported", value: function t() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"], n = "string" == typeof e ? [e] : e, o = !!document.queryCommandSupported; return n.forEach(function (t) { o = o && !!document.queryCommandSupported(t) }), o } }]), e }(u.default); t.exports = p }) }, { "./clipboard-action": 7, "good-listener": 4, "tiny-emitter": 6 }] }, {}, [8])(8) });


