/*

  Abstract:
  	Este es un componente de orden superior (HOC), funciona como frame layout
    Envuelve a otro componente y le agrega un header y un aside
    Usa useRef para acceder al elemento aside y controlar su visibilidad

  @param Component: el componente que se va a renderizar dentro del layout

*/
import {useRef} from "react";
import Header from './partials/Header';
import Aside from './partials/Aside';

function DashboardLayout({Component}) {
  const asideRef = useRef("");

  return(
    <>
      {/*-- Header menu component --*/}
      <Header asideRef={asideRef}/>

      {/*-- aside menu component --*/}
      <Aside asideRef={asideRef}/>

      {/* Renderizamos el componente original*/}
      <Component />
    </>
  );
}

export default DashboardLayout;
