const express = require("express");
const router = express.Router();
const mysql = require("mysql"); 
const connection = require("../database/db1") // Importere forbindelse til database

var queryTekst = null; // variabel der senere indeholder forskellige querytekster

// Get method til at se at se alle cases der gemmer sig i databasen  

router.get("/cases", (req, res) => {   
    queryTekst = "SELECT * FROM cases";
    connection.query(queryTekst, (err, rows, fields) => { 
        if (err) {
            console.log(err);
            res.send(500); 
            return;
        }   
        console.log("fetched succes")
        res.json(rows) }) // Ved succes vises ovenstående i terminalen og alle cases i Jason format i browser vinduet
    });

// Get method til at søge efter cases via deres navn

router.get("/cases/:casenavn", (req, res) => {
    const casenavn = req.params.casenavn;
    queryTekst = "SELECT * FROM cases WHERE casenavn = ?"; // "query" besked som mysql forstår 
    console.log("Fetching Case med Casenavn " + req.params.casenavn)
    connection.query(queryTekst, [casenavn], (err, rows, fields) => { // "casenavn" = "?"
        if (err) {
            console.log(err);
            res.send(500); // giver fejlbesked i http format 
            return;
        }   
        console.log("fetched succes");
        res.json(rows) }); 
    });

// Post method til oprettelse af nye cases. Data bliver trukket fra forms i oprettelse.html (Se Public folder)

router.post("/nycase", (req, res) => { // URL ændrer sig efter submit til ".../nycase"
    console.log("Du er ved at oprette en ny case");
    var CaseNavn = req.body.CaseNavn; // Data bliver hentet via forms "name-tag" og gemt i variabel
    var søgeord = req.body.SearchWord;
    console.log("Casenavn er " + CaseNavn + " og søgeordet er " + søgeord); // Til test om navn og søgeord er korrekt indlæst
    queryTekst = "INSERT INTO cases (casenavn, søgeord) VALUES (?,?)"; // query besked - "?,?" = CaseNavn, Søgeord
    connection.query(queryTekst, [CaseNavn, søgeord], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at oprette en ny case " + err);
            res.send(500);
            return
        }
    }) // Viser den nyoprettet case i json format i browser vinduet 
    console.log("Tillykke du har oprettet en ny case " + CaseNavn); //Kontrol besked
    queryTekst = "SELECT * FROM cases WHERE casenavn = ?"; 
    connection.query(queryTekst, [CaseNavn], (err, rows, fields) => { 
        if (err) {
            console.log(err);
            res.send(500); 
            return;
        }   
        res.json(rows) }); 
});


module.exports = router;