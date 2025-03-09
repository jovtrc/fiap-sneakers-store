import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from '@/components/ui/extension/carousel'
import { Tables } from '@/types/database.types'

export const ImagesCarousel = ({
  product,
}: {
  product: Tables<'products'>
}) => {
  return (
    <Carousel>
      <CarouselNext className="top-1/3 -translate-y-1/3 cursor-pointer p-5 *:!size-6" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3 cursor-pointer p-5 *:!size-6" />
      <CarouselMainContainer>
        {product.images.map((image) => {
          return (
            <SliderMainItem key={image}>
              <img
                src={image}
                alt={product.name}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </SliderMainItem>
          )
        })}
      </CarouselMainContainer>
      <CarouselThumbsContainer className="grid grid-cols-5">
        {product.images.map((image, index) => (
          <SliderThumbItem
            key={image}
            index={index}
            className="aspect-square w-full"
          >
            <img
              src={image}
              alt={product.name}
              className="aspect-square w-full cursor-pointer rounded-xl object-cover transition-opacity hover:opacity-80"
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  )
}
