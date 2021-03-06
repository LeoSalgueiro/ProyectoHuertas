//importo variables de entorno locales
//require('dotenv').config({path:'variables.env'});


//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
 
//importo los modelos
require('./models/Usuario');
require('./models/Nodo');

const app = express();

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI  || `mongodb://localhost:27017/Huertas-Ant`);
//mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL);

/*"proxy": "http://localhost:5000",*/ //este proxy va en el package json

//pruebaa
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Usuario-Administrador:60pVzoUn9uRtsUch@cluster0.snph0.mongodb.net/Huertas-Ant?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("Huertas-Ant").collection("nodos");

  // perform actions on the collection object
  client.close();
});
 */
mongoose.connect('mongodb+srv://Usuario-Administrador:60pVzoUn9uRtsUch@cluster0.snph0.mongodb.net/Huertas-Ant?retryWrites=true&w=majority', {
  useNewUrlParser: true
});
//fin prueba
app.use(bodyParser.json());

//aca se importan las rutas
require('./routes/usuarioRoutes/usuarioRoutes')(app);
require('./routes/nodoRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log(`app running on port ${PORT}`)
});