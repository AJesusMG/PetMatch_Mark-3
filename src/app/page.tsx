'use client'

import { Footer4 } from "@/Components/Footer4/Footer4";
import { Header26 } from "@/Components/Header26/Header26";
import { Layout121 } from "@/Components/Layout121/Layout121";
import { Layout16 } from "@/Components/Layout16/Layout16";
import { Navbar1 } from "@/Components/Navbar1/Navbar1";
import { Pricing17 } from "@/Components/Pricing17/Pricing17";
import { Testimonial3 } from "@/Components/Testimonial3/Testimonial3";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <Navbar1 />
      <Header26 />
      <Layout16/>
      <Layout121/>
      <Pricing17/>
      <Testimonial3/>
      <Footer4/>
    </>
  );
}
