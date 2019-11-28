<template>

  <section class="section">
    <div class="container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <th>#</th>
          <th>Nome</th>
          <th>Pontuação</th>
          <th>Tempo</th>
        </thead>
        <tbody>
          <tr v-for="(item, i) in scores" :key="i">
            <td>{{i+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.score}}</td>
            <td>{{item.time}}</td>
          </tr>
        </tbody>
      </table>

      <button @click="goToForm()" class="button is-primary">Começar quiz</button>
    </div>
  </section>

  <!-- <div>
   </div>-->
</template>

<script>
import service from '@/components/scores'

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
    goToForm () {
      this.$router.push({ name: 'form' })
    }
  },
  watch: {
  },
  components: {
  }
}
</script>

<style lang="sass">
</style>
