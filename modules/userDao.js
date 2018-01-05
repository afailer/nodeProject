var mongoose = require("../utils/database.js");
var User = mongoose.model('user',{
	username:String,
	password:String
});

module.exports={
	register:(username,password,cb)=>{
		console.log(username+" "+password);
		var user = new User({
			username:username,
			password:password
		})
		user.save((err)=>{
			console.log(err+"------------------------");
			cb(err);
		})
	},
	findUser:(params,cb)=>{
		User.findOne(params).then((result) => {
			console.log("---findUser----result-------"+result);
			cb(result);
		}).catch(()=>{
			cb("err");
		})
	}
}
