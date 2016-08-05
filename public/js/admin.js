$(function() {
	$('.del').click(function(e) {

		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)
		
		$.ajax({
			type: 'DELETE',
			url: '/admin/cake/list?id=' + id
		})		
		.done(function(results) {
			console.log(results.success)
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
 
	$('#douban').blur(function() {
		var douban = $(this)
		var id = douban.val()

		if (id) {
			$.ajax({
				url: 'https://api.douban.com/v2/cake/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data) {
					$('#inputTitle').val(data.alt_title)
					$('#inputDoctor').val(data.author[0].name)
					$('#inputCountry').val(data.attrs.country)
					$('#inputLanguage').val(data.attrs.language)
					$('#inputPoster').val(data.image)
					$('#inputYear').val(data.attrs.pubdata)
					$('#inputSummary').val(data.summary)
				}
			})
		}
	})
})

