import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Calendar, Users, LayoutGrid, List } from "lucide-react";

interface DashboardHeaderProps {
  onViewChange?: (view: "grid" | "list") => void;
  onSearch?: (query: string) => void;
  currentView?: "grid" | "list";
}

const DashboardHeader = ({
  onViewChange = () => {},
  onSearch = () => {},
  currentView = "grid",
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search ships..."
            className="pl-10 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 border-l pl-4">
          <Button
            variant={currentView === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={currentView === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Maintenance
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Manage Crew
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Ship
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Add Single Ship</DropdownMenuItem>
            <DropdownMenuItem>Bulk Import Ships</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
