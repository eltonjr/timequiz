import axios from 'axios'

const baseURL = '/server'

// instance of the axios lib
// default configurations go here
// like timeout and headers
const instance = axios.create({
  baseURL
})

// public routes the app will consume
const paths = {
  scores: '/scores'
}

export default {

  // exposes the routes constants
  paths,

  // wraps the axios lib to use the default application parameters
  // also simplifies the parameters argument
  get (path, params) {
    return instance.get(path, { params })
  },

  post (path, body, params) {
    return instance.post(path, body, { params })
  }

}
