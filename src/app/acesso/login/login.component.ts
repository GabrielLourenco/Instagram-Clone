import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Auth } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibePainel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public chameAtencao: EventEmitter<string> = new EventEmitter<string>();

  public mensagemErro: string = '';

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl('', [ Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(36) ]),
    'senha': new FormControl('', [ Validators.required, Validators.minLength(6) ])
  });

  constructor(
    private auth: Auth
  ) { }

  ngOnInit() {
  }

  public exibeCadastro(): void {
    this.mensagemErro = '';
    this.exibePainel.emit('cadastro');
  }

  public autenticar(): void {
    this.mensagemErro = '';
    this.auth.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .catch((erro: Error) => {
        this.mensagemErro = erro.message;
        this.chameAtencao.emit('erro');
    });
  }

}
