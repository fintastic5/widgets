// Form inputs that let users edit widget props and see the live demo update
export default function PropsEditor({ fields, values, onChange }) {
  // Renders the correct input type based on the field definition
  const renderInput = (field) => {
    const inputClass = `
      w-full rounded-lg border border-gray-300 bg-white
      px-3 py-2 text-sm text-gray-800
      focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
    `;

    // Textarea for JSON array props like segments and items
    if (field.type === "textarea") {
      return (
        <textarea
          id={field.key}
          value={values[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          rows={4}
          className={`${inputClass} resize-y font-mono`}
        />
      );
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
    <div className="space-y-2">
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
