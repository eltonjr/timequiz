'use strict'

const missingName = 'Por favor, preencha o nome'
const missingEmail = 'Por favor, preencha um email válido'

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

module.exports = {

  ok: 'ok',

  currentUser: {
    name: '',
    email: '',
    score: -1,
    time: 999
  },

  validateForm (payload) {
    if (!payload.name) {
      return missingName
    }

    if (!payload.email || !emailRegex.test(payload.email)) {
      return missingEmail
    }

    return this.ok
  },

  clear () {
    this.currentUser = {
      name: '',
      email: '',
      score: -1,
      time: 999
    }
  },

  fillUserWithForm (fuser) {
    this.currentUser.name = fuser.name
    this.currentUser.email = fuser.email
    return this.currentUser
  },

  fillUserWithScore (suser) {
    this.currentUser.score = suser.score
    this.currentUser.time = suser.time
    return this.currentUser
  }

}
