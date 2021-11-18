
export const getLocaleCurrencyString: (value: String | Number) => String = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getGraphData = (history) => {

}