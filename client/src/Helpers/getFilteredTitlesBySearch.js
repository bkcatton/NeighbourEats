const getFilteredTitlesBySearch = (searchTerm, arrWithTitles) => {
  const arrWithFilteredTitles = arrWithTitles.filter((item) => {
    const title = item.title.toLowerCase();
    const country = item.country_style.toLowerCase();
    const searchedValue = searchTerm.toLowerCase();
    
    if (title.includes(searchedValue) || country.includes(searchedValue)) {
      return title;
    }
  });    

  return arrWithFilteredTitles;
}

export default getFilteredTitlesBySearch;