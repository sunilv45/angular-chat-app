import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  room = 'general';
  username = '';
  message = '';
  userId: number | undefined;
  token: string = '';
  messages: any[] = [];
  authError: string | undefined;

  constructor(private chatService: ChatService) {}

  join() {
    this.chatService.joinRoom({ room: this.room, username: this.username, token: this.token });
    this.chatService.receiveMessage().subscribe((data: any) => {
      this.messages.push(data);
    });

    this.chatService.receiveAuthError().subscribe((error: any) => {
      this.authError = error;
    });
  }

  send() {
    this.chatService.sendMessage({
      room: this.room,
      userId: this.userId!,
      message: this.message,
      token: this.token!,
    });
    this.message = '';
  }
}
