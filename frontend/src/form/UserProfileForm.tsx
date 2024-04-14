import {DeleteButton} from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {User} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
  email: z.string().email().readonly().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address line1  is required"),
  city: z.string().min(1, "City  is required"),
  country: z.string().min(1, "Country  is required"),
});
type UserFormData = z.infer<typeof formSchema>;

interface UserProfileProps {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
}

export default function UserProfileForm({
  onSave,
  isLoading,
  currentUser,
}: UserProfileProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
      city: currentUser.city,
      country: currentUser.country,
      addressLine1: currentUser.addressLine1,
    },
  });
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          <FormDescription>
            View and change your profile information here.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4 ">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({field}) => (
              <FormItem>
                <FormLabel>Address Line1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white md:w-72 xl:w-[800px]" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button variant="submit">Submit</Button>
          )}
          <DeleteButton />
        </div>
      </form>
    </Form>
  );
}
