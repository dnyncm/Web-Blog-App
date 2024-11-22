import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let newPost = []

app.get("/", (req, res) => {
    res.render("index.ejs", { newP: newPost})
});

app.post("/submit", (req, res) => {
    newPost.push({postTitle: req.body.title,
        postText: req.body.text,
        postName: req.body.name,
    });
    res.render("index.ejs", {newP: newPost});
   
})

app.post("/delete", (req, res) => {
    const postIndex = parseInt(req.body.index); // Get the post index from the form data
    if (!isNaN(postIndex) && postIndex >= 0 && postIndex < newPost.length) {
        newPost.splice(postIndex, 1); // Remove the post at that index
    }
    res.render("index.ejs", { newP: newPost });
});

app.listen(port, () => {
    console.log(`Live in port: ${port}`);
})