import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeatureComparison from "../components/FeatureComparison";
import LiveHeatmapPreview from "../components/LiveHeatmapPreview";
import Testimonials from "../components/Testimonials";
import Partners from "../components/Partners";
import CallToAction from "../components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeatureComparison />
      <LiveHeatmapPreview />
      <Testimonials />
      <Partners />
      <CallToAction />
    </>
  );
}