import { useAppDispatch, useAppSelector } from "@/hooks/index";
import {
  selectCartItems,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} from "@/features/slices/cartSlice";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
        <SheetDescription>Here are the items in your cart.</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-4 items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="col-span-1 h-16 w-16 object-contain"
              />
              <div className="col-span-3">
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-base text-gray-500">
                  ${product.price} x {product.quantity} = $
                  {product.quantity * product.price}
                </p>
                <div className="flex gap-2 items-center">
                  <Button
                    size="icon"
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                    className=""
                  >
                    -
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    +
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => dispatch(removeItem(product.id))}
                    className=""
                  >
                    x
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <SheetFooter className="flex justify-between">
          <Button onClick={() => dispatch(emptyCart())}>Clear Cart</Button>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      )}
    </SheetContent>
  );
};

export default Cart;
