import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import service from "./services/appwrite";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  addBooking,
  addContactRequest,
  setDestinations,
  setPackages,
  setResorts,
} from "./store/TourSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [resorts, destinations, packages, bookings, contactRequests] =
          await Promise.all([
            service.getResorts(),
            service.getDestinations(),
            service.getPackages(),
            service.getBookings(),
            service.getContactRequests(),
          ]);

        dispatch(setResorts(resorts?.documents || []));
        dispatch(setDestinations(destinations?.documents || []));
        dispatch(setPackages(packages?.documents || []));
        bookings?.documents?.forEach((booking) => dispatch(addBooking(booking)));
        contactRequests?.documents?.forEach((c) =>
          dispatch(addContactRequest(c))
        );
      } catch (error) {
        console.error("Appwrite fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F4EF]">
      <div className="w-16 h-16 border-4 border-[#6F4E37] border-dashed rounded-full animate-spin"></div>
      <h1 className="mt-6 text-[#6F4E37] font-semibold text-xl tracking-wide">
      </h1>
    </div>
  );


  return (
    <div className="bg-[#F9F4EF] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
