import { GuideCard } from "./GuideCard";
import { GuideCardPreload } from "./GuideCardPreload";

export const GuideList = ({ guides }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
      { 
        guides?.length
          ? guides.map((guide) => <GuideCard key={guide.id} guide={guide}></GuideCard>)
          : Array(6).fill(0).map((_, i) => <GuideCardPreload key={i} />)
      }
    </div>
  );
};