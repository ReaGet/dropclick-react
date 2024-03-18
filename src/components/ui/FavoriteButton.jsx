export const FavoriteButton = ({ isFavorite, width, height, onClick, className }) => {
  return (
    <button
      className={[
        className,
        isFavorite ? "text-primary" : "text-white"
      ].join(" ")} 
        onClick={onClick}
      >
      {
        isFavorite
          ? (
            <svg className="stroke-current" width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2894 19.5612L4.37883 12.6928C3.8633 12.1844 3.45346 11.5761 3.17359 10.9038C2.89372 10.2316 2.74951 9.50913 2.74951 8.77924C2.74951 8.04935 2.89372 7.32688 3.17359 6.65464C3.45346 5.9824 3.8633 5.37405 4.37883 4.86564C5.35223 3.90596 6.63422 3.33592 7.98865 3.26052C9.34308 3.18512 10.6787 3.60944 11.7495 4.45532C12.8203 3.60944 14.1559 3.18512 15.5104 3.26052C16.8648 3.33592 18.1468 3.90596 19.1202 4.86564C19.6357 5.37405 20.0456 5.9824 20.3254 6.65464C20.6053 7.32688 20.7495 8.04935 20.7495 8.77924C20.7495 9.50913 20.6053 10.2316 20.3254 10.9038C20.0456 11.5761 19.6357 12.1844 19.1202 12.6928L12.2096 19.5612C12.0866 19.6835 11.9212 19.752 11.7491 19.752C11.5769 19.752 11.4116 19.6835 11.2885 19.5612H11.2894Z" fill="#ECCF4D"/>
            </svg>
          )
          : (
            <svg className="fill-current" width={width} height={height}>
              <use xlinkHref="/assets/icons/sprites.svg#favorite"></use>
            </svg>
          )
      }
    </button>
  );
} 