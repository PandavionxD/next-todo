import { WidgetItem } from "@/components";
import { Metadata } from "next";

export const metadata:Metadata =  {
  title : 'DashboardPage',
  description:'Pagina principal - DashboardPage'
}

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem />
    </div>
  );
}
