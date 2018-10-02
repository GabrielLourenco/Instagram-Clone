import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../../models/usuario.model';

import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibePainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl('', [ Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(36) ]),
    'nome_completo': new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    'nome_usuario': new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    'senha': new FormControl('', [ Validators.required, Validators.minLength(6) ]),
  });

  public mensagemErro: string = '';

  constructor(
    private auth: Auth
  ) { }

  ngOnInit() {
  }

  public exibeLogin(): void {
    this.exibePainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.mensagemErro = '';

    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_completo,
      this.formulario.value.senha
    );
    this.auth.cadastrarUsuario(usuario)
      .then(() => this.exibeLogin())
      .catch((erro: Error) => {
        this.mensagemErro = erro.message;
      });

  }

}
