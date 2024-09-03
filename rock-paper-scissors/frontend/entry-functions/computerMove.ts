import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export const computerMove = (): InputTransactionData => {
  return {
    data: {
      function: `${import.meta.env.VITE_MODULE_ADDRESS}::message_board::randomly_set_computer_move`,
      functionArguments: [],
    },
  };
};
