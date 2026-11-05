import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Blocks, Menu } from "lucide-react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
    // Detect navbar scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Observe page sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    const sections = ["overview", "live-demo","components", "get-started"];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Active link styling
  const linkClass = (section) =>
    `navLink ${activeSection === section ? "active" : ""}`;

  return (
      <Navbar 
        fluid 
        rounded 
        className={`navbar ${scrolled ? "scrolled" : ""}`}
      >
      <NavbarBrand href="#overview" className="flex gap-0.5">
        <Blocks size={28} strokeWidth={2.5} className="text-blue-700"/>
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Widgets</span>
      </NavbarBrand>
      <NavbarToggle barIcon={Menu} />
      <NavbarCollapse>
        <NavbarLink href="#overview" className={linkClass("overview")}>Overview</NavbarLink>
        <NavbarLink href="#live-demo" className={linkClass("live-demo")}>Live Demo</NavbarLink>
        <NavbarLink href="#components" className={linkClass("components")}>Components</NavbarLink>
        <NavbarLink href="#get-started" className={linkClass("get-started")}>Get Started</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
