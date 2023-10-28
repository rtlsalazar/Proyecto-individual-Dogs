/*

  Abstract:
    Este componente muestra una lista de perros con sus características y temperamentos, obtenidos
    desde una API externa y una base de datos local a travez del estado local. El usuario puede filtrar y ordenar
    la lista según diferentes criterios, como el nombre, el peso, la altura y el origen de los perros.

*/
import "./DogsIndex.scss";
import React, {useEffect, useState} from "react";
import CardsGrid from '@/components/ui-patterns/CardsGrid';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '@/store/dogs';

function DogsIndex() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  let dispatch = useDispatch();
  let dogsList = useSelector(state => state);

  // --------------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(actions.getAllDogs())
  }, []);

  // --------------------------------------------------------------------------------
  // Main
  // --------------------------------------------------------------------------------
  return (
    <div className="page-DogsIndex">
      <main>
        <CardsGrid allData={dogsList}/>
      </main>
    </div>
  );
}

export default DogsIndex;
