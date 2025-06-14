import { getRouteApi } from "@tanstack/react-router";
import SingleForm, {
  FormSchemaType,
} from "@/routes/artist/view-record/single-form";

const routeApi = getRouteApi("/artist/$id");
const ViewRecord = () => {
  const routeData = routeApi.useLoaderData();
  const mainData = routeData.data.data;

  const defaultValues: Partial<FormSchemaType> = {
    name: mainData.name,
    bio: mainData.bio || undefined,
    imageUrl: mainData.imageUrl || undefined,
  };

  return (
    <SingleForm defaultValues={defaultValues} id={mainData.id} mode="view" />
  );
};

export default ViewRecord;
