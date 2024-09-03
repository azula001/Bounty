import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type PlayerMoveArgument = {
  content: number; // the content of the message
};

export const playerMove = (args: PlayerMoveArgument): InputTransactionData => {
  const { content } = args;
  return {
    data: {
      function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::set_player_move`,
      functionArguments: [content],
    },
  };
};
