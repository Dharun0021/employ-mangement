import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-1 px-3 flex justify-between items-center h-14 w-full fixed top-0 z-50">
      <Link href="/post">
        <div className="text-xl font-bold  text-white ">
          Empolye Mangement
        </div>
      </Link>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none" aria-label="User menu">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
              <AvatarFallback className="bg-gray-500 text-white">BT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/" className="w-full block">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
