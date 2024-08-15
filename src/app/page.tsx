'use client'

import { Footer7 } from "@/Components/Footer7/Footer7";
import { Header26 } from "@/Components/Header26/Header26";
import { Layout121 } from "@/Components/Layout121/Layout121";
import { Layout16 } from "@/Components/Layout16/Layout16";
import { Navbar1 } from "@/Components/Navbar1/Navbar1";
import { Pricing18 } from "@/Components/Pricing18/Pricing18";
import { Testimonial3 } from "@/Components/Testimonial3/Testimonial3";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <Navbar1 />
      <Header26 />
      <Layout16/>
      <Layout121/>
      <Pricing18/>
      <Testimonial3/>
      <Footer7/>
    </>
  );
}
