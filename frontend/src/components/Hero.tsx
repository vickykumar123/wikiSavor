import hero from "../assets/hero.png";
export default function Hero() {
  return (
    <div>
      <img src={hero} className="hero-img w-full max-h-[600px] object-cover" />
    </div>
  );
}
