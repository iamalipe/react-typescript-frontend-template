import PasskeyRegister from "@/components/passkey/passkey-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sleep } from "@/lib/utils";
import { useRef, useState } from "react";
import { toast } from "sonner";

import AlertPopupExample from "@/components/alert-popup/alert-popup-example";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const onToastTest = () => {
    toast("This is a test toast message!");
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    toast.promise(sleep(2000), {
      loading: "Loading...",
      success: () => {
        return `Hello toast has been added`;
      },
      error: "Error",
    });
    toast.warning("Event start time cannot be earlier than 8am");
  };

  return (
    <TooltipProvider>
      <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
        <div>
          <h1>Private Home Page</h1>
          <div className="flex gap-2 mb-6">
            <PasskeyRegister />
            <Button onClick={onToastTest}>Toast Test</Button>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <Input />
          </div>
          {/* context menu testing */}
          <TextareaContextMenuTesting />
          <AlertPopupExample/>
        </div>
      </main>
    </TooltipProvider>
  );
};

export default Home;

const TextareaContextMenuTesting = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<number>(0);

  const handleInsertText = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = cursorPositionRef.current;
    const end = cursorPositionRef.current;
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    const newValue = beforeText + textToInsert + afterText;

    setValue(newValue);

    // Set cursor position after the inserted text
    setTimeout(() => {
      const newCursorPosition = start + textToInsert.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      textarea.focus();
    }, 0);
  };

  const handleContextMenuOpen = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      cursorPositionRef.current = textarea.selectionStart;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ContextMenu
        onOpenChange={(open) => {
          if (open) {
            handleContextMenuOpen();
          }
        }}
      >
        <ContextMenuTrigger asChild>
          <Textarea
            ref={textareaRef}
            placeholder="Context Menu Testing"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSelect={(e) => {
              const target = e.target as HTMLTextAreaElement;
              cursorPositionRef.current = target.selectionStart;
            }}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => handleInsertText("Hello")}>
            Insert Hello
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleInsertText("World")}>
            Insert World
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};
