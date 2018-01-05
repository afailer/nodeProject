function UpdatePos(container){
	this.container=container;
	this._id = "";
	this.init();
}


UpdatePos.modal=`<div class="modal fade js-updatePosModail" tabindex="-1" role="dialog" aria-labelledby="UpdatePosLabel">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        <h4 class="modal-title" id="exampleModalLabel">修改信息</h4>
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
					          	<label for="recipient-name" class="control-label">公司Logo:</label>
					            <input type="file" class="form-control js-logo" placeholder="请输办公地点">
					          </div>
					        </form>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-primary js-update">确认修改</button>
					      </div>
					      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
								恭喜您，修改成功
						      </div>
					      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
								对不起，修改失败
						  </div>
					    </div>
					  </div>
					</div>`;

$.extend(UpdatePos.prototype,{
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom:function(){
		this.element = $(UpdatePos.modal);
		this.company = this.element.find(".js-companyname");
		this.positionName = this.element.find(".js-posname");
		this.salary = this.element.find(".js-salary");
		this.workPlace = this.element.find(".js-workPlace");
		this.logo = this.element.find(".js-logo");
		this.update = this.element.find(".js-update");
		this.succUpdate = this.element.find(".js-succ-notice");
		this.faileUpdate = this.element.find(".js-err-notice");
		this.container.append(this.element);
	},
	bindEvents:function(){
		
		this.update.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},
	handleSubmitBtnClick:function(){
		console.log("updatePos");
		var company = this.company.val();
		var positionName = this.positionName.val();
		var salary = this.salary.val();
		var workPlace = this.workPlace.val();
		var logo = this.element.find(".js-logo")[0].files[0];
		var formData = new FormData();
			formData.append("logo",logo);
			formData.append("company",company);
			formData.append("positionName",positionName);
			formData.append("salary",salary);
			formData.append("workPlace",workPlace);
			formData.append("_id",this._id);
		$.ajax({
			type:"post",
			url:"/posRouter/updatePos",
			async:true,
			processData:false,
			contentType:false,
			data:formData,
			success:$.proxy(this.succUpdatePos,this)
		});
	},
	succUpdatePos:function(res){
		console.log(res);
		if(res && res.datas && res.datas.update){
			$(this).trigger('change');
			this.succUpdate.removeClass('hide');
			setTimeout($.proxy(this.handleDeley,this),300)
		}
	},
	handleDeley:function(res){
		this.succUpdate.addClass('hide');
		this.faileUpdate.addClass('hide');
		this.element.modal("hide");
	},
	showModal:function(id){
		this.element.modal("show");
		this.getPosInfo(id);
	},
	getPosInfo:function(id){
		$.ajax({
			url:"/posRouter/getPosById",
			type:"post",
			data:{
				_id:id
			},
			success:$.proxy(this.handleGetPosSuccInfo,this)
		})
	},
	handleGetPosSuccInfo:function(res){
		
		if(res && res.datas && res.datas.info){
			var info = res.datas.info;
			console.log(info);
			this._id = info._id;
			this.company.val(info.company);
			this.positionName.val(info.positionName);
			this.salary.val(info.salary);
			this.workPlace.val(info.workPlace);
		}
	}
	
});
