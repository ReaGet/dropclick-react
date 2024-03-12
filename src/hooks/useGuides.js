import {useMemo} from "react";

const getTime = (date) => new Date(Date(date)).getTime();
const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
};

export const useSortedPosts = (guides, sort) => {
  const sortedGuides = useMemo(() => {
    console.log(sort)
    let sortFn = null;
    switch(sort) {
      case "date_desc":
        sortFn = (a, b) => compareDates(a.date?.replaceAll(".", "/"), b.date?.replaceAll(".", "/"));
      break;
      case "date_asc":
        sortFn = (a, b) => compareDates(b.date?.replaceAll(".", "/"), a.date?.replaceAll(".", "/"));
      break;
      case "price_asc":
        sortFn = (a, b) => parseInt(a.price) - parseInt(b.price);
      break;
      case "price_desc":
        sortFn = (a, b) => parseInt(b.price) - parseInt(a.price);
      break;
    }

    if(sortFn) {
      return [...guides].sort(sortFn);
    }
    return guides;
  }, [sort, guides])

  return sortedGuides;
}

export const useGuides = (guides, sort, search) => {
  const sortedGuides = useSortedPosts(guides, sort);

  const sortedAndSearchedGuides = useMemo(() => {
    return sortedGuides.filter(guide => guide.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, sortedGuides])

  return sortedAndSearchedGuides;
}