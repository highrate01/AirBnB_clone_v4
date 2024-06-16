$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};

  // Handle amenities checkboxes
  $('input[type="checkbox"]').click(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).prop('checked') === true) {
      amenities[amenityId] = amenityName;
    } else if ($(this).prop('checked') === false) {
      delete amenities[amenityId];
    }
    const amenityList = Object.values(amenities).join(', ');
    if (amenityList.length > 30) {
      $('.amenities h4').text(amenityList.slice(0, 29) + '...');
    } else {
      $('.amenities h4').text(amenityList);
    }
    if (Object.keys(amenities).length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  // Handle states and cities checkboxes
  $('input[type="checkbox"]').click(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).closest('li').parent().prop('tagName') === 'UL') {
      // State checkbox
      if ($(this).prop('checked') === true) {
        states[id] = name;
      } else if ($(this).prop('checked') === false) {
        delete states[id];
      }
      const stateList = Object.values(states).join(', ');
      if (stateList.length > 30) {
        $('.locations h4').text(stateList.slice(0, 29) + '...');
      } else {
        $('.locations h4').text(stateList);
      }
    } else {
      // City checkbox
      if ($(this).prop('checked') === true) {
        cities[id] = name;
      } else if ($(this).prop('checked') === false) {
        delete cities[id];
      }
    }
  });

  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Search for places
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      success: function (data) {
        $('.places').empty();
        if (data.length === 0) {
          $('.places').append('<p>No places found</p>');
        } else {
          data.forEach(function (place) {
            const article = `
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
              </article>
            `;
            $('.places').append(article);
          });
        }
      }
    });
  });
});
