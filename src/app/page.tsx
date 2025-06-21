import { CarouselSlider } from "~/components/ui/carousel-slider";

const slides = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    description:
      "Discover amazing features and endless possibilities with our innovative solutions.",
    image: "/placeholder.svg?height=400&width=800",
    buttonText: "Get Started",
  },
  {
    id: 2,
    title: "Build Something Great",
    description:
      "Transform your ideas into reality with our powerful tools and resources.",
    image: "/placeholder.svg?height=400&width=800",
    buttonText: "Learn More",
  },
  {
    id: 3,
    title: "Join Our Community",
    description:
      "Connect with like-minded individuals and grow together in our vibrant community.",
    image: "/placeholder.svg?height=400&width=800",
    buttonText: "Join Now",
  },
  {
    id: 4,
    title: "Experience Innovation",
    description:
      "Stay ahead of the curve with cutting-edge technology and forward-thinking solutions.",
    image: "/placeholder.svg?height=400&width=800",
    buttonText: "Explore",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CarouselSlider
        slides={slides}
        autoSlideInterval={2000}
        className="mx-auto w-full"
      />

      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Welcome to Our Homepage
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Experience our interactive carousel that automatically slides every
            2 seconds. Hover to pause, click the dots to navigate, or use the
            arrow buttons.
          </p>
        </div>
      </section>

      {/* Additional Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <h3 className="mb-3 text-xl font-semibold">Feature One</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <h3 className="mb-3 text-xl font-semibold">Feature Two</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <h3 className="mb-3 text-xl font-semibold">Feature Three</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
