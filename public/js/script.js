$('.btn-test').each(function () {
    
    $(this).on('click',function () {
        var id = $(this).data('id')
        $.ajax({
            type:'POST',
            url:'/product',
            contentType:"application/json",
            data: JSON.stringify({id: id}),
            success: function (res) {
                
                $('.btn-edit').each(function () {
                    var id2= $(this).data("id")
                    if(id=id2){
                        this.click();
                        var product = res.obj
                        var modal = $("#showproductModel")
                        modal.find('#idProduct').val(product.idProduct)
                        modal.find('#nameProduct').val(product.nameProduct)
                        modal.find('#categories').val(product.categories)
                        modal.find('#priceProduct').val(product.priceProduct)
                        modal.find('#descriptionProduct').val(product.descriptionProduct)
                        modal.find('#quantity').val(product.quantity)
                        modal.find('#imgResource').attr("src", product.imgResource);
                    }
                    
                })
                 
            }
        })
       
    })
    
    
})

// $('#btn-test').on('click',function () {
//     id = $("#btn-edit").data('id')
//     $.ajax({
//                 type:'POST',
//                 url:'/product',
//                 contentType:"application/json",
//                 data: JSON.stringify({id: id}),
//                 success: function (res) {
//                  var product = res.obj
//                  var modal = $("#showproductModel")
//                  modal.find('#idProduct').val(product.idProduct)
//                  btnedit.click();       
//                 }
//                ,error: function(jqXHR, textStatus, err){
//                    alert('text status '+textStatus+', err '+err)
//                }
//         })
    
// })
var id;


//// DELETE PRODUCT 
 var productID;
$('#exampleModal').on('show.bs.modal', function (event) {
     var button = $(event.relatedTarget) // Button that triggered the modal
         productID = button.data('id') // Extract info from data-* attributes
         console.log('HAHA');
    })
    var btnDelete = document.getElementById('btnDelete');
    btnDelete.onclick = ()=>{
        var formdelete= document.getElementById('form_delete_sp')
            console.log(formdelete)
        formdelete.action = 'product/'+productID+'?_method=DELETE'
        formdelete.submit()
    }