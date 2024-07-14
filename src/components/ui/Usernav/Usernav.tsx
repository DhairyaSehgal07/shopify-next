"use client";
import { FC } from "react";
import Link from "next/link";
import { Bag as Cart, Heart } from "@/components/icons";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import useCart from "@/framework/common/cart/use-cart";
import { LineItem } from "@/framework/common/types/cart";
import CartItem from "@/components/cart/CartItem/CartItem";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/components/Product/SheetContext/SheetContext";

const Usernav: FC = () => {
  const side = "right";

  const { data } = useCart();
  const itemsCount =
    data?.lineItems.reduce((count: number, item: LineItem) => {
      return count + item.quantity;
    }, 0) ?? 0;

  const isEmpty = !data?.lineItems?.length;

  const {sheetTriggerRef}= useSheet(); 

  return (
    <>
      <nav>
        <ul className="flex">
          <li className="mr-6 cursor-pointer transition duration-100 flex items-center outline-none text-gray-600 hover:transition hover:text-gray-400 hover:scale-110 relative">
            <Sheet>
              <SheetTrigger ref={sheetTriggerRef} className="relative">
                <Cart />
                {itemsCount > 0 && (
                  <span className="border text-white border-black/90 bg-black/90 absolute rounded-full bottom-3 left-3 flex items-center justify-center font-bold text-xs px-0.5 min-w-[1.25rem] min-h-[1.25rem]">
                    {itemsCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side={side} className="w-full flex flex-col">
                <SheetHeader className="mt-8">
                  <SheetDescription className="font-custom inline-block cursor-pointer text-xl font-medium no-underline duration-100 active:underline">
                    {isEmpty ? (
                      <div className="flex-1 px-4 flex flex-col justify-center items-center mt-24">
                        <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
                          <Cart className="absolute text-black" />
                        </span>
                        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                          Your cart is empty
                        </h2>
                        <p className="text-accents-3 px-10 text-center pt-2">
                          Go to the products page to add items to the cart
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 px-2">
                        <h2 className="pt-1 px-2 pb-4 leading-7 font-bold text-base tracking-wide inline-block">
                          My Cart
                        </h2>
                        <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
                          {data?.lineItems.map((item: LineItem) => (
                            <CartItem
                              key={item.id}
                              item={item}
                              totalPrice={data.lineItemsSubtotalPrice}
                              currencyCode={data.currency.code}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </SheetDescription>
                </SheetHeader>
                {!isEmpty && (
                  <SheetFooter className="mt-auto">
                    <div className="w-full px-4 py-5 sm:px-6">
                      <div className="border-t border-accents-3">
                        <ul className="py-3">
                          <li className="flex justify-between py-1">
                            <span>Subtotal</span>
                            <span>
                              {data?.lineItemsSubtotalPrice}{" "}
                              {data?.currency.code}
                            </span>
                          </li>
                          <li className="flex justify-between py-1">
                            <span>Taxes</span>
                            <span>Calculated at checkout</span>
                          </li>
                          <li className="flex justify-between py-1">
                            <span>Estimated Shipping</span>
                            <span className="font-bold tracking-wide">FREE</span>
                          </li>
                        </ul>
                        <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                          <span>Total</span>
                          <span>
                            {data?.totalPrice} {data?.currency.code}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full py-6 text-base">
                        Proceed to checkout
                      </Button>
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </li>
          <li className="mr-6 mt-[1.6px] cursor-pointer transition duration-100 flex items-center outline-none text-gray-600 hover:transition hover:text-gray-400 hover:scale-110">
            <Link href="/wishlist">
              <Heart />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Usernav;
