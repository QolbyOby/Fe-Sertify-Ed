import heroImg from "../../assets/hero_section.png";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent relative">
      <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-16">
        {/* Kiri: Teks */}
        <div className="flex-1 flex flex-col items-start mb-10 md:mb-0 md:mr-10 ">
          <h1 className="text-4xl md:text-6xl  font-extrabold mb-6 leading-tight">
            Revolutionizing <br /> Academic Credentials
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            Secure, tamper-proof digital diplomas powered by blockchain
            technology. Instantly verifiable anywhere in the world.
          </p>
          <Button size="lg" className="text-lg font-semibold">
            <Link to="/signin">Get Started</Link>
          </Button>
        </div>
        {/* Kanan: Gambar */}
        <div className="flex-1 flex justify-center ">
          <img
            src={heroImg}
            alt="Hero Section"
            className="w-full max-w-xl rounded-xl shadow-lg object-contain"
          />
        </div>
      </section>
    </div>
  );
}
