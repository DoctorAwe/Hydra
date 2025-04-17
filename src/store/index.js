import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./modules/authority"
import filesReducer from "./modules/files"

export default configureStore({
    reducer: {
        auth: authReducer,
        file: filesReducer
    }
})

