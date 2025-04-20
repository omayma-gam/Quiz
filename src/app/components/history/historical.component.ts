import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <div class="history-header">
        <h2><i class="fas fa-history"></i> Historique des scores</h2>
      </div>

      <div class="history-table-container">
        <table class="history-table">
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
    </div>

    <style>
      .history-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1.5rem;
      }

      .history-header {
        margin-bottom: 2rem;
        text-align: center;
      }

      .history-header h2 {
        color: #2d3748;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
      }

      .history-table-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }

      .history-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
      }

      .history-table thead {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .history-table th {
        padding: 1.2rem 1.5rem;
        text-align: left;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .history-table tbody tr {
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.2s ease;
      }

      .history-table tbody tr:last-child {
        border-bottom: none;
      }

      .history-table tbody tr:hover {
        background-color: #f8fafc;
      }

      .history-table td {
        padding: 1rem 1.5rem;
        color: #4a5568;
      }

      .history-table td:first-child {
        font-weight: 500;
        color: #2d3748;
      }

      .history-table td:last-child {
        font-weight: 600;
        color: #667eea;
      }

      /* Animation pour les nouvelles entrées */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .history-table tbody tr {
        animation: fadeIn 0.4s ease forwards;
      }

      /* Style pour les écrans plus petits */
      @media (max-width: 600px) {
        .history-container {
          padding: 0 1rem;
        }

        .history-table th,
        .history-table td {
          padding: 0.8rem 1rem;
        }

        .history-header h2 {
          font-size: 1.5rem;
        }
      }
    </style>
  `
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  ngOnInit() {
    this.history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
  }
}
