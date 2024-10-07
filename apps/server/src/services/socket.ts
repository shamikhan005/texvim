import { Server } from "socket.io";
import Redis from "ioredis";
import prismaClient from "./prisma";
import { produceMessage } from "./kafka";

const pub = new Redis({
  host: "",
  port: 0,
  username: "default",
  password: ""
});
const sub = new Redis({
  host: "",
  port: ,
  username: "default",
  password: ""
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log('init socket service...');
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;

    console.log('init socket listeners...')
    
    io.on('connect', (socket) => {
      console.log(`new socket connected`, socket.id);

      socket.on('event:message', async ({ message } : { message: string}) => {
        console.log('new message received', message);

        await pub.publish("MESSAGES", JSON.stringify({ message }));
      })
    })

    sub.on("message", async (channel, message) => {
        if (channel === "MESSAGES") {
          io.emit("message", message);
          await produceMessage(message);
          console.log("message produced to kafka broker")
        }
    })
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
