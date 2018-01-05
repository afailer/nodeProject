function Login(rightCon,container){
	this.rightCon=rightCon;
	this.container=container;
	this.init();
}
Login.loginBtn = `
 				<li><a href="#" data-toggle="modal" data-target=".js-login-modal">登录</a></li>
				        `;
Login.modalTemp=`
				<!-- Modal -->
				<div class="modal fade js-login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">登录</h4>
				      </div>
				      <div class="modal-body">
				        <div class="input-group">
						  <span class="input-group-addon" id="sizing-addon2">账号</span>
						  <input type="text" class="form-control js-user-name" placeholder="请输入用户名" aria-describedby="sizing-addon2">
						</div>
						<br>
						<br>
						<div class="input-group">
						  <span class="input-group-addon" id="sizing-addon2">密码</span>
						  <input type="text" class="form-control js-user-pwd" placeholder="请输入密码" aria-describedby="sizing-addon2">
						</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-primary js-btn-login">登录</button>
				      </div>
				    </div>
				  </div>
				</div>`

$.extend(Login.prototype,{
	init:function(){
		this.createBtn();
		this.createModal();
		this.bindEvents();
	},
	createBtn:function(){
		this.btn=$(Login.loginBtn);
		this.rightCon.append(this.btn);
	},
	createModal:function(){
		this.modal=$(Login.modalTemp);
		this.container.append(this.modal);
	},
	bindEvents:function(){
		var submitBtn = this.modal.find(".js-btn-login");
		submitBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},
	handleSubmitBtnClick:function(){
		var username=this.modal.find(".js-user-name").val();
		var userPwd = this.modal.find(".js-user-pwd").val();
		$.ajax({
			type:"post",
			url:"/AuthRouter/Login",
			data:{
				username:username,
				password:userPwd
			},
			success:$.proxy(this.handleLoginSucc,this)
		});
	},
	handleLoginSucc:function(res){
		console.log("------"+JSON.stringify(res))
		if(res.messageCode==1 && res.datas && res.datas.login){
			window.location.reload();
		}
	}
});
