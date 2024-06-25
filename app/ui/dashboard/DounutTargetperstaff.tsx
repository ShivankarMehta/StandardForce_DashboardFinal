import { Card, DonutChart, Title } from "@tremor/react";
 
      const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
      
      export default function DonutCharttarget(props:any){
        return(
        <Card className="max-w-lg">
          <Title>Target Per Staff</Title>
          <DonutChart
            className="mt-6"
            data={props.data}
            category="Totaltarget"
            index="StaffID"
            // colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>)
      };