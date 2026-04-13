import IPSUM from "../../assets/mock_logos/IPSUM.svg"
import l_ogo from "../../assets/mock_logos/l_ogo.svg"
import LOGO from "../../assets/mock_logos/LOGO.svg"
import logoipsum from "../../assets/mock_logos/logoipsum.svg"
import LogoIpsum from "../../assets/mock_logos/LogoIpsum.svg"

const logoList = [
    {
        name: "LOGO",
        src: LOGO
    },
    {
        name: "logoipsum",
        src: logoipsum
    },
    {
        name: "IPSUM",
        src: IPSUM
    },
    {
        name: "l_ogo",
        src: l_ogo
    },
    {
        name: "LogoIpsum",
        src: LogoIpsum
    },
]

const LogoList = () => {
  return (
    <div className="flex w-3/4 justify-between">
        {
            logoList.map((logo) => (
                <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="opacity-[50%] hover:opacity-[75%] cursor-pointer transition-all duration-300"
                />
            ))
        }
    </div>
  )
}

export default LogoList