import { Hero } from "../components/Hero";
import { ServicesStrip } from "../components/ServicesStrip";
import { WhyUs } from "../components/WhyUs";
import { Testimonials } from "../components/Testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <WhyUs />
      <Testimonials />
    </>
  );
}
