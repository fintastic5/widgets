import { Terminal } from "lucide-react";
import { SiGithub } from "react-icons/si";
//import CodeBlock from "./CodeBlock";


function Hero() {
  return (
    <>
      {/* Hero section with the page title, tagline and action buttons */}
      <div className="max-w-3xl mx-auto px-4 py-12 pb-20 text-center space-y-2">
        <h1>
          Widgets
        </h1>
        <p className="subtitle">
          Reusable React dashboard widgets and a flexible panel system.
        </p>

        {/* Hero CTAs */}
        <div className="heroCtaGroup">
          <a 
            href="#get-started" 
            className="primaryCta"
            title="Get Started: Installation"
            aria-label="Get Started: Installation"
          >
            <Terminal size={13} />
            Get Started
          </a>
          <a
            href="https://github.com/fintastic5/widgets"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            aria-label="GitHub Repository"
            className="secondaryCta"
          >
            <SiGithub size={18} /> GitHub
          </a>
        </div>
      </div>

      {/* Copies the install command to the clipboard when clicked */}
      {/*
      <div 
        className="hero-code"
        onClick={() =>
          navigator.clipboard?.writeText("npm install @holmesdev/widgets")
        }
      >
        <CodeBlock
          code="npm install @holmesdev/widgets"
          language="npm"
        />
      </div>
      */}
    </>
  )
}

export default Hero
