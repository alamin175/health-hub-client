import HeroSection from "@/components/Ui/Homepage/HeroSection/HeroSection";
import Specialist from "@/components/Ui/Homepage/Specialist/Specialist";
import { Button } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      {/* <h1 className="text-5xl">This is homepage</h1>
            <Button >Contained</Button> */}
      <HeroSection />
      <Specialist />
    </div>
  );
};
export default HomePage;
