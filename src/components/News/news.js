import { H2 } from "@librairy/atoms";
import { useState } from 'react';
import { useInterval } from './hook';

export const News = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);

  useInterval(() => {
    const totalSlides = 3;
    const moveToNextSlideOrBackToFirst = (activeSlideIndex >= totalSlides) ? 1 : activeSlideIndex + 1;

    setActiveSlideIndex(moveToNextSlideOrBackToFirst);
  },20000);


	return (
    <section className="news">
      <H2>Nouveautés</H2>

      <div className="caroussel">
        <img
          className="slide"
          data-index={1}
          alt="slide 1"
          src="https://picsum.photos/1200/300?random=1" />
        <img
          className="slide"
          data-index={2}
          alt="slide 2"
          src="https://picsum.photos/1200/300?random=2" />
        <img
          className="slide"
          data-index={3}
          alt="slide 3"
          src="https://picsum.photos/1200/300?random=3" />
      </div>

      <ul>
        <li onClick={() => setActiveSlideIndex(1)}></li>
        <li onClick={() => setActiveSlideIndex(2)}></li>
        <li onClick={() => setActiveSlideIndex(3)}></li>
      </ul>

      <style jsx>{`
        .slide:not([data-index="${activeSlideIndex}"]) {
          width: 0;
        }
      `}</style>
    </section>
	)
};