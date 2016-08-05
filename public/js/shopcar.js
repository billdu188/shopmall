$(function() {
	

	$('.plus').click(function(e){
		
		var target = $(e.target)
		var id = target.data('id')
		var numGoods = $('.numGoods-'+id).val();
		if (id) {
			$.ajax({
				type: 'post',
				url: '/shopcar/list/plus',
				data: {cakeId: id},
				dataType: 'json'
			})
			.done(function(results) {
				
				if (results.success === 1) {

					numGoods++;
					$('.numGoods-'+id).val(numGoods);
					//小计
					$('.oneTotal-'+id).html('￥'+results.oneValue+'元')
					//总价
					$('.sumValue').html(results.sumValue+'元')
					//购物车商品数量
					$('.badge').html(results.sumGoods)

				}
			})
			
		}
		
	})

	$('.minus').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var numGoods = $('.numGoods-'+id).val();
		if (id && numGoods>1) {
			$.ajax({
				type: 'post',
				url: '/shopcar/list/minus',
				data: {cakeId: id},
				dataType: 'json'
			})
			.done(function(results) {
				if (results.success === 1) {
					numGoods--;
					$('.numGoods-'+id).val(numGoods);
					//小计
					$('.oneTotal-'+id).html('￥'+results.oneValue+'元')
					//总价
					$('.sumValue').html(results.sumValue+'元')
					//购物车商品数量
					$('.badge').html(results.sumGoods)
				}
			})
			
		}
	})

	$('.del').click(function(e) {
		
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)
		
		$.ajax({
			type: 'DELETE',
			url: '/shopcar/list?id=' + id
		})		
		.done(function(results) {
			console.log(results.success)
			if (results.success === 1) {
				if (tr.length > 0) {
					console.log(id)
					tr.remove()
				}
				//总价
				$('.sumValue').html(results.sumValue+'元')
				//购物车商品数量
				$('.badge').html(results.sumGoods)
			}
		})
	})
})