<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <form>
          <span v-if="feedback">{{feedback}}</span>

          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input class="input" type="text" placeholder="Nome" v-model="form.name">
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="text" placeholder="Email" v-model="form.email">
            </div>
          </div>

          <div class="control">
            <button @click="goToScores()" class="button is-text">Voltar</button>
            <button @click="goToQuiz()" class="button is-primary">Começar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import service from '@/components/form'

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
  }
}
</script>

<style lang="sass">
</style>
