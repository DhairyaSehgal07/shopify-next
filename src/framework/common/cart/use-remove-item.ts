import { MutationHook } from "../types/hooks";
import { useHook,useMutationHook } from "../utils/use-hook";
useHook

export type UseRemoveItem<
  H extends MutationHook = MutationHook<any>
> = ReturnType<H["useHook"]>

const useRemoveItem: UseRemoveItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useRemoveItem
  })

  return useMutationHook({...hook})()
}

export default useRemoveItem