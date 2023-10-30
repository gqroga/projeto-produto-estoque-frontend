import { IProdutos } from "../interface/produto";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  api = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  buscarTodos() {
    return this.http.get<IProdutos[]>(this.api);
  }

  cadastrarProduto(produto: IProdutos) {
    return this.http.post<IProdutos>(this.api, produto);
  }
}
