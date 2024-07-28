import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "./Home";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/features/slices/cartSlice";
import { toast } from "@/components/ui/use-toast";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>({
    id: 0,
    title: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProductDetail(response.data);
      setLoading(false);
    });
  }, [id]);

  function addToCart() {
    dispatch(addItem({ ...productDetail, quantity: 1 }));
    toast({ description: "Item added to cart" });
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && productDetail && (
        <div>
          <div
            className="container px-5 py-10 mx-auto"
            style={{ cursor: "auto" }}
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                src={productDetail?.image}
                style={{ cursor: "auto" }}
              />
              <div
                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                style={{ cursor: "auto" }}
              >
                <h2
                  className="text-sm title-font text-gray-500 tracking-widest"
                  style={{ cursor: "auto" }}
                >
                  ON SALE
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ cursor: "auto" }}
                >
                  {productDetail?.title}
                </h1>
                <div className="text-blue-500">{productDetail?.category}</div>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {productDetail?.rating.rate}
                    <span className="text-gray-600 ml-3">
                      {productDetail?.rating.count} Reviews
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">{productDetail?.description}</p>

                <div className="flex mt-4">
                  <span className="my-auto title-font font-medium text-2xl text-gray-900">
                    ${productDetail?.price}
                  </span>
                  <Button
                    onClick={addToCart}
                    className="ml-auto text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
