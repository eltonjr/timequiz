<template>
  <section class="section">
    <page-header :showButton="true" :showTexts="true"></page-header>
    <div class="container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <th>Posição</th>
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
    </div>
  </section>

  <!-- <div>
   </div>-->
</template>

<script>
import service from '@/components/scores'
import PageHeader from '@/components/header/Header'

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
  watch: {
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="sass">
</style>
