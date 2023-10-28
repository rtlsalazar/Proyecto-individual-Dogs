/*

  Abstract:
    Este componente muestra un formulario para agregar un nuevo perro a
    la base de datos. El formulario contiene campos para el nombre, la imagen,
    el peso, la esperanza de vida y el temperamento del perro.

    El componente valida los datos introducidos por el usuario usando javascript,
    sin utilizar las validaciones de html. Si los datos son válidos, se envían
    al servidor. Si hay errores de validación, se muestran los mensajes de error correspondientes.

  TODO:
    - Que al enviar el formulario se muestre un mensaje de confirmación sin redirigir, puede ser un popup

*/
import React, {useEffect, useCallback, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import api from "@/services/api.js";
import "./DogsDetails.scss";

function DogsDetails() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  const [isLoading, setLoading] = useState(true);
  const [dogData, setData] = useState([]);
  const asideRef = useRef("");
  const search = useLocation().search;

  // --------------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------------
  useEffect(() => {
    document.title = 'Informacion completa del animalito';

    const id = new URLSearchParams(search).get('id');
    api.search_by_id(id).then(response => {
      setData(response);
      setLoading(false);
    });
  }, []);

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (dogData.length === 0) {
    //return <NotFoundFallback />;
  }

  return (
    <div className="page-DogsDetails">
      <main>
        <article>
          <header>
            <h1>{dogData.name}</h1>
            <h2>Informacion completa del animalito</h2>
          </header>

          <figure>
            <img src={dogData.image.url}></img>
          </figure>

          <ul>
            {/*
            * Algunas propiedades estan diponibles en el api pero no en la base de datos,
            * por lo que checkamos primero si la propiedad esta disponible antes de intentar renderizarla, asi evitamos errores
            */}
            <li><span>ID</span> - <span className="item">{dogData.id}</span></li>
            <li><span>Esperanza de vida</span> - <span className="item">{dogData.life_span}</span></li>
            <li><span>Peso</span> - <span className="item">{dogData.weight.metric} kg</span></li>
            <li><span>Altura</span> - <span className="item">{dogData.height.metric} cm</span></li>
            {dogData.bred_for && <li><span>Habilidades</span> - <span className="item">{dogData.bred_for}</span></li>}
            {dogData.origin && <li><span>Origen</span> - <span className="item">{dogData.origin}</span></li>}
            <li><span>Temperamento</span> - <span className="item">{dogData.temperament}</span></li>
          </ul>

        </article>
      </main>
    </div>
  );
}

export default DogsDetails;
