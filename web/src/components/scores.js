import router from '@/shared/router'

// const data = [{ name: 'Aaa', score: 25, time: 125 }, { name: 'Bbb', score: 25, time: 135 }, { name: 'Ccc', score: 21, time: 120 }]

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
