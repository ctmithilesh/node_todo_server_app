require('dotenv').config()
const db = require("../models")
const Image = db.image
const imageURL = process.env.CLOUDFRONT_URL
const { uploadFile, getFileStream } = require('../bucket/uploadFile')

exports.uploadImage = async (req, res) => {

    const file = req.file
    try {

        if (req.file == undefined) {
            return res.send(`You must select a file, only jpeg or png files allowed.`);
        }
        // if(!req.body.user_id){
        //     return res.send(`No user selected. Please select a User!`)
        // }
        console.log(req.file);
        console.log(req.file.originalname)
        const result = await uploadFile(file)
        console.log(result)

        const filePath = imageURL + `/` + file.originalname

        let newImage = new Image({
            filename: req.file.filename,
            originalname: req.file.originalname,
            //category:req.body.category,
            filepath: filePath,
            //user_id:req.body.user_id
        });

        console.log(newImage)

        await Image.create(newImage).then(data => {

            res.send(data);

        })

        // return res.send(`File has been uploaded.`);


    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
};

exports.getAllImages = (req, res) => {

    Image.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Batch."
            });
        });


}

exports.getImageByUserID = (req, res) => {

    const user_id = req.body.user_id


    Image.find({ user_id: [user_id] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Batch."
            });
        });

}

exports.deleteOne = (req, res) => {

    const id = req.params.id;

    Image.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Fees with id=${id}. Maybe Fees was not found!`
                });
            } else {
                res.send({
                    message: "Image was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete fees with id=" + id
            });
        });

};