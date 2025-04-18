import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import {ResultComponent} from "./components/resoult/resoult.component";
import {HistoryComponent} from "./components/history/historical.component";


export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: '' }
];


