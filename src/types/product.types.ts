import { Tables } from './database.types'

export type TProduct = Tables<'products'> & {
  quantity?: number
  selectedSize?: number
  selectedColor?: string
}
