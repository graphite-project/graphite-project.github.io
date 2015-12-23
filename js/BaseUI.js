var BaseUI = {
  $window: $(window),
  $anchors: $('#anchors'),
  $siteNavToggle: $('#siteNavToggle'),

  initialize: function() {
    BaseUI.addListeners();
  },

  addListeners: function() {
    BaseUI.$anchors.find('li > a').on('click', BaseUI.anchorClickHandler);
    BaseUI.$window.on('scroll', BaseUI.windowScrollHandler);
    BaseUI.$siteNavToggle.on('click', BaseUI.navToggleClickHandler);
  },

  scrollToSection: function(el) {
    if (location.pathname.replace(/^\//,'') == el.pathname.replace(/^\//,'') && location.hostname == el.hostname) {
      var target = $(el.hash);
      target = target.length ? target : $('[name=' + el.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: (target.offset().top) - 119
        }, 250);
        return false;
      }
    }
  },

  resizeHeader: function() {
    var scroll = BaseUI.$window.scrollTop();
    var $header = $('#pageHeader');

    if (scroll >= 200) {
      $header.addClass('smaller');
    } else {
      $header.removeClass("smaller");
    }
  },

  highlightActiveNav: function() {
    var windscroll = BaseUI.$window.scrollTop();
    if (windscroll >= 200) {
      $('div.anchor').each(function(i) {
        if ($(this).position().top <= windscroll + 120) {
          BaseUI.$anchors.find('li > a.active').removeClass('active');
          BaseUI.$anchors.find('li > a').eq(i).addClass('active');
        }
      });
    } else {
      $('#anchors a.active').removeClass('active');
    }
  },

  toggleMobileMenu: function(el) {
    $(el).toggleClass('nav-open');
    $('#siteNav').toggleClass('nav-open');
    $('body').toggleClass('nav-open');
  },

  anchorClickHandler: function() {
    BaseUI.scrollToSection(this);
  },

  windowScrollHandler: function() {
    BaseUI.resizeHeader();
    BaseUI.highlightActiveNav();
  },

  navToggleClickHandler: function() {
    BaseUI.toggleMobileMenu(this);
  }
}

$(document).ready(BaseUI.initialize);
