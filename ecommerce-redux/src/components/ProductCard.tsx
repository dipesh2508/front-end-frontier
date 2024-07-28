import { useAppDispatch } from "@/hooks/index";
import { addItem } from "@/features/slices/cartSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/pages/Home";
import { useToast } from "./ui/use-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  function addToCart() {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast({ description: "Item added to cart" });
  }

  return (
    <Card className="lg:w-80 hover:scale-105 transition hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <CardHeader>
          <img
            src={product.image}
            loading="lazy"
            className="h-24 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-48"
          />
          {product.category}
          <CardTitle className="truncate">{product.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent className="flex justify-between">
        <span className="flex">
          <Star className="size-4 text-amber-500 fill-amber-500 my-auto" />{" "}
          {product.rating.rate}
        </span>
      </CardContent>
      <CardFooter className="lg:flex justify-between">
        <div>
          <h3 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </h3>
        </div>
        <div>
          <Button onClick={addToCart}>
            <LucideShoppingCart className="mr-2" /> Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
