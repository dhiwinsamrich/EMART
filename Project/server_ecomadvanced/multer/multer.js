const Multer = require('multer')
const path = require('path')
//const csvtojson = require('csvtojson')
var storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        const ROOT_PATH = __dirname
        console.log("Root path " + ROOT_PATH);
        console.log("directory name of path ", path.dirname(ROOT_PATH))
        console.log("inside destination folder " + JSON.stringify(file));
       // cb(null, path.dirname(ROOT_PATH))
        cb(null,'uploads')
        

    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    }
})

var upload = Multer({
    storage: storage,
    
})

let fieldsUpload = upload.single('file')


module.exports={
    fieldsUpload,Multer
}


