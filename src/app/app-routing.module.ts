import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HammerModule } from '@angular/platform-browser';
import { EstoqueComponent } from './pages/estoque/estoque.component';

const routes: Routes = [
  {
    path:'', component: HammerModule
  },

  {
    path:'produtos', component: ProdutosComponent
  },
  {
    path:'produtos/cadastrar', component: EstoqueComponent
  },
  {
    path:'produtos/cadastrar/:id', component: EstoqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
