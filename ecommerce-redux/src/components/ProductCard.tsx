import React from 'react';
import { useAppDispatch } from '@/hooks/index';
import { addItem } from '@/features/slices/cartSlice';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="border p-4 rounded-md">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
      <h2 className="text-xl mt-2">{product.title}</h2>
      <p className="text-lg font-semibold">${product.price}</p>
      <button
        onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
