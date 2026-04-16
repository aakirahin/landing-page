import logo from "../../assets/full_logo.svg"
import ButtonSet from "../Buttons/ButtonSet"

const footer = {
  "links": {
    "Product": ["Features", "Pricing", "Integrations", "Changelog"],
    "Company": ["About Us", "Careers", "Blog", "Contact"],
    "Legal": ["Privacy Policy", "Terms of Service"]
  },
  "Social": ["twitter", "linkedin", "github"]
}

const Footer = () => {
  return (
    <div className='flex bg-gray-100 w-3/4 rounded-t-[30px] p-[64px] justify-between'>
      <div className="flex flex-col gap-6 w-1/3">
        <img
          src={logo}
          alt="Synchrono"
          width="50%"
        />
        <p>
          This is a frontend portfolio project to practice using Framer Motion. Please keep in mind that none of the links in this page will work.
        </p>
        <ButtonSet/>
      </div>
      <div className="flex flex-row w-1/3 justify-between">
        {
          Object.keys(footer.links).map((key) => (
            <div className="flex flex-col gap-4">
              <span className="font-semibold">{key}</span>
              {footer.links[key].map((link: string) => (<span className="footer-link">{link}</span>))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Footer