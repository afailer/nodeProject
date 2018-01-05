function Logout(rightArea,container){
	this.rightArea=rightArea;
	this.container = container;
	this.init();
}
Logout.btn=`<li><a href="#">注销</a></li>`;
$.extend(Logout.prototype,{
	init:function(){
		this.createDom();	
		this.bindEvents();
	},
	createDom:function(){
		this.logoutBtn=$(Logout.btn);
		this.rightArea.append(this.logoutBtn);
	},
	bindEvents:function(){
		this.logoutBtn.on("click",$.proxy(this.handleBtnClick,this));
	},
	handleBtnClick:function(){
		$.ajax({
			type:"post",
			url:"/AuthRouter/logout",
			success:$.proxy(this.handleLogoutSucc,this)
		});
	},
	handleLogoutSucc:function(res){
		if(res && res.datas && res.datas.logout){
			window.location.reload();	
		}
	}
});
