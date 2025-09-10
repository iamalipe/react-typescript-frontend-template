import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    visibilityLabel: string; // Add your custom metadata properties here
  }
}
