import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileWarning, Wrench, Users, Bell } from "lucide-react";

interface StatusCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant: "default" | "warning" | "destructive";
  description: string;
}

interface StatusCardsGridProps {
  cards?: StatusCard[];
}

const StatusCardsGrid = ({
  cards = [
    {
      title: "Document Alerts",
      count: 5,
      icon: <FileWarning className="h-6 w-6" />,
      variant: "destructive",
      description: "Expiring certificates and licenses",
    },
    {
      title: "Maintenance Alerts",
      count: 3,
      icon: <Wrench className="h-6 w-6" />,
      variant: "warning",
      description: "Scheduled maintenance due",
    },
    {
      title: "Crew Schedule Alerts",
      count: 8,
      icon: <Users className="h-6 w-6" />,
      variant: "default",
      description: "Upcoming crew changes",
    },
    {
      title: "General Notifications",
      count: 12,
      icon: <Bell className="h-6 w-6" />,
      variant: "default",
      description: "System notifications and updates",
    },
  ],
}: StatusCardsGridProps) => {
  const getVariantStyles = (variant: StatusCard["variant"]) => {
    switch (variant) {
      case "destructive":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="w-full h-[160px] bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden hover:shadow-md transition-shadow ${getVariantStyles(card.variant)}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">{card.title}</h3>
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <span className="text-2xl font-bold">{card.count}</span>
                  </div>
                  <p className="text-sm opacity-80">{card.description}</p>
                </div>
                <Badge
                  variant={
                    card.variant === "warning" ? "secondary" : card.variant
                  }
                >
                  {card.count > 0 ? "Active" : "Clear"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatusCardsGrid;
