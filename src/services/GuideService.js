
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

  static async getById({ email, guideId }, includeTasks = false) {
    const payload = { email, guideId };

    if (includeTasks) {
      payload["includeTasks"] = true;
    }

    try {
      return await fetch("https://dropclick.pro/base/getGuideCards.php", {
        method: "POST",
        body: JSON.stringify(payload),
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

  static async getTaskContent({ id }) {
    try {
      return await fetch("https://dropclick.pro/base/getTaskContent.php", {
        method: "POST",
        body: JSON.stringify({ id }),
      }).then(res => res.json());
    } catch(e) {
      console.log("Error while fetching task content:", e);
    }
  }

  static async updateTaskCompletion({ email, name, title }) {
    try {
      return await fetch("https://dropclick.pro/base/updateTaskCompletion.php", {
        method: "POST",
        body: JSON.stringify({ email, name, title }),
      }).then(res => res.json());
    } catch(e) {
      console.log("Error while update task completion:", e);
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