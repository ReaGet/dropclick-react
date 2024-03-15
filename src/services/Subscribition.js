
export default class SubscribitionService {
  static async getByEmail(email) {
    return await fetch("https://dropclick.pro/base/getSubs.php", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then(res => res.json());
  }

  static async getPaymentAddresses(email) {
    return await fetch("https://dropclick.pro/base/getPay.php", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then(res => res.json());
  }
}