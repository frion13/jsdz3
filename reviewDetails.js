document.addEventListener("DOMContentLoaded", function () {
  const productsList = document.querySelector(".products-list");
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const groupedReviews = groupReviewsByProduct(reviews);

  groupedReviews.forEach((group) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product", "review");
    productDiv.innerHTML = `
            <h3>${group.product}</h3>
            <button class="toggle-btn">Показать отзывы</button>
            <div class="reviews-list" style="display: none;"></div>
        `;
    productsList.appendChild(productDiv);

    const toggleBtn = productDiv.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", function () {
      const reviewsList = productDiv.querySelector(".reviews-list");
      if (reviewsList.style.display === "none") {
        reviewsList.style.display = "block";
        toggleBtn.textContent = "Скрыть отзывы";
        showReviews(group.reviews, reviewsList, group.product);
      } else {
        reviewsList.style.display = "none";
        toggleBtn.textContent = "Показать отзывы";
        reviewsList.innerHTML = "";
      }
    });
  });
});

function groupReviewsByProduct(reviews) {
  const groupedReviews = [];
  reviews.forEach((review) => {
    const existingGroup = groupedReviews.find(
      (group) => group.product === review.product
    );
    if (existingGroup) {
      existingGroup.reviews.push(review);
    } else {
      groupedReviews.push({ product: review.product, reviews: [review] });
    }
  });
  return groupedReviews;
}

function showReviews(reviews, reviewsContainer, product) {
  reviews.forEach((review) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");
    reviewDiv.innerHTML = `
            <p>${review.review}</p>
            <button class="delete-btn">Удалить</button>
        `;
    reviewsContainer.appendChild(reviewDiv);

    const deleteBtn = reviewDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      const updatedReviews = reviews.filter(
        (item) => item.review !== review.review
      );
      deleteFromLocalStorage(review.review);
      reviewDiv.remove();
      if (updatedReviews.length === 0) {
        reviewsContainer.parentElement.remove();
        deleteProduct(product);
      }
    });
  });
}

function deleteFromLocalStorage(review) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const updatedReviews = reviews.filter((item) => item.review !== review);
  localStorage.setItem("reviews", JSON.stringify(updatedReviews));
}

function deleteProduct(product) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const updatedReviews = reviews.filter((item) => item.product !== product);
  localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  const products = document.querySelectorAll(".product");
  products.forEach((prod) => {
    if (prod.querySelector("h3").textContent === product) {
      prod.remove();
    }
  });
}
