var path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Math.round(Math.random() * 1e9) + path.extname(file.originalname),
        );
    },
});

const upload = multer({ storage: storage });
module.exports = upload;
