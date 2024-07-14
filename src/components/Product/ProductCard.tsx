import { Product } from "@/framework/common/types/product";
import React from "react";
import { FC } from "react";
import Link from "next/link";
interface Props {
  product: Product;
  variant: "simple" | "slim";
}
import Image from "next/image";

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product, variant }) => {
  return (
    <>
      <Link className="cursor-pointer" href={`/products/${product.slug}`}>
        {variant === "slim" ? (
          <>
            <div>
              <span>{product.name}</span>
            </div>
            {product.images && (
              <Image
                className="py-4 px-16 flex-1"
                alt={product.name ?? "Product Image"}
                src={`/images/${product.images[0]?.url}` || placeholderImage}
                height={320}
                width={320}
                quality={85}
                layout="fixed"
              />
            )}
          </>
        ) : (
          <>
            <div className="border">
              {product.images && (
                <Image
                  alt={product.name ?? "Product Image"}
                  src={`/images/${product.images[0]?.url}` || placeholderImage}
                  height={540}
                  width={540}
                  quality={85}
                  layout="responsive"
                />
              )}
              <div className="p-2">
                <h3>
                  <span>{product.name}</span>
                </h3>
                <span className="font-semibold">${product.price.value}</span>
              </div>
            </div>
          </>
        )}
      </Link>
    </>
  );
};

export default ProductCard;
