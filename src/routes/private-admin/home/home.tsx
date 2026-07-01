import alertPopup from "@/components/alert-popup/alert-popup";
import { Label } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sleep } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";

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
          <Button onClick={onToastTest}>Shadcn Toast</Button>
          <AlertTestingComponent />
        </div>
      </main>
    </TooltipProvider>
  );
};

export default Home;

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
      <Button onClick={onAlertTest}>Custom Alert Confirm</Button>
      <Button onClick={onAlertDelete}>Custom Alert Delete</Button>
      <Button onClick={onAlertInfo}>Custom Alert Info</Button>
    </div>
  );
};
