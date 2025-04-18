import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  standalone: true,
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4" *ngIf="questions.length">
      <div *ngIf="currentQuestion < questions.length">
        <h4>Question {{ currentQuestion + 1 }} / {{ questions.length }}</h4>
        <p [innerHTML]="questions[currentQuestion].question"></p>
        <div class="list-group">
          <button class="list-group-item list-group-item-action"
                  *ngFor="let ans of questions[currentQuestion].answers"
                  [class.list-group-item-success]="isAnswered && ans === correctAnswer"
                  [class.list-group-item-danger]="isAnswered && ans === selected && ans !== correctAnswer"
                  (click)="selectAnswer(ans)">
            {{ ans }}
          </button>
        </div>
      </div>
      <div *ngIf="currentQuestion >= questions.length">
        <h3>Quiz terminé !</h3>
        <p>Votre score est : {{ score }}/{{ questions.length }}</p>
        <input [(ngModel)]="username" placeholder="Nom d'utilisateur" class="form-control mb-2" />
        <button class="btn btn-success" (click)="saveResult()">Enregistrer</button>
      </div>
    </div>
  `
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestion = 0;
  score = 0;
  selected: string = '';
  correctAnswer: string = '';
  isAnswered = false;
  username = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('quiz-settings') || '{}');
    this.quizService.getQuestions(settings.category, settings.difficulty).subscribe((res: any) => {
      this.questions = res.results.map((q: any) => {
        return {
          question: decodeURIComponent(q.question),
          correct: decodeURIComponent(q.correct_answer),
          answers: [...q.incorrect_answers.map((a: string) => decodeURIComponent(a)), decodeURIComponent(q.correct_answer)]
            .sort(() => 0.5 - Math.random())
        };
      });
    });
  }

  selectAnswer(ans: string) {
    if (this.isAnswered) return;
    this.selected = ans;
    this.correctAnswer = this.questions[this.currentQuestion].correct;
    if (ans === this.correctAnswer) this.score++;
    this.isAnswered = true;
    setTimeout(() => {
      this.currentQuestion++;
      this.isAnswered = false;
    }, 1000);
  }

  saveResult() {
    const history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    const settings = JSON.parse(localStorage.getItem('quiz-settings') || '{}');
    history.push({
      user: this.username,
      score: this.score,
      totalQuestions: this.questions.length,
      category: settings.category || 'N/A',
      difficulty: settings.difficulty || 'N/A',
      date: new Date()
    });
    localStorage.setItem('quiz-history', JSON.stringify(history));
    this.router.navigate(['/result']);
  }
}
