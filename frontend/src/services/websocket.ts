import { WS_BASE_URL } from '@utils/constants';

type MessageHandler<T> = (data: T) => void;

export class ReconnectingWebSocket<T = unknown> {
  private ws?: WebSocket;
  private readonly url: string;
  private readonly onMessage: MessageHandler<T>;
  private retries = 0;

  constructor(path: string, onMessage: MessageHandler<T>) {
    this.url = `${WS_BASE_URL}${path}`;
    this.onMessage = onMessage;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as T;
        this.onMessage(payload);
      } catch {
        // ignore malformed messages
      }
    };
    this.ws.onclose = () => {
      this.retries += 1;
      const timeout = Math.min(10000, 500 * this.retries);
      setTimeout(() => this.connect(), timeout);
    };
    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  public send(message: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  public close() {
    this.ws?.close();
  }
}

