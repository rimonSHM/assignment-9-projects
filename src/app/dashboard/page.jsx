import BannerSlider from "@/components/BannerSlider";
import FeaturedCourses from "@/components/FeaturedCourses";
import ServiceCards from "@/components/ServiceCards";
import TextCard from "@/components/TextCard";

export default function Dashboard() {
  return (
    <div className="p-10 text-white">
      <h1>Dashboard</h1>

       <BannerSlider></BannerSlider>
    <div className="mt-20"></div>
    
      <FeaturedCourses></FeaturedCourses>
     
      <TextCard></TextCard>
      <ServiceCards></ServiceCards>
    </div>
  );
}