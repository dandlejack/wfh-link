import { BACKEND_API } from '../server.configs';
import axios from 'axios';

export class CounterApi {
  static COUNTER_API_URL = `${BACKEND_API}/webcounter`; 

  static async counterUpdate(params) {
    try {
      const result = await axios.get(this.COUNTER_API_URL+'/newUpdate', {
        params,
      });
      return result.data;
    } catch {
      window.location.replace('/404')
      return [];
    }
  }
  static async getVisitor() {
      const result = await axios.get(this.COUNTER_API_URL+'/getVisitor').then(res=>{
        console.log(res)
        return res
      })
      return result;   
  }
}
