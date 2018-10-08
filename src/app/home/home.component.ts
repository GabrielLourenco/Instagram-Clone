import { Auth } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicacoesService } from '../services/publicacoes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PublicacoesService]
})
export class HomeComponent implements OnInit {

  constructor(private auth: Auth) { }

  @ViewChild('publicacoes') public publicacoes;

  ngOnInit() {
  }

  public sair(): void {
    this.auth.sair();
  }

  public atualizarTimeline(): void {
    this.publicacoes.atualizarTimeline();
  }

}
