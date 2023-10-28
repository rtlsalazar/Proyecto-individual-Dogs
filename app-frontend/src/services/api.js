import server from "./server.js";

/*--------------------------------------------------------------------------------*/
/* for "Reading" endpoints                                                        */
/*--------------------------------------------------------------------------------*/
/*
  Esta función hace una solicitud GET al servidor para obtener una lista de
  todos los perros disponibles.
*/
const load_list = async () => {
  try {
    const response = await server.get('/dogs', {});
    return response;
  }
  catch (error) {
    console.error(error);
  }
};

/*
  Esta función hace una solicitud GET al servidor para buscar un perro por su nombre
  Recibe como parámetro el nombre del perro a buscar.
*/
const search_by_name = async(dog_name) => {
  try {
    const response = server.get(`/dogs?name=${dog_name}`, {});
    return response;
  }
  catch (error) {
    console.error(error);
  }
};

/*
  Esta función hace una solicitud GET al servidor para buscar un perro por su nombre
  Recibe como parámetro el nombre del perro a buscar.
*/
const search_by_id = async(dog_id) => {
  try {
    const response = server.get(`/dogs/${dog_id}`, {});
    return response;
  }
  catch (error) {
    console.error(error);
  }
};


/*--------------------------------------------------------------------------------*/
/* for "Updating" endpoints                                                       */
/*--------------------------------------------------------------------------------*/
const create = async(dog_name, dog_image, dog_height, dog_weight, dog_life_span, dog_temperament) => {
  try {
    const response = server.post(`/dogs`, {
      "name": dog_name,
      "image": dog_image,
      "height": dog_height,
      "weight": dog_weight,
      "life_span": dog_life_span,
      "temperament": dog_temperament
    });
    return response;
  }
  catch (error) {
    console.error(error);
  }
};


/*--------------------------------------------------------------------------------*/
/* for "Deleting" endpoints                                                       */
/*--------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------*/
/* expose methods to other services or actions                                    */
/*--------------------------------------------------------------------------------*/
export default {
  load_list: load_list,
  search_by_name: search_by_name,
  search_by_id: search_by_id,
  create: create
};