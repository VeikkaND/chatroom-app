import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        value: false,
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {set} = roomSlice.actions

export default roomSlice.reducer