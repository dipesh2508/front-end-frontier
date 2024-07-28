import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { selectCartItems, removeItem, increaseQuantity, decreaseQuantity, emptyCart } from '@/features/slices/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="border p-4 mb-2 flex justify-between items-center">
              <div>
                <h2 className="text-lg">{item.title}</h2>
                <p>${item.price}</p>
                <div className="flex items-center">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="p-2 bg-gray-300 rounded">-</button>
                  <span className="p-2">{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} className="p-2 bg-gray-300 rounded">+</button>
                </div>
              </div>
              <button onClick={() => dispatch(removeItem(item.id))} className="p-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button onClick={() => dispatch(emptyCart())} className="p-2 bg-red-500 text-white rounded">Empty Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
