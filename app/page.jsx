import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Ambient from "@/components/Ambient";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Motion from "@/components/Motion";
import Services from "@/components/Services";
import Why from "@/components/Why";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export default function Page() {
  return (
    <>
      <Loader />
      <Cursor />
      <Ambient />
      <div className="content">
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Work />
        <Motion />
        <Services />
        <Why />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <SiteEffects />
    </>
  );
}
