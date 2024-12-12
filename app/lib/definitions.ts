export interface SalesTotalOverTime {
  date: string | Date; 
  TotalSales: number;
}

export interface SalesQuantityOverTime {
  date: string | Date;
  TotalQuantity:number;
}

export interface DeliveryQuantityOverTime{
  date: string | Date;
  TotalDeliveryQuantity:number;
}


export interface TargetOverTime {
  date: string | Date; 
  Target: number;
}