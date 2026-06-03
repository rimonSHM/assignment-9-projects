

import BannerSlider from "@/components/BannerSlider";
import FeatureCards from "@/components/TextCard";

import ServiceCards from "@/components/ServiceCards";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";
import Image from "next/image";
import TextCard from "@/components/TextCard";
import FeaturedCourses from "@/components/FeaturedCourses";


export default function Home() {
  return (
    <div>
     <BannerSlider></BannerSlider> <div className="mt-20"></div>
    
     <FeaturedCourses></FeaturedCourses>
     
      <TextCard></TextCard>
      <ServiceCards></ServiceCards>
      {/* <my-tutors></my-tutors> */}
       {/* <TextCard></TextCard> */}

    
    </div>
  );
}
