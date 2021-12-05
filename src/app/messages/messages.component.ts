
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import sampleConfig from '../app.config';
import { OktaAuth } from '@okta/okta-auth-js';

interface Message {
  date: string;
  text: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  failed!: Boolean;
  messages: Message[] = [];

  constructor(public oktaAuth: OktaAuth, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = this.oktaAuth.getAccessToken();
    this.http.get(sampleConfig.resourceServer.messagesUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      let index = 1;
      const messages = data.map((message: Message) => {
        const date = new Date(message.date);
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        };
      });
      [].push.apply(this.messages, messages);
    }, (err) => {
      console.error(err);
      this.failed = true;
    });
  }
}
