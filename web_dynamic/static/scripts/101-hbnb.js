$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};

  // ... (same code as 100-hbnb.js for handling checkboxes and API status) ...

  // Show/hide reviews
  $('h2 span').click(function () {
    const reviewList = $('.review-list');
    if ($(this).text() === 'show') {
      $(this).text('hide');
      // Make an AJAX request to fetch reviews and populate the review list
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/places/{{ place.id }}/reviews',
        success: function (reviews) {
          reviews.forEach(function (review) {
            const li = `
              <li>
                <h3>${review.user.first_name} ${review.user.last_name}</h3>
                <p>${review.text}</p>
              </li>
            `;
            reviewList.append(li);
          });
        }
      });
    } else {
      $(this).text('show');
      reviewList.empty(); // Clear the review list
    }
  });

  // Search for places
  $('button').click(function () {
    // ... (same code as 100-hbnb.js for searching places) ...
  });
});
