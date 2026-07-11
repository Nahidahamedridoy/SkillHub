import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import Hero from "@/modules/home/Hero";
import FeaturedCourses from "@/modules/home/FeaturedCourses";
import Categories from "@/modules/home/Categories";
import WhyChooseUs from "@/modules/home/WhyChooseUs";
import TopInstructors from "@/modules/home/TopInstructors";
import Statistics from "@/modules/home/Statistics";
import Testimonials from "@/modules/home/Testimonials";
import FAQ from "@/modules/home/FAQ";
import Newsletter from "@/modules/home/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <Categories />
      <WhyChooseUs />
      <TopInstructors />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}