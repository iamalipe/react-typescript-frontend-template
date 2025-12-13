import PageBreadcrumb from "@/components/general/page-breadcrumb";
import { MultiSelect } from "@/components/general/simple-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const OPTIONS = [
  {
    value: "fish",
    label: "Fish",
  },
  {
    value: "shark",
    label: "Shark",
  },
  {
    value: "dolphin",
    label: "Dolphin",
  },
  {
    value: "whale",
    label: "Whale",
  },
  {
    value: "seahorse",
    label: "Seahorse",
  },
  {
    value: "starfish",
    label: "Starfish",
  },
  {
    value: "jellyfish",
    label: "Jellyfish",
  },
  {
    value: "crab",
    label: "Crab",
  },
  {
    value: "lobster",
    label: "Lobster",
  },
  {
    value: "octopus",
    label: "Octopus",
  },
];
const MultiSelectElement = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const onChange = (newValue: any) => {
    setSelectedOptions(newValue as string[]);
    toast(
      <pre className="">
        <code>{JSON.stringify(newValue, null, 2)}</code>
      </pre>,
      {
        duration: 1000,
      }
    );
  };
  return (
    <MultiSelect
      placeholder="Select..."
      options={OPTIONS}
      value={selectedOptions}
      onChange={onChange}
    />
  );
};
const ShadcnSelectElement = () => {
  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const onChange = (newValue: any) => {
    setSelectedOptions(newValue as string);
    toast(
      <pre className="">
        <code>{JSON.stringify(newValue, null, 2)}</code>
      </pre>,
      {
        duration: 1000,
      }
    );
  };
  return (
    <Select value={selectedOptions} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select ..." />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ComponentViewList = [
  {
    title: "Multi Select (React-Select)",
    element: <MultiSelectElement />,
  },
  {
    title: "Shadcn Select",
    element: <ShadcnSelectElement />,
  },
];

const ComponentView = () => {
  return (
    <>
      <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
        <PageBreadcrumb />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ComponentViewList.map((item, index) => (
            <div className="border rounded-md" key={index}>
              <h1 className="text-lg px-3 py-1 bg-secondary text-secondary-foreground">
                {item.title}
              </h1>
              <div className="h-40 flex items-center justify-center">
                {item.element}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default ComponentView;
