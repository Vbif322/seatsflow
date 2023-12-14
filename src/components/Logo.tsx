import React from "react";
import logo from "./../img/logoPO.svg";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="PO restoranam" width={120} />
    </Link>
  );
};
