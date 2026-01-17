import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Content } from "@tiptap/react";
import { useState } from "react";
import { Button } from "../ui";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";

export const RichTextEditor = () => {
  const [value, setValue] = useState<Content>("");
  console.log("value", value);

  return (
    <div className="w-full mt-4 relative">
      <span>Editor </span>
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="w-full min-h-[200px]"
        editorContentClassName="p-5"
        output="html"
        placeholder="Enter your description..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-hidden"
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>HEllo</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col items-center text-center">
                dasdsad
              </div>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
