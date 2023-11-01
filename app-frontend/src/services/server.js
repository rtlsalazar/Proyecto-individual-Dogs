/*

  Abstract:
    Este módulo define una API para hacer solicitudes HTTP a un servidor usando axios.
    La API expone cuatro métodos: get, post y delete, que corresponden a los verbos HTTP más comunes.
    Cada método recibe como parámetros la URL del recurso y el objeto de solicitud,
    y devuelve una promesa que se resuelve con los datos de la respuesta o se rechaza con el error.

*/
import axios from "axios";

/*--------------------------------------------------------------------------------*/
/* Crea una instancia de axios para usar la misma URL base.                       */
/*--------------------------------------------------------------------------------*/
const axiosAPI = axios.create({
  baseURL : "https://henry-dogs-backend.onrender.com"
});

const apiRequest = async (method, url, request) => {
  return axiosAPI({
      method,
      url,
      data: request
    })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

/*--------------------------------------------------------------------------------*/
/* Para las peticiones "Reading" (GET)                                            */
/*--------------------------------------------------------------------------------*/
const getRequest = (url, request) => apiRequest("get", url, request);

/*--------------------------------------------------------------------------------*/
/* Para las peticiones "Creating" (POST)                                          */
/*--------------------------------------------------------------------------------*/
const postRequest = (url, request) => apiRequest("post", url, request);


// expone tu método a otros servicios o acciones
const API = {
  get: getRequest,
  post: postRequest,
};
export default API;
