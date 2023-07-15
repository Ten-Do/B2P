const headers = { 'ngrok-skip-browser-warning': true, 'Content-Type': 'application/json' }

const API = 'https://cdc6-194-226-199-9.ngrok-free.app/api' || 'http://localhost:5000/api'

const $api = {
  get: async (url) => {
    return await fetch(API + url, { headers }).then((response) => response.json())
  },
  post: async (url, data) => {
    return await fetch(API + url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then((response) => response.json())
  },
}

export default $api
