import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-up");

  return (
    <div>
      <Header/>
    <Dashboard/>
    </div>
    
  );
}
