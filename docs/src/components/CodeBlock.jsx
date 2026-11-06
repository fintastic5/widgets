import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Code, Copy, Check } from "lucide-react";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code, language = "jsx" }) {
  const [copied, setCopied] = useState(false);

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Code block header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-3 py-1.5">
        <div className="flex items-center gap-2 text-gray-500">
          <Code size={18} />
          <span className="text-xs font-medium tracking-wide">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <Check size={18} />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>

      {/* Syntax-highlighted code */}
      <SyntaxHighlighter
        language={language}
        style={prism}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.8125rem",
          lineHeight: "1.6",
          padding: "1rem",
          background: "#FFFFFF",
          color: "#374151",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
