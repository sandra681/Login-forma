import { GET_APARTMENT_SUCCESS, GET_APARTMENT_FAIL,  SET_MESSAGE } from "./types";
import aparmentService from "../services/apartment.service";



export const getApartments=(filter, sort, order, search)=>(dispatch)=>{
    return aparmentService.getApartments(filter, sort, order, search).then(
        (response)=>{
            dispatch({
                type:GET_APARTMENT_SUCCESS,
                payload:{apartments:response.data}
            })
            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            })

            return response
        },
        (error)=>{
            const message=(
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()

            dispatch({type:GET_APARTMENT_FAIL})
            dispatch({
                type:SET_MESSAGE,
                payload:message
            })

            return Promise.reject()
        }
    )
}