var navVisible = false;
$('#menu').click(function(e){
  if(navVisible){
    navVisible = false;
    $('nav').removeClass('open');
  } else {
    navVisible = true;
    $('nav').addClass('open');
  }
});

$('main').click(function(e){
  if(navVisible){
    navVisible = false;
    $('nav').removeClass('open');
  }
});

var resizing = false;
$(window).on('resize', function(){
 if( !resizing ) {
 	window.requestAnimationFrame(moveNavigation);
 	resizing = true;
 }
});


function moveNavigation(){
  if($(window).width()>1023){
    $('nav').removeClass('open');
    navVisible = false;

  }
  resizing = false;
}



// Cache selectors
var lastId,
    menu = $("#menu-items"),
    // All list items
    menuItems = menu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop();

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop + 100)
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
