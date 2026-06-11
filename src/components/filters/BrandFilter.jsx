import CheckboxFilterList from './CheckboxFilterList';

export default function BrandFilter({ brands, selectedBrands, onBrandToggle }) {
  const items = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  return (
    <CheckboxFilterList
      title="Brands"
      items={items}
      selected={selectedBrands}
      onToggle={onBrandToggle}
    />
  );
}
