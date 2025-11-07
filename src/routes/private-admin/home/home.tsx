import alertPopup from "@/components/alert-popup/alert-popup";
import PasskeyRegister from "@/components/passkey/passkey-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateAndStringify } from "@/lib/generic-validation";
import { sleep } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import ReactSelect from "react-select";
import { toast } from "sonner";
import { dialogStateZodSchema } from "../private-admin-route";

const Home = () => {
  const navigate = useNavigate({ from: "/admin" });
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
  const onAlertTest = async () => {
    const res = await alertPopup.show({
      title: "Test Alert",
      description: "This is a test alert message.",
      okText: "OK",
      cancelText: "Cancel",
    });
    console.log("res", res);
  };

  const onProductCreate = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      mode: "CREATE",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };

  return (
    <main className="flex-1 overflow-auto flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>Private Home Page</h1>
        <div className="flex gap-2 mb-6">
          <PasskeyRegister />
          <Button onClick={onToastTest}>Toast Test</Button>
          <Button onClick={onAlertTest}>Alert Test</Button>
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
          <Button onClick={onProductCreate}>Open add Product Dialog</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
