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

const routes = [
  { path: "/",        element: <Home />,},
  { path: "/home",    element: <DashboardLayout Component={DogsIndex} /> },
  { path: "/search",  element: <DashboardLayout Component={DogsSearch} />},
  { path: "/create",  element: <DashboardLayout Component={DogsCreate} />},
  { path: "/details", element: <DashboardLayout Component={DogsDetails} />},
];

const router = createBrowserRouter(routes);
export default router;