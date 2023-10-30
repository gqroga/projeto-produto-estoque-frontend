import { Component } from '@angular/core';
import { IProdutos } from 'src/app/interface/produto';
import { ProdutosService } from 'src/app/service/produto.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  produtos: IProdutos [] = [];

  constructor(private produtosService: ProdutosService){}

  ngOnInit() {
    this.produtosService.buscarTodos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  remover(id: number) {
    this.produtos = this.produtos.filter((produtos) => produtos.id !== id);
  }
} 

