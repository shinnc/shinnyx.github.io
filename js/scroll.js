// Cache selectors
var lastId,
    topMenu = $("#site-nav"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("ul a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      o = href === "#" ? 0 : $(href).offset().top-topMenuHeight+90;
  $('html, body').stop().animate({
      scrollTop: o
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});

$(document).ready(function(){
  initToggleableMenu();
});

$(window).on('resize', function() {
  initToggleableMenu();
});

initToggleableMenu = function() {
  $('.js-menu').on('click', function(e){
    // See http://stackoverflow.com/a/21053259
    e.stopImmediatePropagation();
    toggleMenu();
  });

  $('#site-nav li a').on('click', function(e){
    e.stopImmediatePropagation();
    toggleMenu();
  });
}

toggleMenu = function() {
  if ( $(window).width() < 961 ) {
    $('div[data-shift]').toggleClass('shift');
    $('div[data-shift-nav]').toggleClass('shift-nav');
    $('hr[data-shift-line]').toggleClass('shift-line');
  }
}
