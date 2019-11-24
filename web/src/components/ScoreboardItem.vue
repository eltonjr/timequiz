<template>
  <div>
    {{index}} / {{item.name}} / {{item.score}} / {{item.time}}
  </div>
</template>

<script>
// import service from '@/components/scores'

export default {
  name: 'ScoreboardItem',
  props: [
    'item',
    'index'
  ],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
  }
}
</script>

<style lang="sass">
</style>
