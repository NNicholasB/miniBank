import Link from "next/link";
import Styles from "./sidebar.module.css"

export default function Sidebar(){
    return(
        <div className={Styles.container}>
            <nav className={Styles.nav}>
                <Link className={Styles.item} href={"/inicio"}>Inicio</Link>
                <Link className={Styles.item}  href={"/dashboard"}>Dashboard</Link>
                <Link className={Styles.item}  href={"/emprestimo"}>Empréstimo</Link>
                <Link className={Styles.item}  href={"/pagamentos"}>Pagamentos</Link>
            </nav>
        </div>
    )
}