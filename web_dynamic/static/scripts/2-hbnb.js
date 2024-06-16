$(document).ready(function () {
	const amenities = {};
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
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	if (data.status === 'OK') {
		$('#api_status').addClass('available');
	} else {
		$('#api_status').removeClass('available');
	}
});
