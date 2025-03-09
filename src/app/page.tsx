'use client'
import Navbar from "@/components/Navbar";
import Content from "@/components/Content";
import { useEffect, useState } from "react";

export default function Home() {
  const [darkmode, setDarkmode] = useState<boolean>(false);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <>
      <Navbar darkMode={darkmode} setDarkMode={setDarkmode} />
      <Content darkMode={darkmode} />
    </>
  );
}
