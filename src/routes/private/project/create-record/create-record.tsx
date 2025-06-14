import { useToast } from "@/hooks/use-toast";

import SingleForm, {
  FormSchemaType,
} from "@/routes/artist/create-record/single-form";
import apiQuery from "@/hooks/use-api-query";

const CreateRecord = () => {
  const { toast } = useToast();
  // This can come from your database or API.
  const defaultValues: Partial<FormSchemaType> = {
    name: "",
    bio: undefined,
    imageUrl: undefined,
  };

  const onSubmit = async (data: FormSchemaType) => {
    await apiQuery.artist.create(data);
    toast({
      title: "Artist created",
      description: "Your artist has been created successfully.",
    });
  };

  return (
    <SingleForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      mode="create"
    />
  );
};

export default CreateRecord;
