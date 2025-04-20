import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="quiz-navbar">
      <div class="nav-container">
        <a class="nav-brand" routerLink="/">QuizMaster</a>
        <div class="nav-menu">
          <ul class="nav-list">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active-link">
                <i class="fas fa-home"></i> Accueil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/history" routerLinkActive="active-link">
                <i class="fas fa-history"></i> Historique
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <style>
      .quiz-navbar {
        background: linear-gradient(135deg, #ff0043 0%, #ec08b5 100%);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 0.8rem 2rem;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .nav-brand {
        color: white;
        font-size: 1.8rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
      }

      .nav-brand:hover {
        transform: scale(1.03);
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }

      .nav-menu {
        display: flex;
      }

      .nav-list {
        display: flex;
        gap: 1.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 500;
        padding: 0.5rem 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .nav-link:hover {
        color: white;
        transform: translateY(-2px);
      }

      .active-link {
        color: white;
        position: relative;
      }

      .active-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: white;
        border-radius: 2px;
        animation: underline 0.3s ease forwards;
      }

      @keyframes underline {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }


      @media (max-width: 768px) {
        .quiz-navbar {
          padding: 0.8rem 1rem;
        }

        .nav-brand {
          font-size: 1.5rem;
        }

        .nav-list {
          gap: 1rem;
        }

        .nav-link {
          font-size: 1rem;
        }
      }
    </style>
  `
})
export class NavbarComponent {}
