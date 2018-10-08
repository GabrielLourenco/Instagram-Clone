import { PublicacoesService } from './../../services/publicacoes.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  constructor(private publicacoesService: PublicacoesService) { }

  private email: string;
  public publicacoes = []

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email;
      this.atualizarTimeline();
    });
  }

  public atualizarTimeline(): void {
    this.publicacoesService.consultaPublicacoes(this.email).then(publicacoes => {
      this.publicacoes = publicacoes;
    });
  }

}
