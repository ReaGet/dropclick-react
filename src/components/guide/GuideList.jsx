import { useContext } from "react";
import { GuideCard } from "./GuideCard";
import { GuideCardPreload } from "./GuideCardPreload";
import { HomepageContext } from "pages/HomePage";

export const GuideList = ({ guides, onFavoriteChange, favoriteGuides }) => {
  const {isGuidesLoading} = useContext(HomepageContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
      { 
        !isGuidesLoading
          ? guides.map((guide) => {
              return (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onFavoriteChange={onFavoriteChange}
                  isFavoriteItem={favoriteGuides[guide.id]}
                />
              )
            })
          : Array(6).fill(0).map((_, i) => <GuideCardPreload key={i} />)
      }
    </div>
  );
};