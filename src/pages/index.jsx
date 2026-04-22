import Navbar from "@/components/layout/Navbar";
import Logosea from "@/components/home/Logosea";
import Popular from "@/components/home/Popular";
import Exploremore from "@/components/home/Exploremore";
import SocialFeed from "@/components/home/SocialFeed";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Logosea />
      <Popular />
      <Exploremore />
      <SocialFeed />
      <Footer />
    </div>
  );
}
