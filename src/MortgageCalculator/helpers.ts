export const getMinimumDownPaymentPercentage = function(propertyValue: number) {
	return propertyValue >= 5000000 ? 30 : 20;
}
