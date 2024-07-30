import React, {useEffect} from "react"
import {Navigate,useLocation} from "react-router-dom"
import store from "../store"
import {requests} from "../utils"

export default function RouterGuardian({children}){
    const state = store.getState()
    const token = state.auth.token
    console.log(token)
    const location = useLocation();
    const aliveTest = async () => {
        try {
            await requests.get('/auth/alive');
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        aliveTest()
    },[location])
    if(token === '') return <Navigate to={'/login'}/>
    aliveTest()
    return children

}