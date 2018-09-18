/**
 * @name Site.
 * @author Hang Trieu.
 * @date 2018-03-19.
 * @description Define global variables and functions.
 * @version 1.0
 */
var siteGlobal = (function($, window, undefined) {
	var $document = $(document),
			$Body = $('body'),
			$win = $('window'),
			CssClass = {
				active: 'active fadeIn animated',
			},
			toogleActiveClassAdvance = function(clickEl, activeEl) {
				if(!activeEl) {
					activeEl = clickEl;
				}

				cssClassActive = CssClass.active;

				clickEl.on('click', function() {
					activeEl.toggleClass(cssClassActive);
				});
			},

			// less more article
			AddReadMore = function() {
					// Text to show when text is collapsed
					var readMoreTxt = "VIEW MORE",
					// Text to show when text is expanded
							readLessTxt = "VIEW LESS",
							complete = $('.complete');

					cssClassActive = CssClass.active;
	 
					$(".addReadMore").each(function() {
						if (complete.length) {
							//Read More and Read Less Click Event binding
							var activeEl = $(this).find('.complete'),
									moreBtn = $(this).find('[data-moreBtn]'),
									lessBtn = $(this).find('[data-lessBtn]');

							moreBtn.addClass('active');

							moreBtn.on('click', function() {
								activeEl.addClass(cssClassActive);
								lessBtn.addClass(cssClassActive);
								moreBtn.removeClass(cssClassActive);
							});

							lessBtn.on('click', function() {
								activeEl.removeClass(cssClassActive);
								moreBtn.addClass(cssClassActive);
								lessBtn.removeClass(cssClassActive);
							});
						}		 
					});
				};

			// Fixed menu
			var navbarDefault = $('[data-stick-menu]'),
				navbarDefaultHeight = navbarDefault.outerHeight(true);

			navbarDefault.css("height", navbarDefaultHeight);
			$(window).resize(function () {
				navbarDefaultHeight = navbarDefault.outerHeight(true);
				navbarDefault.css("height", navbarDefaultHeight);
			});

			$(window).scroll(function() {
				if ( $(window).scrollTop() >= (parseInt($('[data-stick-menu]:eq(0)').css('margin-top')) + $('[data-stick-menu]:eq(0)').height())
				) {
					navbarDefault.addClass('sticky');
				}
				else {
					navbarDefault.removeClass('sticky');
				}
			});
			// End Fixed menu

			// Select all links with hashes
			$('a[href*="#"]')
				// Remove links that don't actually link to anything
				.not('[href="#"]')
				.not('[href="#0"]')
				.click(function(event) {
				// On-page links
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					// Figure out element to scroll to
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					// Does a scroll target exist?
					if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - navbarDefaultHeight
					}, 1000, function() {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
						return false;
						} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
						}
					});
					}
				}
			});		


			//Calling function after Page Load
			AddReadMore();
	return {
		CssClass: CssClass,
		Func: {
			toogleActiveClassAdvance: toogleActiveClassAdvance,
		},
	};

})(jQuery, window);


if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs   = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				FNOP    = function() {},
				fBound  = function() {
					return fToBind.apply(this instanceof FNOP ? this : oThis,
								 aArgs.concat(Array.prototype.slice.call(arguments)));
				};

		FNOP.prototype = this.prototype;
		fBound.prototype = new FNOP();

		return fBound;
	};
}
