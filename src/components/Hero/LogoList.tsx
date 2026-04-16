import IPSUM from "../../assets/mock_logos/IPSUM.svg"
import l_ogo from "../../assets/mock_logos/l_ogo.svg"
import LOGO from "../../assets/mock_logos/LOGO.svg"
import logoipsum from "../../assets/mock_logos/logoipsum.svg"
import LogoIpsum from "../../assets/mock_logos/LogoIpsum.svg"
import LogoLoop from "../LogoLoop"

const logoList = [
    {
        src: LOGO,
        alt: "LOGO",
        href: "/"
    },
    {
        src: logoipsum,
        alt: "logoipsum",
        href: "/"
    },
    {
        src: IPSUM,
        alt: "IPSUM",
        href: "/"
    },
    {
        src: l_ogo,
        alt: "l_ogo",
        href: "/"
    },
    {
        src: LogoIpsum,
        alt: "LogoIpsum",
        href: "/"
    },
]

const LogoList = () => {
    return (
        <div className="flex w-3/4 relative overflow-hidden">
            <LogoLoop
                logos={logoList}
                speed={50}
                direction="left"
                logoHeight={36}
                gap={100}
                hoverSpeed={10}
                useCustomRender={false}
                className="opacity-[50%] cursor-pointer"
                fadeOut
                fadeOutColor="#fafafa"
            />
        </div>
    )
}

export default LogoList