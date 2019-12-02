<template>
  <section class="header">
    <img class="neoway-logo" src="static/assets/neoway.svg">
    <div class="header__form-box">
      <h1 class="heading-primary" v-if="showTexts">
        <span class="heading-primary__main">Quiz</span>
        <span class="heading-primary__sub">There is more to know</span>
      </h1>
      <h1 class="heading-primary" v-if="user">
        <span class="heading-primary__main">⭐</span>
        <span class="heading-primary__main">{{user.score}}</span>
        <span class="heading-primary__result">{{user.time}}s</span>
      </h1>

      <div class="header__actions">
        <button v-if="showButton" @click="goToForm()" class="btn btn--white btn--animated">Começar</button>
      </div>

      <div class="header__actions">
        <button v-if="user" @click="goToScore()" class="btn btn--white btn--animated">Finalizar</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['showButton', 'showTexts', 'user'],
  methods: {
    goToForm () {
      this.$router.push({ name: 'form' })
    },
    goToScore () {
      this.$router.push({ name: 'scores' })
    }
  }
}
</script>

<style lang="scss">
@import '../../helpers/styles/base.scss';
.header {
  height: 90vh;
  background-image: linear-gradient(
    to right bottom,
    rgba($primary, 0.8),
    rgba($neo-blue-light, 0.8)),
    url('../../assets/hero.png'
  );

  background-size: cover;
  background-position: top;
  position: relative;

  clip-path: polygon(0 0, 100% 0, 100% 85vh,0 100%);

  &__form-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .neoway-logo {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}

.heading-primary {
  color: $color-white;
  text-transform: uppercase;

  backface-visibility: hidden;
  margin-bottom: 6rem;

  &__main {
    display: block;
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: .5rem;

    animation: moveInLeft 0.6s ease-out;
  }

  &__sub {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1.3rem;
    animation: moveInRight 0.6s ease-out;
  }

  &__result {
    display: block;
    font-size: 2rem;
    font-weight: 400;
    animation: moveInRight 0.6s ease-out;
    text-transform: none;
  }
}
</style>
