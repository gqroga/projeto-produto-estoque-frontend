import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProdutos } from 'src/app/interface/produto';
import { ProdutosService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  constructor(private produtosService: ProdutosService) {}

  produtosForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cdigoDeBarra: new FormControl('', Validators.required),
    preco: new FormControl(0),
  });

  enviar() { 
    const produtos: IProdutos = this.produtosForm.value as IProdutos;
    produtos.ativo = true;

    this.produtosService.cadastrarProduto(produtos).subscribe(
      (result) => {
        Swal.fire(
          'Produto cadastrado com sucesso!'
        );
      },
      (error) => {
        const { message } = error;
        Swal.fire('Produto NÃO cadastrado', message, 'error');
      }
    );
  }


}
