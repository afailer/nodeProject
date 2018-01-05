function PositionList(jsContainer){
	this.jsContainer=jsContainer;
	this.page=1;
	this.size = 5;
	this.init();
}
PositionList.temp = `<table class="table" style="margin-top:20px;">
						<thead>
							<tr>
								<th>序号</th>
								<th>公司</th>
								<th>职位</th>
								<th>薪资</th>
								<th>地址</th>
								<th>LOGO</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody class="js-tbody"></tbody>
					</table>`;
$.extend(PositionList.prototype,{
	init:function(){
		this.createDom();
		this.createUpdatePos();
		this.getListInfo();
		this.bindEvents();
	},
	bindEvents:function(){
		this.jsContainer.on("click",$.proxy(this.handleTableClick,this));
	},
	handleTableClick:function(e){
		var target = $(e.target);
		var isUpdate = target.hasClass("js-update");
		var isDelete = target.hasClass("js-delete");
		if(isUpdate){
			this.updatePos.showModal(target.attr("data-id"));
		}
		if(isDelete){
			this.deletePos(target.attr("data-id"));
		}
	},
	deletePos:function(dataId){
		$.ajax({
			url:"/posRouter/deletePos",
			data:{
				_id:dataId
			},
			success:$.proxy(this.handleDeletePosSucc,this)
		})
	},
	handleDeletePosSucc:function(res){
		if(res && res.datas && res.datas.isDelete){
			this.getListInfo();
		}
	},
	createDom:function(){
		this.posList = $(PositionList.temp);
		this.jsContainer.append(this.posList);
	},
	createUpdatePos:function(){
		this.updatePos = new UpdatePos(this.jsContainer);
		$(this.updatePos).on('change',$.proxy(this.getListInfo,this));
	},
	getListInfo:function(){
		$.ajax({
			type:"post",
			url:"/posRouter/getPosList",
			async:true,
			data:{
				page:this.page,
				size:this.size
			},
			success:$.proxy(this.succGetPosList,this)
		});
	},
	succGetPosList:function(res){
		if(res && res.datas && res.datas.posList){
			this.createItems(res.datas.posList);
			$(this).trigger(new $.Event("change", {
				total: res.datas.totalCount
			}))
		}
	},
	createItems:function(poslist){
		console.log(poslist.length)
		var positions = "";
		for(var v=0;v<poslist.length;v++){
			var item = poslist[v];
			console.log(item.fileName);
			var fileName = item.fileName? item.fileName:"1515143017006huojian.jpg";
			positions += `<tr>
							<td>${v}</td>
							<td>${item.company}</td>
							<td>${item.positionName}</td>
							<td>${item.salary}</td>
							<td>${item.workPlace}</td>
							<td><img style="width:30px;height:30px;" src="/uploads/${fileName}"/></td>
							<td>
								<span class="js-update" data-id="${item._id}">修改</span>
								<span class="js-delete" data-id="${item._id}">删除</span>
							</td>
						</tr>`
		}
		$(".js-tbody").html(positions);
	},
	changePage:function(page){
		this.page=page;
		this.getListInfo();
	}
});
