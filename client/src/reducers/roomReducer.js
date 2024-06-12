import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        value: false,
    },
    reducers: {
        setRoom: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {setRoom} = roomSlice.actions

export default roomSlice.reducer