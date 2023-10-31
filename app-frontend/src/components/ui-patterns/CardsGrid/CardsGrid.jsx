/*

  About:
    Este componente es una cuadrícula de tarjetas que muestra una lista de perros con sus detalles.
    El usuario puede filtrar y ordenar la lista según diferentes criterios, como el nombre, el peso,
    la altura y el origen de los perros y ver los detalles de cada perro al hacer clic en su imagen.

  @param {array} allData - un array de objetos que representan los datos de los perros

*/

import "./CardsGrid.scss";
import React, {useEffect, useCallback, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import Pagination from "./partials/Pagination";
import FilteringMenu from './partials/FilterModal';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '@/store/actions';

function CardsGrid({allData}) {
  /* --------------------------------------------------------------------------------*/
  /* States */
  /* --------------------------------------------------------------------------------*/
  let dispatch = useDispatch();
  const filterMenuRef = useRef("");

  /* filtering and ordering states*/
  let {prefered_order, prefered_filter} = useSelector(state => state);
  const [parsedData, setData] = useState([]);

  /* Pagination related states*/
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex -  dataPerPage;
  const currentPageData = parsedData?.slice(firstIndex, lastIndex);

  // --------------------------------------------------------------------------------
  // Methods and hooks
  // --------------------------------------------------------------------------------
  /*
  * Esta función establece el filtro preferido por el usuario y lo envía al reducer
  */
  function setPreferedFilter(filter) {
    dispatch(actions.setFilteringState(filter));
  }

  /*
  * Esta función establece el orden preferido por el usuario y lo envía al reducer
  */
  function setPreferedOrder(filter) {
    dispatch(actions.setOrderingState(filter));
  }

  /*
  *  Recibe una lista de perros, y un objeto con el filtrado preferido
  *  como parámetros y devuelve una nueva lista de perros filtrada según esos criterios.
  */
  function applyFilter(list, filter) {
    let resultingList = [];

    /*
    * Si el arreglo de orígenes no está vacío, se concatena la lista de perros según su origen.
    * Si el arreglo de orígenes está vacío, se concatena la lista completa de perros.
    */
    if (filter.origin.length !== 0){
      if(filter.origin.includes("database")){
        resultingList = resultingList.concat(list.database);
      }
      if(filter.origin.includes("api")){
        resultingList = resultingList.concat(list.api);
      }
    }
    else{
      resultingList = resultingList.concat(list.database);
      resultingList = resultingList.concat(list.api);
    }

    /*
    * Si el arreglo de temperamentos no está vacío, se filtra la lista de perros según su temperamento.
    * Se verifica si algún elemento del arreglo de temperamentos coincide con algún elemento del arreglo de temperamentos del perro.
    * Se utiliza el método split para separar los temperamentos del perro por comas y espacios.
    */
    if (filter.temperament.length !== 0) {
      resultingList = resultingList.filter(function(obj) {
        return filter.temperament.some(function(value) {
          if (obj.temperament) {
            return obj.temperament.split(', ').includes(value);
          }
        });
      });
    }

    return resultingList;
  }

  /*
  *  Recibe una lista de perros y un objeto con el ordenamiento preferido
  *  como parámetros y devuelve una nueva lista de perros ordenada según esos criterios.
  */
  function applyOrder(list, order) {
    
     /*
     * Si el tipo de ordenamiento es por nombre, se ordena la lista alfabéticamente según el nombre del perro.
     * Si la forma de ordenamiento es descendente, se invierte el orden de la comparación.
     */
    if (order.type === "name") {
      if (order.way == "descendent") {
        list.sort((a, b) => b.name.localeCompare(a.name));
      }
      else {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    /*
     * Si el tipo de ordenamiento es por peso, se ordena la lista numéricamente según el peso mínimo del perro en libras.
     * Si la forma de ordenamiento es descendente, se invierte el orden de la comparación.
     */
    if (order.type === "weight") {
      if (order.way == "descendent") {
        list.sort((a, b) => {
          let maximumWeight_a = a.weight.imperial?.split(" - ")[1];
          let maximumWeight_b = b.weight.imperial?.split(" - ")[1];
          return (maximumWeight_b - maximumWeight_a)
        });
      }
      else {
        list.sort((a, b) => {
          let maximumWeight_a = a.weight.imperial?.split(" - ")[1];
          let maximumWeight_b = b.weight.imperial?.split(" - ")[1];
          return (maximumWeight_a - maximumWeight_b)
        });
      }
    }

    return list;
  }

  /* --------------------------------------------------------------------------------*/
  /* Initialization */
  /* --------------------------------------------------------------------------------*/
  /*
  * Este efecto se ejecuta cuando se monta el componente y cada vez que
  * cambia el estado "order" o el estado "filter".
  *
  * - Luego, aplica dos funciones auxiliares para filtrar y ordenar la lista según
  * los criterios que haya seleccionado el usuario.
  *
  * - Finalmente, actualiza el estado "data" con la lista resultante,
  * el estado "currentPage" con el valor 1
  */
  useEffect(() => {
    let filtered_list = allData;

    /*
    * filtra segun su temperamento
    */    
    filtered_list = applyFilter(filtered_list, prefered_filter);

    /*
    * Ordena los datos filtrados según el estado "order".
    */
    filtered_list = applyOrder(filtered_list, prefered_order);

    setData(filtered_list);
    setCurrentPage(1);
  }, [allData, prefered_order, prefered_filter]);

  /* --------------------------------------------------------------------------------*/
  /* Main */
  /* --------------------------------------------------------------------------------*/
  return (
    <>
      {/*-- modals --*/}
      <FilteringMenu modalRef={filterMenuRef} setFilter={setPreferedFilter}/>

      {/*-- main content --*/}
      <article className="dogs-grid">
        <header>
          {/* esto se veria mejor como un modal, pero eso da para mas adelante*/}
          <div className="options">
            <button onClick={()=>{setPreferedOrder({"type": "", "way": ""})}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_127_89)"><path d="M2.25 6.75L5.25 3.75M5.25 3.75L8.25 6.75M5.25 3.75V10.5758M5.25 13.1471V13.7419V14.264" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 11.25L12.75 14.25M12.75 14.25L9.75 11.25M12.75 14.25V8.12343M12.75 5.55213V4" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 4L2 14" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_127_89"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
            </button>

            <form>
              <label for="order">
                Order:
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_6_4055)"><path d="M2.25 6.75L5.25 3.75M5.25 3.75L8.25 6.75M5.25 3.75V14.25" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 11.25L12.75 14.25M12.75 14.25L9.75 11.25M12.75 14.25V3.75" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_6_4055"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
              </label>
              <select id="order" onChange={(event)=>{setPreferedOrder(JSON.parse(event.target.value))}}>
                <option value="unordered"></option>

                <optgroup label="Por Nombre">
                  <option value='{"type":"name","way":"descendent"}'>Descendiente</option>
                  <option value='{"type":"name","way":"ascendent"}'>Ascendiente</option>
                </optgroup>

                <optgroup label="Por Peso">
                  <option value='{"type":"weight","way":"descendent"}'>Descendiente</option>
                  <option value='{"type":"weight","way":"ascendent"}'>Ascendiente</option>
                </optgroup>
              </select>
            </form>
          </div>

          <div className="options">
            <button onClick={()=>filterMenuRef.current.showModal()}>
              Filter:
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_6_4065)"><path d="M3 3H15V4.629C14.9999 5.02679 14.8418 5.40826 14.5605 5.6895L11.25 9V14.25L6.75 15.75V9.375L3.39 5.679C3.13909 5.40294 3.00004 5.0433 3 4.67025V3Z" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_6_4065"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
            </button>
            <button onClick={()=>{setPreferedFilter({"origin": [], "temperament": []})}} >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_127_85)"><path d="M5.5 3H15V4.629C14.9999 5.02679 14.8418 5.40826 14.5605 5.6895L11.625 8.625M11.25 11.25V14.25L6.75 15.75V9.375L3.39 5.679C3.13909 5.40294 3.00004 5.0433 3 4.67025V3" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 1.5L15.75 15.75" stroke="#686868" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_127_85"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
            </button>
          </div>


        </header>

        <section className="cards-grid">
          {currentPageData.map((item, index) => (
            <article className="tile">
              <section className="card-picture">

                <Link to={"/details?id="+item.id}>
                  <img src={item.image.url}></img>
                </Link>

              </section>

              <section className="card-description">
                <h1>{item.name}</h1>
                <p className="weight">{item.weight.metric}. Kg</p>
                <p className="bred_for">{item.life_span}</p>
                <p className="temperament">{item.temperament}</p>
              </section>
            </article>

          ))}
        </section>

        <footer>
          <Pagination
            totalCount={parsedData.length}
            currentPage={currentPage}
            pageSize={dataPerPage}
            onPageChange={setCurrentPage}
          />
        </footer>
      </article>
    </>
  );
}

export default CardsGrid;