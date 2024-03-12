import { Select } from "./ui/Select";
import { CategoryList } from "./CategoryList";

export const Filters = ({filter, setFilter, sortOptions, categories}) => {
  console.log(categories)
  const buttonClasses = "flex items-center gap-4 px-6 sm:pr-8 xl:pl-8 xl:pr-10 py-4 xl:py-6 rounded-lg text-xl xl:text-2xl font-bold bg-[#15171C] transition-all duration-100";
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <Select
          options={sortOptions}
          onChange={sort => setFilter({ ...filter, sort})}
        >
          <button className={[buttonClasses, "hover:bg-[#202530]"].join(" ")}>
            <svg className="fill-white" width="24" height="24">
              <use xlinkHref="/assets/icons/sprites.svg#sort"></use>
            </svg>
            <span className="hidden sm:flex">Фильтры</span>
          </button>
        </Select>

        <label
          className="flex item-center gap-6 h-full w-full pl-4 sm:pl-6 rounded-lg text-xl xl:text-2xl leading-5 xl:leading-6 bg-[#15171C] overflow-hidden"
        >
          <svg className="shrink-0 my-4 xl:my-6" width="24" height="24">
            <use xlinkHref="/assets/icons/sprites.svg#search"></use>
          </svg>
          <input
            className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 border-none outline-none bg-transparent hover:bg-[#202530] focus:bg-[#202530] transition-all duration-100"
            type="text"
            value={filter.search}
            placeholder="Поиск"
            onChange={e => setFilter({ ...filter, search: e.target.value})}
          />
        </label>

        <button
          className={[buttonClasses,"ml-auto", filter.done ? "bg-primary text-black" : "text-white hover:bg-[#202530]"].join(" ")}
          onClick={() => setFilter ({ ...filter, done: !filter.done })}
        >
          <svg className="fill-current" width="18" height="18">
            <use xlinkHref="/assets/icons/sprites.svg#check-outline"></use>
          </svg>
          <span className="hidden sm:flex">Выполненные</span>
        </button>
      </div>

      <CategoryList
        categories={categories}
        selected={filter.category}
        onChange={categoryId => setFilter({...filter, category: categoryId})}
      />
    </div>
  );
};