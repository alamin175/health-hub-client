import { USER_ROLE } from "@/constance/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type Imeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}

export type ResponseData = {
  data?: any;
  meta?: Imeta;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: ErrorMessage[];
};

export type ErrorMessage = {
  path: string | number;
  message: string;
};
