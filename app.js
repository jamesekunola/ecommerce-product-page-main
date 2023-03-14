const mobileMenuBtn = document.querySelector(".hambugar-menu");
const closeMobileMenuBtn = document.querySelector(".close-btn");
const mobileMenuEl = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const nextImg = document.querySelector(".next-img");
const previousImg = document.querySelector(".previous-img");
const imgGallery = document.querySelectorAll(".hero .product-images");
const heroSmlGallery = document.querySelectorAll(".hero .small-product__img");
const modalGallery = document.querySelectorAll(".modal .product-images");
const modalSmlGallery = document.querySelectorAll(
  ".modal-container .small-product__img"
);
const nextBtn = document.querySelectorAll(".next-img");
const prevBtn = document.querySelectorAll(".previous-img");
const imagescontainerEL = document.querySelectorAll(".hero-images");
const modalBoxEl = document.querySelector(".modal");
const closeModalBoxBtn = document.querySelector(".close-modal");
const totalItemEl = document.querySelector(".shopping-num");
const increaseItemBtn = document.querySelector(".addition-btn");
const decreaseItemBtn = document.querySelector(".decrease-btn");
const counterResultEl = document.querySelector(".counter-result");
const cartContainer = document.querySelector(".cart-container");
const checkOutBtn = document.querySelector(".cart-btn");
const cartBtn = document.querySelector(".cart-list");
const emptyCartEl = document.querySelector(".empty-cart");
const cartBoxEl = document.querySelector(".cart-box");
const basketContainer = document.querySelector(".basket-container");
let counter = 0;
let numberOfItem = 0;

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

  //   hide mobile navbar and add overlay
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
    const position = `translateX(-${counter * 100}%)`;
    img.style.transform = position;
  });
  // loop through the modal box gallery
  modalGallery.forEach((img) => {
    const position = `translateX(-${counter * 100}%)`;
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

  heroSmlGallery[counter].classList.add("active");
  modalSmlGallery[counter].classList.add("active");
};

const showNextSlide = () => {
  // increment counter
  counter++;

  // if counter is greater than images length, set counter to images length
  const totalGalleryLenght = imgGallery.length - 1;
  if (counter > totalGalleryLenght) {
    counter = totalGalleryLenght;
  }
  imgPosition();
  addActiveToCurrentlySmallImg();
};

const showPreviousSlide = () => {
  counter--;
  if (counter < 0) {
    counter = 0;
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
      counter = index;
      imgPosition();
      addActiveToCurrentlySmallImg();
    });
  });
  //
  heroSmlGallery.forEach((itm, index) => {
    itm.addEventListener("click", () => {
      counter = index;
      imgPosition();
      addActiveToCurrentlySmallImg();
    });
  });
};

const updateShopingListTotalNumber = () => {};

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

function deleteProduct(btn) {
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
