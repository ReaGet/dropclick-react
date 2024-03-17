import { useRef } from "react";

const Category = (props) => {
  const {
    category,
    selected = false,
    onClick,
  } = props;

  const optionRef = useRef(null);

  const handleClick = (clickedCategory) => () => {
    onClick(clickedCategory);
  };

  return (
    <button
      className={[
          "px-8 py-4 xl:px-10 font-semibold border rounded-xl transition-colors outline-none",
          selected
            ? "bg-primary text-black border-primary hover:border-primary-hover"
            : "border-[#414347] hover:border-white"
        ].join(" ")}
      value={category.id}
      onClick={handleClick(category)}
      ref={optionRef}
    >
      {category.name}
    </button>
  );
}

const CategoryPreload = () => {
  return (
    <button className={"loading h-[42px] px-20 rounded-xl"}></button>
  );
}

export const CategoryList = ({ categories, onChange, selected}) => {
  const handleCategoryClick = (clickedCategory) => {
    onChange(clickedCategory);
  }

  return (
    <div className="flex flex-wrap gap-6 text-2xl">
      { 
        categories?.length
          ? categories.map((category) => {
            return <Category
                      onClick={handleCategoryClick}
                      key={category.id}
                      category={category}
                      selected={selected.id === category.id}
                    ></Category>
          })
          : Array(3).fill(0).map((_, i) => <CategoryPreload key={i} />)
      }
    </div>
  );
}