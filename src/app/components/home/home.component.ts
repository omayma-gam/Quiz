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
    <div class="container mt-4">
      <h2>Bienvenue au Quiz</h2>
      <form (ngSubmit)="startQuiz()">
        <div class="mb-3">
          <label for="category">Catégorie:</label>
          <select [(ngModel)]="category" name="category" class="form-control">
            <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="difficulty">Difficulté:</label>
          <select [(ngModel)]="difficulty" name="difficulty" class="form-control">
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>
        </div>
        <button class="btn btn-primary">Démarrer</button>
      </form>
    </div>
 
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
