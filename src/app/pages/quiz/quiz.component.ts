import { Component } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent {
  title: any
  questions: any
  questionSelected: any = "Duis placerat accumsan metus. Nam in eleifend orci?"

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  img: string = ""

  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextQuestion()
  }

  async nextQuestion() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(anwsers: string[]) {

    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })

    if (result === "A") {
      this.img = "assets/grifinoria.png"
    } else if (result === "B") {
      this.img = "assets/sonserina.png"
    } else if (result === "C") {
      this.img = "assets/lufa-lufa.png"
    } else {
      this.img = "assets/corvinal.png"
    }

    return result
  }

}

