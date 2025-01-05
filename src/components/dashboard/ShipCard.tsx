import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Anchor, Navigation2, AlertTriangle, Users } from "lucide-react";

interface ShipCardProps {
  name?: string;
  status?: "active" | "maintenance" | "docked";
  location?: string;
  crewCount?: number;
  nextMaintenance?: string;
  alerts?: number;
  imageUrl?: string;
}

const ShipCard = ({
  name = "Ocean Explorer",
  status = "active",
  location = "North Atlantic",
  crewCount = 24,
  nextMaintenance = "2024-03-15",
  alerts = 2,
  imageUrl = "https://images.unsplash.com/photo-1520551668116-035e2d970f49?w=800&auto=format&fit=crop",
}: ShipCardProps) => {
  const statusColors = {
    active: "bg-green-500",
    maintenance: "bg-yellow-500",
    docked: "bg-slate-500",
  };

  return (
    <Card className="w-[360px] h-[280px] bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 h-32 relative">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <Badge
          className={`absolute top-4 right-4 ${statusColors[status]}`}
          variant="secondary"
        >
          {status.toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{name}</h3>
          {alerts > 0 && (
            <Badge variant="destructive" className="flex gap-1">
              <AlertTriangle className="w-4 h-4" />
              {alerts}
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Navigation2 className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Crew: {crewCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4" />
            <span>Next Maintenance: {nextMaintenance}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button size="sm">Manage</Button>
      </CardFooter>
    </Card>
  );
};

export default ShipCard;
