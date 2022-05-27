import { useAddress, useMetamask } from "@thirdweb-dev/react";
// clone of dao.emulsion.js

const App = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log('👋 Address: ', address);

    // If user hasn't connected their wallet yet
    if (!address) {
        return (
            <div className="landing">
                <h1>Welcome to Star Sailors DAO</h1>
                <button onClick={connectWithMetamask} className="btn-hero">
                    Connect your wallet
                </button>
            </div>
        )
    }
}