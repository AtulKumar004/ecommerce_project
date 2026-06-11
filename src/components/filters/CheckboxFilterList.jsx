export default function CheckboxFilterList({ title, items, selected, onToggle }) {
  return (
    <div>
      <h3 className="text-body-sm font-bold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2.5">
        {items.map((item) => {
          const isChecked = selected.includes(item.value);
          return (
            <label key={item.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(item.value)}
                className="w-4 h-4 rounded border-gray-300 accent-secondary text-secondary focus:ring-2 focus:ring-secondary-light focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-body-sm text-gray-700 group-hover:text-gray-900 capitalize transition-colors">
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
