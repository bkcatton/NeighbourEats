const getFilteredTitlesByDistance = (maxDistance, arrWithTitles) => {
  const arrWithFilteredTitles = arrWithTitles.filter((item) => {
    const minutes = item.duration.value / 60;

    if (minutes <= maxDistance) {
      return item.title;
    }
  });

  return arrWithFilteredTitles;
};

export default getFilteredTitlesByDistance;