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

  // valores del formulario
  const [values, setValues] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: "",
  });

  // mensajes de error, en caso de haber
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: "",
  });

  // --------------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------------
  const handleChange = (e) => {
    // Obtenemos el nombre y el valor del campo
    const { name, value } = e.target;

    // Actualizamos el estado con el nuevo valor
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // iteramos sobre los elementos del objeto que contiene el los errores si todos estan vacios entonces no hay error
    const isValid = Object.values(errors).every((error) => error === "");

    if (isValid) {
      api.create(values.name, values.image, values.height, values.weight, values.life_span, values.temperament);
      alert("Formulario enviado");
      navigateTo('/home');
    }
  };

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
  /*
  * Usamos el hook useEffect para validar el formulario cada vez que cambia algún valor
  */
  useEffect(() => {
    // Declaramos un objeto para guardar los mensajes de error
    let errors = {};

    // se valida el campo name, que debe ser una cadena no vacía
    if (!values.name) {
      errors.name = "El nombre es obligatorio";
    }else{
      errors.name = "";
    }

    // se valida el campo image, que debe ser una url válida
    if (!values.image || !isURL(values.image)) {
      errors.image = "La imagen debe ser una url válida";
    }else{
      errors.image = "";
    }

    // se valida el campo weight, que debe ser un rango de números separados por un guión
    if (!values.height || !isNumberRange(values.height)) {
      errors.height = "La altura debe ser un rango de números separados por un guión. Ejemplo: 64 - 69";
    }else{
      errors.height = "";
    }

    // se valida el campo weight, que debe ser un rango de números separados por un guión
    if (!values.weight || !isNumberRange(values.weight)) {
      errors.weight = "El peso debe ser un rango de números separados por un guión. Ejemplo: 5 - 7";
    }else{
      errors.weight = "";
    }

    // se valida el campo life_span, que debe ser un número seguido de una unidad de tiempo
    if (!values.life_span || !isLifeSpan(values.life_span)) {
      errors.life_span = "La esperanza de vida debe ser un número seguido de una unidad de tiempo. Ejemplo: 11 years";
    }else{
      errors.life_span = "";
    }

    // se valida el campo temperament, que debe ser una lista de adjetivos separados por comas
    if (!values.temperament || !isTemperamentList(values.temperament)) {
      errors.temperament = "El temperamento debe ser una lista de adjetivos separados por comas. Ejemplo: Wild, Hardworking, Dutiful";
    }else{
      errors.temperament = "";
    }

    // Actualizamos el estado con el nuevo objeto de errores
    setErrors(errors);
  }, [values]); // Usamos values como dependencia del efecto

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  return (
    <div className="page-DogsCreate">
      <main>
        <form onSubmit={handleSubmit}>
          <header>
            <h1>
              Agrega tu nuevo <mark>mejor amigo!</mark>
            </h1>
            <p>
              Completa los datos de tu nuevo compañero peludo y súbelo a nuestra base de datos de perros
            </p>
          </header>

          <fieldset>
            <div className="field">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="ejemplo: chihuahua"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Imagen</label>
              <input
                type="text"
                name="image"
                value={values.image}
                onChange={handleChange}
                placeholder="url de la imagen del animalito"
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
            <div className="field">
              <label>Altura (cm)</label>
              <input
                type="text"
                name="height"
                value={values.height}
                onChange={handleChange}
                placeholder="ejemplo: 64-69"
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>
            <div className="field">
              <label>Peso (kg)</label>
              <input
                type="text"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                placeholder="ejemplo: 5-7"
              />
              {errors.weight && <span className="error">{errors.weight}</span>}
            </div>
            <div className="field">
              <label>Esperanza de vida</label>
              <input
                type="text"
                name="life_span"
                value={values.life_span}
                onChange={handleChange}
                placeholder="ejemplo: 11 years"
              />
              {errors.life_span && (
                <span className="error">{errors.life_span}</span>
              )}
            </div>
            <div className="field">
              <label>Temperamento</label>
              <input
                type="text"
                name="temperament"
                value={values.temperament}
                onChange={handleChange}
                placeholder="ejemplo: Intelligent, Affectionate, Energetic"
              />
              {errors.temperament && (
                <span className="error">{errors.temperament}</span>
              )}
            </div>
          </fieldset>

          <footer>
              <input
                class="send"
                value="Agregar"
                type="submit"
                disabled={!Object.values(errors).every((error) => error === "")}
              />
          </footer>
        </form>
      </main>
    </div>
  );
}

export default DogsCreate;
