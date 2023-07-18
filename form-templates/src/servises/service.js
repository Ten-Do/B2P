import $api from '../http/api'
import ENDPOINTS from '../http/endPoints'

export class Service {
  static async makeOperation(data) {
    const body = {
      amount: data.amount.replaceAll(',', '') * 100,
      email: data.email,
      description: data.description,
      cardNum: data.number,
    }
    console.log(body)
    return await $api.post(ENDPOINTS.postOrder, body)
  }
}
