import { ChangeDetectorRef, Component } from '@angular/core';
import { IProdutos } from 'src/app/interface/produto';
import { ProdutosService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  produtos: IProdutos [] = [];

  constructor(private produtosService: ProdutosService, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router){}

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
    }).then((result)=> {
      if(result.isConfirmed){
        this.produtosService.deletarProduto(idProduto).subscribe(result =>{
          Swal.fire('Removido com sucesso!')
          this.produtosService.buscarTodos().subscribe(
            (produtos) => {
              this.produtos = produtos;
            },
            (error) => {
              console.log(error);
            }
          );
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

   formatCurrency(value: number) {
    const numericValue = value.toString().replace(',', '.');
    const formattedValue = parseFloat(numericValue).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  }

} 

