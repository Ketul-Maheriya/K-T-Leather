import { Hero } from "../components/Hero";
import { ServicesStrip } from "../components/ServicesStrip";
import { WhyUs } from "../components/WhyUs";
import { Testimonials } from "../components/Testimonials";

export function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <ServicesStrip setPage={setPage} />
      <WhyUs />
      <Testimonials />
    </>
  );
}
