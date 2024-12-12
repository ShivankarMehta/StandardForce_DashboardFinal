import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ExampleCardProps = {
  totalSales: number;
  totalQuantity: number;
  totalProfit: number;
};

const ExampleCard: React.FC<ExampleCardProps> = ({
  totalSales,
  totalQuantity,
  totalProfit,
}) => {
  return (
    <div className="flex flex-wrap gap-6 items-stretch justify-center p-6">
      {/* Total Sales Card */}
      <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Sales
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-blue-600">{`¥${totalSales.toLocaleString()}`}</CardDescription>
        </CardHeader>
      </Card>

      {/* Total Profit Card */}
      <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Profit
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-green-600">{`¥${totalProfit.toLocaleString()}`}</CardDescription>
        </CardHeader>
      </Card>

      {/* Total Quantity Card */}
      <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Quantity
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-cyan-600">{`${totalQuantity.toLocaleString()}`}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ExampleCard;
