export const downPaymentPercentageLimit = 5000000;
export const lowMinimumDownPaymentPercentage = 20;
export const highMinimumDownPaymentPercentage = 30;

export const getMinimumDownPaymentPercentage = function(propertyValue: number): number {
	return propertyValue >= downPaymentPercentageLimit ? 
	highMinimumDownPaymentPercentage : lowMinimumDownPaymentPercentage;
};
