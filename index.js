const express = require('express');
const app = express();

const multer = require('multer');
const fs = require('fs'); // fs = file system
const cloudinary = require('cloudinary');


const { uuid } = require('uuidv4');
const env = require('dotenv');
env.config();

//Cloudinary code
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


//Require the db.js file
require('./db/db.js')

//Lets define a route




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        let randomnumber = uuid();
        let fname= randomnumber+""+file.originalname;
        cb(null, fname)
    }
  })
  
const upload = multer({ storage })




app.post('/fileupload',upload.single('mypicture'),(req,res)=>{

    //Now the challenge is to get the file address
    console.log(req.file.path);

    //Now send this file on cloudinary i.e others server

    cloudinary.uploader.upload(req.file.path, function(error, result) {
       //console.log(typeof(result));
        //console.log(result, error);
        //Now Delete the local file
        fs.unlink(req.file.path, function(err){
            if (err) console.log(err);
            else console.log("File Deleted");
        })
         //Then we delete the file from our server
        res.status(200).json({
            msg:"File uploaded Successfully",
            data:''
        });

    })

   
});




let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('The server is running on ',port)
})