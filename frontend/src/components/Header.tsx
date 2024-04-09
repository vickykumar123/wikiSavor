import {Pizza} from "lucide-react";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-500 py-6 bg-gray-300/30 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-3xl italic font-mono flex items-center gap-1 font-bold tracking-tight text-orange-500"
          to="/"
        >
          wikiSavor
          <span>
            <Pizza size={29} strokeWidth={3} />
          </span>
        </Link>
      </div>
    </div>
  );
}
