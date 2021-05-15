import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/lib/auth";


const Dashboard = () => {
  const auth = useAuth();
  if (!auth.user) return "Loading..";
  return <EmptyState />;
};

export default Dashboard;
