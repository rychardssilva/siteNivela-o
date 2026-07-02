import {
  Hero,
  About,
  Services,
  Benefits,
  BlogPreview,
  CTA,
} from "@/components/home";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Benefits />
      <BlogPreview />
      <CTA />
    </main>
  );
}
