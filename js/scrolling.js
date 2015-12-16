// debounce is taken from _underscore.js
// http://underscorejs.org/#debounce
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  return function() {
    context = this;
    args = arguments;
    timestamp = new Date();
    var later = function() {
      var last = (new Date()) - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) result = func.apply(context, args);
    return result;
  };
}

var requesting = false;

var killRequesting = debounce(function () {
  requesting = false;
}, 100);

window.addEventListener("scroll", onScroll, false);

// checks to see that the requesting flag is false before running the animations.
function onScroll() {
  if (!requesting) {
    requesting = true;

    // using requestAnimationFrame browser API to perfomr cheaper animations
    requestAnimationFrame(scroll);
  }

  killRequesting();
}

function scroll() {
  console.log(window.pageYOffset);

  if (requesting) {
    requestAnimationFrame(scroll);
  }
}
