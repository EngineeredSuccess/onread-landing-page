import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveAuraTicker from '@/components/LiveAuraTicker';
import SocialProofVerdict from '@/components/SocialProofVerdict';
import FeaturesSection from '@/components/FeaturesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveAuraTicker />
        <SocialProofVerdict />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
