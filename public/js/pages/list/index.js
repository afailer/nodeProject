function Page(){
	console.log("page")
}
$.extend(Page.prototype, {
	init:function(){
		console.log("page init")
		this.createHeader();
		this.createAddPosition();
		this.createPagination();
		this.createPositionList();
		
	}, 
	createHeader:function(){
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer,1);
	},
	createAddPosition:function(){
		var jsContainer = $(".js-container");
		this.addPosition = new AddPosition(jsContainer);
		$(this.addPosition).on("change",$.proxy(this.handleAddPosition,this));
	},
	createPositionList:function(){
		var jsContainer = $(".js-container");
		this.positionList = new PositionList(jsContainer);
		$(this.positionList).on("change",$.proxy(this.handleListChange,this));
	},
	createPagination:function(){
		var pagination = $(".js-pagination");
		this.pagination = new Pagination(pagination);
		$(this.pagination).on("change",$.proxy(this.handlePaginationChange,this));
	},
	handleListChange:function(e){
		this.pagination.setTotal(e.total);
	},
	handlePaginationChange:function(e){
		this.positionList.changePage(e.page);
	},
	handleAddPosition:function(e){
		this.positionList.getListInfo();
	}
})
