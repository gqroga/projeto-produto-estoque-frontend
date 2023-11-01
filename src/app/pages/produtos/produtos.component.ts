import { ChangeDetectorRef, Component } from '@angular/core';
import { IProdutos } from 'src/app/interface/produto';
import { ProdutosService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  produtos: IProdutos [] = [];

  constructor(private produtosService: ProdutosService, private cd: ChangeDetectorRef){}

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

  deletarProduto(idProduto: number, nome: string){
    Swal.fire({
      title: `Deseja remover o produto ${nome}?`,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.produtosService.deletarProduto(idProduto).subscribe(result =>{
          Swal.fire('Removido com sucesso!')
          this.produtosService.buscarTodos();
        }, error =>{
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover o produto! '
          })
          console.error(error);
        })
      }
    })
  }

} 

