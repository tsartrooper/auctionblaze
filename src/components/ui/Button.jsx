
import "../../styles/components.css";

export default function Button({children, onClick=()=>{}, onSubmit=()=>{}, disabled=false, type="submit", ...props}){
    return <div>
        <button type={type} onClick={onClick} onSubmit={onSubmit} disabled={disabled} className="btn-primary w-full py-3 px-4 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2" onClick={()=>onClick()} {...props}>
            {children}
        </button>
    </div>
}