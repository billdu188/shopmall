
$(function(){
	var urlAry = window.location.href.split('/');
	var cakeId = urlAry[urlAry.length-1];
	$('.add-car-btn').click(function() {
		
		$.ajax({
			type: 'POST',
			url: '/shopcar',
			data: {cakeId: cakeId},
			dataType: 'json'
		})
		.done(function(results) {

			if (results.success === 1) {
				//商品总数
				$('.badge').html(results.sumGoods)
				//总价
				$('.sumValue').html(results.sumValues+'元')
			}
		})
	})
	
}) 