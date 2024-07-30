import {createSlice} from "@reduxjs/toolkit"

const authStore = createSlice({
    name: "auth",
    initialState: {
        token: ''
    },
    reducers:{
        setToken(state, action){
            state.token = action.payload
        }
    }
})

const { setToken } = authStore.actions

const authReducer  = authStore.reducer

export { setToken }

export default authReducer