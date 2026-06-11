import CheckboxFilterList from './CheckboxFilterList';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  const items = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  const selected = selectedCategory ? [selectedCategory] : [];

  const handleToggle = (slug) => {
    onCategoryChange(selectedCategory === slug ? '' : slug);
  };

  return (
    <CheckboxFilterList
      title="Categories"
      items={items}
      selected={selected}
      onToggle={handleToggle}
    />
  );
}
