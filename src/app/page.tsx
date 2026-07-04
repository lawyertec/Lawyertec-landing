import Header, {
  Hero,
  Features,
  Stats,
  HowItWorks,
  WaitlistSection,
  Footer,
} from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
