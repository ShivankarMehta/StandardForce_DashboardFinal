import NavBar from "@/app/ui/dashboard/Other/NavBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <NavBar /> */}
      <section>{children}</section>
    </div>
  );
}
