<template>
  <div>
    <scoreboard-item v-for="(item, i) in scores" :key="i" :item="item" :index="i+1"></scoreboard-item>
  </div>
</template>

<script>
import service from '@/components/scores'
import ScoreboardItem from '@/components/ScoreboardItem'

export default {
  name: 'ScoreboardList',
  props: {
  },
  data () {
    return {
      pending: 0,
      scores: []
    }
  },
  mounted () {
    this.pending++
    service.getScores().then(data => {
      this.pending--
      this.scores = data
    }).catch(failure => {
      this.pending--
      console.log('failed getting scores', failure)
    })
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
    ScoreboardItem
  }
}
</script>

<style lang="sass">
</style>
