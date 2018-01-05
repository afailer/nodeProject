function AddPosition(jsContainer){
	this.jsContainer=jsContainer;
	this.init();
}
AddPosition.btn=`<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".addModail">添加</button>`;

AddPosition.modal=`<div class="modal fade addModail" tabindex="-1" role="dialog" aria-labelledby="AddPositionLabel">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        <h4 class="modal-title" id="exampleModalLabel">添加信息</h4>
					      </div>
					      <div class="modal-body">
					        <form>
					          <div class="form-group">
					            <label for="recipient-name" class="control-label">公司名称:</label>
					            <input type="text" class="form-control js-companyname" placeholder="请输入公司名">
					          </div>
					          <div class="form-group">
					            <label for="recipient-name" class="control-label">职位名称:</label>
					            <input type="text" class="form-control js-posname" placeholder="请输入职位名称">
					          </div>
					          <div class="form-group">
					            <label for="recipient-name" class="control-label">薪资范围:</label>
					            <input type="text" class="form-control js-salary" placeholder="请输薪资范围">
					          </div>
					          <div class="form-group">
					            <label for="recipient-name" class="control-label">办公地点:</label>
					            <input type="text" class="form-control js-workPlace" placeholder="请输办公地点">
					          </div>
					          <div class="form-group">
					            <label for="recipient-name" class="control-label">公司LOGO:</label>
					            <input type="file" class="form-control js-logo" placeholder="请上传logo">
					          </div>
					        </form>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-primary js-save">添加</button>
					      </div>
					      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
								恭喜您，添加成功
						      </div>
					      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
								对不起，添加失败
						  </div>
					    </div>
					  </div>
					</div>`;
$.extend(AddPosition.prototype,{
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom:function(){
		console.log("create position dom")
		this.btn = $(AddPosition.btn);
		this.jsContainer.append(this.btn);
		this.modal = $(AddPosition.modal);
		this.jsContainer.append(this.modal);
		this.successNotice = $(".js-succ-notice");
	},
	bindEvents:function(){
		var save = $(".js-save");
		save.on("click",$.proxy(this.handleSubmitClick,this));
	},
	handleSubmitClick:function(){
		var company = this.modal.find(".js-companyname").val(),
			positionName = this.modal.find(".js-posname").val(),
			salary = this.modal.find(".js-salary").val(),
			workPlace = this.modal.find(".js-workPlace").val(),
			logo = this.modal.find(".js-logo")[0].files[0];
			
			var formData = new FormData();
			formData.append("company",company);
			formData.append("positionName",positionName);
			formData.append("salary",salary);
			formData.append("workPlace",workPlace);
			formData.append("logo",logo);
		$.ajax({
			type:"post",
			url:"/posRouter/addPos",
			processData:false,
			contentType:false,
			data:formData,
			success:$.proxy(this.succAddPos,this)
		});
	},
	succAddPos:function(res){
		if(res && res.datas && res.datas.inserted){
			$(".js-succ-notice").removeClass("hide");
		}else{
			$(".js-err-notice").removeClass("hide");
		}
		setTimeout($.proxy(this.handleModal,this),300);
	},
	handleModal:function(){
		$(".js-succ-notice").addClass("hide");
		$(".js-err-notice").addClass("hide");
		this.modal.modal("hide");
	}
});
