import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List } from "lucide-react";
import ShipCard from "./ShipCard";

interface Ship {
  id: string;
  name: string;
  status: "active" | "maintenance" | "docked";
  location: string;
  crewCount: number;
  nextMaintenance: string;
  alerts: number;
  imageUrl: string;
}

interface FleetOverviewProps {
  ships?: Ship[];
}

const defaultShips: Ship[] = [
  {
    id: "1",
    name: "Ocean Explorer",
    status: "active",
    location: "North Atlantic",
    crewCount: 24,
    nextMaintenance: "2024-03-15",
    alerts: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1520551668116-035e2d970f49?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Coastal Voyager",
    status: "maintenance",
    location: "Mediterranean Sea",
    crewCount: 18,
    nextMaintenance: "2024-02-28",
    alerts: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1566375638495-8dfc00471f60?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Pacific Star",
    status: "docked",
    location: "San Francisco Bay",
    crewCount: 22,
    nextMaintenance: "2024-04-01",
    alerts: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1589561253831-b8421dd58261?w=800&auto=format&fit=crop",
  },
];

const FleetOverview = ({ ships = defaultShips }: FleetOverviewProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fleet Overview</h2>
      </div>
      <Tabs
        defaultValue={view}
        onValueChange={(value) => setView(value as "grid" | "list")}
      >
        <TabsList className="grid w-[200px] grid-cols-2 mb-6">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Grid
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            List
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ships.map((ship) => (
              <ShipCard
                key={ship.id}
                name={ship.name}
                status={ship.status}
                location={ship.location}
                crewCount={ship.crewCount}
                nextMaintenance={ship.nextMaintenance}
                alerts={ship.alerts}
                imageUrl={ship.imageUrl}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="m-0">
          <div className="space-y-4">
            {ships.map((ship) => (
              <div
                key={ship.id}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={ship.imageUrl}
                    alt={ship.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{ship.name}</h3>
                    <p className="text-sm text-gray-600">{ship.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <p>Crew: {ship.crewCount}</p>
                    <p>Next Maintenance: {ship.nextMaintenance}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FleetOverview;
