import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {}

  joinRoom(data: { room: string; username: string; token: string }) {
    this.socket.emit('join', data);
  }

  sendMessage(data: { room: string; userId: number; message: string; token: string }) {
    this.socket.emit('message', data);
  }

  receiveMessage() {
    return this.socket.fromEvent('message');
  }

  receiveAuthError() {
    return this.socket.fromEvent('auth_error');
  }
}
