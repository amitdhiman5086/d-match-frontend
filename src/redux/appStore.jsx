import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import feedSlice from "./feedSlice"
import requestSlice from './requestSlice'

const appStore = configureStore({
reducer : {
    user :  userSlice,
    feed : feedSlice,
    request : requestSlice
}
})

export default appStore