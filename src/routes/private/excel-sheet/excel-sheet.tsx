import { Outlet } from "@tanstack/react-router";

export const ExcelSheetMain = () => {
  return (
    <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>ExcelSheetMain</h1>
      </div>
    </main>
  );
};
export const ExcelSheetLayout = () => {
  return (
    <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div className="border-red-500 border-2 p-2">
        <h1>ExcelSheetLayout</h1>
      </div>
      <Outlet />
    </main>
  );
};

export const ExcelSheetC1 = () => {
  return (
    <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>ExcelSheetC1</h1>
      </div>
    </main>
  );
};

export const ExcelSheetC2 = () => {
  return (
    <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>ExcelSheetC2</h1>
      </div>
    </main>
  );
};
