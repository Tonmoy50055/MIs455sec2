document.addEventListener('DOMContentLoaded', () => {
    var addToCart = document.querySelectorAll('.addcart-btn');

  addToCart.forEach(button => {
       button.addEventListener('click', () => {
           const productName = button.getAttribute('data-product');
                        alert(`${productName} added to cart!`);
        });
    });
});
