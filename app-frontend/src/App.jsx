import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// Objeto router que se ha creado usando createBrowserRouter de react-router-dom
import router from "@/routes";

// Objeto store que se ha creado usando la función createStore de la biblioteca Redux
import store from '@/store';

// Estilos globales de la aplicación
import "@/App.scss";

// Componente raíz de la aplicación
function App() {
  return (
    // Renderizar el componente Provider y pasarle el objeto store como prop
    // <Suspense>, te permite mostrar un contenido alternativo mientras se carga el componente
    <Provider store={store}>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

// Exportar el componente App como el valor predeterminado del módulo
export default App;
