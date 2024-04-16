import LoadingButton from "@/components/LoadingButton";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Button} from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useUploadImage} from "@/graphql/queries/currentUserRestaurant";
import {useState} from "react";
import {useFormContext} from "react-hook-form";

export default function ImageSection() {
  const {control, watch, setValue, getValues} = useFormContext();
  const {uploadImageMutate, isLoading} = useUploadImage();
  const image = getValues("image");
  const existingImageUrl = watch("imageUrl");
  const [imageUrl, setImageUrl] = useState();

  async function uploadImage() {
    try {
      const responsedImage = await uploadImageMutate(image);
      setImageUrl(responsedImage);
      setValue("imageUrl", imageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {(existingImageUrl || imageUrl) && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl || imageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        <FormField
          control={control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>

              <FormMessage />
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button type="button" size="sm" onClick={uploadImage}>
                  Upload
                </Button>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
