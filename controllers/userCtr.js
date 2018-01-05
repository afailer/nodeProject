const userDao = require("../modules/userDao.js");
module.exports={
	register:(req,res) => {
		const {username,password} = req.body;
		userDao.findUser({username:username},function(result){
			console.log(result);
			if(result && result != "err"){
				res.json({
						messageCode: 1,
						datas: {
							register: false
						}
					})
			}else{
				userDao.register(username,password,function(){
					res.json({
						messageCode: 1,
						datas: {
							register: true
						}
					})
				})
			}
		})
	},
	login:(req,res)=>{
		const {username,password} = req.body;
		console.log(username+" "+password);
		userDao.findUser({
			username:username,
			password:password
		},(result)=>{
			if(result && result!='err'){
				req.session.username = username;
			}
			res.json({
				messageCode:1,
				datas:{
					login:(result && result != 'err')?true:false
				}
			})
		})
	},
	isLogin:(req,res) => {
		console.log(req+" "+res)
		res.json({
			messageCode:1,
			datas:{
				isLogin:req.session.username ? true:false
			}
		});
	},
	logout:(req,res) => {
		req.session=null;
		res.json({
			messageCode:1,
			datas:{
				logout:true
			}
		});
	}
}
