const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)
const db = require('../models/db')
const realtimedatabase = db.database();
var storage = db.storage().bucket('gs://appdecornoithat.appspot.com');
class homeController{
    //[GET] /
    index(req,res,next){
        res.render('home')
    }
    //[POST] /
     async addProduct(req,res,_next){
        const {idProduct, nameProduct,priceProduct,desProduct}=req.body;

        const result =  await storage.upload(req.file.path,{public:true})
        const linkimg =  result[0].metadata.mediaLink
            realtimedatabase.ref('product').push({
                idproduct:idProduct,
                nameproduct:nameProduct,
                priceproduct:Number(priceProduct),
                desproduct: desProduct,
                imglink:linkimg  
            });
        

             // Delete the file like normal
            await unlinkAsync(req.file.path)
            res.redirect('/')
    }
}
module.exports = new homeController();