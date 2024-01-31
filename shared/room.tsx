import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { candidates } from "./data";
import { LiveMap } from "@liveblocks/client";


export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="pmsc-2566"
      initialPresence={{}}
      initialStorage={{ votes: new LiveMap() }}
    >
      {children}
    </RoomProvider>
  );
}
