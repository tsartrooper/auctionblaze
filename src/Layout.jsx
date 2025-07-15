import Sidebar from "./components/layout/Sidebar";
import './styles/globals.css'



export default function Layout({children}) {

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );

  
}