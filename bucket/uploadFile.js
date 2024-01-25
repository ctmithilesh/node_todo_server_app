require('dotenv').config()
const fs = require('fs')
const aws = require("aws-sdk/clients/s3")
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// object of S3
const s3 = new aws({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to S3
function uploadFile(file) {

    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {

        Bucket: bucketName,
        Body: fileStream,
        Key: file.originalname,
    }
    //console.log(uploadParams)

    return s3.upload(uploadParams).promise()

}

// download file from s3 
function getFileStream(fileKey) {

    const downloadParams = {

        Key: fileKey,
        Bucket: bucketName,

    }

    return s3.getObject(downloadParams).createReadStream()

}

module.exports = {
    uploadFile: uploadFile,
    getFileStream: getFileStream
}

// downloads a file from S3 
