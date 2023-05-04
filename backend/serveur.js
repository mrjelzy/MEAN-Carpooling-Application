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
    .then( //apeller apres la réponse du serveur
        client => { return client.db("COVOITURACE"); } //client = objet js qui correpond à la base de donnée
    )
	// Affichage des collection de la db
    .then(async (db) => {
		console.log("Liste des collections :");
		let collections = await db.listCollections().toArray();
		for (let collection of collections) {
			console.log(collection.name);
		}
		return db;
	})
	.then((db) => {
		// Retourne la liste des utilisateurs
		app.get("/utilisateurs", async (req, res) => {
			console.log("/utilisateurs");
			let documents = await db.collection("utilisateurs").find().toArray();
			res.json(documents);
		});

		app.get("/trajets", async (req, res) => {
			console.log("/trajets");
			let documents = await db.collection("trajets").find().toArray();
			res.json(documents);
		});

		// Retourne la liste des trajets suivant des critères
		app.get("/trajets/:villeD/:villeA/:date/:prixMax", async (req, res) => {
			console.log("/trajets:"+req.params.villeD+":"+req.params.villeA+":"+req.params.date+":"+req.params.prixMax);
			let documents = await db.collection("trajets").find({
				villeDépart: req.params.villeD,
				villeArrivée: req.params.villeA,
				date: req.params.date,
				prix: {"$lt" : parseInt(req.params.prixMax)},
				$expr: { $lt: [ { $size: "$passagers" }, "$nbPlaces" ] }
			}).toArray();

			if( documents.length == 1)
			{
				res.json(documents);
			}
			else{
				res.json({"resultat" : 0, "message": "Ancun trajet selon les critères"});
			}
			
		});

		// Ajoute un trajets
		app.post("/trajet:", async (req, res) => {
			console.log("/trajet");
			let document = await db.collection("trajets").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "utilisateur déjà existant"});
			}
			else{
				await db.collection("trajets").insertOne(req.body);
				res.json({"resultat" : 1, "message": "trajet ajouté inscrit"});
			}
		});

		// Retourne resultat=0 si l'utilisateur existe déjà, 1 sinon
		app.post("/connexion", async (req,res) => {
			console.log("/connexion de ", req.body);
			let document = await db.collection("utilisateurs").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "Utilisateur déjà existant"});
			}
			else{
				// AJOUTER DANS LES COOKIES
				res.json({"resultat": 1, "message": "Authentification réussie"});
			}
		});

		//
		app.post("/inscription", async (req,res) => {
			console.log("/inscription de ", req.body);
			let document = await db.collection("utilisateurs").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "utilisateur déjà existant"});
			}
			else{
				await db.collection("utilisateurs").insertOne(req.body);
				res.json({"resultat" : 1, "message": "utilisateur inscrit"});
			}
		});

		app.post("/inscription", async (req,res) => {
			console.log("/inscription de ", req.body);
			let document = await db.collection("utilisateurs").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "utilisateur déjà existant"});
			}
			else{
				await db.collection("utilisateurs").insertOne(req.body);
				res.json({"resultat" : 1, "message": "utilisateur inscrit"});
			}
		});

		/* APPELS EXAMPLES
		app.get("/produits/:type", async (req, res) => {
			console.log("/produits/"+req.params.type);
			let documents = await db.collection("produits").find({type:req.params.type}).toArray();
			res.json(documents);
		});

		app.get("/categories", async (req,res) => {
			console.log("/categories");
			categories = [];
			let documents = await db.collection("produits").find().toArray();
			for (let doc of documents) {
				if (!categories.includes(doc.type)) categories.push(doc.type); 
			}
			res.json(categories);
		});
		*/
	});
}
main();