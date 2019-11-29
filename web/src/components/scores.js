import router from '@/shared/router'
import scoresFallback from '../../static/assets/scores-fallback.json'

export default {

  scoreboard: [],

  pending: 0,

  reload () {
    this.clear()
    return this.getScores()
  },

  clear () {
    this.scoreboard = []
  },

  // TODO remove
  // getScores () {
  //   return Promise.resolve(data)
  // },

  getScores () {
    if (this.pending) {
      return Promise.resolve([])
    }

    this.pending++
    return router.get(router.paths.scores).then(res => {
      this.pending--

      if (!res.data) {
        res.data = { scores: [] }
      }

      let response = res.data

      return response
    }).catch(failure => {
      console.error('fails attempting get scores: ', failure)
      this.pending--
      return scoresFallback
    })
  },

  postScore (payload) {
    this.pending++
    return router.post(router.paths.scores, payload).then(res => {
      this.pending--

      if (!res.data) {
        res.data = {}
      }

      return res.data
    }).catch(failure => {
      this.pending--
      return {}
    })
  }
}
