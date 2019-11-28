'use strict'

const missingName = 'Por favor, preencha o nome'
const missingEmail = 'Por favor, preencha um email válido'

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

module.exports = {

  ok: 'ok',

  validateForm (payload) {
    if (!payload.name) {
      return missingName
    }

    if (!payload.email || !emailRegex.test(payload.email)) {
      return missingEmail
    }

    return this.ok
  }
}
