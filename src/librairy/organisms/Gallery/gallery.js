import { Carousel } from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';

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
            key={uuid()}
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