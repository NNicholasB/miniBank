import Sidebar from "@/componentes/sidebar";
import "../(private)/layout.css"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
 <Sidebar />
 <div className="conteudo">
 {children}
 </div>
 
    </div>
   
   
       
  );
}
