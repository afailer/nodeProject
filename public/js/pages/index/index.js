function Page(){
	console.log("page")
}
$.extend(Page.prototype, {
	init:function(){
		console.log("page init")
		this.createHeader();
	}, 
	createHeader:function(){
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer,0);
	}
})
