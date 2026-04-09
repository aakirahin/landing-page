import logo from "../../assets/logo.svg"
import GetStartedButton from "../Buttons/GetStartedButton"

const navItems = [
    "Home",
    "About",
    "Features",
    "Pricing",
    "Resources"
]

const NavBar = () => {
    return (
        <div className="flex flex-row justify-between items-center w-[75%] py-[16px]">
            <img
                src={logo}
                alt="Logo"
                width={24}
                height={24}
            />
            <div className="flex flex-row gap-[48px] items-center">
                {navItems.map((item) => (<p key={`navItem_${item}`} className="font-medium hover:text-gray-400 cursor-pointer transition-color duration-200">{item}</p>))}
            </div>
            <GetStartedButton/>
        </div>
    )
}

export default NavBar