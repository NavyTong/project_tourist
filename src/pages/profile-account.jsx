import Navbar from "@/components/layout/Navbar";
import AccountProfile from "@/components/common/AccountProfile";
import Footer from "@/components/layout/Footer";

export default function ProfileAccountPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <AccountProfile />
      <Footer />
    </div>
  );
}
