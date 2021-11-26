import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../produto';
import { ProdutoApiService } from '../produto-api.service';

@Component({
  selector: 'form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {
  produto: Produto = new Produto();;
  id!: number;
  botaoAcao = "Cadastrar";
  mensagem = "";

  constructor(private produtoApiService: ProdutoApiService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mensagem = "";
    console.log("id",this.id);
    if(this.id) {
      this.botaoAcao = "Editar";
      this.produtoApiService.buscarPorId(this.id).subscribe(prod => {
        this.produto = prod;     
      })
    }    
  }  

  salvar() {
    if(!this.id){ 
      this.produtoApiService.inserir(this.produto).subscribe(prod => {
        this.mensagem = `${prod.nome} cadastrado com sucesso!`;
        this.produto = new Produto();
      })
    }
    else {
      this.produtoApiService.editar(this.id, this.produto).subscribe(prod => {
        this.mensagem = `${prod.nome} editado  com sucesso!`; 
        this.produto = prod;
  
      })
    }
  
  }

  cancelar() {
    this.router.navigate(['/tabela']);
  }

}
