// Form inputs that let users edit widget props and see the live demo update
export default function PropsEditor({ fields, values, onChange }) {
  // Renders the correct input type based on the field definition
  const renderInput = (field) => {
    // Textarea for JSON array props like segments and items
    if (field.type === "textarea") {
      return (
        <textarea
          value={values[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          rows={3}
          className={`
            w-full px-3 py-2 rounded-lg border border-gray-300
            text-sm font-mono text-gray-800 bg-white
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
            resize-y
          `}
        />
      );
    }

    // Number input for numeric props with optional min and max bounds
    if (field.type === "number") {
      return (
        <input
          type="number"
          min={field.min}
          max={field.max}
          value={values[field.key]}
          onChange={(event) => onChange(field.key, Number(event.target.value))}
          className={`
            w-full px-3 py-2 rounded-lg border border-gray-300
            text-sm text-gray-800 bg-white
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
          `}
        />
      );
    }

    // Text input for string props like title, subtitle and labels
    return (
      <input
        type="text"
        value={values[field.key]}
        onChange={(event) => onChange(field.key, event.target.value)}
        className={`
          w-full px-3 py-2 rounded-lg border border-gray-300
          text-sm text-gray-800 bg-white
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
        `}
      />
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Editor
      </p>

      {fields.map((field) => (
        <div key={field.key} className="space-y-1">
          <label className="text-xs text-gray-500">{field.label}</label>
          {renderInput(field)}
        </div>
      ))}
    </div>
  );
}
