import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebSocketService} from "../WebSocketService";
import {ExchangedMessage} from "./models/ExchangedMessage";
import {Message} from "./models/Message";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/login/login.service";
@Component({
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, AfterViewInit {
    @Input() recipientUsername: string | undefined;
    private accessToken = localStorage.getItem("accessToken");

    @ViewChild('conversationArea') conversationArea: ElementRef | null = null;
    privateMessages: Message[] = [];
    newMessage: string | undefined;
    userProfile: any;
    userId: any;
    onlineUsers: any[] = [];
    selectedUser: string | undefined;
    exchangedMessage: ExchangedMessage[] = [];
    fullName: string | undefined;

    constructor(
        private http: HttpClient,
        private webSocketService: WebSocketService,
        private profileService: AuthService,
    ) {}

    ngOnInit(): void {
        this.initializeSubscriptions();

        this.profileService.getProfile().subscribe(
            (profile: any) => {
                this.userProfile = profile;
                this.userId = this.userProfile?.email;
                this.recipientUsername = this.userId;
                this.fetchOnlineUsers();
                this.webSocketService.initializeWebSocketConnectionPrivate(this.userId);

            },
            error => {
                console.error('Error fetching user profile:', error);
            }
        );
    }

    ngAfterViewInit(): void {
        if (!this.conversationArea) {
            console.error('conversationArea is not defined');
        }
    }

    initializeSubscriptions(): void {
        this.webSocketService.getMessageSubject().subscribe((message: Message) => {
            this.handleIncomingMessage(message);
        });
    }
    handleIncomingMessage(message: Message): void {
        if (message.senderName === this.recipientUsername || message.receiverName === this.recipientUsername) {
            this.privateMessages.push(message);
        }
    }

    sendMessage(): void {
        if (!this.selectedUser || !this.newMessage) {
            console.error('Please select a user and enter a message.');
            return;
        }

                const temporaryId = this.generateTemporaryId();
                const message: Message = {
                    id: temporaryId,
                    senderName: this.userProfile?.email || '',
                    receiverName: this.selectedUser || '',
                    date: new Date().toISOString(),
                    status: 'Join',
                    message: this.newMessage || ''
                };
                this.privateMessages.push(message);
                this.webSocketService.sendPrivateMessage(message, message.receiverName, (actualId: number) => {
                    const messageToUpdate = this.privateMessages.find(msg => msg.id === temporaryId);
                    if (messageToUpdate) {
                        messageToUpdate.id = actualId;
                    }
                });

                this.newMessage = '';

    }



    generateTemporaryId(): number {
        return Math.floor(Math.random() * 1000000);
    }

    fetchOnlineUsers(): void {
        if (!this.userId) {
            console.error('User profile not loaded.');
            return;
        }

        this.profileService.getOnlineUsers().subscribe(
            (users: any[]) => {
                this.onlineUsers = users.filter(user => user.email !== this.userId);
            },
            error => {
                console.error('Error fetching online users:', error);
            }
        );
    }

    selectUser(user: string,firstName :string , lastName : string): void {
        this.fullName = firstName + ' ' + lastName;
        this.selectedUser = user;
        this.getExchangedMessages().subscribe(messages => {
            this.exchangedMessage = messages.map(message => ({
                ...message,
                sender: { email: message.sender.email },
                receiver: { email: message.receiver.email },
                sentTime: message.sentTime,
                content: message.content,
                status: message.status
            }));
        });
    }

    getExchangedMessages(): Observable<ExchangedMessage[]> {
        return this.http.get<ExchangedMessage[]>(
            `http://localhost:8080/ExchangedMessages/exchanged/${this.userProfile?.email}/${this.selectedUser}`
        ,{headers: {'Authorization': `Bearer ${this.accessToken}`}}
        );
    }

    displayMessages(): Message[] {
        const convertedExchangedMessages = this.exchangedMessage.map(this.convertExchangedMessageToMessage);
        const combinedMessages = [...this.privateMessages, ...convertedExchangedMessages];
        combinedMessages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return combinedMessages;
    }

    convertExchangedMessageToMessage(exchangedMessage: ExchangedMessage): Message {
        return {
            id: exchangedMessage.id,
            senderName: exchangedMessage.sender.email,
            receiverName: exchangedMessage.receiver.email,
            date: exchangedMessage.sentTime,
            message: exchangedMessage.content,
            status: exchangedMessage.status
        };
    }











}

