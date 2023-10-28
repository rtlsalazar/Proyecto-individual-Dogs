/*

  Abstract:
    Este componente muestra una lista de perros que coinciden con el nombre que
    el usuario busca en la barra de navegación. El usuario puede filtrar y ordenar la
    lista según el origen y el temperamento de los perros, y ver los detalles de cada
    perro al hacer clic en su imagen.

*/
import "./DogsSearch.scss";
import React, {useEffect, useCallback, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import CardsGrid from '@/components/ui-patterns/CardsGrid';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '@/store/dogs';


function DogsSearch() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  const search = useLocation().search;
  let dispatch = useDispatch();
  let dogsList = useSelector(state => state);

  // --------------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const query = new URLSearchParams(search).get('name');
    dispatch(actions.getDogsByName(query))
  }, []);

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  return (
    <div className="page-DogsSearch">
      <main>
        <CardsGrid allData={dogsList}/>
      </main>
    </div>
  );
}

export default DogsSearch;