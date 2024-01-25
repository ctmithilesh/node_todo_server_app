const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: fileFilter
})

module.exports = app => {
    const Image = require("../controllers/image.controller");
    var router = require("express").Router();

    // Add New Image 
    router.post("/add/new", upload.single('file'), Image.uploadImage);

    // Fetch all Images
    router.get("/get/all", Image.getAllImages)

    // Get Images by User ID 
    router.post("/user/images/all", Image.getImageByUserID)

    // Delete Image by User ID 
    router.delete("/user/image/remove/:id", Image.deleteOne)



    app.use('/api/images', router);

};