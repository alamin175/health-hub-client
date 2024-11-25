// DrawerItem.tsx
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser } from "@/utils/getUser";

interface DrawerItemProps {
  open: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ open }) => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUser() as any;
    setUserRole(role);
  }, []);
  console.log("check", getUser());
  const linkPath = (path: string) => {
    // Ensure path is absolute by checking if it already starts with `/dashboard`
    return path.startsWith("/dashboard") ? path : `/dashboard/${path}`;
  };

  const pathName = usePathname();

  return (
    <>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link href={linkPath(item.path)}>
              <Tooltip
                title={item.title}
                placement="right"
                disableHoverListener={open}
              >
                <ListItemButton
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                    linkPath(item.path) == pathName
                      ? {
                          backgroundColor: "#d1d7dd",
                          borderRight: "4px solid #ff441c",
                          "& svg": {
                            color: "primary.main",
                          },
                        }
                      : { backgroundColor: "inherit" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                        // color: "primary.main",
                      },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    {item.icon && <item.icon />}
                  </ListItemIcon>
                  <ListItemText
                    className="font-bold"
                    primary={item.title}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Divider />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default DrawerItem;
