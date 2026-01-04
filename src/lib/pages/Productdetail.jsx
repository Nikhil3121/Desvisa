import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/state/api";

export default function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </div>
  );
}
