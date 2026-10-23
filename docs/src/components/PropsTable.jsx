// Table displaying each prop with its type, default value and description
export default function PropsTable({ props }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              Prop
            </th>
            <th className="p-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              Type
            </th>
            <th className="p-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              Default
            </th>
            <th className="p-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.prop} className="border-b border-gray-100 last:border-0">
              <td className="p-3 text-xs font-mono text-gray-800">{prop.prop}</td>
              <td className="p-3 text-xs text-gray-600">{prop.type}</td>
              <td className="p-3 text-xs text-gray-600">{prop.default}</td>
              <td className="p-3 text-xs text-gray-600">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
