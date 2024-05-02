import { faBars, faBell, faCog, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export const MenuBar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const currentPath = `${pathSegments[0][0].toUpperCase()}${pathSegments[0].slice(1).toLowerCase()}`;
    return (
        <div className="navbar flex flex-row justify-between">
            <div className="flex flex-row w-1/6">
                <button className="btn btn-square btn-ghost">
                    <FontAwesomeIcon icon={faBars} className="text-2xl" />
                </button>
                <div className="flex flex-row text-2xl">
                    <p>Home / <span className="text-black">{currentPath}</span></p>
                </div>
            </div>
            <div className="flex flex-row justify-between w-2/6">
                <input type="text" placeholder="Search" className="input input-sm input-bordered w-3/5 bg-gray-100 rounded-2xl" />
                <div className="flex flex-row justify-between w-1/4 mx-10">
                    <FontAwesomeIcon icon={faBell} className="text-2xl cursor-pointer hover:text-slate-600" />
                    <FontAwesomeIcon icon={faCog} className="text-2xl cursor-pointer hover:text-slate-600" />
                    <FontAwesomeIcon icon={faMoon} className="text-2xl cursor-pointer hover:text-slate-600" />
                </div>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
