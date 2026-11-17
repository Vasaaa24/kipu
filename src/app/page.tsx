import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ExtraConstruction } from "@/components/sections/ExtraConstruction";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ExtraConstruction />
      <WhyUs />
      <Process />
      <About />
      <Contact />
    </>
  );
}
