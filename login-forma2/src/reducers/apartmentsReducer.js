import { GET_APARTMENT_SUCCESS, GET_APARTMENT_FAIL} from "../actions/types";

const initialState={apartments=null}

export default function apartmentReducer(state=initialState, action){
    const {type,payload}=action

    switch(type){
        case GET_APARTMENT_SUCCESS:
            return {
                ...state,
                 apartments:payload.apartments
            }
        case GET_APARTMENT_FAIL:
            return{
                ...state, apartments:null
            }
            
        default:
            return state
    }
}