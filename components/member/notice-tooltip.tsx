import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";

interface Props {
  notice: string;
}

const NoticeTooltip: React.FC<Props> = ({ notice }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CircleAlert className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent className="bg-transparent w-80">
          <Card>
            <CardHeader>
              <CardTitle>Notice:</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{notice}</p>
            </CardContent>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NoticeTooltip;
