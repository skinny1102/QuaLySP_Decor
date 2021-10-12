const express = require('express')
const router= express.Router();
const homeController = require('../controllers/homeController')
const upload = require('../controllers/mullter')

router.get('',homeController.index)
router.post('',upload.single('img'),homeController.addProduct)

module.exports = router