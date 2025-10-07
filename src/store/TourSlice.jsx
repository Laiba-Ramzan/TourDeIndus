
/* eslint-disable react-refresh/only-export-components */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [
    {
      id: 1,
      title: "Moen jo daro",
      description: "Ancient Indus Valley Civilization site",
      location: "Sindh Pakistan",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sWmVzwKol_BSx91wdH7p5wQVVi2STVoITA&s",
    },
    {
      id: 2,
      title: "Makli Necropolis",
      description: "One of the largest funerary sites in the world",
      location: "Thatta Sindh",
      images: "https://i.dawn.com/primary/2017/07/596a488f1bbbd.jpg",
    },
  ],
  resorts: [
    {
      id: 1,
      name: "Pearl Continental",
      location: "Hyderabad Sindh",
      price_per_night: 12000,
      amenities: ["Room Service", "Parking", "Fitness Center"],
      images: "https://www.pchotels.com/assets/images/Deluxe_5.png",
    },
  ],
  packages: [],
  bookings: [],
  contactRequests: [],
};

export const TourSlice = createSlice({
  name: "tourSlice",
  initialState,
  reducers: {
    setDestinations(state, action) {
      state.destinations = action.payload;
    },
    setResorts(state, action) {
      state.resorts = action.payload;
    },
    setPackages(state, action) {
      state.packages = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    addContactRequest(state, action) {
      state.contactRequests.push(action.payload);
    },
  },
});

export const {
  addBooking,
  addContactRequest,
  setDestinations,
  setResorts,
  setPackages,
} = TourSlice.actions;


export default TourSlice.reducer;
