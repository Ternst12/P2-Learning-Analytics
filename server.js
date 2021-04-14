const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/db1"); // import af forbindelse til database
const morgan = require("morgan");
const router = require("./routes/http") // Import af routes

app.use(express.json());
app.use(morgan("short")); // Giver et bedre overblik over errors, samt behandlingstid, i terminalen
app.use(bodyParser.urlencoded({extended: false})); // Middleware der hjælper med request og process data fra forms
app.use(bodyParser.json()); // Middleware der hjælper med request og process data i json format 


app.use(express.static("public")); // henter alle statics files i public folder
app.get("/", function(req, res) { // knytter forside.html til serverens forside 
    res.sendFile(__dirname + "/forside.html");
});

app.use(router); // "Kalder" mine imports


connection.connect(function(err) { // Tjekker om der er forbindelse til databasaen
        if (err)
            {
             return   console.error("Der er ingen forbindelse til database " + err.message);
            }
        console.log("Der er forbindelse til database");            
    });

app.listen(3007,()=> {
    console.log("app is running on port 3007");
    })





/* Alt der er fanget i denne kommentar spalte kan ignoreres.
Det er til evt. senere brug.

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
*/
