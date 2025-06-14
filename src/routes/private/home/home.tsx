import alertPopup from "@/components/alert-popup/alert-popup";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
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
  const onAlertTest = async () => {
    const res = await alertPopup.show({
      title: "Test Alert",
      description: "This is a test alert message.",
      okText: "OK",
      cancelText: "Cancel",
    });
    console.log("res", res);
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>Private Home Page</h1>
        <Link to="/artist">Hello</Link>
        <Button onClick={onToastTest}>Toast Test</Button>
        <Button onClick={onAlertTest}>Alert Test</Button>
      </div>
    </main>
  );
};

export default Home;
