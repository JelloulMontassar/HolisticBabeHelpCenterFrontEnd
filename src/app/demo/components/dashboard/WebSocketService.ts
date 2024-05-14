import { Injectable } from '@angular/core';
import { CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private notificationsSubject: Subject<any> = new Subject<any>();
  private notificationsSubject2: Subject<any> = new Subject<any>();
  private sentMessages: Map<number, number> = new Map();
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
  }

  connect() {
    const socket = new SockJS('//localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.notificationsSubject.next(JSON.parse(message.body));
      });
    });
  }

  connect2(userId: string) {
    const socket = new SockJS('//localhost:8088/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (message: any) => {
        this.notificationsSubject2.next(JSON.parse(message.body));
      });
    });
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }

  getUserNotifications() {
    return this.notificationsSubject2.asObservable();
  }

  initializeWebSocketConnection() {
    const socket = new SockJS('//localhost:8088/ws');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/chatroom/public', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }

  initializeWebSocketConnectionPrivate(userId: string) {
    const socket = new SockJS('//localhost:8088/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${userId}/private`, (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  sendPrivateMessage(message: any, username: string | undefined, onMessageSent?: (actualId: number) => void) {
    this.stompClient.send(`/app/private-message/${username}`, {}, JSON.stringify(message));

    this.stompClient.subscribe(`/user/${username}/private`, (response: any) => {
      const serverResponse = JSON.parse(response.body);
      if (serverResponse && serverResponse.id) {
        const actualId = serverResponse.id;
        this.sentMessages.set(message.id, actualId);
        if (onMessageSent) {
          onMessageSent(actualId);
        }
      }
    });
  }

  handleServerResponse(response: any) {
    if (response && response.id) {
      const temporaryId = response.temporaryId;
      const actualId = response.id;
      this.sentMessages.set(temporaryId, actualId);
    }
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

}
