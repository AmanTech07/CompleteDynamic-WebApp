const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/userMessage")
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// setting path
const staticpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended: false})); //coz we want that encoded data

// setting the veiw engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// routing
app.get("/", (req, res) => {
    res.render("index");
})

app.post("/contact", async (req, res)=>{
    try{
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})

// server create
app.listen(port, ()=>{
    console.log(`server is running on the port no. ${port}`);
})