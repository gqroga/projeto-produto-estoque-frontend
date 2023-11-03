import { IProdutos } from "../interface/produto";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private api ='http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) {}

  buscarTodos() {
    return this.http.get<IProdutos[]>(this.api);
  }

  cadastrarProduto(produto: IProdutos) {
    return this.http.post<IProdutos>(this.api, produto);
  }

  editarProduto(produto: IProdutos) {
    return this.http.put(this.api, produto);
  }

  buscarProdutoId(idProduto: number){
    return this.http.get<IProdutos>(`${this.api}/${idProduto}`)
  }

  deletarProduto(idProduto: number ){
    return this.http.delete<IProdutos>(`${this.api}/${idProduto}`)
  }
}
