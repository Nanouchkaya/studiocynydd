import { Carousel } from 'react-responsive-carousel';

export const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      <Carousel
        showStatus={false}
        showThumbs
        showIndicators={false}
      >
      {
        images.map(image => (
          <img
            className='gallery-image-item'
            src={image.fields.file.url}
            alt={image.fields.file.fileName}
            loading="lazy"
            height={image.fields.file.details.image.height}
            width={image.fields.file.details.image.width}
          />
        ))
      }
      </Carousel>
    </div>
  )
}