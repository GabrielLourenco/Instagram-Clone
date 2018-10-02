import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';

import * as firebase from 'firebase';

@Injectable()
export class Auth {

  public tokenId: string;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then( resposta => {

        // remove senha do obj Usuario
        delete usuario.senha;

        // inserindo dados do usuário no path do hash base64 do email do usuario
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      });
  }

  public autenticar(email: string, senha: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(resposta => {
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.tokenId = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          });
      });
  }

  public autenticado(): boolean {
    if (this.tokenId === undefined && localStorage.getItem('idToken') != null) {
      this.tokenId = localStorage.getItem('idToken');
    }

    if (this.tokenId === undefined) {
      this.router.navigate(['/']);
    }

    return this.tokenId !== undefined;
  }

  public sair(): void {
    firebase.auth().signOut()
        .then(() => {
          localStorage.removeItem('idToken');
          this.tokenId = undefined;
          this.router.navigate(['/']);
        });
  }
}
