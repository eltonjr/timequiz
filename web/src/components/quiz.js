export default {

  loadQuestions () {
    return [{
      question: 'Qual a cor do cavalo branco de Napoleão?',
      snippet: '{a=b}',
      options: [{answer: 'preto'}, {answer: 'branco', correct: true}, {answer: 'rosa'}]
    }, {
      question: 'Se o Pato Donald não usa calças, por que ele amarra uma toalha na cintura quando sai do banho?',
      options: [{answer: 'Ele sente frio'}, {answer: 'Não te interessa', correct: true}, {answer: 'Ele não usa toalha ao sair do banho'}]
    }]
  }
}
