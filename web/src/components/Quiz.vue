<template>
  <section class="section">
    <page-header :showButton="false" :showTexts="false"></page-header>
    <div class="columns quiz">
      <div class="column is-8 is-offset-2">

        <div class="remaining">
          <!-- TODO progress -->
          <!-- TODO current score -->
          <!-- TODO timer -->
          {{remaining}}
        </div>

        <form>
          <div class="control question">
            <p>{{question.question}}</p>
          </div>
          <div class="control" v-if="question.snippet">
            <p>{{question.snippet}}</p>
          </div>
          <div class="control" v-for="(item, i) in question.options" :key="i" @click.stop.prevent="next(item)">
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
import serviceScore from '@/components/scores'
import serviceForm from '@/components/form'
import PageHeader from '@/components/header/Header'

const MAX_TIME = 5

export default {
  name: 'Quiz',
  props: {
  },
  data () {
    return {
      currentQuestion: 0,
      question: '',
      score: 0,
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
    next (answer) {
      if (answer.correct) {
        this.score += 1
      }
      if (this.currentQuestion === this.questions.length - 1) {
        let user = serviceForm.fillUserWithScore({score: this.score, time: this.remaining})
        serviceScore.postScore(user)
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
    PageHeader
  }
}
</script>

<style lang="scss">
.quiz{
  width: 100%;
  position: absolute;
  top: 20vh;
  color: white;
  font-weight: 600;

  .remaining{
    text-align: center;
    font-size: 4rem;
    font-weight: 400;
    margin-bottom: 40px;
  }

  .question{
    margin-bottom: 20px;
  }

  .radio{
    margin-bottom: 10px;
  }
}
</style>
