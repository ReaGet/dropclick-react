import { Select } from "./ui/Select";
import { CategoryList } from "./CategoryList";

export const Filters = ({filter, setFilter, sortOptions, categories}) => {
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex">
        <Select
          options={sortOptions}
          onChange={sort => setFilter({ ...filter, sort})}
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
        selected={filter.category}
        onChange={categoryId => setFilter({...filter, category: categoryId})}
      />
    </div>
  );
};