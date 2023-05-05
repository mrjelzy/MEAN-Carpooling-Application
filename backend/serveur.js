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
const { ObjectId } = require('mongodb');


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
		// RETOURNE LA LISTE DES UTILISATEURS
		app.get("/utilisateurs", async (req, res) => {
			console.log("/utilisateurs");
			let documents = await db.collection("utilisateurs").find().toArray();
			res.json(documents);
		});

		// RETOURNE LA LISTE DES TRAJETS
		app.get("/trajets", async (req, res) => {
			console.log("/trajets");
			let documents = await db.collection("trajets").find().toArray();
			res.json(documents);
		});

		// RETOURNE LA LISTE DES TRAJETS SUIVANTS DES CRITERES
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

		// AJOUTE UN TRAJET
		app.post("/trajet", async (req, res) => {
			console.log("/trajet");
			let document = await db.collection("trajets").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "Le trajet n'est pas correct"});
			}
			else{
				await db.collection("trajets").insertOne(req.body);
				res.json({"resultat" : 1, "message": "Nouveau trajet ajouté !"});
			}
		});

		// AJOUTE UN UTILISATEUR
		app.post("/utilisateur", async (req,res) => {
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

		// SUPPRIME UN TRAJET EN FONCTION DE SON _ID
		app.delete("/trajet/:id", async (req, res) => {
			console.log("/trajet/" + req.params.id);
		
			try {
			// Supprimer l'objet de la collection "trajets" qui correspond à l'ID fourni dans la requête
			const result = await db
				.collection("trajets")
				.deleteOne({ _id: new ObjectId(req.params.id) });
		
			if (result.deletedCount === 1) {
				res.json({
					resultat: 1,
					message: "Trajet supprimé",
				});
			} else {
				res.json({
					resultat: 0,
					message: "Aucun trajet n'a été supprimé",
				});
			}
			} catch (error) {
				console.error(error);
				res.status(500).json({
					resultat: 0,
					message: "Erreur lors de la suppression du trajet",
				});
			}
		});

		// SUPPRIME UN UTILISATEUR EN FONCTION DE SON _ID
		app.delete("/utilisateur/:id", async (req, res) => {
			console.log("/utilisateur/" + req.params.id);
		
			try {
			// Supprimer l'objet de la collection "trajets" qui correspond à l'ID fourni dans la requête
			const result = await db
				.collection("utilisateurs")
				.deleteOne({ _id: new ObjectId(req.params.id) });
		
			if (result.deletedCount === 1) {
				res.json({
					resultat: 1,
					message: "Utilisateur supprimé",
				});
			} else {
				res.json({
					resultat: 0,
					message: "Aucun utilisateur n'a été supprimé",
				});
			}
			} catch (error) {
				console.error(error);
				res.status(500).json({
					resultat: 0,
					message: "Erreur lors de la suppression de l'utilisateur",
				});
			}
		});

		// RETOURNE RESULTAT=0 SI L'UTILISATEUR EXISTE DEJA, 1 SINON
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

		// MODIFIE UN UTILISATEUR
		app.patch("/utilisateur/:id", async (req, res) => {
			console.log("/utilisateur/" + req.params.id);
			const utilisateur = req.body;
		
			try {
			// Mettre à jour l'utilisateur dans la collection "utilisateurs" qui correspond à l'ID fourni dans la requête
			const result = await db
				.collection("utilisateurs")
				.updateOne({ _id: new ObjectId(req.params.id) }, { $set: utilisateur });
		
			if (result.modifiedCount === 1) {
				res.json({
				resultat: 1,
				message: "Utilisateur modifié",
				});
			} else {
				res.json({
				resultat: 0,
				message: "Aucun utilisateur n'a été modifié",
				});
			}
			} catch (error) {
			console.error(error);
			res.status(500).json({
				resultat: 0,
				message: "Erreur lors de la modification de l'utilisateur",
			});
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