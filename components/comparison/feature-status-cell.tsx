import { Badge } from "@/components/ui/badge";
import { Check, X, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { FeatureStatus } from "@/types/software";

interface FeatureStatusCellProps {
  status: FeatureStatus;
  details?: string;
}

export function FeatureStatusCell({ status, details }: FeatureStatusCellProps) {
  switch (status) {
    case "Yes":
      return (
        <div className="flex items-center gap-2 text-green-600">
          <Check className="h-4 w-4" />
          <span className="sr-only">Yes</span>
          {details && <span className="text-xs text-muted-foreground">{details}</span>}
        </div>
      );
    case "No":
      return (
        <div className="flex items-center gap-2 text-red-500">
          <X className="h-4 w-4" />
          <span className="sr-only">No</span>
          {details && <span className="text-xs text-muted-foreground">{details}</span>}
        </div>
      );
    case "Paid":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
          <DollarSign className="mr-1 h-3 w-3" />
          Paid
        </Badge>
      );
    case "Partial":
      return (
        <Badge variant="outline" className="text-orange-500 border-orange-500">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Partial
        </Badge>
      );
    case "Coming Soon":
      return (
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          <Clock className="mr-1 h-3 w-3" />
          Soon
        </Badge>
      );
    default:
      return <span className="text-muted-foreground">-</span>;
  }
}
