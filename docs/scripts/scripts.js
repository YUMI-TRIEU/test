/**
 * @name Site.
 * @author Hang Trieu.
 * @date 2017-05-29.
 * @description Define global variables and functions.
 * @version 1.0
 */
var siteGlobal = (function($, window, undefined) {
  var $document = $(document),
      $Body = $('body'),
      $win = $('window'),
      CssClass = {
        // active: 'active fadeIn animated',
        active: 'active',
      },
      toogleActiveClassAdvance = function(clickEl, activeEl) {
        if(!activeEl) {
          activeEl = clickEl;
        }

        cssClassActive = CssClass.active;

        clickEl.on('click', function() {
          activeEl.toggleClass(cssClassActive);
        });
      };

      var $container = $('ul[data-tabs-ios] li'),
          $item = $('ul[data-tabs-ios] li a');

      $(window).on("resize load", function() {
        $item.css("height", "auto");
        setHeight($item);
      });

      function setHeight(item) {
        var maxHeight = 0;
        item.each(function(){
          maxHeight = $(this).height() > maxHeight? $(this).height() : maxHeight;
        });
        item.height(maxHeight);
      }

      // Prevent scrolling when user clicks on the tab
      $('.partner-tab .nav-tabs li a').click(function(e){
        jQuery( 'html, body' ).stop();
      });

      // Add class active for menu
      var get_item = $('.custome-header-block .menu li'),
          get_btn_menu = $('.custome-header-block .toogle-menu'),
          get_header_element = $('.custome-header-block'),
          get_menu_element_m = $('.custome-header-block .inner, .custome-header-block .toogle-menu');
      function addClassActive(item,element) {
        item.on('click',function() {
          element.toggleClass('active');
        });
      }
      addClassActive(get_btn_menu,get_header_element);
      get_item.each(function() {
        $(this).on('click', function() {
          $(this).addClass('show').siblings().removeClass('show');
        });
      });
      $('body,html').on('click', function() {
        get_header_element.removeClass('active');
      });
      get_menu_element_m.on('click',function(e) {
        e.stopPropagation();
      });
      //End add class Active
      
      if ($(window).width() < 768) {
        $('.custome-header-block .contact-us-btn').on('click', function() {
          get_header_element.removeClass('active');
        });
      }
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
/**
 *  @name meetUpPopup
 *  @description Toogle show - hide popup.
 *  @version 1.0
 *  @author Hang Trieu
 *  @date 2017-10-17
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'meetUp';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          closePopupEl = $('[data-meetUp-close]'),
          activeOverlay = $('[data-overlay]'),
          meetUpBtn = $('[data-meetUp-btn]'),
          activeEl = $('[data-meetUp-content]');

      siteGlobal.Func.toogleActiveClassAdvance(el, activeEl);
      siteGlobal.Func.toogleActiveClassAdvance(el, activeOverlay);
      siteGlobal.Func.toogleActiveClassAdvance(closePopupEl, activeEl);
      siteGlobal.Func.toogleActiveClassAdvance(closePopupEl, activeOverlay);
      siteGlobal.Func.toogleActiveClassAdvance(meetUpBtn, activeEl);
      siteGlobal.Func.toogleActiveClassAdvance(meetUpBtn, activeOverlay);
      el.on('click', function() {
        $('.toogle-menu').trigger('click');
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function(){
      // to do
    });
  });

}(jQuery, window));

/**
 *  @name menu
 *  @description Toogle show - hide menu on mobile version.
 *  @version 1.0
 *  @author Hang Trieu
 *  @date 2017-10-17
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'menu';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          activeEl = $('[data-menu-content]');
      siteGlobal.Func.toogleActiveClassAdvance(el, activeEl);
      $('.menu a').on('click', function() {
        $('.toogle-menu').trigger('click');
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function(){
      // to do
    });
  });

}(jQuery, window));

/**
 *  @name number counter
 *  @description jQuery Animated Number Counter From Zero To Value - Javascript Animation.
 *  https://codepen.io/shivasurya/pen/FatiB
 *  @version 1.0
 *  @author Hang Trieu
 *  @date 2017-10-19
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'number-counter';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          counterNumber = el.find($('.number'));

        setTimeout(function() {
          counterNumber.each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
          });        
        }, 2000);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function(){
      // to do
    });
  });

}(jQuery, window));

/**
 *  @name slider-1.
 *  @author Hang Trieu.
 *  @date 2018-08-06.
 *  @description Slider plugin.
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider-1';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      if(el.length) {
         el.slick({
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
          prevArrow:"<a href='javascript:void(0);' class='slick-prev prev-btn' title='Slick prev'> <i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
          nextArrow:"<a href='javascript:void(0);' class='slick-next next-btn' title='Slick next'> <i class='fa fa-chevron-right' aria-hidden='true'></i></a>"
        });
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name slider-2.
 *  @author Hang Trieu.
 *  @date 2018-08-06.
 *  @description Slider plugin.
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider-2';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      if(el.length) {
         el.slick({
          infinite: true,
          speed: 300,
          cssEase: 'ease',
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
          prevArrow:"<a href='javascript:void(0);' class='slick-prev prev-btn' title='Slick prev'> <i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
          nextArrow:"<a href='javascript:void(0);' class='slick-next next-btn' title='Slick next'> <i class='fa fa-chevron-right' aria-hidden='true'></i></a>"
        });
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name Slider-3.
 *  @author Hang Trieu.
 *  @date 2017-08-12.
 *  @description Slider plugin.
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider-3';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      if(el.length) {
         el.slick({
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
          prevArrow:"<a href='javascript:void(0);' class='slick-prev prev-btn' title='Slick prev'> <i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
          nextArrow:"<a href='javascript:void(0);' class='slick-next next-btn' title='Slick next'> <i class='fa fa-chevron-right' aria-hidden='true'></i></a>"
        });
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name Slider.
 *  @author Hang Trieu.
 *  @date 2017-10-17.
 *  @description Slider plugin.
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      if(el.length) {
         el.slick({
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
          prevArrow:"<a href='javascript:void(0);' class='slick-prev prev-btn' title='Slick prev'> <i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
          nextArrow:"<a href='javascript:void(0);' class='slick-next next-btn' title='Slick next'> <i class='fa fa-chevron-right' aria-hidden='true'></i></a>"
        });
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        if(window.console) {
         console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
