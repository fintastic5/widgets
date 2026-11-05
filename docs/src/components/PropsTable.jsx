import styles from "./PropsTable.module.css";

// Table displaying each prop with its type, default value and description
export default function PropsTable({ props }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border-b border-gray-200 p-3 text-left text-xs font-semibold text-gray-500">
              Prop
            </th>
            <th className="border-b border-gray-200 p-3 text-left text-xs font-semibold text-gray-500">
              Type
            </th>
            <th className="border-b border-gray-200 p-3 text-left text-xs font-semibold text-gray-500">
              Default
            </th>
            <th className="border-b border-gray-200 p-3 text-left text-xs font-semibold text-gray-500">
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.prop}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <td className="whitespace-nowrap p-3">
                <span className={styles.propBadge}>
                  {prop.prop}
                </span>
              </td>

              <td className="whitespace-nowrap p-3">
                <span className={styles.propTypeBadge}>
                  {prop.type}
                </span>
              </td>

              <td className="whitespace-nowrap p-3">
                <span className={styles.propDefaultBadge}>
                  {prop.default}
                </span>
              </td>

              <td className="p-3 text-xs leading-relaxed text-gray-600">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
