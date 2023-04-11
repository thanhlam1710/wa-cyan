/*!
 * ScriptName: shared.js
 *
 * FCV - http://foodconnection.jp/
 *
 */

// DOM ready
$(document).ready(function() {
	// anchor link
	$('a[href^="#"]').click(function(e){
		if ($(this).attr('href') && $(this).attr('href').length > 0) {
			if(!$(this).hasClass("btn-popup")){
				var p = $( $(this).attr('href') ).offset();
				if(p.top <= 78){
					$('html,body').animate({ scrollTop: p.top }, 200);
				}
				else{
					$('html,body').animate({ scrollTop: p.top-85 }, 200);
				}
						if ($($(this).attr('href')).hasClass("link-archo") && !$($(this).attr('href')).parents(".toggle").first().hasClass("active")) $($(this).attr('href')).click();
				
			}
			else{
				var scroll = $(window).scrollTop();
				location.replace(location.origin + location.pathname + $(this).attr('href'));
				window.scroll(0, scroll);
				e.preventDefault();
				return false;
			}
		}
	});// end anchor link
	
	// slide co thumbnail	
	$('.slide_thm1 li').click(function (e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(1);
    });
	
	// slide co thumbnail	
	$('.slide_thm2 li').click(function (e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(2);
    });
	// slide co thumbnail	
	$('.slide_thm3 li').click(function (e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(3);
    });
	
	
	
	function goToByScroll(dataslide) {
        $("html, body").animate({scrollTop: $('.go_slide' + dataslide).offset().top-85}, 500);
    }	
	// end slide co thumbnail
});

$(window).load(function(e) {
	var hash1 = location.hash;
	var $root = $('html, body');
	if( hash1 != "" && $(hash1).length > 0){  
		var top01 = $(hash1).offset();  
		//alert(hash1);
		if ($(hash1).hasClass("link-archo")) 
			
			
			$(hash1).click();
				
			
		
	}
});




$(window).load(function(e) {
  var hash1 = location.hash;
  var $root = $('html, body');
  if( hash1 != ""){  
   var top01 = $(hash1).offset();  
   //alert(hash1);
   $('html,body').animate({ scrollTop:top01.top-85}, 200);  
  }
});


$(function () {
	var TargetPos = 50;
	$(window).scroll(function () {
	
		var ScrollPos = $(window).scrollTop();
		if (ScrollPos > TargetPos) {

		
			
			$("body").addClass('has_nav');

		} else {

		
			$("body").removeClass('has_nav');

		}


	});
});

