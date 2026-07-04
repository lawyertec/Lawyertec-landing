import Header, {
  Hero,
  Features,
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
        <HowItWorks />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
