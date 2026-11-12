import { useEffect, useRef, useState } from "react";

function ColorInput({ id, value, onChange, fallback }) {
  const pickerValue = /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        aria-label="Choose color"
        value={pickerValue}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-10 cursor-pointer rounded border border-gray-300 bg-white p-1"
      />
      <input
        id={id}
        type="text"
        value={value || ""}
        placeholder="Theme default"
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}

// Form inputs that let users edit widget props and see the live demo update
export default function PropsEditor({ fields, values, onChange, theme }) {
  const themeRef = useRef(null);
  const [themeColors, setThemeColors] = useState({ primary: "#000000", chart: [] });

  useEffect(() => {
    const styles = getComputedStyle(themeRef.current);
    setThemeColors({
      primary: styles.getPropertyValue("--color-primary").trim(),
      chart: [1, 2, 3, 4].map((index) => styles.getPropertyValue(`--color-chart-${index}`).trim()),
    });
  }, [theme]);
  // Renders the correct input type based on the field definition
  const renderInput = (field) => {
    const inputClass = `
      w-full rounded-lg border border-gray-300 bg-white
      px-3 py-2 text-sm text-gray-800
      focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
    `;

    // Textarea for JSON array props like segments and items
    if (field.type === "textarea") {
      let entries = [];
      if (field.colorCount) {
        try {
          const parsed = JSON.parse(values[field.key]);
          if (Array.isArray(parsed)) entries = parsed;
        } catch {
          // Keep the JSON editable while it is incomplete.
        }
      }
      return (
        <>
        <textarea
          id={field.key}
          value={values[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          rows={4}
          className={`${inputClass} resize-y font-mono`}
        />
        {entries.map((entry, index) => entry && typeof entry === "object" && (
          <div key={index} className="space-y-1 mt-2">
            <label htmlFor={`prop-${field.key}-color-${index}`} className="text-xs text-gray-500">
              {entry.label || `Item ${index + 1}`} color
            </label>
            <ColorInput
              id={`prop-${field.key}-color-${index}`}
              value={entry.color}
              fallback={themeColors.chart[index % field.colorCount] || "#000000"}
              onChange={(color) => {
                const next = entries.map((item, i) => i === index ? { ...item, color } : item);
                onChange(field.key, JSON.stringify(next));
              }}
            />
          </div>
        ))}
        </>
      );
    }

    if (field.type === "color") {
      return <ColorInput id={field.key} value={values[field.key]} fallback={themeColors.primary || "#000000"} onChange={(value) => onChange(field.key, value)} />;
    }

    // Number input for numeric props with optional min and max bounds
    if (field.type === "number") {
      return (
        <input
          id={field.key}
          type="number"
          min={field.min}
          max={field.max}
          value={values[field.key]}
          onChange={(event) =>
            onChange(field.key, Number(event.target.value))
          }
          className={inputClass}
        />
      );
    }

    // Text input for string props like title, subtitle and labels
    return (
      <input
        id={field.key}
        type="text"
        value={values[field.key]}
        onChange={(event) => onChange(field.key, event.target.value)}
        className={inputClass}
      />
    );
  };

  return (
    <div ref={themeRef} data-theme={theme} className="space-y-2">
      {fields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <label
            htmlFor={field.key}
            className="text-xs font-medium text-gray-600"
          >
            {field.label}
          </label>

          {renderInput(field)}
        </div>
      ))}
    </div>
  );
}
