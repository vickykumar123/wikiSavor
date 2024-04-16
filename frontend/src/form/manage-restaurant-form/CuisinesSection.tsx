import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {cuisineList} from "@/lib/restaurant-options";
import {useFormContext} from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

export default function CuisinesSection() {
  const {control} = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({field}) => (
          <FormItem>
            <FormMessage />
            <div className="flex justify-start items-center flex-wrap gap-2 md:grid md:grid-cols-5">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox
                  key={cuisineItem}
                  cuisine={cuisineItem}
                  field={field}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
