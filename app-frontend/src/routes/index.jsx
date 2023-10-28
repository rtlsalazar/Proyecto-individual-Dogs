import React from "react";
import { createBrowserRouter } from "react-router-dom";

// componente de orden superior (HOC), funciona como frame layout
import DashboardLayout from '@/components/site-layouts/DashboardLayout';

// Pagina del landing page
const Home = React.lazy(() => import("@/pages/Home"));

// Paginas del dashboard
const DogsIndex = React.lazy(() => import("@/pages/Dogs/DogsIndex"));
const DogsDetails = React.lazy(() => import("@/pages/Dogs/DogsDetails"));
const DogsSearch = React.lazy(() => import("@/pages/Dogs/DogsSearch"));
const DogsCreate = React.lazy(() => import("@/pages/Dogs/DogsCreate"));

// Paginas de errores genericos
const Error404 = React.lazy(() => import("@/pages/utils/Error404"));
const Error500 = React.lazy(() => import("@/pages/utils/Error500"));

const routes = [
  { path: "/",        element: <Home />,},
  { path: "/home",    element: <DashboardLayout Component={DogsIndex} /> },
  { path: "/search",  element: <DashboardLayout Component={DogsSearch} />},
  { path: "/create",  element: <DashboardLayout Component={DogsCreate} />},
  { path: "/details", element: <DashboardLayout Component={DogsDetails} />},
  { path: "/*",       element: <Error404 />}, // para rutas no definidas
];

const router = createBrowserRouter(routes);
export default router;