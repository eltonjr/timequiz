<template>
  <scoreboard-list></scoreboard-list>
  <!-- here goes the score + quiz -->
</template>

<script>
import ScoreboardList from '@/components/header-bar/ScoreboardList'

export default {
  name: 'App',
  data () {
    return {
      name: ''
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    ScoreboardList
  }
}
</script>

<style lang="sass">
  @import "bulma";

  body {
    background-color: #fff;
  }

  .small-padding {
    padding: .75rem;
  }
</style>
