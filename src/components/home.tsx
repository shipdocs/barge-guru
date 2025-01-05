import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import StatusCardsGrid from "./dashboard/StatusCardsGrid";
import FleetMap from "./dashboard/FleetMap";
import FleetOverview from "./dashboard/FleetOverview";

interface HomeProps {
  initialView?: "grid" | "list";
}

const Home = ({ initialView = "grid" }: HomeProps) => {
  const [currentView, setCurrentView] = React.useState<"grid" | "list">(
    initialView,
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleViewChange = (view: "grid" | "list") => {
    setCurrentView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader
        currentView={currentView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
      />
      <div className="container mx-auto py-6 space-y-6">
        <StatusCardsGrid />
        <FleetMap />
        <FleetOverview />
      </div>
    </div>
  );
};

export default Home;
