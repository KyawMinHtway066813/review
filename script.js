document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');

    // Load existing reviews from localStorage
    loadReviews();

    // Handle form submission
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        // Validate and add the new review
        if (name && rating && comment) {
            addReview(name, rating, comment);
            reviewForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    function addReview(name, rating, comment) {
        const review = {
            name: name,
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        // Retrieve existing reviews from localStorage
        const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

        // Add the new review
        existingReviews.push(review);

        // Save the updated reviews to localStorage
        localStorage.setItem('reviews', JSON.stringify(existingReviews));

        // Reload the reviews
        loadReviews();
    }

    function loadReviews() {
        // Retrieve existing reviews from localStorage
        const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

        // Display the reviews
        reviewsContainer.innerHTML = '';
        existingReviews.forEach(function (review) {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            reviewDiv.innerHTML = `
                <p><strong>${review.name}</strong> - ${review.rating} stars</p>
                <p>${review.comment}</p>
                <p class="date">${review.date}</p>
            `;
            reviewsContainer.appendChild(reviewDiv);
        });
    }
});