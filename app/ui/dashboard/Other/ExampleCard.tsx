'use Client'
import React, {useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import NumberFlow from '@number-flow/react'
type ExampleCardProps = {
  totalSales: number;
  totalQuantity: number;
  totalProfit: number;
};
import { ProgressBar } from "@tremor/react";
const ExampleCard: React.FC<ExampleCardProps> = ({
  totalSales,
  totalQuantity,
  totalProfit,
}) => {


const [inputValue, setInputValue] = useState({
  sales:"",
  profit:"",
  quantity:"",
});
const [savedValue, setSavedValue] = useState({
  sales:"",
  profit:"",
  quantity:"",
});
const [isEditing, setIsEditing]= useState({
  sales:true,
  profit:true,
  quantity:true,
});

const handleSave = (field) =>{
  setSavedValue((prev)=>({
    ...prev,
    [field]: inputValue[field],
  }));
  setIsEditing((prev) => ({
    ...prev,
    [field]: false,
  }));
}

const handleEdit = (field)=>{
  setIsEditing((prev) => ({
    ...prev,
    [field]: true,
  }));
}

  return (
    <div className="flex flex-wrap gap-6 items-stretch justify-center p-6 border-2 border-slate-900 rounded-md">
      {/* Total Sales Card */}
      <Card className="min-w-[250px] md:min-w-[400px] max-w-[450px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Sales
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-blue-600">
          {`￥`}<NumberFlow value={totalSales} />
          </CardDescription>
        </CardHeader>
        <CardContent>
                <div className="flex gap-1">
                <CardDescription>
                {`Progress: 70%`}
                </CardDescription>
                <CardDescription>
                            <div>
              {isEditing.sales ? (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Input Box */}
                  <div className="flex flex-col space-y-2 mb-8">
                  <p className="text-gray-800 text-xs">Enter Target Value:</p>
                  <Input
                    type="text"
                    value={inputValue.sales}
                    onChange={(e) => setInputValue((prev)=>({
                      ...prev,
                      sales:e.target.value,
                    }))}
                    placeholder="Enter a value..."
                    className="border rounded-md p-2 w-[100%]"
                  />
                  </div>
                  {/* Save Button */}
                  <button
                    onClick={() => handleSave("sales")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Display Saved Value */}
                  <p className="text-gray-800">Target Value: <strong>{savedValue.sales}</strong></p>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit("sales")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </CardDescription>
          </div>
          <ProgressBar value={70} className="mt-2" />
        </CardContent>
      </Card>

      {/* Total Profit Card */}
      <Card className="min-w-[250px] md:min-w-[400px] max-w-[450px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Profit
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-green-600">{`￥`}<NumberFlow value={totalProfit}/></CardDescription>
        </CardHeader>
        <CardContent>
                <div className="flex space-x-2">
                <CardDescription>
                {`Progress: 40%`}
                </CardDescription>
                <CardDescription>
                            <div>
              {isEditing.profit ? (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Input Box */}
                  <div className="flex flex-col space-y-2 mb-8">
                  <p className="text-gray-800">Enter Target Value:</p>
                  <Input
                    type="text"
                    value={inputValue.profit}
                    onChange={(e) => setInputValue((prev)=>({
                      ...prev,
                      profit:e.target.value,
                    }))}
                    placeholder="Enter a value..."
                    className="border rounded-md p-2 w-[100%]"
                  />
                  </div>
                  {/* Save Button */}
                  <button
                    onClick={() => handleSave("profit")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Display Saved Value */}
                  <p className="text-gray-800">Target Value: <strong>{savedValue.profit}</strong></p>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit("profit")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </CardDescription>
          </div>
          <ProgressBar value={40} className="mt-2" />
        </CardContent>
      </Card>

      {/* Total Quantity Card */}
      <Card className="min-w-[250px] md:min-w-[400px] max-w-[450px] border border-gray-200 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            Total Quantity
          </CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold text-cyan-600"><NumberFlow value={totalQuantity}/></CardDescription>
        </CardHeader>
        <CardContent>
                <div className="flex space-x-12">
                <CardDescription>
                {`Progress: 55%`}
                </CardDescription>
                <CardDescription>
                            <div>
              {isEditing.quantity ? (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Input Box */}
                  <div className="flex flex-col space-y-2 mb-8">
                  <p className="text-gray-800">Enter Target Value:</p>
                  <Input
                    type="text"
                    value={inputValue.sales}
                    onChange={(e) => setInputValue((prev)=>({
                      ...prev,
                      quantity:e.target.value,
                    }))}
                    placeholder="Enter a value..."
                    className="border rounded-md p-2 w-[100%]"
                  />
                  </div>
                  {/* Save Button */}
                  <button
                    onClick={() => handleSave("quantity")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* Display Saved Value */}
                  <p className="text-gray-800">Target Value: <strong>{savedValue.quantity}</strong></p>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit("quantity")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </CardDescription>
          </div>
          <ProgressBar value={55} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleCard;
