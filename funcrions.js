const productName = document.querySelector(".product-name").value;
const reviewText = document.querySelector(".review-text").value;
const addReviewBtn = document.querySelector(".review-btn");

addReviewBtn.addEventListener("click", function () {
  addReview(productName, reviewText);
});

function addReview(product, text) {
  const errorMessage = document.querySelector(".error-message");
  if (!product || !text) {
    errorMessage.style.display = "block";
  } else {
    const reviewData = {
      product: product,
      review: text,
    };
    saveToLocalStorage(reviewData);
    alert("Отзыв успешно добавлен!");
  }
}

function saveToLocalStorage(data) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(data);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
