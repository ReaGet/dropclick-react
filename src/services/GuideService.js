
export default class GuideService {
  static async getAll(email) {
    return await fetch("https://dropclick.pro/base/getGuideCards.php", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then(res => res.json());
  }

  static async getById({ email, guideId }) {
    return await fetch("https://dropclick.pro/base/getGuideCards.php", {
      method: "POST",
      body: JSON.stringify({ email, guideId }),
    }).then(res => res.json());
  }

  static async getCategories() {
    return await fetch("https://dropclick.pro/base/getRaz.php")
      .then(res => res.json());
  }
}