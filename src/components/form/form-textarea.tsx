import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

type FormTextareaProps = {
  label?: string;
  info?: string[];
  field: AnyFieldApi;
};

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps & React.ComponentPropsWithoutRef<"textarea">
>(({ label, field, info, ...props }, ref) => {
  return (
    <div className="flex flex-col px-2">
      {label && (
        <Label htmlFor={field.name} className="text-left mb-2">
          {label}
        </Label>
      )}
      <Textarea
        ref={ref}
        id={field.name}
        name={field.name}
        className="col-span-3"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {info && info.length > 0 && (
        <ul className="text-xs text-muted-foreground col-span-3 mt-1.5 list-disc list-outside pl-5">
          {info.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      )}
      {field.state.meta.isTouched && !field.state.meta.isValid && (
        <p className="text-xs text-destructive col-span-3 mt-1.5">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </p>
      )}
      {/* {field.state.meta.isValidating ? "Validating..." : null} */}
    </div>
  );
});
