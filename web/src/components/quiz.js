import questionsJs from '../../static/assets/questions-js.json'
import questionsGeneral from '../../static/assets/questions-general.json'
import questionsSec from '../../static/assets/questions-sec.json'

export default {

  loadQuestions () {
    let quiz = []
    quiz.push(...fetchQuestions(questionsJs, 'hard', 1))
    quiz.push(...fetchQuestions(questionsJs, 'medium', 3))
    quiz.push(...fetchQuestions(questionsJs, 'easy', 2))
    quiz.push(...fetchQuestions(questionsGeneral, 'hard', 1))
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
    randomQuestions.push(question)
  }

  return randomQuestions
}
