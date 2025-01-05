import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Anchor, Navigation } from "lucide-react";

interface ShipMarker {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  status: "active" | "maintenance" | "docked";
}

interface FleetMapProps {
  ships?: ShipMarker[];
  onShipSelect?: (shipId: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const defaultShips: ShipMarker[] = [
  {
    id: "1",
    name: "Ocean Explorer",
    position: { lat: 25.7617, lng: -80.1918 },
    status: "active",
  },
  {
    id: "2",
    name: "Northern Star",
    position: { lat: 40.7128, lng: -74.006 },
    status: "maintenance",
  },
  {
    id: "3",
    name: "Pacific Voyager",
    position: { lat: 34.0522, lng: -118.2437 },
    status: "docked",
  },
];

const FleetMap = ({
  ships = defaultShips,
  onShipSelect = () => {},
  center = { lat: 30.7128, lng: -95.006 },
  zoom = 4,
}: FleetMapProps) => {
  const [selectedShip, setSelectedShip] = useState<ShipMarker | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Mock map placeholder
  const handleShipClick = (ship: ShipMarker) => {
    setSelectedShip(ship);
    setShowDialog(true);
    onShipSelect(ship.id);
  };

  return (
    <Card className="w-full h-[400px] bg-slate-50 relative overflow-hidden">
      {/* Mock map background */}
      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop')] bg-cover bg-center opacity-50" />

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Ship markers */}
      <TooltipProvider>
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(ship.position.lng + 180) * (100 / 360)}%`,
              top: `${(90 - ship.position.lat) * (100 / 180)}%`,
            }}
            onClick={() => handleShipClick(ship)}
          >
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`w-4 h-4 rounded-full ${
                    ship.status === "active"
                      ? "bg-green-500"
                      : ship.status === "maintenance"
                        ? "bg-yellow-500"
                        : "bg-slate-500"
                  } border-2 border-white shadow-lg`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{ship.name}</p>
                <p className="text-xs text-gray-500">{ship.status}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </TooltipProvider>

      {/* Ship details dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              {selectedShip?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">
              Position: {selectedShip?.position.lat.toFixed(4)}°N,{" "}
              {selectedShip?.position.lng.toFixed(4)}°W
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Close
              </Button>
              <Button>View Details</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FleetMap;
