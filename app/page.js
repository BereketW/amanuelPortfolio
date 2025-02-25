import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/services";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Contact />
    </div>
  );
}
