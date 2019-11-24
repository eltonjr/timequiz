import router from '@/shared/router'

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

      this.scores = this.scores.concat(res.data.scores)

      return res.data.scores
    }).catch(failure => {
      this.pending--
      return []
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
