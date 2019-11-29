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
      dueDate: moment().add(MAX_TIME, 'minutes').toDate(),
      startDate: new Date(),
      remaining: '',
      interval: null
    }
  },
  mounted () {
    this.setRemainingTime()
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
        this.finish()
        return
      }
      this.currentQuestion += 1
      this.question = this.questions[this.currentQuestion]
    },
    setRemainingTime () {
      const r = moment.duration(this.dueDate - new Date())
      this.remaining = `${this.padLeft(r.minutes())}:${this.padLeft(r.seconds())}`
      if (Math.round(r.asSeconds()) === 0) {
        this.finish()
      }
    },
    finish (score, time) {
      if (this.interval) {
        clearInterval(this.interval)
      }
      const elapsed = moment.duration(new Date() - this.startDate).asSeconds()
      const user = serviceForm.fillUserWithScore({ score: this.score, time: Math.round(elapsed) })
      serviceScore.postScore(user)
    },
    padLeft (val) {
      val = '' + val
      if (val.length < 2) {
        return '0' + val
      }
      return val
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
