var express = require('express');
var router = express.Router();
var posCtr = require("../controllers/positionCtr.js");
const upload = require("../utils/uploads.js")
router.post('/addPos',upload.single('logo'), posCtr.addPos);
router.post('/getPosList',posCtr.getPosList);
router.get('/deletePos',posCtr.deletePos);
router.post("/getPosById",posCtr.getPosById);
router.post("/updatePos",upload.single('logo'),posCtr.updatePos);
module.exports = router;