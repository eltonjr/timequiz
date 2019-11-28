<template>
  <div>
      <span>{{question.question}}</span>
      <span v-if="question.snippet">{{question.snippet}}</span>
      <div v-for="(item, i) in question.options" :key="i">
        <input type="radio"
          :option="item.answer"
          :value="item.answer">
        <label>{{item.answer}}</label>
      </div>
    <button @click="next()">Avançar</button>
  </div>
</template>

<script>

import serviceQuiz from '@/components/quiz'
// import serviceScore from '@/components/scores'
// import serviceForm from '@/components/form'

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
    // start time
    this.loadQuestions()
  },
  computed: {
  },
  methods: {
    loadQuestions () {
      this.questions = serviceQuiz.loadQuestions()
      this.question = this.questions[0]
    },
    next () {
      if (this.currentQuestion === 9) {
        // calc score
        // pass user to postScore
        // serviceForm.fillUserWithScore()
        // let a = serviceScore.postScore()
        return
      }
      this.currentQuestion += 1
      this.question = this.questions[this.currentQuestion]
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
