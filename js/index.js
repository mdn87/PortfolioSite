
// --- Fetch content and insert into DOM --- //
fetch('portfolio.json')
  .then(response => response.json())
  .then(data => {
    const homepage = data.homepage;
    
    // Load About Section
    document.getElementById("aboutMe").innerHTML = `
      <h2>${homepage.about.title}</h2>
      <p>${homepage.about.text}</p>
    `;

    // Load Projects
    const projectContainer = document.getElementById("work");
    homepage.projects.forEach(project => {
      projectContainer.innerHTML += `
        <div class="project" onclick="loadProject('${project.id}')">
          <h2>${project.title}</h2>
          <h3>${project.category}</h3>
          <p>${project.description}</p>
          <img src="${project.thumbnail}" alt="${project.title}">
        </div>
      `;
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
  