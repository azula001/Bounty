import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeylessAccounts } from "../core/useKeylessAccounts";
import { AptosClient, HexString, Network } from "aptos";
import Header from "@/components/Header";
import { StartGame } from "@/components/StartGame";
import { PlayerBoard } from "@/components/PlayerBoard";
import { toast } from "@/components/ui/use-toast";
import { getPlayerMove } from "@/view-functions/getPlayerMove";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";
import { getComputerMove } from "@/view-functions/getComputerMove";
import { GameResults } from "@/components/GameResults";
import { Finalize } from "@/components/Finalize";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");

function HomePage() {
  const navigate = useNavigate();
  const { activeAccount } = useKeylessAccounts();
  const [balance, setBalance] = useState<number | null>(null);
  const [playerMove, setPlayerMove] = useState<number | null>(null);
  const [computerMove, setComputerMove] = useState<number | null>(null);

  useEffect(() => {
    if (!activeAccount) {
      navigate("/");
    } else {
      fetchBalance();
      fetchPlayerMove();
    }
  }, [activeAccount, navigate]);

  const fetchBalance = async () => {
    if (activeAccount) {
      try {
        const resources: any[] = await client.getAccountResources(
          HexString.ensure(activeAccount.accountAddress.toString()),
        );
        const accountResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
        if (accountResource) {
          const balanceValue = (accountResource.data as any).coin.value;
          setBalance(balanceValue ? parseInt(balanceValue) / 100000000 : 0); // Convert from Octas to APT
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  useEffect(() => {
    if (playerMove) {
      makeCompuuterMove();
    }
  }, [playerMove]);

  const makeCompuuterMove = async () => {
    if (activeAccount) {
      try {
        const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET })); // Configure your network here
        const transaction = await aptos.transaction.build.simple({
          sender: activeAccount.accountAddress,
          data: {
            function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::randomly_set_computer_move`,
            functionArguments: [],
          },
        });
        const committedTransaction = await aptos.signAndSubmitTransaction({
          signer: activeAccount,
          transaction,
        });
        const executedTransaction = await aptosClient().waitForTransaction({
          transactionHash: committedTransaction.hash,
        });
        console.log("executedTransaction", executedTransaction);
        // queryClient.invalidateQueries();
        toast({
          title: "Success",
          description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
        });
        fetchComputerMove();
        setPlayerMove(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchPlayerMove = async () => {
    if (activeAccount) {
      try {
        const content = await getPlayerMove({ accountAddress: activeAccount.accountAddress.toString() });
        console.log("content", content);

        setPlayerMove(content);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  const fetchComputerMove = async () => {
    if (activeAccount) {
      try {
        const content = await getComputerMove({ accountAddress: activeAccount.accountAddress.toString() });
        console.log("comp", content);
        setComputerMove(content);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="home">
      <Header activeAccount={activeAccount} />
      <StartGame activeAccount={activeAccount} />
      <PlayerBoard activeAccount={activeAccount} playerMove={playerMove} getPlayerMove={fetchPlayerMove} />
      <p>comp: {computerMove}</p>
      <Finalize activeAccount={activeAccount} />
      <GameResults activeAccount={activeAccount} />
      <p>{balance}</p>
    </div>
  );
}

export default HomePage;
