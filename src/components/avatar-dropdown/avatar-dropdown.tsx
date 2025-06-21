import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import apiQuery from "@/hooks/use-api-query";
import { useState } from "react";

const AvatarDropdown = () => {
  const apiQueryResult = apiQuery.auth.useGetCurrentUser();
  const currentUser = apiQueryResult.data?.data;
  console.log(currentUser);
  const [connectState, setConnectState] = useState<
    "ONLINE" | "BUSY" | "OFFLINE"
  >(currentUser?.connectState || "ONLINE");

  const onChangeStatus = (newStatus: "ONLINE" | "BUSY" | "OFFLINE") => {
    setConnectState(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage src="" />
          <AvatarFallback>{currentUser?.fullName?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={connectState === "ONLINE"}
          disabled={connectState === "ONLINE"}
          onCheckedChange={() => onChangeStatus("ONLINE")}
        >
          Online
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={connectState === "BUSY"}
          disabled={connectState === "BUSY"}
          onCheckedChange={() => onChangeStatus("BUSY")}
        >
          Busy
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={connectState === "OFFLINE"}
          disabled={connectState === "OFFLINE"}
          onCheckedChange={() => onChangeStatus("OFFLINE")}
        >
          Offline
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
