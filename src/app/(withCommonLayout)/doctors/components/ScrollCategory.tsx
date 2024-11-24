"use client";

import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useGetSpecialtiesQuery } from "@/redux/api/specialtyApi";

interface Specialty {
  id: string;
  title: string;
}

const ScrollCategory = ({ specialties }: { specialties: string }) => {
  const { data: specialtiesResponse, isLoading } =
    useGetSpecialtiesQuery(undefined);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  // Update the selected tab based on `specialties` prop
  useEffect(() => {
    if (specialties) {
      setValue(specialties);
    }
  }, [specialties]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialties=${newValue}`, { scroll: false }); // Navigate without scrolling
  };

  if (isLoading) {
    return null;
  }

  const specialtiesData = specialtiesResponse?.data || [];
  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {specialtiesData.map((specialty: Specialty) => (
          <Tab
            key={specialty.id}
            label={specialty.title}
            value={specialty.title}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ScrollCategory;
