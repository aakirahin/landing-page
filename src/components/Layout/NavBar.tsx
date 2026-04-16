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
        <div className="flex flex-row justify-between items-center w-[75%] p-[16px] z-50">
            <img
                src={logo}
                alt="Synchrono"
                width={32}
                height={32}
            />
            <div className="flex flex-row gap-[48px] items-center">
                {navItems.map((item) => (<p key={`navItem_${item}`} className="nav-link">{item}</p>))}
            </div>
            <GetStartedButton/>
        </div>
    )
}

export default NavBar