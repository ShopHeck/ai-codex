import CallToAction from '@/components/sections/CallToAction';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import TrustSecurity from '@/components/sections/TrustSecurity';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <TrustSecurity />
      <CallToAction />
    </>
  );
}
