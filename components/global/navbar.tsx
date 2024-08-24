"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const currentPath = usePathname();
  const logoSrc = "/logo.png";

  const links = [
    { label: "Congress", href: "/" },
    { label: "Committees", href: "/committees" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-muted/40">
      <Link href="/">
        <Image src={logoSrc} alt="Logo" width={60} height={60} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
