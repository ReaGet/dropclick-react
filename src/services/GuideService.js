import axios from "axios";

export default class GuideService {
    static async getAll(email) {
      return await fetch("https://dropclick.pro/base/getGuideCards.php", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then(res => res.json());
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