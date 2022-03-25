const getFilteredTitlesBySearch = (searchTerm, arrWithTitles) => {
  const arrWithFilteredTitles = arrWithTitles.filter((item) => {
    const title = item.title.toLowerCase();
    const searchedValue = searchTerm.toLowerCase();
    return title.includes(searchedValue);
  });    

  return arrWithFilteredTitles;
}

export default getFilteredTitlesBySearch;