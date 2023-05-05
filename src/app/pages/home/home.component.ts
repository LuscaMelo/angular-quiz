import { Component } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: any

  ngOnInit(): void {
    this.title = quiz_questions.title
  }
}
