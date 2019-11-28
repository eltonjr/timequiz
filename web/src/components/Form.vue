<template>
  <section class="section">
    <page-header :showButton="false"></page-header>
    <div class="columns user-form">
      <div class="column is-4 is-offset-4">
        <form>
          <span class="error" v-if="feedback">{{feedback}}</span>

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Nome" v-model="form.name">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Email" v-model="form.email">
            </div>
          </div>

          <div class="control form-actions">
            <button @click="goToScores()" class="button is-text">Voltar</button>
            <button @click="goToQuiz()" class="button is-light">Começar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import service from '@/components/form'
import PageHeader from '@/components/header/Header'

export default {
  name: 'Form',
  props: {
  },
  data () {
    return {
      form: {
        name: '',
        email: ''
      },
      feedback: ''
    }
  },
  mounted () {
    service.clear()
  },
  computed: {
  },
  methods: {
    goToScores () {
      this.$router.push({ name: 'scores' })
    },
    goToQuiz () {
      // const validMsg = service.validateForm(this.form)
      // if (validMsg !== service.ok) {
      //   this.feedback = validMsg
      //   return
      // }
      service.fillUserWithForm(this.form)
      this.$router.push({ name: 'quiz' })
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
@import '../helpers/styles/base.scss';

.user-form{
  width: 100%;
  position: absolute;
  top: 52vh;

  .error{
    color: $color-error;
  }
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
