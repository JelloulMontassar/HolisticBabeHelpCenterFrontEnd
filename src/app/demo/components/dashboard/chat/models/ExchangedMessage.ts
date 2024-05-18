export class ExchangedMessage {
  id!:number;
  sender!: { email: string };
  receiver!: { email: string };
  sentTime!:   string;
  content!: string;
  status!: string ;
}
