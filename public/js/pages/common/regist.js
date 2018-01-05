function Regist(rightCon,container){
	this.rightCon = rightCon;
	this.container = container;
	this.init();
}
Regist.registBtn = `<li><a href="#" data-toggle="modal" data-target=".js-reg-modal">注册</a></li>`;


Regist.registModal = `<div class="modal fade js-reg-modal" role="dialog" aria-labelledby="RegisterLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="RegisterLabel">注册</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="reg-username">用户名</label>
			  <input type="email" class="form-control js-reg-username" id="reg-username" placeholder="请输入用户名">
			</div>
			<div class="form-group">
			  <label for="reg-password">密码</label>
			  <input type="password" class="form-control js-reg-pwd" id="reg-password" placeholder="请输入密码">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			恭喜您，注册成功
	      </div>
	      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
			对不起，您所注册的用户名已存在
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(Regist.prototype,{
	init:function(){
		this.createBtn();
		this.createModal();
		this.bindEvents();
	},
	createBtn:function(){
		this.registBtn=$(Regist.registBtn);
		this.rightCon.append(this.registBtn);
	},
	createModal:function(){
		this.registModal = $(Regist.registModal);
		this.succNoticeModal = this.registModal.find(".js-succ-notice");
		this.errNoticeModal = this.registModal.find(".js-err-notice");
		this.container.append(this.registModal);
	},
	bindEvents:function(){
		var submitBtn = this.registModal.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleRegist,this));
	},
	handleRegist:function(){
		var userName = this.registModal.find(".js-reg-username").val();
		var pwd = this.registModal.find(".js-reg-pwd").val();
		$.ajax({
			type:"POST",
			url:"/AuthRouter/register",
			data:{
				username:userName,
				password:pwd
			},
			success:$.proxy(this.handleRegistSucc,this)
		})
		
	},
	handleRegistSucc:function(res){
		if(res.messageCode==1 && res.datas && res.datas.register){
			this.succNoticeModal.removeClass("hide");
			setTimeout($.proxy(this.handleSuccModal,this),2000);
		}else{
			this.errNoticeModal.removeClass("hide");
			setTimeout($.proxy(this.handleErrModal,this),2000);
		}
	},
	handleSuccModal:function(){
		this.succNoticeModal.addClass("hide");
		this.registModal.modal("hide");
	},
	handleErrModal:function(){
		this.errNoticeModal.addClass("hide");
		this.registModal.modal("hide");
	}
})