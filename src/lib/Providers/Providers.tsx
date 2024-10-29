"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Render nothing on the server

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
