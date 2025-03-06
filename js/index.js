

// Hover projects in navigation
$(document).ready(function() {
  $('.nav').hover(function(){
    if(!$(this).hasClass('active')){
      $(this).addClass('highlight');
    }
  }, function() {
    if(!$(this).hasClass('active')){
      $(this).removeClass('highlight');
    }
  });

// Zoom case study images
  $('.zImg').on('click', function(){
    
    if(!$(this).hasClass('zoomed')){
      console.log('Clicked zImg');
      $(this).addClass('zoomed');
      var bigImg = $(this).attr('src');
      zoomImage(bigImg);
    }else{
      console.log('Clicked Off zImg');
      $(this).removeClass('zoomed');
      //zoomClose;
    }
    function zoomImage(bigImgSrc) {
      // create a new div element
      const newDiv = document.createElement("zDiv");
      // and give it some content
      $('.zDiv').attr("src", bigImgSrc);
      // add the text node to the newly created div
      $('body').append('.zDiv');
      //newDiv.appendChild(newContent);
      // add the newly created element and its content into the DOM
      //const currentDiv = document.getElementById("div1");
      //document.body.insertBefore(newDiv, currentDiv);
    }
  });
  

  

// Animate nav and load project page on click
  var currentPage = 0;
  $('.nav').on('click', function(){
    console.log("nav clicked");
    //var clickedPage = $(this);
    if(!$(this).hasClass('active')){
      $(this).addClass('click');
      //$(this).addClass('active');
      if($(this).is('#home')){
        $('#home').addClass('active');
        loadPage(0);
      }
      if($(this).is('#proj1')){
        $('#proj1').addClass('active');
        loadPage(1);
      }
      if($(this).is('#proj2')){
        $('#proj2').addClass('active');
        loadPage(2);
      }
      if($(this).is('#proj3')){
        $('#proj3').addClass('active');
        loadPage(3);
      }
      if($(this).is('#motion')){
        $('#motion').addClass('active');
        loadPage(4);
      }
    }
    //project buttons on home page
    if($('#home').hasClass('active')){
      if($(this).is('#proj1_link')){
        $('#home').removeClass('active');
        $('#proj1').addClass('active');
        $('#proj1').addClass('click');
        $('#proj1').addClass('highlight');
        loadPage(1);
      }
      if($(this).is('#proj2_link')){
        $('#home').removeClass('active');
        $('#proj2').addClass('active');
        $('#proj2').addClass('click');
        $('#proj2').addClass('highlight');
        loadPage(2);
      }
      if($(this).is('#proj3_link')){
        $('#home').removeClass('active');
        $('#proj3').addClass('active');
        $('#proj3').addClass('click');
        $('#proj3').addClass('highlight');
        loadPage(3);
      }
      if($(this).is('#motion_link')){
        $('#home').removeClass('active');
        $('#motion').addClass('active');
        $('#motion').addClass('click');
        $('#motion').addClass('highlight');
        loadPage(3);
      }
    }
    function loadPage(pageNumber){
      if(pageNumber == currentPage){
        //do nothing
      } else if(pageNumber == 0){
        clearPage();
        currentPage = 0;
        waypointPage(currentPage);
        $('#p0Content').removeClass('hide');
      } else if(pageNumber == 1){
        clearPage();
        currentPage = 1;
        waypointPage(currentPage);
        $('#p1Content').removeClass('hide');
      } else if(pageNumber == 2){
        clearPage();
        currentPage = 2;
        waypointPage(currentPage);
        $('#p2Content').removeClass('hide');
      } else if(pageNumber == 3){
        clearPage();
        currentPage = 3;
        waypointPage(currentPage);
        $('#p3Content').removeClass('hide');
      } else if(pageNumber == 4){
        clearPage();
        currentPage = 4;
        waypointPage(currentPage);
        $('#motionContent').removeClass('hide');
      }
      function clearPage(){
        $(window).scrollTop(0);
        Waypoint.destroyAll(); //console.log('Destroy all waypoints');
        if(currentPage == 0){
          $('#p0Content').addClass('hide');
          $('#home').removeClass('highlight');
          $('#home').removeClass('click');
          $('#home').removeClass('active');
        }
        if(currentPage == 1){
          $('#p1Content').addClass('hide');
          $('#proj1').removeClass('highlight');
          $('#proj1').removeClass('click');
          $('#proj1').removeClass('active');
        }
        if(currentPage == 2){
          $('#p2Content').addClass('hide');
          $('#proj2').removeClass('highlight');
          $('#proj2').removeClass('click');
          $('#proj2').removeClass('active');
        }
        if(currentPage == 3){
          $('#p3Content').addClass('hide');
          $('#proj3').removeClass('highlight');
          $('#proj3').removeClass('click');
          $('#proj3').removeClass('active');
        }
        if(currentPage == 4){
          $('#p4Content').addClass('hide');
          $('#motion').removeClass('highlight');
          $('#motion').removeClass('click');
          $('#motion').removeClass('active');
        }
      }
    }
  })
});

// Sidebar scroller
$(document).ready(function() {
  $(window).scroll(function(event){
    //console.log($(window).scrollTop()); //use for ratio
    var scrollPos = ($(window).scrollTop() / 9);
    if(scrollPos < 400){
      $('#mainDot1').css('top', scrollPos);
      $('#mainDot2').css('top', scrollPos);
      $('#mainDot3').css('top', scrollPos);
    } else {
      $('#mainDot1').css('top', 410);
      $('#mainDot2').css('top', 410);
      $('#mainDot3').css('top', 410);
    }
    
    //console.log($('#mainDot').top);
  });
});


// Draggable jQuery-UI
$(document).ready(function() {
  $(function() { 
    $('#mainDot1').draggable({
      containment: '#dotContain1',
    });
  });
  $("#mainDot1").on("drag", function(event, ui) {
    var thisChanges = (ui.position.top * 9);
    $(window).scrollTop(thisChanges)
    //console.log(ui);
  } );

  $(function() { 
    $('#mainDot2').draggable({
      containment: '#dotContain2',
    });
  });
  $("#mainDot2").on("drag", function(event, ui) {
    var thisChanges = (ui.position.top * 9);
    $(window).scrollTop(thisChanges)
    //console.log(ui);
  } );

  $(function() { 
    $('#mainDot3').draggable({
      containment: '#dotContain3',
    });
  });
  $("#mainDot3").on("drag", function(event, ui) {
    var thisChanges = (ui.position.top * 9);
    $(window).scrollTop(thisChanges)
    //console.log(ui);
  } );
});

// Sidebar collapse on scroll
// Waypoint Library jQuery
// http://imakewebthings.com/waypoints/guides/jquery-zepto/

function waypointPage(pageNumber) {
  console.log('Waypoint page #: ' + pageNumber);
  var thisSection = $('#p' + pageNumber + 'Content');
  
  $(document).ready(function() {
    var waypoint0 = new Waypoint({
      element: $('#p' + pageNumber + 's0'),
      handler: function() {
        // Do nothing
        console.log('No Waypoints Yet');
        $('.dots1').removeClass('hide');
        $('.dots2').removeClass('hide');
        $('.dots3').removeClass('hide');
        $('.dots4').removeClass('hide');
        $('.dots5').removeClass('hide');
        $('.dots6').removeClass('hide');

      }
    })
    var waypoint1 = new Waypoint({
      element: $('#p' + pageNumber + 's1'),
      handler: function() {
        console.log('Waypoint 1');
        if($('.dots1').hasClass('hide')){
          $('.dots1').removeClass('hide');
        } else {
          $('.dots1').addClass('hide');
        }
        if($('.btn1').hasClass('navFocus')){
          $('.btn1').removeClass('navFocus');
        } else {
          $('.btn1').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
    var waypoint2 = new Waypoint({
      element: $('#p' + pageNumber + 's2'),
      handler: function() {
        console.log('Waypoint 2');
        if($('.dots2').hasClass('hide')){
          $('.dots2').removeClass('hide');
        } else {
          $('.dots2').addClass('hide');
        }
        if($('.btn2').hasClass('navFocus')){
          $('.btn2').removeClass('navFocus');
        } else {
          $('.btn2').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
    var waypoint3 = new Waypoint({
      element: $('#p' + pageNumber + 's3'),
      handler: function() {
        console.log('Waypoint 3');
        if($('.dots3').hasClass('hide')){
          $('.dots3').removeClass('hide');
        } else {
          $('.dots3').addClass('hide');
        }
        if($('.btn3').hasClass('navFocus')){
          $('.btn3').removeClass('navFocus');
        } else {
          $('.btn3').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
    var waypoint4 = new Waypoint({
      element: $('#p' + pageNumber + 's4'),
      handler: function() {
        console.log('Waypoint 4');
        if($('.dots4').hasClass('hide')){
          $('.dots4').removeClass('hide');
        } else {
          $('.dots4').addClass('hide');
        }
        if($('.btn4').hasClass('navFocus')){
          $('.btn4').removeClass('navFocus');
        } else {
          $('.btn4').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
    var waypoint5 = new Waypoint({
      element: $('#p' + pageNumber + 's5'),
      handler: function() {
        console.log('Waypoint 5');
        if($('.dots5').hasClass('hide')){
          $('.dots5').removeClass('hide');
        } else {
          $('.dots5').addClass('hide');
        }
        if($('.btn5').hasClass('navFocus')){
          $('.btn5').removeClass('navFocus');
        } else {
          $('.btn5').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
    var waypoint6 = new Waypoint({
      element: $('#p' + pageNumber + 's6'),
      handler: function() {
        console.log('Waypoint 6');
        if($('.dots6').hasClass('hide')){
          $('.dots6').removeClass('hide');
        } else {
          $('.dots6').addClass('hide');
        }
        if($('.btn6').hasClass('navFocus')){
          $('.btn6').removeClass('navFocus');
        } else {
          $('.btn6').addClass('navFocus');
        }
      }, offset: 'bottom-in-view'
    })
  })
};


// Sidebar buttons
$(document).ready(function() {
  $(".btn0").click(function() {
    $("html").animate({
        scrollTop: $("#p1s0").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn1").click(function() {
    $("html").animate({
        scrollTop: $("#p1s1").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn2").click(function() {
    $("html").animate({
        scrollTop: $("#p1s2").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn3").click(function() {
    $("html").animate({
        scrollTop: $("#p1s3").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn4").click(function() {
    $("html").animate({
        scrollTop: $("#p1s4").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn5").click(function() {
    console.log("Click to Section 2");
    $("html").animate({
        scrollTop: $("#p1s5").offset().top -220
      }, 800 //speed
    );
  });
  $(".btn6").click(function() {
    console.log("Click to Section 2");
    $("html").animate({
        scrollTop: $("#p1s6").offset().top -220
      }, 800 //speed
    );
  });
});

// Hero animation
$(document).ready(function() {   
    function animateCloud1() {
        $('#cloud1').animate({
            'right':'-200px'
        }
            ,52000, 'linear'
        )
        .animate(
            {'right':'1600px'}
            ,1
            ,animateCloud1
        ); 
    }
    animateCloud1();
}); 
$(document).ready(function() {   
    function animateCloud2() {
        $('#cloud2').animate({
            'left':'1400px'
        }
            ,25000, 'linear'
        )
        .animate(
            {'left':'100px'}
            ,1, 'linear'
            ,animateCloud2
        ); 
    }
    animateCloud2();
}); 

