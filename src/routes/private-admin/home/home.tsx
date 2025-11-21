import alertPopup from "@/components/alert-popup/alert-popup";
import PasskeyRegister from "@/components/passkey/passkey-register";
import { Label, Textarea } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sleep } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RichTextEditor } from "@/components/rich-text-editor/rich-text-editor";

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
            <ReactSelect
              value={{ value: "5", label: "Tiger" }}
              onChange={(e) => {
                console.log("onChange", e);
              }}
              // isMulti
              options={[
                { value: "1", label: "Dog" },
                { value: "2", label: "Cat" },
                { value: "3", label: "Elephant" },
                { value: "4", label: "Lion" },
                { value: "5", label: "Tiger" },
                { value: "6", label: "Bear" },
                { value: "7", label: "Wolf" },
                { value: "8", label: "Fox" },
                { value: "9", label: "Rabbit" },
                { value: "10", label: "Deer" },
                { value: "11", label: "Horse" },
                { value: "12", label: "Cow" },
                { value: "13", label: "Sheep" },
                { value: "14", label: "Goat" },
                { value: "15", label: "Pig" },
                { value: "16", label: "Monkey" },
                { value: "17", label: "Giraffe" },
                { value: "18", label: "Zebra" },
                { value: "19", label: "Kangaroo" },
                { value: "20", label: "Panda" },
              ]}
            />
            <Input />
          </div>
          {/* context menu testing */}
          <TextareaContextMenuTesting />
          <AlertTestingComponent />
          <RichTextEditor />
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

// AlertTestingComponent

const CustomAlertFields = forwardRef((_props, ref) => {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  useImperativeHandle(ref, () => ({
    getValues: () => ({ input, input2 }),
  }));

  return (
    <div className="flex flex-col gap-2">
      <Label className="mb-2 block">Reason for this action</Label>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Custom Input Field"
      />
      <Label className="mb-2 block">Extra info</Label>
      <Input
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Another field"
      />
    </div>
  );
});

const AlertTestingComponent = () => {
  const onAlertTest = async () => {
    const res = await alertPopup.show({
      title: "Test Alert",
      description: "This is a test alert message.",
      okText: "OK",
      cancelText: "Cancel",
    });
    console.log("res", res);
  };
  const onAlertDelete = async () => {
    const res = await alertPopup.delete();
    console.log("res", res);
  };
  const onAlertInfo = async () => {
    const res = await alertPopup.show({
      title: "Custom Element Test Alert",
      description: "This is a test alert message.",
      okText: "OK",
      cancelText: "Cancel",
      customElement: <CustomAlertFields />,
    });
    console.log("res", res);
  };
  return (
    <div className="flex gap-4 mt-4">
      <Button onClick={onAlertTest}>Alert Confirm</Button>
      <Button onClick={onAlertDelete}>Alert Delete</Button>
      <Button onClick={onAlertInfo}>Alert Info</Button>
    </div>
  );
};
