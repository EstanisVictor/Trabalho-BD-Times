import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { svgs } from "../../assets";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const router = useRouter();

  const [selSection, setSelSection] = useState<string>("");

  useEffect(() => {
    setSelSection(router.asPath.replace("/", ""));
  }, [router.asPath]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <a>SPORTS</a>
        </Link>
      </div>
      <div className={styles.grid}>
        <Link href={"/jogadores"}>
          <div
            className={
              selSection === "jogadores" ? styles.sectionActive : styles.section
            }
            onClick={() => setSelSection("jogadores")}
          >
            <h3>Jogadores</h3>
          </div>
        </Link>
        <Link href={`/campeonatos`}>
          <div
            className={
              selSection === "campeonatos"
                ? styles.sectionActive
                : styles.section
            }
            onClick={() => setSelSection("campeonatos")}
          >
            <h3>Campeonatos</h3>
          </div>
        </Link>
        <Link href={`/orgs`}>
          <div
            className={
              selSection === "orgs" ? styles.sectionActive : styles.section
            }
            onClick={() => setSelSection("orgs")}
          >
            <h3>Organizações</h3>
          </div>
        </Link>{" "}
        <Link href={`/times`}>
          <div
            className={
              selSection === "times" ? styles.sectionActive : styles.section
            }
            onClick={() => setSelSection("times")}
          >
            <h3>Times</h3>
          </div>
        </Link>
        <Link href={`/curiosidades`}>
          <div
            className={
              selSection === "curiosidades"
                ? styles.sectionActive
                : styles.section
            }
            onClick={() => setSelSection("curiosidades")}
          >
            <h3>Curiosidades</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};
