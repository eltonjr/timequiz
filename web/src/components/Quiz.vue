<template>
  <div>
    <span>{{question.question}}</span>
    <span v-if="question.snippet">{{question.snippet}}</span>
    <input type="radio" v-for="(item, i) in options" :key="i" :item="item" :value="item.question">
  </div>
</template>

<script>

export default {
  name: 'Quiz',
  props: {
  },
  data () {
    return {
    }
  },
  mounted () {
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
