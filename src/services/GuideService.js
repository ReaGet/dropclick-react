
export default class GuideService {
  static async getAll(email) {
    try {
      return await fetch("https://dropclick.pro/base/getGuideCards.php", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then(res => res.json());
    } catch(e) {
      console.log("Error while fetching guides:", e);
    }
  }

  static async getById({ email, guideId }) {
    try {
      return await fetch("https://dropclick.pro/base/getGuideCards.php", {
        method: "POST",
        body: JSON.stringify({ email, guideId }),
      }).then(res => res.json());
    } catch(e) {
      console.log("Error while fetching single guide:", e);
    }
  }

  static async getCategories() {
    try {
      return await fetch("https://dropclick.pro/base/getRaz.php")
        .then(res => res.json());
    } catch(e) {
      console.log("Error while fetching categories:", e);
    }
  }

  static async setGuideFavorite({ email, name } ) {
    try {
      return await fetch("https://dropclick.pro/base/addToFavorite.php", {
        method: "POST",
        body: JSON.stringify({ email, name }),
      }).then(res => res.json());
    } catch(e) {
      console.log("Error while adding to favorites:", e);
    }
  }
}