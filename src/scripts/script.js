import LazyLoadImages from './lazyload';

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
  
    while (length--) {
      method = methods[length];
  
      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  }());

document.addEventListener("DOMContentLoaded", () => {
    new LazyLoadImages();
});

$(document).ready(function(){
  /* This code is executed after the DOM has been completely loaded */

  $('nav a,footer a.up').click(function(e){

      // If a link has been clicked, scroll the page to the link's hash target:

      $.scrollTo( this.hash || 0, 1500);
      e.preventDefault();
  });

});

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y < 100) {
    $('.sticky-nav').fadeOut();
  } else {
    $('.sticky-nav').fadeIn();
  }
});
