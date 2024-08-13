const express=require("express");
const bcrypt =require("bcrypt");
const app =express();
const cors = require('cors');
const mongoose = require('mongoose');
const port=1000;

mongoose.connect('mongodb://localhost:27017/task')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        
    });

    /// user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:String
});

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true,  },
    type: { type: String, required: true },
    description:String,
    quantity:Number
});



const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

app.use(express.json());
app.use(cors());
app.listen(port,()=>{
    console.log(`server start at ${port}`);
})

app.post("/register",async(reg,res)=>{
    try {
        //find user
        const {username,password}=reg.body;
        const finduser=await User.findOne({username});
        if(finduser){
            console.log(" 400 wrong reg");
            res.status(400).send("User name or password is incorrect");
            return;
        }
        // hash pass
        
        const hashpass=await bcrypt.hash(password,10);

        const newUser= new User({username,password:hashpass});
        await newUser.save();
        console.log("  201 correct reg");
        res.status(201).send("User Created");
        return;
    }
        catch (error) {
            console.log(" 500 wrong reg");
            res.status(500).send(error.message);
        }
});


app.post("/login",async(req,res)=>{
    try {
        const{username,password}=req.body;
        const finduser=await User.findOne({username});
        if(!finduser){
            res.status(400).send("User name or password is incorrect");
        }
        const passmatch= await bcrypt.compare(password,finduser.password);
        if(passmatch){
            res.status(200).send("log in successfully");
        }
        else{
            res.status(400).send("User name or password is incorrect");
        }


    } catch (error) {
        console.log("error login")
        res.status(500).send(error.massage);
    }
});
////////////////////////////////////////////////////// item 





app.post("/additem",async(reg,res)=>{
    try {
        
        const {name,type,description,quantity}=reg.body;
        const newItem= new Item({name,type,description,quantity});
       //console.log(newItem);
        await newItem.save();
        console.log(newItem);
        console.log("  201 correct add");
        res.status(201).send(newItem._id);
    }
        catch (error) {
            console.log(" 500 wrong ");
            res.status(500).send(error.message);
        }
});


app.post("/getitem",async(reg,res)=>{
    try {
        
   
    const items_arr=await Item.find();
    res.status(201).send(items_arr);
    }
        catch (error) {
            console.log(" 500 wrong ");
            res.status(500).send(error.message);
        }
});


app.post("/deleteitem",async(reg,res)=> {

    try{
            const id=reg.body;

            console.log(id);
            console.log(`Deleting item with ID: ${id}`);

            const result= await Item.deleteOne({_id:id});
           /// will remove only for test
            if (result.deletedCount === 0) {
                // No document found with that ID
                return res.status(404).send("Item not found");
            }
            res.status(204).send("item deleted");
    }
    catch(error){
        console.log(" 500 wrong ");
        res.status(500).send(error.message);
    }
});


