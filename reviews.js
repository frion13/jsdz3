const productName = document.querySelector(".product-name");
const reviewText = document.querySelector(".review-text");
const addReviewBtn = document.querySelector(".review-btn");

function addReview(product, text) {
  if (!product || !text) {
    alert("Пожалуйста, заполните все поля перед отправкой.");
    return;
  }
  const id = Date.now();
  const reviewData = {
    id: id,
    product: product,
    review: text,
  };
  saveToLocalStorage(reviewData);
  alert("Отзыв успешно добавлен!");
  productName.value = "";
  reviewText.value = "";
}

function saveToLocalStorage(data) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(data);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

addReviewBtn.addEventListener("click", function () {
  addReview(productName.value, reviewText.value);
});
