const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs")

let connections = {
    "T-4904828524211924": [
        {
            action:"clone",
            value:"data from somewhere",
            ts: new Date().getTime()
        }
    ]
};
app.get("/connect", (req, res) => {
    var token = "T-" + String(Math.random()).substring(2);
    connections[token] = [];
    res.json({
        "token": token
    });
});

app.get("/action", (req, res) => {
    var token = req.query.token;
    var keep = req.query.keep;
    var actions = connections[token];
    console.log(connections[token]);
    console.log(token,keep, actions)

    if (!keep) {
        connections[token] = [];
    }

    res.json({
        "actions": actions
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/qrcode", (req,res)=>{
    res.render("qr-code");
});

app.get("/controller",(req,res)=>{
    res.render("controller.ejs",{ query: req.query});
});

app.post("/action", (req, res) => {
    var token = req.body.token;
    var actions = connections[token] || [];
    console.log("Incoming Request: ", token, actions, req.body)
    if (actions) {
        connections[token] = actions.concat(req.body.actions);
        actions = connections[token];
        res.json({
            actions: actions
        });
    } else {
        res.json({
            error: "Invalid token"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App initialized and listening on port ${PORT}`)
})