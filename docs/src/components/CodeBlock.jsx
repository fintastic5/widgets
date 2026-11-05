import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Code block with syntax highlighting and a copy button that appears on hover
export default function CodeBlock({ code, language = "jsx" }) {
  const [copied, setCopied] = useState(false);

  // Copies the code to the clipboard and shows a brief confirmation
  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      {/* Copy button, hidden until the user hovers over the code block */}
      <button
        onClick={handleCopy}
        className={`
          absolute top-2 right-2 z-10
          px-2.5 py-1 rounded-md text-xs font-medium
          bg-white/10 text-gray-300
          hover:bg-white/20 hover:text-white transition-colors
          opacity-0 group-hover:opacity-100 cursor-pointer
        `}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Syntax-highlighted code display using the oneDark colour theme */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.75rem",
          fontSize: "0.8125rem",
          lineHeight: "1.6",
          padding: "1rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
