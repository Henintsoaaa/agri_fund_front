import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function HomePage() {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="p-4 flex justify-between items-center bg-forest">
      <p className="text-olive">Home Page</p>
      <Button
        onClick={handleLogout}
        className="text-cream border-white hover:bg-olive bg-olive/70"
      >
        Logout
      </Button>
    </div>
  );
}
