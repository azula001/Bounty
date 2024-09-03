import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { WalletDetails } from "@/components/WalletDetails";
import { NetworkInfo } from "@/components/NetworkInfo";
import { AccountInfo } from "@/components/AccountInfo";
import { TransferAPT } from "@/components/TransferAPT";
import { MessageBoard } from "@/components/MessageBoard";
import { StartBoard } from "./components/StartGame";
import { PlayerBoard } from "./components/PlayerBoard";
import { ComputerBoard } from "./components/ComputerBoard";

function App({ activeAccount }) {
  const { connected } = useWallet();

  return (
    <>
      {/* <Header /> */}
      <div className="flex items-center justify-center flex-col">
        {connected || activeAccount ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              {/* <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <TransferAPT /> */}
              {/* <PlayerBoard /> */}
              {/* <ComputerBoard />
              <StartBoard /> */}
              {/* <MessageBoard activeAccount={activeAccount} /> */}
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
    </>
  );
}

export default App;
