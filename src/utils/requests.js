import axios from "axios"
import store from "../store"

const requests = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 20000
})

requests.interceptors.request.use((config)=>{
    const state = store.getState()
    const token = state.auth.token
    config.headers.Authorization = `Bearer ${token}`
    return config
}, (error)=>{
    return Promise.reject(error)
})

requests.interceptors.response.use((response)=>{

    return response.data
}, (error)=> {
    return Promise.reject(error)
})


export default requests