/*

  Home:
    Landing page

*/
import React, {useEffect, useCallback, useRef, useState} from "react";
import { Link } from 'react-router-dom';
import "./Home.scss";

function Home() {
  // --------------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------------
  useEffect(() => {
    document.title = 'The Dogs List';
  }, []);

  // --------------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------------
  return (
    <div className="page-Home">
      <header>
        <h1>The Dog List!</h1>
      </header>

      <main>
        <section className="hero">
          <div className="hero-desc">

            <div className="body">
              <h1>La mejor forma de conocer a tu nuevo mejor amigo.</h1>
              <p>información e imágenes de decenas de razas de perros, desde las más populares hasta las más exóticas.  Nuestro directorio te ofrece todo lo que necesitas saber sobre los perros.</p>
            </div>

            <Link to="/home">Acceder</Link>
          </div>

          <div className="hero-img">
            <img src="/img/dog-hero.png"></img>
          </div>
        </section>
      </main>

      <footer>
        <p>© Diseñado y programado con ❤ por Moisés Salazar.</p>
      </footer>

    </div>
  );
}

export default Home;