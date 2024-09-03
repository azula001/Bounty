// import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export const startGame = () => {
  // const { content } = args;
  return {
    data: {
      function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::start_game`,
      functionArguments: [],
    },
  };
};
