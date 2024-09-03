import { useState } from "react";
// Internal components
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getGameResults } from "@/view-functions/getGameResults";

export function GameResults({ activeAccount }) {
  const [result, setResult] = useState<number | null>(null);
  const onClickButton = async () => {
    if (!activeAccount) {
      return;
    }
    getGameResult();
  };

  const getGameResult = async () => {
    if (activeAccount) {
      try {
        const content = await getGameResults({ accountAddress: activeAccount.accountAddress.toString() });
        console.log("content", content);

        setResult(content);
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
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Game Result: {result}</h4>
      <Button disabled={!activeAccount} onClick={onClickButton}>
        Result
      </Button>
    </div>
  );
}
