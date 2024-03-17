import {useMemo} from "react";

const formatDate = (date) => {
  return date.split(".").reverse().join("/");
}

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

export const useSortedGuides = (guides, sort) => {
  const sortedGuides = useMemo(() => {
    let sortFn = null;
    switch(sort) {
      case "date_desc":
        sortFn = (a, b) => compareDates(formatDate(b.date), formatDate(a.date));
      break;
      case "date_asc":
        sortFn = (a, b) => compareDates(formatDate(a.date), formatDate(b.date));
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

    if (sort === "favorite") {
      return guides.filter((guide) => guide.isFavorite);
    }

    return guides;
  }, [sort, guides])

  return sortedGuides;
};

export const useFilteredByCategoryGuides = (guides, category) => {
  const filteredGuides = useMemo(() => {
    if (category.id === 0) {
      return guides;
    }

    return guides.filter((guide) => {
      return guide.category.toLowerCase() === category.name.toLowerCase();
    });
  }, [guides, category]);

  return filteredGuides;
};

export const useGuides = (guides, { sort, search, done, category }) => {
  const filteredGuides = useFilteredByCategoryGuides(guides, category);
  const sortedGuides = useSortedGuides(filteredGuides, sort);

  const sortedAndSearchedGuides = useMemo(() => {
    return sortedGuides.filter(guide => {
      if (done) {
        return guide.progress === 100 && guide.title.toLowerCase().includes(search.toLowerCase())
      }
      return guide.title.toLowerCase().includes(search.toLowerCase())
    });
  }, [search, sortedGuides, done])

  return sortedAndSearchedGuides;
};