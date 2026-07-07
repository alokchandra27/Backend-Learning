const ImageKit = require("imagekit").default
const {v4 : uuidv4 } = require("uuid");


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImageToImagekit(buffer) {
  const result = await imagekit.upload({
    file: buffer.toString("base64"),
    fileName: `${uuidv4()}.jpg`,
    folder: "ai-image-caption-generator-revision",
  });

  return result;
}

module.exports = { uploadImageToImagekit };