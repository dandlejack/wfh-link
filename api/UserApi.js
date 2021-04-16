import { BACKEND_API } from '../server.configs';
import axios from 'axios';

export class UserApi {
  static USER_API_URL = `${BACKEND_API}/users`;
  static LOGIN_SIGNUP_API_URL = `${BACKEND_API}/auth`;

  static async postSignup(user) {
    try {
      const result = axios
      .post(this.USER_API_URL + `/register`, user)
      .then(response => {
        return response;
      });
    return result;
    }catch{
      window.location.replace('/404')
      return [];
    }    
  }

  static async postSignin(user) {
      const result = axios
      .post(this.LOGIN_SIGNUP_API_URL + `/login`, user)
      .then(response => {
        return response.data;
      });
      return result;
  }

  static async findUsersAds() {
    const result = await axios.get(`${this.USER_API_URL}/findUsersAds`).then(res=>{
      return res.data
    })    
    return result
  }

  static async counterByReferralId(id) {
    const result = axios.get(`${this.USER_API_URL}/counter/${id}`).then(res=>{
      return res.data
    })
    return result
  }

  static async findByReferralId(id) {
    const result = axios.get(`${this.USER_API_URL}/referral/${id}`).then(res=>{
      return res.data
    })
    return result
  }

//   static async getUsers(params: any = {}) {
//     try {
//       const result = await axios.get(this.USER_API_URL, {
//         params,
//       });
//       return result.data.data;
//     } catch {
//       alert('Cannot fetch data');
//       return [];
//     }
//   }

//   static async getUserByID(id: string) {
//     const result = await axios.get(this.USER_API_URL + `/` + id);
//     return result.data.data;
//   }

//   static async updateUserById(id: string, user: User) {
//     return axios.put(this.USER_API_URL + `/` + id, user);
//   }
}
