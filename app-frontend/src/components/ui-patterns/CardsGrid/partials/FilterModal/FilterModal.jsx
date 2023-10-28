/*

  Abstract:
    Este componente es un menú de filtrado que permite al usuario seleccionar
    opciones de origen y temperamento para buscar perros.
    Recibe dos props: modalRef y setFilter.

  @param {object} modalRef - Una ref que apunta al elemento dialog que contiene el formulario
  @param {object} setFilter - Una ref a una función que actualiza el estado del filtro en el componente padre

*/
import React, {useEffect, useCallback, useRef, useState} from "react";
import "./FilterModal.scss";


function FilterModal({modalRef, setFilter}) {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  // Esta referencia se usa para acceder al elemento form y resetearlo cuando se cierra el modal
  const formularyRef = useRef(""); 

  // --------------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------------
  function closeModal(event) {
    event.preventDefault();
    modalRef.current.close(); // Cierra el modal usando la referencia
    formularyRef.current.reset(); // Resetea el formulario usando la referencia
  }

  function HandleonSubmit(event) {
    let origins = [];
    let temperaments = [];

    /*
    * Obtiene los valores de los campos de origen y temperamento del formulario
    * y los guarda en los arreglos correspondientes
    */
    const data = new FormData(event.target);
    origins = data.getAll("origin");
    temperaments = data.getAll("temperament");

    /*
    * Llama a la función setFilter con los arreglos de origen y temperamento como argumentos
    * para actualizar el estado del filtro en el componente padre
    */
    setFilter({"origin": origins, "temperament": temperaments})
    closeModal(event)
  }

  function hideIfClickOutside(event) {
    if (event.target === event.currentTarget){
      closeModal(event)
    }
  }

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  return (
    <div className="modal-FilterModal">
      {/* Asigna la referencia al dialog y le agrega un evento de clic */}
      <dialog ref={modalRef} onClick={hideIfClickOutside}> 

        {/* Asigna la referencia al form y le agrega un evento de submit */}
        <form ref={formularyRef} onSubmit={HandleonSubmit}> 
          <header>
            <h1>Filtrar</h1>
          </header>

          <fieldset>
            <h2>Creado en</h2>
            <div className="options-grid">
              <div className="tile">
                <input type="checkbox" name="origin" value="database"></input>
                <label for="vehicle1">Base de datos</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="origin" value="api"></input>
                <label for="vehicle1">Api</label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <h2>Temperamentos</h2>
            <div className="options-grid">
              <div className="tile">
                <input type="checkbox" name="temperament" value="Intelligent"></input>
                <label for="vehicle1">Intelligent</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Affectionate"></input>
                <label for="vehicle1">Affectionate</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Alert"></input>
                <label for="vehicle1">Alert</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Friendly"></input>
                <label for="vehicle1">Friendly</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Loyal"></input>
                <label for="vehicle1">Loyal</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Playful</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Gentle</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Energetic</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Fearless</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Independent</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Wild</label>
              </div>
              <div className="tile">
                <input type="checkbox" name="temperament" value="Playful"></input>
                <label for="vehicle1">Dignified</label>
              </div>
            </div>
          </fieldset>

          <footer>
            {/* Agrega un evento de clic al botón cancelar */}
            <button class="cancel" onClick={closeModal}>Cancel</button> 

            {/* Agrega un atributo formmethod al botón enviar */}
            <button class="send" value="send" formmethod="dialog">Continue</button> 
          </footer>
        </form>

      </dialog>
    </div>
  );
}

export default FilterModal;
