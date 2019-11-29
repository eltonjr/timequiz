<template>
  <section class="section">
    <page-header :showButton="false" :showTexts="false"></page-header>
    <div class="columns quiz">
      <div class="column is-8 is-offset-2">

        <div class="remaining">
          {{remaining}}
        </div>

        <div class="score">
          ⭐ {{score}}
        </div>

        <div class="progress" :style="'width: ' + percent + '%;'"></div>

        <form>
          <div class="control question mono">
            <p>{{question.question}}</p>
          </div>
          <div class="control" v-if="question.snippet">
            <pre>{{question.snippet}}</pre>
          </div>
          <div class="control" v-for="(item, i) in question.options" :key="i" @click.stop.prevent="next(item)">
            <label class="radio mono">
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
      questions: [],
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
    percent () {
      return ((this.currentQuestion + 1) * 100) / this.questions.length
    }
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
      this.$router.push({ name: 'result' })
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
@import '@/app.scss';

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
    margin-bottom: 20px;
  }

  .score{
    text-align: center;
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 10px;
  }

  .question{
    margin-bottom: 20px;
  }

  .radio{
    margin-bottom: 10px;
  }

  .progress{
    background-color: $neo-orange-light;
    height: 4px;
    color: white;
  }

  .mono {
    font-family: Consolas,monospace
  }

  pre {
    background-color: rgba(221, 221, 221, 0.8);
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>
