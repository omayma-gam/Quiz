import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Historique des scores</h2>
      <table class="table">
        <thead>
        <tr>
          <th>Nom d'utilisateur</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of history">
          <td>{{ item.user }}</td>
          <td>{{ item.score }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  ngOnInit() {
    this.history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
  }
}
