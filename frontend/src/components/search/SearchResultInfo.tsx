import {Link} from "react-router-dom";

interface SearchResultProps {
  total: number;
  city: string;
}

export default function SearchResultInfo({total, city}: SearchResultProps) {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
}
