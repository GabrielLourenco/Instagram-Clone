import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDe0BBceiyUYJxPO5WtnMHP3R1bRfn7oec',
      authDomain: 'instagram-clone-angular.firebaseapp.com',
      databaseURL: 'https://instagram-clone-angular.firebaseio.com',
      projectId: 'instagram-clone-angular',
      storageBucket: 'instagram-clone-angular.appspot.com',
      messagingSenderId: '725268280388'
    });
  }
}
