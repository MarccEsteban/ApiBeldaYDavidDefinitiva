import {RouterModule, Routes} from "@angular/router";
import {SerieListComponent} from "./components/movies-list/series-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {path: '', pathMatch: 'full', component: SerieListComponent},
  {path: 'series', redirectTo: ''},
  {path: '**', redirectTo: '/movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
