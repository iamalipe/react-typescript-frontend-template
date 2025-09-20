import { FieldErrors, FieldValues } from "react-hook-form";

export function getErrorByPath<T extends FieldValues>(
  errors: FieldErrors<T>,
  path: string
) {
  return path
    .split(".")
    .reduce<any>(
      (acc, key) => (acc && acc[key] ? acc[key] : undefined),
      errors
    );
}

export function handleFormError(form: any, error: any) {
  if (Array.isArray(error?.errors) && error?.errors?.length > 0) {
    error?.errors.forEach((er: any) =>
      form.setError(er.path, {
        message: er?.message || "Something wrong, please  ty again.",
      })
    );
  } else {
    form.setError("root", {
      message: error?.message || "Something wrong, please  ty again.",
    });
  }
}
