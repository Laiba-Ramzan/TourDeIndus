import { configureStore } from "@reduxjs/toolkit";
import TourSlice from "./TourSlice";
export const store = configureStore({
reducer: {
    tour: TourSlice,
}
})
