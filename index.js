// const mongodb = require('mongodb').MongoClient

// const url = "mongodb+srv://admin:admin@banquinho.afndbhh.mongodb.net/test?retryWrites=true&w=majority"

// mongodb.connect(url, (erro, db){
//     if(erro) throw erro;
//     const dbo = banco.db("Cursos")
//     const obj = { curso: "Curso de Node", canal: "CFB Cursos"}
// })


backupMongoDB();


const { spawn } = require("child_process");
const path = require('path')

const DB_NAME = "banquinho"
const ARCHIVE_PATH = path.join(__dirname, 'public', `${DB_NAME}.gzip`)

function backupMongoDB() {
    const child = spawn("mongodump", [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        "--gzip"
    ]);

    child.stdout.on("data", (data) => {
        console.log("stdout:\n", data)
    });
    child.stderr.on("data", (data) => {
        console.log("stderr:\n", data)
    });
    child.on("error", (error) => {
        console.log("error:\n", error)
    });
    child.on("exit", (code, signal) => {
        if (code) console.log("Process exit with code:", code)
        else if (signal) console.log("Process killed with signal:", signal)
        else console.log("Backup is successfull!!")
    });
}