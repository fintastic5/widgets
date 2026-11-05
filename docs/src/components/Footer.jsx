import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import { SiNpm, SiGithub } from "react-icons/si";

function FooterComponent() {
  return (
    <Footer container className=" flex items-center justify-between border-t border-gray-100 mt-auto">
      <FooterCopyright href="https://github.com/fintastic5/widgets" by="Fintastic 5" year={2026} />
      <FooterLinkGroup>
        <FooterLink 
          href="https://www.npmjs.com/package/@holmesdev/widgets"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-900"
        >
          <SiNpm size={28} />
        </FooterLink>
        <FooterLink 
          href="https://github.com/fintastic5/widgets"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-900"
        >
          <SiGithub size={28} />
        </FooterLink>
      </FooterLinkGroup>
    </Footer>
  )
}

export default FooterComponent
