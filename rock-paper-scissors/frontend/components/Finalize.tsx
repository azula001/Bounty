import { useState } from "react";
// Internal components
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

export function Finalize({ activeAccount }) {
  const [finalResult, setFinalResult] = useState<string | null>();

  const onClickButton = async () => {
    if (!activeAccount) {
      return;
    }

    try {
      const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET })); // Configure your network here
      const transaction = await aptos.transaction.build.simple({
        sender: activeAccount.accountAddress,
        data: {
          function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::finalize_game_results`,
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
      setFinalResult("Finalized game results");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium"> {finalResult}</h4>
      <Button disabled={!activeAccount} onClick={onClickButton}>
        Finalize
      </Button>
    </div>
  );
}
