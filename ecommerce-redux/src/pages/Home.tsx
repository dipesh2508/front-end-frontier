import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface IProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
