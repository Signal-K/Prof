import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "@magiclabs/ui/dist/cjs/index.css";
import { ThemeProvider } from "@magiclabs/ui";

// Moralis Configuration
const APP_ID = "BI5hagTDpD81Tc0hwFGn5kvW1nQgnjQKlDBrg0gT";
const SERVER_URL = "https://pqrdt3y1tim2.usemoralis.com:2053/server";

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;

  // Validate server info is in .env
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  if (isServerInfo)
      return (
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <div id="game-container">
            <App isServerInfo />
          </div>
        </MoralisProvider>
      );
    else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>NOT CONNECTED</div>
        </div>
      );
    }
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);