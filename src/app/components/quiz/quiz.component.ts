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
    <div class="quiz-game-container" *ngIf="questions.length">
      <div class="quiz-content" *ngIf="currentQuestion < questions.length">
        <div class="quiz-progress">
          Question <span class="current">{{ currentQuestion + 1 }}</span>
          <span class="separator">/</span>
          <span class="total">{{ questions.length }}</span>
        </div>

        <div class="question-card">
          <div class="question-text" [innerHTML]="questions[currentQuestion].question"></div>

          <div class="answers-grid">
            <button class="answer-option"
                    *ngFor="let ans of questions[currentQuestion].answers"
                    [class.correct]="isAnswered && ans === correctAnswer"
                    [class.incorrect]="isAnswered && ans === selected && ans !== correctAnswer"
                    [class.disabled]="isAnswered"
                    (click)="selectAnswer(ans)">
              {{ ans }}
            </button>
          </div>
        </div>
      </div>

      <div class="quiz-results" *ngIf="currentQuestion >= questions.length">
        <div class="result-card">
          <h3>Quiz terminé !</h3>
          <div class="score-display">
            Votre score : <span class="score-value">{{ score }}</span>/{{ questions.length }}
          </div>

          <div class="save-form">
            <input [(ngModel)]="username" placeholder="Votre nom" class="username-input" />
            <button class="save-btn" (click)="saveResult()">
              <i class="fas fa-save"></i> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>
      .quiz-game-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1.5rem;
      }

      .quiz-progress {
        font-size: 1.2rem;
        color: #4a5568;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .quiz-progress .current {
        font-weight: bold;
        color: #667eea;
      }

      .quiz-progress .separator {
        margin: 0 0.5rem;
      }

      .quiz-progress .total {
        color: #718096;
      }

      .question-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        padding: 2rem;
        margin-bottom: 2rem;
      }

      .question-text {
        font-size: 1.3rem;
        line-height: 1.6;
        color: #2d3748;
        margin-bottom: 2rem;
        font-weight: 500;
      }

      .answers-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .answer-option {
        padding: 1.2rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        background: white;
        text-align: left;
        font-size: 1.1rem;
        color: #4a5568;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .answer-option:hover:not(.disabled) {
        border-color: #667eea;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
      }

      .answer-option.correct {
        background: #48bb78;
        color: white;
        border-color: #48bb78;
      }

      .answer-option.incorrect {
        background: #f56565;
        color: white;
        border-color: #f56565;
      }

      .answer-option.disabled {
        cursor: not-allowed;
      }

      .quiz-results {
        display: flex;
        justify-content: center;
      }

      .result-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        padding: 2.5rem;
        text-align: center;
        max-width: 500px;
        width: 100%;
      }

      .result-card h3 {
        color: #2d3748;
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
      }

      .score-display {
        font-size: 1.3rem;
        margin-bottom: 2rem;
      }

      .score-value {
        font-weight: bold;
        color: #667eea;
        font-size: 1.5rem;
      }

      .save-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .username-input {
        padding: 0.8rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s;
      }

      .username-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
      }

      .save-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .save-btn:hover {
        background: #5a67d8;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      @media (max-width: 600px) {
        .question-card {
          padding: 1.5rem;
        }

        .result-card {
          padding: 1.5rem;
        }
      }
    </style>
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
