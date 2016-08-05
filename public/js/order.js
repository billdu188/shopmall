$(function(){
	//.info mousedown点击切换事件变量
	var choose = true;
	//保存送货信息
	$('.saveinfo').click(function(){
		
		var infoData = $('#deliveinfo input').map(function(){
			return ($(this).attr('name')+'='+$(this).val())
		}).get().join('&');
		

		$.ajax({
			type: 'post',
			url:'/deliveinfo',
			data: infoData
		}).done(function(results) {
			if(results.success === 1) {
				var ul = $("<ul>").addClass("info-"+results.deliveinfo._id ).addClass("info").css({
					"width":"200px",
					"height":"100px",
					"backgroundColor": "#F0F0F0",
					"display":"inline-block"
				}).appendTo($('.infolist'));
				
				$("<li/>").css({"color":"green"}).html('姓名：'+results.deliveinfo.name).appendTo(ul);
				$("<li/>").css({"color":"green"}).html('联系方式：'+results.deliveinfo.phone).appendTo(ul);
				$("<li/>").css({"color":"green"}).html('地址：'+results.deliveinfo.address).appendTo(ul);
				$("<input/>").attr({
					type:'button',
					value: '删除',
					class: 'remInfo',
					'data-id': results.deliveinfo._id
				}).appendTo(ul)
			}
		})
	})

	//删除信息
	$('.infolist').on('click','.remInfo',function(e){
		var target = $(e.target);
		var id = target.data('id');
		var info = $('.info-'+id);
		$.ajax({
			type: 'delete',
			url:'/deliveinfo/del?id='+id
		}).done(function(results) {
			if (results.success === 1) {
				info.remove();
			}
		})
	})
	//选择信息
	$('.infolist').on('click','.info',function(){
		
		if(choose) {
			$(this).css({
				"backgroundColor":"red"
			})
			choose = false;
		}else {
			$(this).css({
				"backgroundColor":"#F0F0F0"
			})
			choose = true;
		}
		
	})

	//开发票
	$('.offerbill').click(function(){
		
		if($(this).is(':checked')){
			$('.bill').css("display","block")
		}else{
			$('.bill').css("display","none")
		}
	})
})