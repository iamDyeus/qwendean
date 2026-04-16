import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const About = () => {
  const slides = [
    {
      title: "Build Faster",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu libero orci. Aliquam imperdiet magna nec massa congue, id tincidunt magna molestie.",
      image: "/placeholder.svg",
      buttonText: "Learn more",
      link: "#",
    },
    {
      title: "Scale with confidence",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu libero orci. Aliquam imperdiet magna nec massa congue, id tincidunt magna molestie.",
      image: "/placeholder.svg",
      buttonText: "Learn more",
      link: "#",
    },
    {
      title: "Ship with fewer bugs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu libero orci. Aliquam imperdiet magna nec massa congue, id tincincta magna molestie.",
      image: "/placeholder.svg",
      buttonText: "Learn more",
      link: "#",
    },
  ];

  return (
    <section className="py-32">
      <div className="container flex flex-col gap-6 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-6 lg:gap-10">
            <h1 className="text-foreground text-4xl font-semibold
leading-tight tracking-tight sm:text-5xl md:text-[4.5rem]
lg:text-6xl">
              About Us
            </h1>
            <p className="text-foreground text-xl font-medium
leading-normal tracking-tight lg:text-2xl">
              Detailed explanation of the feature, including key
capabilities and improvements
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="max-w-96">
                    <div className="relative aspect-[1.774545455/1]
overflow-hidden rounded-2xl">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <h2 className="text-foreground text-lg
font-semibold leading-tight sm:text-xl">
                        {slide.title}
                      </h2>
                      <p className="text-foreground/50 text-base
leading-normal">
                        {slide.description}
                      </p>
                      <a
                        href={slide.link}
                        className="text-foreground group mt-4
inline-block font-medium transition-transform hover:translate-y-0.5"
                      >
                        {slide.buttonText}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-end gap-4">
              <CarouselPrevious className="static translate-x-0" />
              <CarouselNext className="static translate-x-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { About };