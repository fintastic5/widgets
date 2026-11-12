
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import { SiNpm, SiGithub } from "react-icons/si";

function FooterComponent() {
  return (
    <Footer container className="flex items-center justify-between mt-auto">
      <FooterCopyright
        href="https://github.com/fintastic5/widgets"
        by="Fintastic 5"
        year={2026}
      />

      <FooterLinkGroup>
        <FooterLink
          href="https://www.npmjs.com/package/@holmesdev/widgets"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Widgets on npm"
          className="hover:text-gray-900"
        >
          <SiNpm size={28} aria-hidden="true" />
        </FooterLink>

        <FooterLink
          href="https://github.com/fintastic5/widgets"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Widgets on GitHub"
          className="hover:text-gray-900"
        >
          <SiGithub size={28} aria-hidden="true" />
        </FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}

export default FooterComponent;
