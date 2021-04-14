const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");


// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const apiRouter = require("./router/router");

// dotenv.config();



app.use(express.json());

// app.use("/api/cases", apiRouter);

// app.use(morgan("short"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/forside.html");
});

const database = {
    cases: [
        {
            id: "123",
            navn: "navn",
            søgeord: "banan",
            beskrivelse: "Beskrivelse",
            køn: "Dreng/pige",
            alder: "alder",
            erfaring: "erfaring",
            oprettet: new Date()
        },
        {
            id: "456",
            navn: "navn1",
            søgeord: "søgeord1",
            beskrivelse: "Beskrivelse1",
            køn: "Dreng/pige1",
            alder: "alder1",
            erfaring: "erfaring1",
            oprettet: new Date()
        }
    ]
}

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cases"
    });

connection.connect(function(err) {
        if (err)
            {
             return   console.error("Der er ingen forbindelse til database " + err.message);
            }
       
        console.log("Der er forbindelse til database");
            
    });

 app.get("/case/:casenavn", (req, res) => {
    console.log("Fetching Case med Casenavn " + req.params.casenavn)

    connection.query("SELECT * FROM cases", (err, rows, fields) => {
        console.log("fetched succes")
        res.json(rows) })     
      
    });

  

    //res.end()

app.post("/nycase", (req, res) => {
    console.log("Du er ved at oprette en ny case");
    var CaseNavn = req.body.CaseNavn;
    var søgeord = req.body.SearchWord;
    console.log("Casenavn er " + CaseNavn + " og søgeordet er " + søgeord);
    res.end()
});

app.get("/", (req, res)=> {
    res.send(database.cases);
})

app.post("/findcase", (req, res) => {
    if (req.body.navn === database.cases[0].navn &&
        req.body.Søgeord === database.cases[0].Søgeord) {
    res.json("Case fundet");
} else {
    res.status(400).json("Case blev ikke fundet");
}
})

app.post("/opretcase", (req, res) => {
    const {navn, Søgeord, beskrivelse, køn, alder} = req.body;
    database.cases.push({
        id: "456",
        navn: navn,
        Søgeord: Søgeord,
        beskrivelse: beskrivelse,
        køn: køn,
        alder: alder,
        erfaring: "erfaring",
        oprettet: new Date()
    })
    res.json(database.cases[database.cases.length-1]) // finder den sidste case i vores case array
})

app.get("/case/:id",(req, res) => {
    const { id } = req.params;
    let found = false;
    database.cases.forEach(cases => {
        if (cases.id === id) {
            found = true;
        return   res.json(cases)
        } 
    })
    if(!found) {
        res.status(404).json("ingen case matcher");
    }
} )

app.post("/erfaring", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.cases.forEach(cases => {
        if (cases.id === id) {
            found = true;
            const {erfaring} = req.body; // denne del virker ikke endnu. erfaring ændrer ikke værdi
            database.cases.push({
            id: "123",
            navn: "navn",
            Søgeord: "Søgeord",
            beskrivelse: "beskrivelse",
            køn: "køn",
            alder: "alder",
            erfaring: erfaring,
            oprettet: "new Date()"
            
            })


            return   res.json([cases.erfaring]);
        } 
    })
    if(!found) {
        res.status(404).json("ingen case matcher");
    }
} )

app.listen(3011);

/*
app.listen(3011,()=> {
    console.log("app is running on port 3011");
})


/ --> res = Det viker
/opret case --> GET = succes/fail
/find Case --> POST = case
/CASE/:CASEid --> GET = user
/Update af antal Cases --> PUT - Case
*/