import { BACKEND_API } from '../server.configs';
import axios from 'axios';

export class PostApi {
  static POST_API_URL = `${BACKEND_API}/jobspost`;
  static UPLOAD_API_URL = `${BACKEND_API}/photos`
  static async createNewPost(data) {
    const result = axios
      .post(this.POST_API_URL , data)
      .then(response => {
        return response.data;
      });
    return result;
  }

  static async uploadImages(image){    
    const result = await axios.post(this.UPLOAD_API_URL+'/uploads',image)
    .then(res=>{
      return res.data
    })
    return result
  }

  static async uploadImage(image){    
    const result = await axios.post(this.UPLOAD_API_URL+'/upload',image)
    .then(res=>{
      return res.data
    })
    return result
  }

  static async getAllPosts(params) {
    try {
      const result = await axios.get(this.POST_API_URL+'/findall', {
        params,
      });
      // result.data.data = result.data.data.sort((left, right) => {
      //   return moment.utc(left.date).diff(moment.utc(right.date));
      // });
      return result.data;
    } catch {
      window.location.replace('/404')
      return [];
    }
  }

  static async getPostByUserID(params) {    
    const result = await axios.get(this.POST_API_URL + `/findByUserID/`,{
      params
    });
    return result.data;
  }

  static async getCompanyRequired(params) {    
    const result = await axios.get(this.POST_API_URL + `/findCompanyRequired/`,{
      params
    });
    return result.data;
  }

  static async getPostByPostID(postId) {
    const result = await axios.get(this.POST_API_URL + `/post/` + postId);
    return result.data;
  }

  static async getPostByID(id) {
    const result = await axios.get(this.POST_API_URL + `/` + id);
    return result.data;
  }

  static async deletePostById(id) {
    return axios.delete(this.POST_API_URL + `/` + id);
  }

//   static async updateUserById(id: string, user: User) {
//     return axios.put(this.USER_API_URL + `/` + id, user);
//   }
}
