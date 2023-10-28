/*
  Acerca de: 
    Este componente muestra una barra lateral con una lista de enlaces y
    un botón para añadir un nuevo perro. La barra lateral tiene una funcionalidad para
    ocultarse cuando se hace clic fuera de ella en los dispositivos móviles.
    Esto se consigue usando una ref para acceder al elemento aside, y un
    MutationObserver para vigilar los cambios en su atributo class.

  @param {object} asideRef - Una ref que apunta al elemento aside
*/
import {useEffect} from "react";
import {Link} from 'react-router-dom'
import "./Aside.scss";

function Aside({asideRef}) {
  // --------------------------------------------------------------------------------
  // Métodos
  // --------------------------------------------------------------------------------
  /* Cierra la barra lateral cuando se hace clic afuera de ella (versión móvil) */
  function hideIfClickOutside() {
    /* si el elemento no tiene la clase .active entonces no hacer nada*/
    if (!asideRef.current.classList.contains("active")) {
      return;
    }

    /* si el elemento tiene la clase .active entonces esperar a un clic afuera para ocultarlo*/
    document.addEventListener("mouseup", function handler(e){
      if (!asideRef.current.contains(e.target)) {
        asideRef.current.classList.remove('active');
        document.removeEventListener("mouseup", handler);
      }
    });
  }

  // --------------------------------------------------------------------------------
  // Inicialización
  // --------------------------------------------------------------------------------
  useEffect(() => {
    // empezar a observar el elemento aside
    let observer = new MutationObserver(hideIfClickOutside);

    observer.observe(asideRef.current, {
      attributes: true, // observar los cambios de atributos
      attributeFilter: ["class"] // solo observar el atributo class
    });

    return () => {
      // dejar de observar el elemento objetivo (opcional)
      observer.disconnect();
    };
  }, []);

  // --------------------------------------------------------------------------------
  // Renderización
  // --------------------------------------------------------------------------------
  return (
    <div className="component-Aside">
      <aside ref={asideRef}>
        <h1>The Dog List!</h1>

        <a href="/create">
          Agregar Perro
        </a>

        <div className="navigation">
          <h1>Barra de navegacion</h1>
          <nav role="navigation" aria-label="Main navigation">
            <Link to="/home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="#B2B2B2"/>
              </svg>
              Home
            </Link>

            <Link to="/create">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z" fill="#B2B2B2" stroke-width="0"></path>
              </svg>
              Create
            </Link>
          </nav>
        </div>
      </aside>      
    </div>

  );
}

export default Aside;

