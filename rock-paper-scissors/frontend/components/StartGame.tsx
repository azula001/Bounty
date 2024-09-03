import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
// Internal components
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { startGame } from "@/entry-functions/startGame";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

export function StartGame({ activeAccount }) {
  // const queryClient = useQueryClient();

  const [messageContent, setMessageContent] = useState<string>();

  const onClickButton = async () => {
    if (!activeAccount) {
      return;
    }

    try {
      const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET })); // Configure your network here

      const transaction = await aptos.transaction.build.simple({
        sender: activeAccount.accountAddress,
        data: {
          function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::start_game`,
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
      setMessageContent("Started game");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Message content: {messageContent}</h4>
      Start Game{" "}
      <Button disabled={!activeAccount} onClick={onClickButton}>
        Start
      </Button>
    </div>
  );
}
