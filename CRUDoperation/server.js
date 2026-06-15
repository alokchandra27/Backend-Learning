const express = require("express")
const connectToDB = require("./src/db/db")
const noteModel = require("./src/models/note.model")

const app = express();//server created
app.use(express.json());//middleware added

connectToDB();//database connected

app.post("/notes",async (req,res)=>{
    const {title,content} = req.body;

    console.log(title,content);

    await noteModel.create({
        title,content
    })

    res.json({
        message:"Note created successfully"
    })
})

app.get("/notes", async (req,res)=>{

    const notes = await noteModel.find();

    res.json({
        message:"Notes fetched successfully",
        notes
    })
})

app.delete("/notes/:id", async (req,res)=>{
    const noteId = req.params.id;
    await noteModel.findOneAndDelete({
        _id:noteId 
    })

    res.json({
        message:"Note deleted successfully"
    })
})

app.patch("/notes/:id", async (req,res)=>{
    const noteId = req.params.id;
    const {title,content} = req.body;

    await noteModel.findOneAndUpdate({
        _id : noteId
    },{
        title:title,
        content:content
    })

    res.json({
        message:"Note updated successfully"
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");//server started
})