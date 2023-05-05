const { json } = require("express");
const cors = require('cors');
var express = require("express");
var app = express();
app.use(cors());
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
			let documents = await db.collection("utilisateurs")
							.find({}, { projection: { nom : 1, prenom: 1, email:1, vitMoyenne:1 } })
							.toArray();
			res.json(documents);
		});

		// RETOURNE LA LISTE DES TRAJETS
		app.get("/trajets", async (req, res) => {
			console.log("/trajets");
			let documents = await db.collection("trajets").find().toArray();
			res.json(documents);
		});

		// RETOURNE LA LISTE DES TRAJETS SUIVANTS DES CRITERES
		app.get("/trajets/:villeD/:villeA/:date", async (req, res) => {
			console.log("/trajets:"+req.params.villeD+":"+req.params.villeA+":"+req.params.date);
			let documents = await db.collection("trajets").find({
				villeDepart: req.params.villeD,
				villeArrive: req.params.villeA,
				date: req.params.date
			}).toArray();
			if( documents.length == 1)
			{
				res.json(documents);
			}
			else{
				res.json({"resultat" : 0, "message": "Ancun trajet selon les critères"});
			}
			
		});

		// RETOURNE UN TRAJET EN FONCTION DE L'ID
		app.get("/trajet/:id", async (req, res) => {
			console.log("/trajets:"+req.params.id);
			let documents = await db.collection("trajets").find({
				_id: new ObjectId(req.params.id),
			}).toArray();

			if( documents.length == 1)
			{
				res.json(documents);
			}
			else{
				res.json({"resultat" : 0, "message": "Ancun trajet avec cet id"});
			}
			
		});

		// AJOUTE UN TRAJET
		app.post("/add-trajet", async (req, res) => {
			console.log("/add-trajet");
			let document = await db.collection("trajets").find(req.body).toArray();
			if( document.length == 1){
				res.json({"resultat" : 0, "message": "Le trajet n'est pas correct"});
			}
			else{
				await db.collection("trajets").insertOne(req.body);
				res.json({"resultat" : 1, "message": "Nouveau trajet ajouté !"});
			}
		});

		//AJOUTE UN UTILISATEURS A UN TRAJET
		app.patch("/add-passager/:id", async (req, res) => {
			console.log("/add-passager/" + req.params.id);
		
			try {
			// Mettre à jour le trajet qui correspond à l'ID fourni dans la requête avec l'email présent dans le request
			const result = await db
				.collection("trajets")
				.updateOne({ _id: new ObjectId(req.params.id) },
					{ $push: { "passagers": req.body.email } });
		
			if (result.modifiedCount === 1) {
				res.json({
				resultat: 1,
				message: "Utilisateur ajouté au trajet",
				});
			} else {
				res.json({
				resultat: 0,
				message: "Aucun trajet n'a été modifié",
				});
			}
			} catch (error) {
			console.error(error);
			res.status(500).json({
				resultat: 0,
				message: "Erreur lors de la modification du trajet",
			});
			}
		});

		//TERMINE UN TRAJET
		app.patch("/end-trajet/:id", async (req, res) => {
			console.log("/end-trajet/" + req.params.id);
		
			try {
			// Mettre à jour le trajet qui correspond à l'ID fourni dans la requête avec l'heure d'arivée présent dans le request
			const result = await db
				.collection("trajets")
				.updateOne({ _id: new ObjectId(req.params.id) },
					{ $set: { "heureArrive": req.body.heureArrive } });
		
			if (result.modifiedCount === 1) {
				res.json({
					resultat: 1,
					message: "Heure d'arivee ajouté au trajet",
				});
			} else {
				res.json({
					resultat: 0,
					message: "Aucune heure d'arrive n'a été ajouté",
				});
			}
			} catch (error) {
			console.error(error);
			res.status(500).json({
				resultat: 0,
				message: "Erreur lors de la modification du trajet",
			});
			}
		});

		// SUPPRIME UN TRAJET EN FONCTION DE SON _ID
		app.delete("delete-trajet/:id", async (req, res) => {
			console.log("/delete-trajet/" + req.params.id);
		
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
		app.delete("/delete-utilisateur/:id", async (req, res) => {
			console.log("/delete-utilisateur/" + req.params.id);
		
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

		// MODIFIE UN UTILISATEUR
		app.patch("/patch-utilisateur/:id", async (req, res) => {
			console.log("/patch-utilisateur/" + req.params.id);
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

		// AJOUTE UN UTILISATEUR
		app.post("/add-utilisateur", async (req,res) => {
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

		// RETOURNE RESULTAT=0 SI L'UTILISATEUR EXISTE, 1 SINON
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