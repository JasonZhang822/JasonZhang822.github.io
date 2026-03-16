'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// Filter functionality removed - all projects are now always visible



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalGallery = document.querySelector("[data-project-modal-gallery]");
const projectDots = document.querySelector("[data-project-dots]");
const projectPrevBtn = document.querySelector("[data-project-prev-btn]");
const projectNextBtn = document.querySelector("[data-project-next-btn]");

let currentProjectImages = [];
let currentImageIndex = 0;

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

// function to update gallery display
const updateGallery = function () {
  const images = projectModalGallery.querySelectorAll("img");
  images.forEach((img, index) => {
    if (index === currentImageIndex) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  // update dots
  const dots = projectDots.querySelectorAll(".modal-nav-dot");
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // update button states
  projectPrevBtn.disabled = currentImageIndex === 0;
  projectNextBtn.disabled = currentImageIndex === currentProjectImages.length - 1;
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();

    // get project data
    const title = this.dataset.projectTitle;
    const category = this.dataset.projectCategory;
    const images = JSON.parse(this.dataset.projectImages);

    // set modal content
    projectModalTitle.innerHTML = title;
    projectModalCategory.innerHTML = category;
    currentProjectImages = images;
    currentImageIndex = 0;

    // clear and populate gallery
    projectModalGallery.innerHTML = "";
    projectDots.innerHTML = "";

    images.forEach((imgSrc, index) => {
      // create image
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = title;
      img.loading = "lazy";
      if (index === 0) img.classList.add("active");
      projectModalGallery.appendChild(img);

      // create dot
      const dot = document.createElement("button");
      dot.classList.add("modal-nav-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        currentImageIndex = index;
        updateGallery();
      });
      projectDots.appendChild(dot);
    });

    // update button states
    updateGallery();

    // show modal
    projectModalFunc();
  });
}

// navigation buttons
projectPrevBtn.addEventListener("click", function () {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGallery();
  }
});

projectNextBtn.addEventListener("click", function () {
  if (currentImageIndex < currentProjectImages.length - 1) {
    currentImageIndex++;
    updateGallery();
  }
});

// close modal
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);
