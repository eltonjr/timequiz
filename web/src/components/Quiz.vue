<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8 is-offset-2">

        <div>
          <!-- TODO progress -->
          <!-- TODO current score -->
          <!-- TODO timer -->
          {{remaining}}
        </div>

        <form>
          <div class="control">
            <p>{{question.question}}</p>
          </div>
          <div class="control" v-if="question.snippet">
            <p>{{question.snippet}}</p>
          </div>
          <div class="control" v-for="(item, i) in question.options" :key="i" @click="next()">
            <label class="radio">
              <input type="radio" name="answer" :option="item.answer" :value="item.answer">
              {{item.answer}}
            </label>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import moment from 'moment'
import serviceQuiz from '@/components/quiz'
// import serviceScore from '@/components/scores'
// import serviceForm from '@/components/form'

const MAX_TIME = 5

export default {
  name: 'Quiz',
  props: {
  },
  data () {
    return {
      currentQuestion: 0,
      question: '',
      snippet: '',
      options: [],
      dueDate: moment().add(MAX_TIME, 'minutes'),
      remaining: '',
      interval: null
    }
  },
  mounted () {
    this.interval = setInterval(this.setRemainingTime, 1000)
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
    },
    setRemainingTime () {
      let r = moment.duration(this.dueDate.toDate() - new Date())
      this.remaining = `${r.minutes()}:${r.seconds()}`
    }
  },
  destroyed () {
    if (this.interval) {
      clearInterval(this.interval)
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
