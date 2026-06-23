import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CraftSection from "../components/CraftSection";
import TrendingProducts from "../components/TrendingProducts";
import ArtisanSpotlight from "../components/ArtisanSpotlight";
import About from "../components/About";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


function Home() {
  return (
    <div id="top">
      <Navbar />
      <Hero />
      <CraftSection />
      <TrendingProducts />
      <ArtisanSpotlight />
      <About />
      <Statistics />
      <Testimonials />
      <Footer />
    </div>
  );
}
 
export default Home;