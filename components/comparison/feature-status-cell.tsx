import { Badge } from "@/components/ui/badge";
import { Check, X, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { FeatureStatus } from "@/lib/base-schemas";

interface FeatureStatusCellProps {
  status: FeatureStatus;
  details?: string;
}

export function FeatureStatusCell({ status, details }: FeatureStatusCellProps) {
  const statusValue = typeof status === "object" ? status.status : status;
  const statusNote = typeof status === "object" ? status.note : undefined;

  const displayDetails = statusNote || details;

  switch (statusValue) {
    case "Yes":
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-4 w-4" />
            <span className="sr-only">Yes</span>
          </div>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
    case "No":
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex items-center gap-2 text-red-500">
            <X className="h-4 w-4" />
            <span className="sr-only">No</span>
          </div>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
    case "Paid":
      return (
        <div className="flex flex-row gap-2 items-center">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
            <DollarSign className="mr-1 h-3 w-3" />
            Paid
          </Badge>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
    case "Partial":
      return (
        <div className="flex flex-row gap-2 items-center">
          <Badge variant="outline" className="text-orange-500 border-orange-500">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Partial
          </Badge>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
    case "Coming Soon":
      return (
        <div className="flex flex-row gap-2 items-center">
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Clock className="mr-1 h-3 w-3" />
            Soon
          </Badge>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
    default:
      return (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-muted-foreground">-</span>
          {displayDetails && <span className="text-xs text-muted-foreground font-medium">{displayDetails}</span>}
        </div>
      );
  }
}
