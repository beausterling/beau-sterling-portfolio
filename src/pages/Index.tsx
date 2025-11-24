
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Films from "@/components/Films";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Films />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
