import { BACKEND_API } from '../server.configs';
import axios from 'axios';

export class TopTenApi {
    static TOPTEN_API_URL = `${BACKEND_API}/topten`

    static async createNewPost(data) {
        const result = axios.post(`${this.TOPTEN_API_URL}`,data).then(res=>{
            return res
        })
        return result
    }
    
    static async findAll() {
        const result = await axios.get(`${this.TOPTEN_API_URL}/findall`).then(res=>{
            return res.data
        })
        return result
    }

    static async findByID(id){
        const result = await axios.get(`${this.TOPTEN_API_URL}/post/topten/${id}`).then(res=>{
            return res.data
        })        
        return result
    }
    static async findMax() {
        const result = await axios.get(`${this.TOPTEN_API_URL}/findMaxValue`).then(res=>{
            return res.data
        })
        return result
    }
}