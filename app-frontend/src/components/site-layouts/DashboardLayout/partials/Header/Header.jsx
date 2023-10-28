/*

  Abstract:
    Este componente muestra el encabezado de la página web, que contiene un
    formulario de búsqueda y un botón de menú. El encabezado se adapta al tamaño
    de la pantalla, mostrando una versión para escritorio y otra para móvil.
    El componente recibe una referencia al componente Aside, que se usa para
    activar o desactivar el menú lateral.

  props:
    @param {object} asideRef - Una ref que apunta al elemento aside que contiene el menú lateral para la versión móvil.

*/
import "./Header.scss";
import {useRef} from "react";

function Header({asideRef}) {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  /* Modals opening states*/
  const searchMenuRef = useRef("");

  // --------------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------------
  function closeModal(event) {
    event.preventDefault();
    searchMenuRef.current.close();
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
    <div className="component-Header">
      <header className="desktop">
        <form action="/search" method="get">
          <input type="text" name="name" placeholder="Busca tu nuevo amigo!"></input>
          <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_5_3866)"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.958 7.40981C17.2466 9.8063 17.1591 13.6043 14.7626 15.8928C12.3661 18.1814 8.56816 18.0939 6.2796 15.6974C3.99103 13.301 4.07852 9.50298 6.475 7.21441C8.87148 4.92585 12.6695 5.01333 14.958 7.40981ZM16.8244 16.6039C19.3385 13.5225 19.222 8.97893 16.4044 6.02854C13.353 2.83323 8.28904 2.71659 5.09373 5.76801C1.89842 8.81943 1.78177 13.8834 4.83319 17.0787C7.65072 20.0291 12.1841 20.3547 15.378 17.9851L17.4926 20.1995C17.874 20.5989 18.507 20.6135 18.9064 20.2321C19.3059 19.8506 19.3204 19.2176 18.939 18.8182L16.8244 16.6039Z" fill="#B2B2B2"/></g><defs><clipPath id="clip0_5_3866"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></button>
        </form>
      </header>

      <dialog ref={searchMenuRef} onClick={hideIfClickOutside}> 

        {/* Asigna la referencia al form y le agrega un evento de submit */}
        <form action="/search" method="get"> 
          <header>
            <h1>Search</h1>
          </header>

          <fieldset>
            <input type="text" name="name" placeholder="Busca tu nuevo amigo!"></input>
          </fieldset>

          <footer>
            {/* Agrega un evento de clic al botón cancelar */}
            <button class="cancel" onClick={closeModal}>Cancel</button> 

            {/* Agrega un atributo formmethod al botón enviar */}
            <button class="send" type="submit">Continue</button> 
          </footer>
        </form>
      </dialog>

      <header className="mobile">
        <button className="menu" onClick={()=>{asideRef.current.classList.toggle("active")}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z" fill="#686868"/></svg>
        </button>

        <h1>The Dog List!</h1>

        <button className="search" onClick={()=>searchMenuRef.current.showModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_6_6522)"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.958 7.40981C17.2466 9.8063 17.1591 13.6043 14.7626 15.8928C12.3661 18.1814 8.56816 18.0939 6.2796 15.6974C3.99103 13.301 4.07852 9.50298 6.475 7.21441C8.87148 4.92585 12.6695 5.01333 14.958 7.40981ZM16.8244 16.6039C19.3385 13.5225 19.222 8.97893 16.4044 6.02854C13.353 2.83323 8.28904 2.71659 5.09373 5.76801C1.89842 8.81943 1.78177 13.8834 4.83319 17.0787C7.65072 20.0291 12.1841 20.3547 15.378 17.9851L17.4926 20.1995C17.874 20.5989 18.507 20.6135 18.9064 20.2321C19.3059 19.8506 19.3204 19.2176 18.939 18.8182L16.8244 16.6039Z" fill="#686868"/></g><defs><clipPath id="clip0_6_6522"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
        </button>
      </header>
    </div>
  );
}

export default Header;