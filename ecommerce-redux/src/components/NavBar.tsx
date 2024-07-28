import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useAppSelector } from "@/hooks/index";
import { selectCartItems } from "@/features/slices/cartSlice";
import { ShoppingCartIcon } from "lucide-react";
import Cart from "./Cart";

const Navbar: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg">
        E-Commerce
      </Link>
      <input type="text" placeholder="Search..." className="p-2 rounded-md" />
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <ShoppingCartIcon />
            <span className="ml-2">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </Button>
        </SheetTrigger>
        <Cart />
      </Sheet>
    </nav>
  );
};

export default Navbar;
