import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Trash2} from "lucide-react";
import {useFormContext} from "react-hook-form";

interface MenuItemInputProps {
  index: number;
  removeMenuItem: () => void;
}

export default function MenuItemInput({
  index,
  removeMenuItem,
}: MenuItemInputProps) {
  const {control} = useFormContext();
  return (
    <div className="flex flex-row items-center gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Trash2
        onClick={removeMenuItem}
        className="text-red-500 mt-4 cursor-pointer"
      />
    </div>
  );
}
