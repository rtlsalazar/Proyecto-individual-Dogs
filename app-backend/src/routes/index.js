// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express');
const axios = require('axios');
const {Dogs, Temperaments} = require("../db.js")

/*--------------------------------------------------------------------------------*/
/* Initialization                                                                 */
/*--------------------------------------------------------------------------------*/
const router = express.Router();

/*--------------------------------------------------------------------------------*/
/* "Reading" endpoints                                                            */
/*--------------------------------------------------------------------------------*/
/*
*  Este manejador de ruta consigue una lista de los perros tanto en la base de datos como en el api
*  - puede recibir como parametro el nombre de un perro de manera que el resultado sera filtrado segun ese nombre
*/
async function get_dogs(req, res, next){
  try {
    const API_URL = 'https://api.thedogapi.com/v1/breeds';
    const API_KEY = 'live_iXv13sB4HgHfWEZAvdL2JNKIo0kahNlH0JD8ZyZwHVp1gkN2ImTY91lrS3bmx4tL';
    let api_result = (await axios.get(`${API_URL}?api_key=${API_KEY}`)).data;
    let db_result = await Dogs.findAll({include: {model: Temperaments}});

    /*
    * se parsea la lista retornada para formatearla en una estructura compatible con el renderizado en el frontend
    */
    if (db_result.length !== 0) {
      /* convertimos a un objeto simple para poder procesarlo comodamente*/
      db_result = db_result.map(obj => obj.get({ plain: true }))

      /* parseamos a un formato de estructura compatible con el renderizado*/
      db_result = db_result.map(obj => {
        return ({ ...obj, "temperament": obj["Temperaments"].map(e=>e.name).join(", ") })
      });
    }

    /*
    * Si se ha introducido algun parametro de busqueda, entonces se filtran la listas segun el mismo
    */
    if (req.query.name !== undefined) {
      api_result = await api_result.filter(d => d.name.toLowerCase().includes(req.query.name.toLowerCase()))
      db_result = await db_result.filter(d => d.name.toLowerCase().includes(req.query.name.toLowerCase()))
    }

    let dogs_list = {"database": db_result, "api": api_result};
    res.json(dogs_list)
  } catch (error) {
      console.log(error)
      next(error);
  }
}

router.get("/dogs/", get_dogs);

/*
*  Este manejador recibe como parametro el id de un perro y retorna la informacion de ese perro, este en el api o la base de datos
*/
async function get_dog_by_id(req, res, next) {
  try {
    const API_URL = 'https://api.thedogapi.com/v1/breeds';
    const API_KEY = 'live_iXv13sB4HgHfWEZAvdL2JNKIo0kahNlH0JD8ZyZwHVp1gkN2ImTY91lrS3bmx4tL';
    let api_result = (await axios.get(`${API_URL}?api_key=${API_KEY}`)).data;
    let db_result = await Dogs.findAll({include: {model: Temperaments}});

    /*
    * se parsea la lista retornada  por la bse de datos en una estructura que facilite su procesamiento
    */
    if (db_result.length !== 0) {
      /* convertimos a un objeto simple para poder procesarlo comodamente*/
      db_result = db_result.map(obj => obj.get({ plain: true }))

      /* parseamos a un formato de estructura compatible con el renderizado*/
      db_result = db_result.map(obj => {
        return ({ ...obj, "temperament": obj["Temperaments"].map(e=>e.name).join(", ") })
      });
    }

    /*
    * se busca en la api y el la base de datos algun elemento con el id especificado
    */
    api_result = await api_result.filter(d => d.id == req.params.dog_id)
    db_result = await db_result.filter(d => d.id == req.params.dog_id)

    if(api_result.length !== 0){
      res.json(api_result[0])
    }
    else if(db_result.length !== 0){
      res.json(db_result[0])
    }
    else{
      res.json([])
    }

    let dogs_list = {"database": db_result, "api": api_result};
  } catch (error) {
      console.log(error)
      next(error);
  }
}

router.get("/dogs/:dog_id", get_dog_by_id);

/*
*  Este manejador obtiene todos los temperamentos y los guarda en la base de datos
*/
async function refresh_temperaments(req, res, next) {
  try {
    // Agregar los temperamentos en la base de datos si no existen
    let all_temps = await Temperaments.findAll();
    if (all_temps.length === 0) {
      const API_URL = 'https://api.thedogapi.com/v1/breeds';
      const API_KEY = 'live_iXv13sB4HgHfWEZAvdL2JNKIo0kahNlH0JD8ZyZwHVp1gkN2ImTY91lrS3bmx4tL';
      let api_result = (await axios.get(`${API_URL}?api_key=${API_KEY}`)).data;

      // Obtener los temperamentos desde la API externa
      let temperaments_from_api = api_result.flatMap(dog => dog.temperament);
      let filtered_temperaments = temperaments_from_api.filter(temp => temp != null);
      let parsed_temperaments = filtered_temperaments.join().split(",").map(e => { return e.trim().toLowerCase() });
      let unique_temperaments = [...new Set(parsed_temperaments)];

      // Dar formato a los temperamentos para guardarlos en la base de datos
      unique_temperaments = unique_temperaments.map(temp => { return { name: temp } });

      asdas = await Temperaments.bulkCreate(unique_temperaments);

      // volver a consultar para retornar los temperamentos
      all_temps = await Temperaments.findAll();
    }

    // Enviar los temperamentos
    if(res){
      res.send(all_temps);
    }
  } catch (error) {
      if(next){
        console.log(error)
        next(error);
      }
  }
}

router.get('/temperaments', refresh_temperaments);

/*--------------------------------------------------------------------------------*/
/* "Updating" endpoints                                                           */
/*--------------------------------------------------------------------------------*/
/*
*  Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
*/
async function add_new_dog(req, res, next){
  try {
    /*
    * -> Calcular el id del elemento a crear en la base de datos
    * no utilizo autoincrement porque necesito que el id mínimo sea mayor que el id
    * máximo del api, esto para evitar colisiones de id, entonces el minimo es 1000.
    */
    let dog_id = 1000;
    let db_result = await Dogs.findAll();
    if (db_result.length !== 0) {
      const ids = db_result.map(obj => obj.id);
      dog_id = (Math.max(...ids) + 1); // para obtener el valor máximo de la matriz
    }

    const dog_creation = await Dogs.create({
      "id": dog_id,
      "name": req.body.name,
      "image": {url: req.body.image},
      "height": {metric: req.body.height},
      "weight": {metric: req.body.weight},
      "life_span": req.body.life_span
    })

    /*
    *
    */
    let temperament_list = req.body.temperament.split(",").map(e => e.trim())
    temperament_list.map(async el => {
      const findTemp = await Temperaments.findAll({
          where: { name: el.toLowerCase() }
      });

      dog_creation.addTemperament(findTemp);
    })

    res.status(200).end();
  }
  catch (error) {
    next(error);
  } 
}

router.post("/dogs", add_new_dog);

/*--------------------------------------------------------------------------------*/
/* Global Error handlers                                                          */
/*--------------------------------------------------------------------------------*/
/* 404 error handler */
router.use('*', async function(req, res, next){
  res.status(404).end();
});

/* custom error handler */
router.use((err, req, res, next) => {
  res.status(500).end();
})


module.exports = {router, refresh_temperaments};