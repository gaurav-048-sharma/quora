const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const movies = require('./data.js');
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended :true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname ,"public")));

let posts = [
    {
        id :uuidv4(),
        username : "apnacollege",
        content : "I love coding",
    },
    {
        id: uuidv4(),
        username : "Rohan",
        content : "I love coding",
    },
    {
        id: uuidv4(),
        username : "ravi",
        content : "I got selected for my first internship",
    }
]

app.get("/movies", (req, res) => {
    res.render("movies.ejs", {movies});
})

app.get("/posts", (req, res) => {
    
    res.render("index.ejs" , {posts});
    // console.log(req.body);
});
app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
});
app.post("/posts", (req, res) => {
    // console.log(req.body);
    let {username , content } = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    // console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(id);
    res.render("edit.ejs" , {post});
});
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
app.listen(port , (req, res) => {
    try {
        console.log("server is running on port 8080");
    }catch(err) {
        console.log(err);
    }
});



