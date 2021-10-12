
const db = require('../models/db')
const realtimedatabase = db.database();


const fs = require('fs')
const { promisify } = require('util');
const { resolve } = require('path');

const unlinkAsync = promisify(fs.unlink)

var storage = db.storage().bucket('gs://appdecornoithat.appspot.com');
class productController{
    //[GET] /product
    index(req,res,next){
      
       const getData = (ref) => {
        return new Promise((resolve, reject) => {
          const onError = error => reject(error);
          const onData = snap => resolve(snap);
          ref.on("value", onData, onError);
        });
      };
      const dbRef = realtimedatabase.ref('product');
      var obj = [];
      getData(dbRef)
            .then((value) => {
                value.forEach( function (data){
                   obj.push(data.val())
                })
            }
            )
        .catch((error) => {
            console.log("Lỗi rồi má ơi");
        }).finally(()=>{
            
            res.render("product/product",{obj})
        })
    }
    //[GET] prodcuct/ add
    addindex(req,res,next){
        res.render('product/addproduct')
    }
    //[POST] /product
    async postid(req,res,next){
        const idproduct = req.body.id;
        var ref = realtimedatabase.ref('product').orderByChild('idProduct').equalTo(idproduct);
        ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                var obj = child.val();
                res.send({obj:obj})
            })
            
        })
        
        
    }
    //[POST] /product/add
     async addProduct(req,res,_next){
        
         const {idProduct, nameProduct,categories,quantity,priceProduct,desProduct}=req.body;
            var listImgResource =['hi'];
            listImgResource =[];
            var listImgName=['hi'];
            listImgName =[];

           var soluongfile = req.files.length;
           for(var i=0 ; i <soluongfile;i++){
               if(i<(soluongfile-1)){
                const result =  await storage.upload(req.files[i].path,{public:true})
                const linkimg =  result[0].metadata.mediaLink
                 const nameImg=   result[0].metadata.name
                listImgResource.push(linkimg)
                listImgName.push(nameImg)
                await unlinkAsync(req.files[i].path)
               }
                if(i==(soluongfile-1)){
                    const result =  await storage.upload(req.files[soluongfile-1].path,{public:true})
                    await unlinkAsync(req.files[soluongfile-1].path)
                    const linkimg =  result[0].metadata.mediaLink
                    const nameImg=   result[0].metadata.name
                    listImgResource.push(linkimg)
                    listImgName.push(nameImg)
                      realtimedatabase.ref('product').push({
                                idProduct:idProduct,
                                nameProduct:nameProduct,
                                categories:categories,
                                priceProduct:Number(priceProduct),
                                quantity:Number(quantity),
                                descriptionProduct: desProduct,
                                imgResource:listImgResource[0],
                                listImgResource:listImgResource,
                                listImgName:listImgName
                            });
                    res.redirect('/product')
                    
                }
           }

        

        
    }
    //[DELETE] product/:id
    async deleteProduct(req,res,next){
        var uid = req.params.id
        var ref = realtimedatabase.ref('product').orderByChild('idProduct').equalTo(uid);
        ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                const userKey = child.key;
                realtimedatabase.ref('product').child(userKey).remove();
                res.redirect('/product')
            })
        })
        // xóa file 
        // const file = storage.file("945494965.jpg")
        // console.log(file);
        // file.delete().then(() => {
        //     console.log("Xóa thành công")
        // }).catch(err => {
        //     console.log(`Xóa hụt`)
        // });
        
         
    }
    //[GET] product/test
    testindex(req,res,next){
        res.render('product/testupload')
    }
}
module.exports = new productController();