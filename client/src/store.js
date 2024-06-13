import { configureStore } from "@reduxjs/toolkit"
import nameReducer from "./reducers/nameReducer"

export default configureStore({
    reducer: {
        name: nameReducer,
    },
})