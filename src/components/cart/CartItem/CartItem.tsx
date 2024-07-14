import Image from "next/image";
import { Trash, Plus, Minus } from "@/components/icons";
import { LineItem } from "@/framework/common/types/cart";
import { useState, ChangeEvent } from "react";
import Swatch from "@/components/Product/Swatch/Swatch";
import useRemoveItem from "@/framework/common/cart/use-remove-item";
import useUpdateItem from "@/framework/common/cart/use-update-item";

const CartItem = ({
  item,
  currencyCode,
  totalPrice,
}: {
  item: LineItem;
  currencyCode: string;
  totalPrice: string;
}) => {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();

  const [quantity, setQuantity] = useState(item.quantity);
  const price = item.variant.price! * item.quantity || 0;
  const { options } = item;

  const handleQuantityChange = (val: number) => {
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
      updateItem({
        id: item.id,
        variantId: item.variantId,
        quantity: val,
      });
    }
  };

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    handleQuantityChange(val);
  };

  const incrementQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    handleQuantityChange(val);
  };

  return (
    <>
      <li key={item.id} className="flex mt-2 py-6  my-4">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            height="50"
            width="50"
            src={`/images/${item?.variant?.image?.url}`}
            alt={`${item.name} image`}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <h3 className="mx-8 font-bold tracking-tight text-secondary-foreground">
              {item.name}
            </h3>
            <span className="text-base mt-1">
              {item.variant.price} {currencyCode}
            </span>
          </div>

          <div className="mx-10 mt-1 flex">
            {options &&
              options.length > 0 &&
              options.map((option) => (
                <Swatch
                  key={`${item.id}-${option.displayName}`}
                  size="sm"
                  onClick={() => {}}
                  label={option.values[0].label}
                  color={option.values[0].hexColor}
                  variant={option.displayName}
                  className="m-2"
                />
              ))}
          </div>

          <div className="flex mt-4 justify-between">
            <div className="flex mx-10">
              <button onClick={() => incrementQuantity(-1)}>
                <Minus />
              </button>
              <span className="mx-4 text-xl font-bold ">{quantity}</span>
              <button onClick={() => incrementQuantity(1)}>
                <Plus />
              </button>
            </div>

            <button
              onClick={() => {
                removeItem({ id: item.id });
              }}
              className="flex justify-end outline-none"
            >
              <Trash />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
