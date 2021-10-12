const express = require('express');
const exphbs  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');

const app = express();
const homeRouter= require('./routes/home.route')
const productRouter= require('./routes/product.route')

const PORT= 3000;

var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.engine('handlebars', exphbs({
    helpers:{
        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static(__dirname + '/public'))
app.use('/',homeRouter);
app.use('/product',productRouter);

app.listen(PORT,()=>{
    console.log("Đang chạy ở PORT "+PORT);
})