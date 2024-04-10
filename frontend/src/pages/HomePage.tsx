import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white border-gray-100 rounded-lg shadow-lg py-8 flex flex-col gap-1 md:gap-3 text-center -translate-y-16">
        <h1 className="search-h1 text-2xl md:text-4xl font-bold tracking-tight text-orange-600">
          Tuck into takeway today 🥳
        </h1>
        <span className="md:text-lg text-slate-500 italic">
          Food is just a click away!
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeway even faster !
          </span>
          <span>
            Download the wikiSavor app for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
}
