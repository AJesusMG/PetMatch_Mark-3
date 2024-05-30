
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccesssKey: process.env.SECRET_ACCESS_KEY,
})

// const uploadFile = async (file) => {
//     const randomKey = `${generateRandomString(16)}`

//     const params = {
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: randomKey,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: 'public-read',
//     }
// }