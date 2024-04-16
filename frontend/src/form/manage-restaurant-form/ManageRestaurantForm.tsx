import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import DetailSection from "./DetailSection";
import {Separator} from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import {Button} from "@/components/ui/button";
import {Restaurant} from "@/types";

type ManageRestaurantFormProps = {
  onSave: (restaurantFormData: Restaurant) => void;
  isLoading: boolean;
};

const formSchema = z.object({
  restaurantName: z.string({required_error: "Resturant name is requried"}),
  city: z.string({required_error: "City is requried"}),
  country: z.string({required_error: "Country is requried"}),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageUrl: z.string({required_error: "Upload the image"}),
  image: z.instanceof(File, {message: "Image is required"}),
});

type RestaurantFormData = z.infer<typeof formSchema>;

export default function ManageRestaurantForm({
  onSave,
  isLoading,
}: ManageRestaurantFormProps) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{name: "", price: 0}],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    console.log(formDataJson);
    onSave(formDataJson);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" variant="submit">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
