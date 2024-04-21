import SearchBar, {SearchForm} from "@/components/search/SearchBar";
import SearchResultCard from "@/components/search/SearchResultCard";
import SearchResultInfo from "@/components/search/SearchResultInfo";
import {Separator} from "@/components/ui/separator";
import {useSearchRestaurant} from "@/graphql/queries/restaurant";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useParams} from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

export default function SearchPage() {
  const {city} = useParams();
  const [searchState, setSearchState] = useState({seachQuery: ""});
  const {results, isLoading} = useSearchRestaurant(city);

  function setSearchQuery(searchFormData: SearchForm) {
    setSearchState((prevState) => ({
      ...prevState,
      seachQuery: searchFormData.searchQuery,
    }));
  }

  function resetSearch() {
    setSearchState((prevState) => ({
      ...prevState,
      seachQuery: "",
    }));
  }

  if (isLoading) {
    return (
      <Loader2 size={40} className="text-orange-500 animate-spin mx-auto" />
    );
  }

  if (!results?.data) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">{/* TODo insert cuisines list */}</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.seachQuery}
          placeholder="Search by cuisines or restaurant or menu"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city!} />
        {results.data.map((restaurant: any) => (
          <>
            <SearchResultCard restaurant={restaurant} />
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
}
