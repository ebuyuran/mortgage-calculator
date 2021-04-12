export const downPaymentPercentageLimit = 5000000;
export const minimumDownPaymentPercentageLow = 20;
export const minimumDownPaymentPercentageHigh = 30;

export const getMinimumDownPaymentPercentage = function(propertyValue: number): number {
	return propertyValue >= downPaymentPercentageLimit ? 
	minimumDownPaymentPercentageHigh : minimumDownPaymentPercentageLow;
};
