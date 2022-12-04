const express = require("express");
const path = require("path");
let db = require("./db/db.json");

const app = express();

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get("/api/notes", (req, res) => {
    res.json(db)

    
})

app.post("/api/notes", (req, res) => {
    let title = req.body.title
    let text = req.body.text
    

    

    db.push({

        title: title,
        text: text,
        id: db.length + 1
    })

    res.json(true)
    




})
app.delete("/api/notes/:id", (req, res) => {

    let id = req.params.id
    let results = []
    for(let i = 0; i < db.length; i++){

        if(id != db[i].id){
            results.push(db[i]);

        }
    }
    db = results
    res.json(db)

})

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
} )