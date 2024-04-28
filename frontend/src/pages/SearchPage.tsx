import CuisineFilter from "@/components/filter/CuisineFilter";
import SortOptionDropdown from "@/components/filter/SortOptionDropdown";
import PaginationPage from "@/components/search/Pagination";
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
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export default function SearchPage() {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {results, isLoading} = useSearchRestaurant(searchState, city);

  function setSearchQuery(searchFormData: SearchForm) {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  }

  function setPage(page: number) {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  }

  function setSelectedCuisines(selectedCuisines: string[]) {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  }

  function setSortOption(sortOption: string) {
    setSearchState((prevState) => ({
      ...prevState,
      page: 1,
      sortOption,
    }));
  }

  function resetSearch() {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
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
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeholder="Search by cuisines or restaurant or menu"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city!} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>
        {results.data.map((restaurant: any) => (
          <div key={restaurant._id}>
            <SearchResultCard restaurant={restaurant} />
            <Separator />
          </div>
        ))}
        <PaginationPage
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
