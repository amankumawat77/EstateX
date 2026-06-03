import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link legacyBehavior href="/">
      <Image src={'/logo.png'} alt={'Clox'} width={120} height={60} />
    </Link>
  );
};

export default LogoIcon;
