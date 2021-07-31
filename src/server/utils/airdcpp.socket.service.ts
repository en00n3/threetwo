import { Socket } from "airdcpp-apisocket";
import WebSocket from "ws";

const options = {
  url: "wss://sab.rishighan.com/api/v1/",
  autoReconnect: false,
  reconnectInterval: 5,
  logLevel: "verbose",
  ignoredListenerEvents: [
    "transfer_statistics",
    "hash_statistics",
    "hub_counts_updated",
  ],
};

const APISocket = Socket(options, WebSocket as any);
type SocketType = typeof APISocket;
export { SocketType as APISocket };

export default APISocket;
