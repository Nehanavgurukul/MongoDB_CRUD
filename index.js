const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const DB = "mongodb+srv://Neha:nehamongo@123@cluster0.rnv5z.mongodb.net/Login-Sign-UP?retryWrites=true&w=majority"

mongoose.connect(DB, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(() => {
    console.log("database connected..");
}).catch((err) => console.log(err, "no connection.."));


//create Schema 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})

//create models
const Mycollection = new mongoose.model("mycollections", UserSchema);


//create document ..
app.post("/postData", (req, res) => {
    const createDocument = async () => {
        try {
            const reactMycollection = new Mycollection({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            const result = await reactMycollection.save()
            console.log("posted document..")
            res.send(result)
        } catch (err) { console.log(err) }
    }
    createDocument()
})

//create API for get All documents..
app.get("/getData", (req, res) => {
    const getDocument = async () => {
        try {
            const result = await Mycollection.find({});
            console.log("got Documents..")
            res.send("got Documents..")
        } catch (err) { console.log(err) }
    }
    getDocument();
})


//create API for get document by id
app.get("/getData/:id", (req, res) => {
    const getDataById = async () => {
        try{
            const data = await Mycollection.findById(req.params.id)
            console.log("got Document");
            res.send("got Document");
        }catch(err){
            console.log(err)
        }
    }
    getDataById();
})


//create API For update by id
app.patch("/update/:id",(req,res) => {
    const updateData = async () => {
        try{
            const result = await Mycollection.findByIdAndUpdate(req.params.id,req.body)
            console.log("document updated...");
            res.send("document updated...");
        }catch(err){
            console.log(err)
        }
    }
    updateData()
})


//create API for delete by id ...
app.delete("/delete/:id",(req,res) => {
    const deletDocument = async () => {
        try{
            const result = await Mycollection.findByIdAndDelete(req.params.id);
            console.log("document deleted ...");
            res.send("document deleted ...");
        }catch(err){
            console.log(err)
        }
    }
    deletDocument();
})

//create server on a port no.
app.listen(3000, () => {
    console.log(`server is running on port on ${3000}`)
})


