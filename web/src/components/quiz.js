import questionsJs from '../../static/assets/questions-js.json'
import questionsGeneral from '../../static/assets/questions-general.json'
import questionsSec from '../../static/assets/questions-sec.json'
import questionsCSS from '../../static/assets/questions-css-html.json'

export default {

  loadQuestions () {
    let quiz = []
    quiz.push(...fetchQuestions(questionsCSS, 'easy', 1))
    quiz.push(...fetchQuestions(questionsCSS, 'medium', 2))
    quiz.push(...fetchQuestions(questionsCSS, 'hard', 2))
    quiz.push(...fetchQuestions(questionsJs, 'easy', 2))
    quiz.push(...fetchQuestions(questionsJs, 'medium', 3))
    quiz.push(...fetchQuestions(questionsJs, 'hard', 1))
    quiz.push(...fetchQuestions(questionsGeneral, 'easy', 1))
    quiz.push(...fetchQuestions(questionsGeneral, 'medium', 1))
    quiz.push(...fetchQuestions(questionsSec, '', 2))
    return quiz
  }
}

function fetchQuestions (questions, tag, amount) {
  let filtered = questions
  if (tag !== '') {
    filtered = questions.filter(q => q.tags.includes(tag))
  }

  if (amount > filtered.length) {
    return questions
  }

  let randomQuestions = []
  for (let i = 0; i < amount; i++) {
    let rand = Math.floor(Math.random() * filtered.length)
    let question = filtered[rand]
    filtered.splice(rand, 1)
    question.options = shuffle(question.options)
    randomQuestions.push(question)
  }

  return randomQuestions
}

var shuffle = function (array) {
  var currentIndex = array.length
  var temporaryValue, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
