"use client";
import { FC, useState } from "react";
import { Product } from "@/framework/common/types/product";
import Container from "@/components/ui/Container/Container";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import Swatch from "../Swatch/Swatch";
import { Choices, getVariant } from "../helpers";
import useAddItem from "@/framework/common/cart/use-add-item";
import useCart from "@/framework/common/cart/use-cart";
import { useSheet } from "../SheetContext/SheetContext";
interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});
  const [isLoading, setIsLoading] = useState(false);



  const cart = useCart();
  console.log(cart);

  const addItem = useAddItem();
  const {sheetTriggerRef}= useSheet(); 

  const variant = getVariant(product, choices);

  const addToCart = async () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
        quantity: 1,
      };

      addItem(item);
      if (sheetTriggerRef.current) {
        sheetTriggerRef.current.click();
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="relative grid items-start gap-8 grid-cols-1 lg:grid-cols-12 overflow-x-hidden mb-5">
        <div className="relative flex px-0 pb-0 box-border col-span-1 bg-violet min-h-600px md:min-h-700px lg:mx-0 lg:col-span-6">
          <section className=" mx-auto  h-full w-[700px] ">
            <Carousel className="w-full ">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={`/images/${image.url}`}
                            alt={"product image"}
                            width={1050}
                            height={1050}
                            quality="85"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </div>
        <div className="flex flex-col col-span-1 mx-auto max-w-8xl px-6 w-full h-full lg:col-span-6 lg:py-24 lg:justify-between">
          <section>
            <h1 className="text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <h2 className="font-semibold text-xl mb-2">
              {product.price.value} {product.price.currencyCode}
            </h2>
            {product.options.map((option) => (
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map((optValue) => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()];
                    return (
                      <Swatch
                        key={`${option.id}-${optValue.label}`}
                        label={optValue.label}
                        color={optValue.hexColor}
                        variant={option.displayName}
                        active={optValue.label.toLowerCase() === activeChoice}
                        onClick={() =>
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              optValue.label.toLowerCase(),
                          })
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="pb-14 break-words w-full max-w-xl text-lg">
              {product.description}
            </div>
          </section>
          <div>
            
            <button
              onClick={addToCart}
              className="text-center bg-black text-white rounded-md py-4 px-6 max-w-300px sm:min-w-300px"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductView;
