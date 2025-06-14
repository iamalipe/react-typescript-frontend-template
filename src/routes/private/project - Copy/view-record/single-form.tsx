import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import PageBreadcrumb from "@/components/general/page-breadcrumb";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().min(2).max(1000).optional(),
  imageUrl: z.string().min(10).optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export type SingleFormProps = {
  defaultValues?: Partial<FormSchemaType>;
  onSubmit?: (data: FormSchemaType) => void;
  id?: string;
  mode?: "create" | "update" | "view";
};

const SingleForm = (props: SingleFormProps) => {
  const { defaultValues, id } = props;

  const mode = id ? props.mode || "view" : props.mode || "create";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    console.log("SingleForm Mount: mode", mode);
    return () => {
      console.log("SingleForm Unmount: mode", mode);
    };
  });

  const onSubmit = (data: FormSchemaType) => {
    props.onSubmit?.(data);
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <PageBreadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Artist Profile</h3>
          {mode !== "create" && (
            <p className="text-sm text-muted-foreground">Id: {id}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={".."} params={{ id: id as string }}>
              Back
            </Link>
          </Button>
          {mode === "view" && (
            <Button asChild>
              {/* <Link to="/artist/$id/update" params={{ id: id as string }}>
                Update
              </Link> */}
            </Button>
          )}
          {mode !== "create" && (
            <Button variant="destructive" asChild>
              {/* <Link to="/artist/$id/delete" params={{ id: id as string }}>
                Delete
              </Link> */}
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 overflow-auto scrollbar-thin max-w-xl p-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    readOnly={mode === "view"}
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    readOnly={mode === "view"}
                    placeholder="Enter your image URL"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly={mode === "view"}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none min-h-48"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          {mode !== "view" && (
            <Button type="submit" className="capitalize">
              {mode}
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};

export default SingleForm;
