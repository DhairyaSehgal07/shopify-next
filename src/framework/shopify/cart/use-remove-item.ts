

import useRemoveItem, {UseRemoveItem} from "@/framework/common/cart/use-remove-item"
import { Cart } from "@/framework/common/types/cart"
import { MutationHook } from "@/framework/common/types/hooks"
import { CheckoutLineItemsRemovePayload } from "../schema"
import { checkoutToCart,getCheckoutId } from "../utils"
import { checkoutLineItemsRemoveMutation } from "../utils/mutations"
import useCart from "./use-cart"

export default useRemoveItem as UseRemoveItem<typeof handler>

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string
  },
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload
  },
  data: Cart
}

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsRemoveMutation
  },
  async fetcher({
    input: { id },
    options,
    fetch
  }) {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItemIds: [id]
      }
    })

    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout)
    return cart
  },
  useHook: ({fetch}) => () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mutate: updateCart } = useCart()

    return async (input) => {
      const data = await fetch(input)
      updateCart(data, false)
      return data
    }
  }
}