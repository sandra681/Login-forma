import axios from 'axios'

const API_URL = "http://127.0.0.1:8000/api/";

const getApartments=(filter, sort, order, search)=>{
    
    if(filter===""){
        return axios.get(API_URL+"home",{
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            params:{
                search,
                sort,
                order
                
            }
        })
    }

    return axios.get(API_URL + "home",{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        params:{
            search,
            filter,
            sort,
            order
            
        }
    })
}
export default {getApartments}