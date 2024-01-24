import React from "react";
import logo from "./../img/Group 4.svg";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Seatsflow" width={200} />
    </Link>
  );
};
