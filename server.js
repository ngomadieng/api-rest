const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const Utilisateur=require('./models/Users');

//Chargement des variables d'environnement

dotenv.config({path:'./config/.env'});

//Initialisation de l'application express

const app=express();
//Middleware pour traiter les rquetes json
app.use(express.json());

//Connexion mongodb

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('Connexion avec mongodb'))
    .catch((err)=>console.log('Pas de connexion a Mongodb',err));

// Les routes

//Get pour obetnir tous les utilisateurs
app.get('/users', async(req, res)=>{
    try{
        const util= await Utilisateur.find();
        res.status(200).json(util);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//Post pour faire entrer des donnees
app.post('/users', async(req, res)=>{
    const newusers= new Utilisateur(req.body)
    try{
        const enreg= await newusers.save();
        res.status(201).json(enreg);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

//Put mise a jour des donnees
app.put('/users/67163dfcd3b996fe921e9c1c', async(req, res)=>{
    try{
        const miseAjour= await Utilisateur.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.status(200).json(miseAjour);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

//Delete pour supprimer des donnees
app.delete('/users/67152cde80fb260b38ddcc02', async(req, res)=>{
    try{
        const supp= await Utilisateur.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Supression reussie'});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//Demarrer le serveur
const port= process.env.PORT||5000
app.listen(port, ()=>{
    console.log(`Le serveur est en marche sur le port ${port}`);
});