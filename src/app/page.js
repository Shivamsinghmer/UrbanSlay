const logo = "/navImages/logo.jpg";
import { navItems } from "@/constants/constant.js";
import CardNav from "../components/CardNav.jsx"
import { heroImages } from "@/constants/constant.js";
import { Carousel } from "@/components/carousel.jsx";

const App = () => {

  const slides = heroImages.map((img, idx) => (
    <picture key={idx}>
      <source media="(max-width: 768px)" srcSet={img.src_mobile} />
      <img
        src={img.src_pc}
        className="h-80 md:h-135.5 w-full rounded-2xl md:rounded-3xl object-cover shadow-lg"
        alt={img.alt}
      />
    </picture>
  ))
  const thumbnails = heroImages.map((img, idx) => (
    <picture key={idx}>
      <source media="(max-width: 768px)" srcSet={img.src_mobile} />
      <img
        src={img.src_pc}
        className="h-full w-full object-cover"
        alt={img.alt}
      />
    </picture>
  ))
  return (
    <main className="mx-auto w-[90%] max-w-350 pt-32 pb-10">
      <div className="w-full">
        <Carousel
          slides={slides}
          thumbnails={thumbnails}
          autoplayDelay={2500}
          showPlay={false}
          showDots={false}
          showProgress
        />
      </div>
    </main>
  )

};

export default App;