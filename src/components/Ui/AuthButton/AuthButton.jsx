import { Box, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/getUser";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authKey } from "@/constance/authKey";

const AuthButton = () => {
  const router = useRouter();
  const user = getUser();
  console.log(user);
  const handleLogOut = () => {
    Cookies.remove(authKey);
    Cookies.remove("refreshToken");

    router.refresh();
    toast.success("Logout successfully");
  };
  return (
    <>
      {user?.userId ? (
        <Box>
          <Link href={`/dashboard/${user?.role}`}>
            <Button sx={{ marginRight: "5px" }}>Dashboard</Button>
          </Link>
          <Button onClick={handleLogOut} color="error">
            Logout
          </Button>
        </Box>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
