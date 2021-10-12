const express = require('express')
const router= express.Router();
const productController = require('../controllers/productController')
const multipleUploadController = require("../controllers/multipleUploadController");
const upload = require('../controllers/mullter')

router.get('',productController.index)
router.post('',productController.postid)
router.get('/add',productController.addindex)
router.post('/add',upload.array('many-files',12),productController.addProduct)
router.delete('/:id',productController.deleteProduct)

router.get('/test',productController.testindex)
router.post("/test", multipleUploadController.multipleUpload);
module.exports = router