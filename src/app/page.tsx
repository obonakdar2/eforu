import { HeroSlider } from "~/components/hero-slider";
import RewardsSlider from "~/components/rewards-slider";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider autoSlideInterval={2000} className="mx-auto w-full" />
      <RewardsSlider />
    </div>
  );
}
