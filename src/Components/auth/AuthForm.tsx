"use client";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react"

export default function AuthForm() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          src="@/public"
          alt="NextUI Logo"
          width={30}
          height={30}
        />
        <h4>NextUI</h4>
      </CardHeader>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
