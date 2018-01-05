var mongoose = require("../utils/database.js");
var Position = mongoose.model('position',{
	company:String,
	positionName:String,
	salary:String,
	workPlace:String,
	fileName:String
});

module.exports={
	addPos:(company,positionName,salary,workPlace,fileName,cb)=>{
		var position = new Position({
			company:company,
			positionName:positionName,
			salary:salary,
			workPlace:workPlace,
			fileName:fileName
		})
		position.save((err)=>{
			cb(err);
		})
	},
	getPosList:(params,cb)=>{
		Position.find(params).then((result)=>{
			cb(result);
		}).catch(()=>{
			cb("err")
		})
	},
	getPosListByPage:(page,size,cb)=>{
		Position.find({}).limit(parseInt(size,10)).skip((parseInt(page,10)-1)*parseInt(size,10)).then((result) => {
			cb(result)
		}).catch((res) => {
			cb('err')
		})
	},
	deletePos:(dataId,cb)=>{
		Position.findByIdAndRemove(dataId,(err)=>{
			cb(err);
		}).catch((res)=>{
			cb("err");
		})
	},
	getPosById:(_id,cb)=>{
		console.log("---Dao---getPosById-------"+_id)
		Position.findById(_id).then((result)=>{
			cb(result);
		}).catch((res) => {
			cb("err");
		})
	},
	updatePos:(_id,params,cb)=>{
		console.log("----dao--updatePos-------"+_id)
		Position.findByIdAndUpdate(_id,params).then((result)=>{
			console.log(result);
			cb(result);
		}).catch((err)=>{
			console.log(err);
			cb('err');
		})
	}
}