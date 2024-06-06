import { configureStore } from "@reduxjs/toolkit"
import roomReducer from "./reducers/roomReducer"

export default configureStore({
    reducer: {
        room: roomReducer,
    },
})