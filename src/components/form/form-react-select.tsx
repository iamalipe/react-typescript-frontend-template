import { Label } from "@/components/ui/label";
import { SelectProps } from "@radix-ui/react-select";
import { AnyFieldApi } from "@tanstack/react-form";
import ReactSelect from "react-select";

type FormInputProps = {
  label?: string;
  placeholder?: string;
  info?: string[];
  options?: {
    value: string;
    label: string;
  }[];
  field: AnyFieldApi;
} & SelectProps;

export const FormReactSelect = ({
  label,
  field,
  info,
  placeholder,
  options,
  ...props
}: FormInputProps) => {
  const _options = options || [];

  return (
    <div className="flex flex-col px-2">
      {label && (
        <Label htmlFor={field.name} className="text-left mb-2">
          {label}
        </Label>
      )}
      <ReactSelect options={_options} />
      {/* <Select
        {...props}
        value={field.state.value}
        // onBlur={field.handleBlur}
        onValueChange={(e) => field.handleChange(e)}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {_options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
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
};
