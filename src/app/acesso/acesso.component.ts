import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
          style({ opacity: 0, transform: 'translateX(-50px)'}),
          animate('500ms 200ms ease-in-out')
      ])
    ]),
    trigger('animacao-login', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
          style({ opacity: 0, transform: 'translateX(30px)'}),
          animate('500ms 200ms ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoAnimacao: string = 'criado'
  public exibeCadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

}
