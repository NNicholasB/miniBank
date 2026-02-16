import Image from "next/image";
import styles from "./page.module.css"
import {Lato } from "next/font/google";
import Link from "next/link";

const LatoS=Lato({
  variable:"--font-lato-sans",
  subsets:["latin"],
  weight:"700"
})
export default function Home() {
  return (
   <div className={styles.container}>
     
      <Image src="/logo.png" alt="logo" width={200} height={200}></Image>
       <div className={`${LatoS.className} ${styles.title}`}>
  <h1>Grazi</h1>
</div>
      
      <Link href={"/login"} className={`${LatoS.className}  ${styles.btn}`}>Entrar</Link>
   </div>
  );
}
