import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">QuizApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" routerLink="/">Accueil</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/history">Historique</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
