<template>
  <div>
    <span v-if="feedback">{{feedback}}</span>

    <input placeholder="Nome" type="text" name="name" v-model="form.name">
    <input placeholder="Email" type="text" name="email" v-model="form.email">
    <button @click="goToScores()">Voltar</button>
    <button @click="goToQuiz()">Começar</button>
  </div>
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
  },
  computed: {
  },
  methods: {
    goToScores () {
      this.$router.push({ name: 'scores' })
    },
    goToQuiz () {
      const validMsg = service.validateForm(this.form)
      if (validMsg !== service.ok) {
        this.feedback = validMsg
        return
      }
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
