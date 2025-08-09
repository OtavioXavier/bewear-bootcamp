import { z } from 'zod'

export const decreaseProductToCartSchema = z.object({
    cartItemId: z.uuid()
})

export type DecreaseProductToCartSchema = z.infer<typeof decreaseProductToCartSchema>

