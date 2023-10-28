/*

  About:
    Este componente es una paginación simple que permite navegar por las páginas la lista de perros.

    - Uso el hook usePageNumbers para generar un rango de números de página basado en la
    página actual y el total de páginas.

    - Uso las funciones handlePrevClick, handleNextClick y handleNumberClick para
    manejar los eventos de clic en los botones de navegación.

  @param {number} totalCount - el número total de elementos en la lista
  @param {number} currentPage - el número de la página actual
  @param {number} pageSize - el número de elementos por página
  @param {function} onPageChange - una función que se llama cuando se cambia la página

*/

import React, {useEffect, useCallback, useRef, useState} from "react";
import classnames from 'classnames';

function Pagination({ totalCount, currentPage, pageSize, onPageChange }) {
  /* --------------------------------------------------------------------------------*/
  /* States */
  /* --------------------------------------------------------------------------------*/
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageNumbers = usePageNumbers(currentPage, totalPages);

  /* --------------------------------------------------------------------------------*/
  /* Methods*/
  /* --------------------------------------------------------------------------------*/
  /* Devuelve un rango de números basado en la página actual y el total de páginas */
  function usePageNumbers(currentPage, totalPages) {
    // El número máximo de números de página a mostrar
    const maxNumbers = 5;
    let numbers = [];

    /*
    * Si el numero de paginas es menor que 5:
    *  mostramos esos numeros y no procesamos mas
    */
    if (totalPages <= maxNumbers) {
      numbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    /*
    * Si el numero de paginas es mayor que 5:
    *  mostramos solo dos numeros adelante y detras de la actual pagina cuando esta es mayor que 2
    */
    if (totalPages > maxNumbers) {
      /*
      * con estos dos condicionales puedo conseguir que el selector de pagina se
      * encuentre centrado cuando es posible:
      *  - (cuando la actual pagina es dos valores mayor que el el valor minimo (1))
      *  - (cuando la actual pagina es dos valores menor que el el valor maximo (totalPages))
      */
      let start = 1;
      if(currentPage > 2){
        start = currentPage - Math.floor(maxNumbers / 2);
      }

      let end = 5;
      if(totalPages > 5){
        end = Math.min(totalPages, start + maxNumbers - 1);
      }

      /* generamos el rango de paginas*/
      var next = start;
      do{
        numbers.push(next);
      } while (next++ < end)
    }

    // Devolver el array de números de página
    return numbers;
  }

  // Manejar el clic en el botón previo
  function handlePrevClick() {
    // si hay más páginas antes
    if (currentPage > 1) {
      onPageChange((newPage) => --newPage);
    }
  }

  // Manejar el clic en el botón siguiente
  function handleNextClick() {
    // si hay más páginas después
    if (currentPage < totalPages) {
      onPageChange((newPage) => ++newPage);
    }
  }

  // Manejar el clic en el número de página
  function handleNumberClick(number) {
    if (number !== currentPage) {
      onPageChange(number);
    }
  }

  /* --------------------------------------------------------------------------------*/
  /* Main */
  /* --------------------------------------------------------------------------------*/
  return (
    <nav aria-label="Navegación por páginas">
      <ul className="pagination">
        {/* Botón previo */}
        <li className={classnames("page-item", { disabled: currentPage === 1 })}>
          <a href="#" className="prev" onClick={handlePrevClick}>
            prev
          </a>
        </li>

        {/* Números de página */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={classnames("page-item", { active: number === currentPage })}
          >
            <a href="#" onClick={() => handleNumberClick(number)}>
              {number}
            </a>
          </li>
        ))}

        {/* Botón siguiente */}
        <li className={classnames("page-item", { disabled: currentPage === totalPages })}>
          <a href="#" className="next" onClick={handleNextClick}>
            next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
