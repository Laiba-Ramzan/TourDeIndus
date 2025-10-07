
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import AdminBookingPage from './pages/AdminBookingPage';
import BookingPage from './pages/BookingPage.jsx';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage.jsx';
import ResortPage from './pages/ResortPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/adminbooking", element: <AdminBookingPage /> },
      { path: "/booking/:id", element: <BookingPage /> },
      { path: "/destinations", element: <DestinationsPage /> },
      { path: "/packages", element: <PackagesPage /> },
      { path: "/resorts", element: <ResortPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);





