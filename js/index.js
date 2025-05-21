
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
    
    // Load About Section
    document.getElementById("aboutMe").innerHTML = `
      <h2>${homepage.about.title}</h2>
      <p>${homepage.about.text}</p>
    `;

  

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
          $('#motionContent').addClass('hide');
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

  // --- Loader --- //
  $(document).ready(function () {
    let currentPage = "home";
    function showLoader() {
      $('.loader').fadeIn(200);
    }
    function hideLoader() {
      $('.loader').fadeOut(200);
    }
  
    // 🏠 Load the homepage initially
    loadHomePage();
  
    // 🔄 Navigation Click Handler
    $('.nav').on('click', function (event) {
      event.preventDefault();
      let pageId = $(this).attr('id');
  
      if (pageId === "home") {
        loadHomePage();
        history.pushState({ page: "home" }, "", "?page=home");
      } else {
        loadProjectPage(pageId);
        history.pushState({ page: pageId }, "", `?page=${pageId}`);
      }
    });
  
    // 🔙 Handle browser back/forward navigation
    window.onpopstate = function (event) {
      if (event.state) {
        if (event.state.page === "home") {
          loadHomePage();
        } else {
          loadProjectPage(event.state.page);
        }
      }
    };
  
    // --- Page content loading--- //
    function loadHomePage() {
      if (currentPage !== "home") {
          clearPage();
          currentPage = "home";
      }
  
      showLoader();
  
      setTimeout(() => {
          fetch('portfolio.json')
              .then(response => response.json())
              .then(data => {
                  let homeData = data.homepage;

                  // Store currently active page before rebuilding nav
                  let currentActive = $('.nav.thumb.active').attr('id'); 

                  // 🔹 Add Home Thumbnail
                  let navHTML = `
                      <div class="nav-item">
                          <img src="${homeData.thumbnail}" alt="Home" class="nav thumb active" id="home">
                      </div>
                  `;
                  // 🔹 Add Project Thumbnails
                  homeData.projects.forEach(project => {
                    navHTML += `
                        <div class="nav-item">
                            <img src="${project.thumbnail}" alt="${project.title}" class="nav thumb" id="${project.id}">
                        </div>
                    `;
                  });

                  // inject thumbnails into nav
                  $('#navBar').html(navHTML);

                  // Reapply active state to the ccurrent thumbnail
                  if (currentActive) {
                    $('#' + currentActive).addClass('active');
                  }

                  // Attach Click Events to Project Thumbnails
                  $('.nav.thumb').on('click', function () {
                    $('.nav.thumb').removeClass('active');
                    $(this).addClass('active');
                
                    let pageId = $(this).attr('id');
                    if (pageId === "home") {
                        loadHomePage();
                    } else {
                        loadProjectPage(pageId);
                    }
                  });
  
                  // 💡 Regenerate homeContent structure
                  $('#homeContent').html(`
                      <div id="aboutMe"></div>
                      <div id="skills"></div>
                      <div id="work"></div>
                  `).removeClass('hide').addClass('fade-in');
  
                  // Populate About Me
                  $('#aboutMe').html(`<h2>${homeData.about.title}</h2><p>${homeData.about.text}</p>`);
  
                  // Populate Skills
                  let skillsHTML = `
                      <h1>${homeData.skills.title}</h1>
                      <div class="line"></div>
                      <h2>Tools</h2><p>${homeData.skills.tools}</p>
                      <h2>Soft Skills</h2><p>${homeData.skills.soft_skills}</p>
                      <h2>Design Skills</h2><p>${homeData.skills.design_skills}</p>
                  `;
                  homeData.skills.education.forEach(edu => {
                      skillsHTML += `<h2>${edu.degree}</h2><div class="line"></div><h3>${edu.institution}</h3><p>${edu.description}</p>`;
                  });
                  $('#skills').html(skillsHTML);
  
                  // Populate Projects
                  let workHTML = `<h1>UX Work</h1><div class="line"></div>`;
                  homeData.projects.forEach(project => {
                      workHTML += `
                          <div class="project">
                              <div class="projTitle">
                                  <h2>${project.title}</h2><h3>${project.category}</h3>
                              </div>
                              <div class="projDesc"><p>${project.description}</p></div>
                              <div class="projImg">
                                  <p><img id="${project.id}" src="${project.thumbnail}" class="nav project-link"></p>
                              </div>
                          </div>
                      `;
                  });
                  $('#work').html(workHTML);
  
                  hideLoader();
              })
              .catch(error => {
                  console.error("Error loading JSON:", error);
                  hideLoader();
              });
      }, 300);
  }
  
  function loadProjectPage(projectId) {
    if (currentPage !== projectId) {
      clearPage();
      currentPage = projectId;
    }

    showLoader();

    setTimeout(() => {
      fetch('portfolio.json')
        .then(response => response.json())
        .then(data => {
          let project = data.projects.find(p => p.id === projectId);

          if (!project) {
            console.error("Project not found!");
            hideLoader();
            return;
          }

          let projectHTML = `
            <div class="pTitle fade-in">
              <h1>${project.title}</h1><p>${project.overview}</p>
              <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="sections">
          `;

          project.sections.forEach(section => {
            projectHTML += `
              <div class="pSection fade-in">
                <h2>${section.title}</h2><p>${section.text}</p>
                <img src="${section.image}" alt="${section.title}">
              </div>
            `;
          });

          projectHTML += `</div>`;
          $('#portfolioContent').html(projectHTML).removeClass('hide').addClass('fade-in');

          hideLoader();
        })
        .catch(error => {
          console.error("Error loading JSON:", error);
          hideLoader();
        });
    }, 300);
  }

  function clearPage() {
    $(window).scrollTop(0);
    $('#homeContent').addClass('fade-out').empty().addClass('hide');
    $('#portfolioContent').addClass('fade-out').empty().addClass('hide');
  }

  // 🚀 On page load, check if a project is in the URL (deep linking)
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');

  if (pageParam && pageParam !== "home") {
    loadProjectPage(pageParam);
  } else {
    loadHomePage();
  }
});
  