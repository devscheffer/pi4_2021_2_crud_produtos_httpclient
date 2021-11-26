import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoApiService } from '../produto-api.service';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.css']
})
export class TabelaProdutosComponent implements OnInit{
  @Input('nome') nomeComponente = 'Tabela de Produtos';
  produtos: Produto[] = [];
  nomePesquisado = "";

 constructor(private produtoApiService: ProdutoApiService) { 
    this.listar();
 }

 ngOnInit(): void {
 }

 listar() {
   this.produtoApiService.getProdutos().subscribe(
     data => {
       this.produtos = data;
     }
   );
 }

 deletar(id: number){
  //this.produtoService.deletarProduto(id);
  this.produtoApiService.deletar(id).subscribe(res => {
    this.listar();
    console.log(res);
  });
 }

}

