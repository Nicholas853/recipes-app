import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

interface CategoryFilterProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ category, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    'All Categories',
    'Beef',
    'Chicken',
    'Dessert',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
    'Vegan',
    'Vegetarian',
    'Breakfast',
    'Goat',
  ];

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        labelId="category-label"
        id="category"
        input={<OutlinedInput label="Category" />}>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat === 'All Categories' ? '' : cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
