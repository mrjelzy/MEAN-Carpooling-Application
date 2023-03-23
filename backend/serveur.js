const { json } = require("express");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded());
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
app.listen(8888);
console.log("Serveur démarré")
const client = new MongoClient(url);

async function main() //principe de promesse
{
	client.connect()
    .then( //apeller apre la réponse du serveur
        client => { return client.db("COVOITURACE"); } //client = objet js qui correpond Ã  la base de donnÃ©e
    )
    .then(async (db) => {
		console.log("Liste des collections :");
		let collections = await db.listCollections().toArray();
		for (let collection of collections) {
			console.log(collection.name);
		}
		return db;
	})
	.then((db) => {
		app.get("/utilisateurs", async (req, res) => {
			console.log("/utilisateurs");
			let documents = await db.collection("utilisateurs").find().toArray();
			res.json(documents);
		});

		app.post("/inscription", async (req,res) => {
			console.log("/inscription de ", req.body);
			let document = await db.collection("utilisateurs").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "utilisateur déjà existant"});
			}
		});
		
		app.get("/produits/:type", async (req, res) => {
			console.log("/produits/"+req.params.type);
			let documents = await db.collection("produits").find({type:req.params.type}).toArray();
			res.json(documents);
		});

	});
}
main();