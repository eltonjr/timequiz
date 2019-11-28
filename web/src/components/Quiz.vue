<template>
  <div>
      <span>{{question.question}}</span>
      <span v-if="question.snippet">{{question.snippet}}</span>
      <input type="radio" v-for="(item, i) in question.options"
        :key="i"
        :option="item.answer"
        :value="item.answer">
    <button @click="next()">Avançar</button>
  </div>
</template>

<script>

import service from '@/components/quiz'

export default {
  name: 'Quiz',
  props: {
  },
  data () {
    return {
      currentQuestion: 0,
      question: '',
      snippet: '',
      options: []
    }
  },
  mounted () {
    this.loadQuestions()
  },
  computed: {
  },
  methods: {
    loadQuestions () {
      this.questions = service.loadQuestions()
      this.question = this.questions[0]
    },
    next () {
      this.question = this.questions[this.currentQuestion + 1]
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
