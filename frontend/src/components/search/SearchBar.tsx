import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Form, FormControl, FormField, FormItem} from "../ui/form";
import {Search} from "lucide-react";
import {useEffect} from "react";

interface SearchBarProps {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery: string;
}
const formSchema = z.object({
  searchQuery: z.string({required_error: "Search input is requrired"}).min(1),
});

export type SearchForm = z.infer<typeof formSchema>;
export default function SearchBar({
  onSubmit,
  placeholder,
  onReset,
  searchQuery,
}: SearchBarProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  useEffect(() => {
    form.reset({searchQuery});
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-2 justify-between flex-row border-2 rounded-full p-1 mx-5 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none md:text-lg focus-visible:ring-0 placeholder:italic"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {searchQuery && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            Reset
          </Button>
        )}
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
}
