const getFormattedCurrency = (priceCents) => {
  const formattedCurrency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'CAD',
  }).format(priceCents / 100);

  return formattedCurrency
};

export default getFormattedCurrency;