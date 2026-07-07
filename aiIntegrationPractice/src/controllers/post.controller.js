const postModel = require("../models/post.model");
const { generateImageCaption } = require("../services/ai.service");
const { uploadImageToImagekit } = require("../services/storage.service");
const {v4 : uuidv4 } = require("uuid");

async function createPost(req, res) {
  
    const file = req.file;
    console.log("File receiver:" , file)

    const base64ImageFile = Buffer.from(file.buffer).toString("base64");

    const caption = await generateImageCaption(base64ImageFile)

  const response = await uploadImageToImagekit(file.buffer,`${uuidv4()}`)
    // res.status(201).json({
    //     caption:caption
    // })

    
    const post = await postModel.create({
        caption:caption,
        image:response.url,
        user:req.user._id
    })   

    res.status(201).json({
        message:"Post created successfullly",
        post:post
    }) 
}

module.exports = {
  createPost,
};
