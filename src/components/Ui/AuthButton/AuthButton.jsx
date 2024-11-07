import { Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/getUser";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authKey } from "@/constance/authKey";

const AuthButton = () => {
  const router = useRouter();
  const user = getUser();
  const handleLogOut = () => {
    Cookies.remove(authKey);
    router.refresh();
    toast.success("Logout successfully");
  };
  return (
    <>
      {user?.userId ? (
        <Button onClick={handleLogOut} color="error">
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
