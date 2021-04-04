import styled from 'styled-components';

const StyledMortgageCalculator = styled.div`
	background: white;
	min-height: 3em;
	border-radius: .4em;
`;

interface ThemeInterface {
	[x: string]: {
		background: string;
	}
}

const theme: ThemeInterface = {
	light: {
		background: 'white',
	},

	dark: {
		background: '',
	}
}

function MortgageCalculator() {
	return <StyledMortgageCalculator theme={theme.light /* Set this to conditional */}>
		<div></div>
	</StyledMortgageCalculator>
};

export default MortgageCalculator;
