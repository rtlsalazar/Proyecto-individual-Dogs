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
import { useNavigate } from 'react-router-dom';
import api from "@/services/api.js";
import "./DogsCreate.scss";

function DogsCreate() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState({}); // state para guardar los errores encontrados en la validación

  // --------------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------------
  async function HandleonSubmit(event) {
    event.preventDefault(); // evita el envío del formulario por defecto

    const formData = new FormData(event.target); // obtiene los datos del formulario
    const data = Object.fromEntries(formData.entries()); // convierte los datos a un objeto
    
    const validation = validate(data); // valida los datos usando la función validate
    if (validation.isValid) {
      // si no hay errores de validación, se puede enviar el formulario
      api.create(data.name, data.image, data.height, data.weight, data.life_span, data.temperament);
      setErrors({});
      navigateTo('/home');
    }
    else {
      // si hay errores de validación, se actualiza el estado errors con los mensajes de error
      setErrors(validation.errors);
    }
  }

  function validate(data) {
    // esta función recibe un objeto con los datos del formulario y devuelve un objeto con dos propiedades: isValid y errors
    let isValid = true; // indica si los datos son válidos o no
    let errors = {}; // guarda los mensajes de error para cada campo

    // se valida el campo name, que debe ser una cadena no vacía
    if (!data.name || data.name.trim() === "") {
      isValid = false;
      errors.name = "El nombre es obligatorio";
    }

    // se valida el campo image, que debe ser una url válida
    if (!data.image || !isURL(data.image)) {
      isValid = false;
      errors.image = "La imagen debe ser una url válida";
    }

    // se valida el campo weight, que debe ser un rango de números separados por un guión
    if (!data.height || !isNumberRange(data.height)) {
      isValid = false;
      errors.height = "La altura debe ser un rango de números separados por un guión. Ejemplo: 64 - 69";
    }

    // se valida el campo weight, que debe ser un rango de números separados por un guión
    if (!data.weight || !isNumberRange(data.weight)) {
      isValid = false;
      errors.weight = "El peso debe ser un rango de números separados por un guión. Ejemplo: 5 - 7";
    }

    // se valida el campo life_span, que debe ser un número seguido de una unidad de tiempo
    if (!data.life_span || !isLifeSpan(data.life_span)) {
      isValid = false;
      errors.life_span = "La esperanza de vida debe ser un número seguido de una unidad de tiempo. Ejemplo: 11 years";
    }

    // se valida el campo temperament, que debe ser una lista de adjetivos separados por comas
    if (!data.temperament || !isTemperamentList(data.temperament)) {
      isValid = false;
      errors.temperament = "El temperamento debe ser una lista de adjetivos separados por comas. Ejemplo: Wild, Hardworking, Dutiful";
    }

    return {isValid, errors}; // se devuelve el objeto con las propiedades isValid y errors
  }

  function isURL(str) {
    // esta función recibe una cadena y devuelve true si es una url válida o false en caso contrario
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(str);
  }

  function isNumberRange(str) {
    // esta función recibe una cadena y devuelve true si es un rango de alturas válido o false en caso contrario
    const regex = /^\d+(\.\d+)?\s*-\s*\d+(\.\d+)?$/;
    return regex.test(str);
  }

  function isLifeSpan(str) {
    // esta función recibe una cadena y devuelve true si es una esperanza de vida válida o false en caso contrario
    const regex = /^\d+(\.\d+)?\s*(years|months|weeks|days)$/;
    return regex.test(str);
  }

  function isTemperamentList(str) {
    // esta función recibe una cadena y devuelve true si es una lista de temperamentos válida o false en caso contrario
    const regex = /^(\w+\s*,\s*)*\w+$/;
    return regex.test(str);
  }

  // --------------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------------
  useEffect(() => {
    document.title = 'Agrega tu nuevo mejor amigo!';
  }, []);

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  return (
    <div className="page-DogsCreate">
      <main>
        <form onSubmit={HandleonSubmit}>
          <header>
            <h1>Agrega tu nuevo <mark>mejor amigo!</mark></h1>
            <p>Completa los datos de tu nuevo compañero peludo y súbelo a nuestra base de datos de perros</p>
          </header>

          <fieldset>
            <div className="field">
              <label>Nombre</label>
              <input type="text" name="name" placeholder="ejemplo: chihuahua"></input>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Imagen</label>
              <input type="text" name="image" placeholder="url de la imagen del animalito"></input>
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
            <div className="field">
              <label>Altura (cm)</label>
              <input type="text" name="height" placeholder="ejemplo: 64-69"></input>
              {errors.height && <span className="error">{errors.height}</span>}
            </div>
            <div className="field">
              <label>Peso (kg)</label>
              <input type="text" name="weight" placeholder="ejemplo: 5-7"></input>
              {errors.weight && <span className="error">{errors.weight}</span>}
            </div>
            <div className="field">
              <label>Esperanza de vida</label>
              <input type="text" name="life_span" placeholder="ejemplo: 11 years"></input>
              {errors.life_span && <span className="error">{errors.life_span}</span>}
            </div>
            <div className="field">
              <label>Temperamento</label>
              <input type="text" name="temperament" placeholder="ejemplo: Intelligent, Affectionate, Energetic"></input>
              {errors.temperament && <span className="error">{errors.temperament}</span>}
            </div>
          </fieldset>

          <footer>
            <button class="send" value="send">Agregar</button> 
          </footer>

        </form>
      </main>
    </div>
  );
}

export default DogsCreate;
