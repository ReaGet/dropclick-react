import axios from "axios";

export default class GuideService {
    static async getAll() {
      const response = await axios.get("https://dropclick.pro/base/getCard.php", {
         
      });
      return response;
    }

    static async getCategories() {
      return await fetch("https://dropclick.pro/base/getRaz.php")
        .then(res => res.json());
    }

    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
}