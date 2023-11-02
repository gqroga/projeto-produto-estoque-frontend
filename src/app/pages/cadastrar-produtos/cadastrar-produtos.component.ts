import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProdutos } from 'src/app/interface/produto';
import Swal from 'sweetalert2';
import { ProdutosService } from 'src/app/service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {

    novoProduto: Boolean = false;


  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private router: Router) {}

  produtosForm = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl(0),
  });

  enviar() {
    const produtos: IProdutos = this.produtosForm.value as IProdutos;
    produtos.ativo = true;

    this.produtosService.cadastrarProduto(produtos).subscribe(
      (result) => {
        Swal.fire(
          `Produto ${this.novoProduto ? 'cadastrado':'atualizado'} com sucesso!`,
        ).then((result) => this.router.navigate(['/produtos']));
      },
      (error) => {
        const { message } = error;
        Swal.fire('DEU ERRO', message, 'error');
      }
    );
  }

  editarProduto() {
  const produto: IProdutos = this.produtosForm.value as IProdutos;
  this.produtosService.editarProduto(produto).subscribe(result =>{
    Swal.fire('Produto atualizado!').then((result) => this.router.navigate(['/produtos']))
  }, error =>{
    Swal.fire({
      icon: 'error',
      title: 'Erro ao atualizar o Produto!'
    })
    console.error(error);
  })
  }

  ngOnInit(){
    const idProduto =  this.route.snapshot.paramMap.get('id') ?? ""; //nullish coalesce -- se a expressão da esuquerda for nula, usa a da direita
    this.novoProduto = idProduto == "";
    if(!this.novoProduto){
      this.produtosService.buscarProdutoId(parseInt(idProduto)).subscribe((produto: IProdutos) =>{
        this.produtosForm.setValue({
          id: produto.id,
          nome: produto.nome,
          codigoBarras: produto.codigoBarras,
          preco: produto.preco,
        })
      })
    }

  }

}