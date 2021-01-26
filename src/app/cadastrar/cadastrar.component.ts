import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {

  user: User = new User();
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private rotas: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert('Senhas incorretas')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.rotas.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      }, erro => {
        if(erro.status == 500){
          alert('Cadastro incompleto ou usuário já cadastrado')
        }
      })
    }
  }

  verificarUser() { 
    this.user.tipo = this.tipoUsuario

    if (this.user.usuario.length <= 4) {
      alert('Nome de usuário menor que 5 caracteres')
    }
  }
}
