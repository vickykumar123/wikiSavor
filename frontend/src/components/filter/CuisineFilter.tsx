import {cuisineList} from "@/lib/restaurant-options";
import {Label} from "../ui/label";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import {ChangeEvent} from "react";
import {Button} from "../ui/button";
import {ScrollArea} from "../ui/scroll-area";

interface CuisineFilterProps {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
}

export default function CuisineFilter({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: CuisineFilterProps) {
  function handleCuisinesReset() {
    onChange([]);
  }

  function handleCuisinesChange(event: ChangeEvent<HTMLInputElement>) {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  }
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <ScrollArea className="md:h-screen">
        <div className="space-y-2 flex md:flex-col flex-wrap gap-1">
          {cuisineList
            .slice(0, isExpanded ? cuisineList.length : 7)
            .map((cuisine) => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <div key={cuisine} className="flex">
                  <input
                    id={`cuisine_${cuisine}`}
                    type="checkbox"
                    className="hidden"
                    value={cuisine}
                    checked={isSelected}
                    onChange={handleCuisinesChange}
                  />
                  <Label
                    htmlFor={`cuisine_${cuisine}`}
                    className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                      isSelected
                        ? "border border-green-600 text-green-600"
                        : "border border-slate-300"
                    }`}
                  >
                    {isSelected && <Check size={20} strokeWidth={3} />}
                    {cuisine}
                  </Label>
                </div>
              );
            })}
          <Button
            variant="link"
            className="mt-4 flex-1"
            onClick={onExpandedClick}
          >
            {isExpanded ? (
              <span className="flex flex-row items-center">
                View Less <ChevronUp />
              </span>
            ) : (
              <span className="flex flex-row items-center">
                View More <ChevronDown />
              </span>
            )}
          </Button>
        </div>
      </ScrollArea>
    </>
  );
}
