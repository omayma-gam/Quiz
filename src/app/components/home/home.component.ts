import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {QuizService} from "../../services/quiz.service";

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="quiz-settings-container">
      <div class="quiz-settings-card">
        <h2 class="quiz-title">Bienvenue au Quiz</h2>
        <form (ngSubmit)="startQuiz()" class="quiz-form">
          <div class="form-group">
            <label for="category" class="form-label">Catégorie:</label>
            <select [(ngModel)]="category" name="category" class="form-select">
              <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="difficulty" class="form-label">Difficulté:</label>
            <select [(ngModel)]="difficulty" name="difficulty" class="form-select">
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
          <button class="start-quiz-btn">Commencer le Quiz</button>
        </form>
      </div>
    </div>

    <style>
      .quiz-settings-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 20px;
      }

      .quiz-settings-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        padding: 40px;
        width: 100%;
        max-width: 500px;
        transition: transform 0.3s ease;
      }

      .quiz-settings-card:hover {
        transform: translateY(-5px);
      }

      .quiz-title {
        color: #3a4a6d;
        text-align: center;
        margin-bottom: 30px;
        font-size: 28px;
        font-weight: 600;
      }

      .quiz-form {
        display: flex;
        flex-direction: column;
        gap: 25px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-label {
        color: #4a5568;
        font-weight: 500;
        font-size: 16px;
      }

      .form-select {
        padding: 12px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s;
        background-color: #f8fafc;
      }

      .form-select:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
      }

      .start-quiz-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 14px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        margin-top: 10px;
      }

      .start-quiz-btn:hover {
        background: #5a67d8;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      @media (max-width: 600px) {
        .quiz-settings-card {
          padding: 30px 20px;
        }

        .quiz-title {
          font-size: 24px;
        }
      }
    </style>
  `
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  category: number = 9;
  difficulty: string = 'easy';



  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.quizService.getCategories().subscribe(data => {
      this.categories = data.trivia_categories;
    });
  }

  startQuiz() {
    localStorage.setItem('quiz-settings', JSON.stringify({ category: this.category, difficulty: this.difficulty }));
    this.router.navigate(['/quiz']);
  }
}
