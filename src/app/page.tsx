import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { SelectedProjects } from "@/components/SelectedProjects";
import { Services } from "@/components/Services";
import { Tools } from "@/components/Tools";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <SelectedProjects />
      <Services />
      <Tools />
      <Pricing />
      <Footer />
    </main>
  );
}
