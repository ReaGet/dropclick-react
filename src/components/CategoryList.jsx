import { useRef } from "react";

const Category = (props) => {
  const {
    category: { id, name },
    selected = false,
    onClick,
  } = props;

  const optionRef = useRef(null);

  const handleClick = (clickedValue) => () => {
    onClick(clickedValue);
  };

  return (
    <button
      className={[
          "px-8 py-5 xl:px-10 xl:py-2 border rounded-xl transition-colors",
          selected
            ? "bg-primary text-black border-primary hover:border-primary-hover"
            : "border-[#414347] hover:border-white"
        ].join(" ")}
      value={id}
      onClick={handleClick(id)}
      ref={optionRef}
    >
      {name}
    </button>
  );
}

const CategoryPreload = () => {
  return (
    <button className={"loading h-[47px] px-12 rounded-xl"}></button>
  );
}

export const CategoryList = ({ categories, onChange, selected}) => {
  const handleCategoryClick = (categoryId) => {
    onChange(categoryId);
  }

  return (
    <div className="flex gap-6 text-2xl">
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