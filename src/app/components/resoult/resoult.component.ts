import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Merci d'avoir joué !</h2>
      <a class="btn btn-primary" routerLink="/">Rejouer</a>
    </div>
  `
})
export class ResultComponent {}
