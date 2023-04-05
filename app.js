// Selectors
const mobileMenuBtn = document.querySelector(".hambugar-menu"); // Selecting hamburger menu button
const closeMobileMenuBtn = document.querySelector(".close-btn"); // Selecting close button of mobile menu
const mobileMenuEl = document.querySelector(".mobile-menu"); // Selecting mobile menu
const overlay = document.querySelector(".overlay"); // Selecting overlay
const nextImg = document.querySelector(".next-img"); // Selecting next button of image gallery
const previousImg = document.querySelector(".previous-img"); // Selecting previous button of image gallery
const imgGallery = document.querySelectorAll(".hero .product-images"); // Selecting all product images in the hero section
const heroSmlGallery = document.querySelectorAll(".hero .small-product__img"); // Selecting all small product images in the hero section
const modalGallery = document.querySelectorAll(".modal .product-images"); // Selecting all product images in the modal box
const modalSmlGallery = document.querySelectorAll(
  ".modal-container .small-product__img"
); // Selecting all small product images in the modal box
const nextBtn = document.querySelectorAll(".next-img"); // Selecting all next buttons in the hero section
const prevBtn = document.querySelectorAll(".previous-img"); // Selecting all previous buttons in the hero section
const imagescontainerEL = document.querySelectorAll(".hero-images"); // Selecting image containers in the hero section
const modalBoxEl = document.querySelector(".modal"); // Selecting modal box
const closeModalBoxBtn = document.querySelector(".close-modal"); // Selecting close button of modal box
const totalItemEl = document.querySelector(".shopping-num"); // Selecting total number of items in cart
const increaseItemBtn = document.querySelector(".addition-btn"); // Selecting increase button in the cart
const decreaseItemBtn = document.querySelector(".decrease-btn"); // Selecting decrease button in the cart
const counterResultEl = document.querySelector(".counter-result"); // Selecting result of the currentSlideIndex
const cartContainer = document.querySelector(".cart-container"); // Selecting cart container
const checkOutBtn = document.querySelector(".cart-btn"); // Selecting checkout button
const cartBtn = document.querySelector(".cart-list"); // Selecting cart list
const emptyCartEl = document.querySelector(".empty-cart"); // Selecting empty cart message
const cartBoxEl = document.querySelector(".cart-box"); // Selecting cart box
const basketContainer = document.querySelector(".basket-container"); // Selecting basket container

// Variables
let currentSlideIndex = 0; // counter variable for the image gallery
let numberOfItem = 0; // Number of items in cart

// functions
// mobile nav
const hideMobileMenu = () => {
  mobileMenuEl.classList.remove("show-mobile__menu");
  overlay.classList.remove("active-overlay");
};

const displayMobileNav = () => {
  // show mobile navbar and add overlay
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuEl.classList.add("show-mobile__menu");
    overlay.classList.add("active-overlay");
  });

  //   hide mobile navbar and remove overlay
  closeMobileMenuBtn.addEventListener("click", hideMobileMenu);
};
// mobile nav end

// image gallery
const arrangeGallery = (images) => {
  images.forEach((items, index) => {
    items.style.left = `${index * 100}%`;
  });
};

const imgPosition = () => {
  // loop through the img
  imgGallery.forEach((img) => {
    const position = `translateX(-${currentSlideIndex * 100}%)`;
    img.style.transform = position;
  });
  // loop through the modal box gallery
  modalGallery.forEach((img) => {
    const position = `translateX(-${currentSlideIndex * 100}%)`;
    img.style.transform = position;
  });
};

const addActiveToCurrentlySmallImg = () => {
  // remove the actice class from the previously selected small img
  const previouslyActiveimgAll = document.querySelectorAll(
    ".small-product__img.active"
  );

  previouslyActiveimgAll.forEach((img) => {
    img.classList.remove("active");
  });

  heroSmlGallery[currentSlideIndex].classList.add("active");
  modalSmlGallery[currentSlideIndex].classList.add("active");
};

const showNextSlide = () => {
  // increment currentSlideIndex
  currentSlideIndex++;

  // if currentSlideIndex is greater than images length, set currentSlideIndex to images length
  const totalGalleryLenght = imgGallery.length - 1;
  if (currentSlideIndex > totalGalleryLenght) {
    currentSlideIndex = totalGalleryLenght;
  }
  imgPosition();
  addActiveToCurrentlySmallImg();
};

const showPreviousSlide = () => {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = 0;
  }
  imgPosition();
  addActiveToCurrentlySmallImg();
};

const renderSlider = () => {
  imagescontainerEL.forEach((controlsBtn) => {
    controlsBtn.addEventListener("click", (event) => {
      // show next image slide
      if (event.target.closest("button.next-img")) {
        showNextSlide();
      }
      // show previous image slide
      else if (event.target.closest("button.previous-img")) {
        showPreviousSlide();
      }
      // display modal box if the window browser is greater than 800px
      else {
        if (window.innerWidth > 800) {
          modalBoxEl.classList.add("active");
          overlay.classList.add("active-overlay");
        }
      }
    });
  });
};

const showSelectedimg = () => {
  //
  modalSmlGallery.forEach((itm, index) => {
    itm.addEventListener("click", () => {
      currentSlideIndex = index;
      imgPosition();
      addActiveToCurrentlySmallImg();
    });
  });
  //
  heroSmlGallery.forEach((itm, index) => {
    itm.addEventListener("click", () => {
      currentSlideIndex = index;
      imgPosition();
      addActiveToCurrentlySmallImg();
    });
  });
};

const renderCheckList = () => {
  basketContainer.innerHTML = ` 
  <div class="flex basket-info">
  <img src="/images/image-product-1-thumbnail.jpg" alt="shoe">

  <!-- cart product and desc -->
  <div class="flex product-desc">
    <div class="info-text">
      <p>Fall Limited Edition Sneakers </p>
      <p> $125.00 x
        <span class="total-item">${numberOfItem}</span>
        <span class="total-price">$${numberOfItem * 125.0}.00</span>
      </p>
    </div>
    <button class="delete-product" onclick = "deleteProduct(this)">
      <img src="/images/icon-delete.svg" alt="delete icon">
    </button>
  </div>
</div>`;
};

function deleteProduct() {
  numberOfItem = 0; // reset numberofitem
  counterResultEl.innerHTML = numberOfItem;

  totalItemEl.classList.remove("visible");
  emptyCartEl.classList.remove("hide");
  cartBoxEl.classList.remove("show");
}

// event listener
addEventListener("DOMContentLoaded", () => {
  displayMobileNav();
  arrangeGallery(imgGallery);
  arrangeGallery(modalGallery);
  renderSlider();
  showSelectedimg();
});

closeModalBoxBtn.addEventListener("click", () => {
  modalBoxEl.classList.remove("active");
  overlay.classList.remove("active-overlay");
});

increaseItemBtn.addEventListener("click", () => {
  numberOfItem++;
  counterResultEl.innerHTML = numberOfItem;
});

decreaseItemBtn.addEventListener("click", () => {
  numberOfItem--;
  if (numberOfItem <= 0) {
    numberOfItem = 0;
  }
  counterResultEl.innerHTML = numberOfItem;
});

checkOutBtn.addEventListener("click", () => {
  if (numberOfItem > 0) {
    totalItemEl.classList.add("visible");
    emptyCartEl.classList.add("hide");
    cartBoxEl.classList.add("show");
    renderCheckList();
  } else {
    totalItemEl.classList.remove("visible");
    emptyCartEl.classList.remove("hide");
    cartBoxEl.classList.remove("show");
  }

  totalItemEl.innerHTML = numberOfItem;
});

cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

// hide cart box when click event is outside.
document.addEventListener("click", (event) => {
  if (
    !cartContainer.contains(event.target) &&
    !cartBtn.contains(event.target)
  ) {
    cartContainer.classList.remove("active");
  }
});
