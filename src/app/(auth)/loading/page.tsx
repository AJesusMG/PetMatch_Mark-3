"use client";

import Loading from "@/Components/Loading/Loading";
import { getUserStatus } from "@/libs/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

  const { user } = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user && user.emailAddresses[0].emailAddress) {
      const targetPage = isMobile ? "/user/MobilePrincipalPage" : "/user/PrincipalPage";
      router.push(targetPage);
    }
  }, [user, isMobile, router]);

  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     if (user && user.emailAddresses[0].emailAddress) {
  //       try {
  //         const email = user.emailAddresses[0].emailAddress;
  //         const userStatus = await getUserStatus(email);
  //         if (userStatus && userStatus.onboarded) {
  //           router.push('/user/PrincipalPage');
  //         } else {
  //           router.push('/Onboarding');
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user status:", error);
  //       }
  //     }
  //   };

  //   checkUserStatus();
  // }, [user, router, isMobile]);

  return (
    <>
      <Loading />
    </>
  )
}