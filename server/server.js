const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 4000

const mongoose = require('mongoose')
const userModel = require('./models/user')
const postModel = require('./models/addpost')

mongoose
    .connect("mongodb://localhost:27017/socialdia")
    .then(console.log("mongoDB connected..."));

app.get('/', (req, res) => res.send('Hello Nikunj!'))

app.post('/api/register', async (req, res) =>{
    const user = req.body;
    await userModel.create(user);
    return res.json({ data: "Data Registered" })
});

app.post('/api/login', async (req, res) => {
    const email = req.body.data
    const password = req.body.data
    const user = await userModel.findOne({email: email, password: password})
    if(user){
        return res.json({ data: "Login Successfully" })
    }else{
        return res.json({ data: "Please Enter Correct details" })
    }
});

app.post('/api/addpost', async (req, res) => {
    const post = req.body
    await postModel.create(post);
    return res.json({ data: "Post Uploaded" })
});

app.get('/api/getposts', async (req, res) => {
    const post = await postModel.find({})

    if(post){
        return res.json({ data: post })
    }else{
        return res.json({ data: "No data Found" })
    }
});

app.post('/api/deletepost', async (req,res) => {
    const pid = req.body.id
    const delPost = await postModel.findOneAndDelete({_id: pid})

    if(delPost){
        return res.json({ data: "Post Deleted" })
    }else{
        return res.json({ data: "No data found" })
    }
});

// app.put('/api/updatepost/:id', async (req, res) => {
//     const post = req.body
//     const updatePost = postModel.findOneAndUpdate(
//         {_id: req.params.id},
//         {
//             postimage: post.postimage,
//             postname: post.postname,
//             postcaption: post.postcaption
//         },
//         {new: true}
//     );
//     if(updatePost){
//         return res.json({ data: "Post Updated" })
//     }
// })

app.listen(port, () => console.log(`app listning at port ${port}`))