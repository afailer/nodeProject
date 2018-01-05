function Header(HeaderContainer,index){
	this.selectedIndex=index;
	this.HeaderContainer=HeaderContainer;
	this.init();
}
Header.template=`<nav class="navbar navbar-default">
				  <div class="container-fluid">
				    <!-- Brand and toggle get grouped for better mobile display -->
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
				      <a class="navbar-brand" href="#">拉勾网后台</a>
				    </div>
				
				    <!-- Collect the nav links, forms, and other content for toggling -->
				    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav js-left">
				        <li><a href="/index.html">首页 <span class="sr-only">(current)</span></a></li>
				        <li><a href="/list.html">列表页</a></li>
				      </ul>
				      <ul class="nav navbar-nav navbar-right js-right">
				        
				      </ul>
				    </div><!-- /.navbar-collapse -->
				  </div><!-- /.container-fluid -->
				</nav>`
$.extend(Header.prototype,{
	init:function(){
		this.createDom();
		this.setSelected();
//		this.createLogin();
//		this.createRegist();
		this.getLoginInfo();
	},
	createDom:function(){
		this.element=$(Header.template);
		this.rightArea = this.element.find(".js-right");
		this.HeaderContainer.append(this.element);
	},
	setSelected:function(){
		this.element.find(".js-left li").eq(this.selectedIndex).addClass("active")
	},
	createLogin:function(){
		this.login = new Login(this.rightArea,this.element);
	},
	createRegist:function(){
		this.regist = new Regist(this.rightArea,this.element);
	},
	createLogout:function(){
		this.logout = new Logout(this.rightArea,this.element);
	},
	getLoginInfo:function(){
		$.ajax({
			url:'/AuthRouter/isLogin',
			type:"post",
			success:$.proxy(this.handleGetLoginSucc,this)
		})
	},
	handleGetLoginSucc:function(res){
		if(res.messageCode==1 && res.datas && res.datas.isLogin){
			this.createLogout();
		}else{
			this.createLogin();
			this.createRegist();
		}
	}
});