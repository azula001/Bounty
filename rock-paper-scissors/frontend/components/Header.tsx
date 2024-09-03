import { collapseAddress } from "@/core/utils";
import GoogleLogo from "./GoogleLogo";

const Header = ({ activeAccount }: { activeAccount: any }) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto w-full flex-wrap border-b">
      <h1 className="text-xl">Rock Paper Scissors</h1>
      <div className="flex justify-center items-center border rounded-lg px-8 py-2 shadow-sm cursor-not-allowed">
        <GoogleLogo />
        {collapseAddress(activeAccount?.accountAddress.toString())}
      </div>
    </header>
  );
};

export default Header;
