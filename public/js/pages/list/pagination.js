function Pagination(container){
	this.container=container;
	this.currentPage=0;
	this.bindEvents();
}
$.extend(Pagination.prototype,{
	setTotal:function(total){
		this.createDom(total);
	},
	handleClick:function(e){
		var target = $(e.target),
			page = parseInt(target.text(),10);
		this.currentPage=page-1;
		$(this).trigger(new $.Event('change',{
			page:page
		}));
	},
	createDom:function(total){
		var str = "";
		for (var i = 1; i <= total; i++) {
			str += `<li><a href="javascript:;">${i}</a></li>`
		}
		this.container.html(str);
		this.resetPage();
	},
	resetPage:function(){
		console.log(this.currentPage);
		var lis = this.container.find("li");
		lis.eq(this.currentPage).addClass('active').siblings().removeClass('active');
	},
	bindEvents:function(e){
		this.container.on("click",$.proxy(this.handleClick,this));
	}
});