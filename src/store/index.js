import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./modules/authority"

export default configureStore({
    reducer: {
        auth: authReducer
    }
})

