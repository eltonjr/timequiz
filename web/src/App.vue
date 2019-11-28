<template>
  <div>
    <page-header></page-header>
    <router-view/>
  </div>
  <!-- here goes the score + quiz -->
</template>

<script>
import PageHeader from '@/components/header/Header'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="sass" src="./app.scss">
</style>
