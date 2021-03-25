import { BACKEND_API } from '../server.configs';
import axios from 'axios';

export class CounterApi {
  static COUNTER_API_URL = `${BACKEND_API}/webcounter`;
  static COUNTER_API_URL2 = `${BACKEND_API}/cotest`;

  static async counterUpdate(params) {
    try {
      const result = await axios.get(this.COUNTER_API_URL2+'/newUpdate', {
        params,
      });
      return result;
    } catch {
      window.location.replace('/404')
      return [];
    }
  }
  static async getVisitor() {
      const result = await axios.get(this.COUNTER_API_URL+'/getVisitor').then(res=>{
        return res
      })
      return result;   
  }
  
  static async findAll(params) {
    const result = await axios.get(`${this.COUNTER_API_URL2}/findall`, {//await axios.get(`${this.COUNTER_API_URL}/findall`, {
      params,
    }).then(res=>{
        return res.data
    })
    return result
}
}
