import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button"
import React from "react";

const NavBar:React.FC = () => {
    const navigate = useNavigate();

  return (
    <nav className="flex justify-between w-screen mx-0 px-8 py-4 bg-white border-b border-slate-700">
        <div className="flex flex-row gap-8 text-lg ">
            <Link to="/" className="flex items-center">
            <div>Topics</div>
            </Link>
            <Link to="/profile" className="flex items-center">
            <div>Profile</div>
            </Link>
        </div>
        <div>
            <Button onClick={()=>{
                localStorage.removeItem('token');
                navigate('/login');
            }}>Log Out</Button>
        </div>
    </nav>
  )
}

export default NavBar