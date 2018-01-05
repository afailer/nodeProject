const posDao = require("../modules/positionDao.js");
module.exports={
	addPos:(req,res)=>{
		const {company,positionName,salary,workPlace} = req.body;
		const fileName = req.file ? req.file.filename:"";
		
		posDao.addPos(company,positionName,salary,workPlace,fileName,(err)=>{
			console.log(err);
			res.json({
				messageCode:1,
				datas:{
					inserted:!err
				}
			})
		})
	},
	getPosList:(req,res) => {
		let {page,size} = req.body;
		page = parseInt(page);
		size = parseInt(size);
		let totalNum = 0;
		posDao.getPosList({},(result)=>{
			if(result && result !='err'){
				totalNum = Math.ceil(result.length/size);
				posDao.getPosListByPage(page,size,(result)=>{
					if(result && result !== 'err'){
						res.json({
							messageCode:1,
							datas:{
								totalCount:totalNum,
								posList:result
							}
						})
					}
				})
			}
		})
		
	},
	deletePos:function(req,res){
		const {_id} = req.query;
		console.log(_id);
		posDao.deletePos(_id,(result)=>{
			if(result != 'err'){
				res.json({
					messageCode:1,
					datas:{
						isDelete:true
					}
				})
			}
		});
	},
	getPosById:function(req,res){
		console.log("---------getPosById---------")
		const {_id} = req.body;
		posDao.getPosById(_id,(result) => {
			if(result!='err'){
				res.json({
					messageCode:1,
					datas:{
						info:result
					}
				})
			}
		})
	},
	updatePos:(req,res)=>{
		console.log("----UPDATE-----")
		const {_id,company,positionName,salary,workPlace} = req.body;
		var params = {
			company,
			positionName,
			salary,
			workPlace
		}
		var fileName = req.file ? req.file.filename:"";
		if(fileName != ""){
			params.fileName =fileName;
		}
		
		posDao.updatePos(_id,params,(result)=>{
			
			if(result!='err'){
				res.json({
					messageCode:1,
					datas:{
						update:true
					}
				})
			}else{
				res.json({
					messageCode:2
				})
			}
		});
	}
}
