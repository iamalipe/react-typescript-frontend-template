import { Badge } from "@/components/ui/badge";
import { GripHorizontal } from "lucide-react";

const Kanban = () => {
  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>Kanban</h1>
      </div>
      <div className="flex overflow-auto gap-3 pb-2 scroll-smooth">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((e) => {
          return (
            <div
              key={e}
              className="flex flex-col flex-none overflow-hidden border rounded-md w-72 bg-secondary/75 text-secondary-foreground"
            >
              {/* card list handle */}
              <div className="flex relative flex-col flex-none bg-background rounded-t-md border-b">
                <div className="flex absolute items-center justify-center text-muted-foreground rounded-t-md cursor-grab w-full h-full bg-background/90 opacity-0 hover:opacity-100 transition-opacity">
                  <GripHorizontal />
                </div>
                <h1 className="px-4 py-2 select-none text-base font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, ducimus?
                </h1>
              </div>
              <div className="flex flex-col flex-1 gap-2 py-2 px-2 overflow-auto scrollbar-hide scroll-smooth">
                <KanbanCard />
                <KanbanCard />
                <KanbanCard />
                <KanbanCard />
                <KanbanCard />
                <KanbanCard />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Kanban;

const KanbanCard = () => {
  return (
    <div className="flex flex-col flex-none bg-background py-2 px-2 rounded-md border shadow gap-2">
      <div className="flex items-center justify-center text-muted-foreground/50 rounded-md cursor-grab hover:bg-secondary hover:text-muted-foreground">
        <GripHorizontal />
      </div>
      <p className="px-2 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A debitis
        blanditiis architecto cumque ipsa quaerat fugit, dolor incidunt veniam
        quasi, exercitationem explicabo nostrum quos accusantium maxime
        laudantium cum tenetur ipsum.
      </p>
      <div className="flex flex-wrap gap-2 px-2">
        <Badge>Hello</Badge>
        <Badge>Hello</Badge>
      </div>
    </div>
  );
};
