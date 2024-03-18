export const FavoriteButton = ({ isFavorite, width, height, onClick, className }) => {
  return (
    <button
      className={[
        className,
        isFavorite ? "text-primary" : "text-white"
      ].join(" ")} 
        onClick={onClick}
      >
        <svg className={ isFavorite ? "fill-current stroke-current" : "stroke-current"} width={width} height={height}>
          <use xlinkHref="/assets/icons/sprites.svg#favorite"></use>
        </svg>
    </button>
  );
} 