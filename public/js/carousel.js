function Carousel(obj, indexArr) {
	this.init(obj, indexArr)
}
Carousel.prototype = { 
	//this.prototype.constructor : Carousel,
	init : function(obj, indexArr) {
		var oThis = this;
		this.width = obj.querySelector('a').offsetWidth;

		this.num = 4;
		this.index = 0;
		this.obj = obj;		 
		this.indexArr = indexArr;
		this.timer = null;
		this.autoTminer = setInterval(function(){
			oThis.next()

		}, 3000);
		this.left = this.obj.parentNode.querySelector('.left');
		this.right = this.obj.parentNode.querySelector('.right');
		
		this.left.onclick = function(){
			
			oThis.prev()
			
		};
		this.right.onclick = function() {oThis.next()};
		for (var i=0; i<this.indexArr.length; i++) {
			this.indexArr[i].index = i;
			this.indexArr[i].onclick = function() {
				oThis.index = this.index;
				oThis.move(this.index)
			}
		}
	},
	prev: function(){
		this.index--;
		if (this.index === -1) {
			
			this.index = this.num;
			this.obj.style.left = -this.index*this.Width + 'px';
			this.index--
		}
		
		this.move(this.index)
	},
	next: function() {
		this.index++;
		if (this.index === this.num) {
			this.index = 0;
			this.obj.style.left = 0;
		}
		this.move(this.index)
	},
	move: function(index) {
		var oThis = this;
		var translate = -(index+1)*this.width;
		clearInterval(this.timer);
		
		for(var i=0; i<this.num; i++) {
			
			this.indexArr[i].className = "";
		}
		index === -1 ? index = this.num-1 : '';

		this.indexArr[index].className = "active";
		
		this.timer = setInterval(function(){
			var iSpeed = (translate - oThis.obj.offsetLeft)/6;
			//iSpeed = (iSpeed>0) ? Math.floor(iSpeed) : Math.ceil(iSpeed);
			if (iSpeed === 0) {
				clearInterval(oThis.tmier);
			}
			oThis.obj.style.left = oThis.obj.offsetLeft + iSpeed +'px';
		},60)
	}

}
window.onload = function() {
	var obj = document.getElementById('carousel-main');
	var indexArr = document.getElementById('carousel-index').getElementsByTagName('li');
	
	new Carousel(obj, indexArr)
}