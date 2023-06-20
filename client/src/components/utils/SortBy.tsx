import { useState, ChangeEvent } from "react";

interface SortByProps {
  onSortChange: (value: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="sort-by-container">
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="stock">Stock</option>
        <option value="production">Production</option>
      </select>
    </div>
  );
};

export default SortBy;
