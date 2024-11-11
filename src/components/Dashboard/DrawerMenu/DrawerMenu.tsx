// DrawerItem.tsx
import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

interface DrawerItemProps {
  open: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ open }) => {
  const menuItems = [
    { text: "Inbox", icon: <InboxIcon /> },
    { text: "Starred", icon: <MailIcon /> },
    { text: "Send email", icon: <InboxIcon /> },
    { text: "Drafts", icon: <MailIcon /> },
    { text: "All mail", icon: <InboxIcon /> },
    { text: "Trash", icon: <MailIcon /> },
    { text: "Spam", icon: <InboxIcon /> },
  ];

  return (
    <>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <Tooltip
              title={item.text}
              placement="right"
              disableHoverListener={open}
            >
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </>
  );
};

export default DrawerItem;
