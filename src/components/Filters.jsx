import { useAuth } from "hooks/use-auth";
import { Select } from "./ui/Select";
import { CategoryList } from "./CategoryList";
import { useEffect, useState } from "react";

export const Filters = () => {
  const { isAuth } = useAuth();

  const sortOptions = [
    { title: "Сначала новые", value: "New ones first" },
    { title: "Сначала старые", value: "The old ones first" },
    { title: "Сначала дешевле", value: "Cheaper at first" },
    { title: "Сначала дороже", value: "More expensive at first" },
  ];

  if (isAuth) {
    sortOptions.push({ title: "Избранные", value: "Favorites", authed: true, });
  }
  
  const [selectedSort, setSelectedSort] = useState(null);

  const onSortChange = (newSortOption) => {
    setSelectedSort(
      sortOptions.find((sortOption) => sortOption.value === newSortOption.value)
    );
  };

  const categories = [
    { id: 0, name: "Все", selected: true },
    { id: 1, name: "ICO", selected: false },
    { id: 2, name: "Testnet", selected: false },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const onCategoryChange = (catgeoryId) => {
    setSelectedCategory(
      categories.find((category) => category.id === catgeoryId)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex">
        <Select
          options={sortOptions}
          onChange={onSortChange}
        >
          <button className="flex items-center gap-4 pl-6 xl:pl-8 pr-8 xl:pr-10 py-4 xl:py-6 rounded-lg text-xl xl:text-2xl font-bold bg-[#15171C] outline-none hover:outline-1 hover:outline-white transition-all duration-100">
            <svg className="fill-white" width="24" height="24">
              <use xlinkHref="/assets/icons/sprites.svg#sort"></use>
            </svg>
            Фильтры
          </button>
        </Select>
      </div>

      <CategoryList
        categories={categories}
        selected={selectedCategory}
        onChange={onCategoryChange}
      />
    </div>
  );
};