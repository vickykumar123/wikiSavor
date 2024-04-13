export default function Footer() {
  return (
    <div className="footer bg-orange-500 py-7">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight font-mono italic">
          wikiSavor
        </span>
        <section className="text-white font-bold tracking-tighter flex gap-4 cursor-pointer">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </section>
      </div>
    </div>
  );
}
