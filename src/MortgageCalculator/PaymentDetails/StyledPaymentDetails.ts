import styled from 'styled-components';

export const StyledPaymentDetails = styled.div`
	width: 100%;
	color: ${props => props.theme.textColor[0]};

	h1 {
		font-size: 2em;
		text-align: center;
		margin: .5em 0 1.25em;
		padding: 0 0 .5em;
		border-bottom: .05em solid ${props => props.theme.secondaryColor[1]};
	}

	h2 {
		font-size: 1.7em;
		margin: 0;
	}

	.input-container {
		position: relative;
		margin: .6em 0 2em;
		background: ${props => props.theme.inputBackgroundColor};

		.currency {
			position: absolute;
			top: 50%; transform: translateY(-50%);
			right: 1em;
			font-size: 1.6em;
			pointer-events: none;
		}

		input {
			font-size: 1.6em;
			width: 100%;
			height: 100%;
			background: none;
			padding: .7em 4em .7em .6em;
			color: ${props => props.theme.textColor[0]};
			border: .1em solid ${props => props.theme.inputBorderColor};
		}
	}

	.down-payment-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: .6em 0;

		.text-size {
			font-size: 1.6em;
		}
	}

	.down-payment-slider {
		margin: 0 0 2em 0;
	}

	.loan-term {
		display: flex;
		justify-content: space-between;
		margin: 1em 0 2em;
		padding: 0 4em;

		div {
			position: relative;
			display: inline-block;
			width: 4em;
			height: 4em;
			border-radius: 2.5em;
			background: ${props => props.theme.secondaryColor[1]};
			color: ${props => props.theme.textColor[1]};
			cursor: pointer;
			user-select: none;

			span {
				position: absolute;
				top: 50%; left: 50%;
				transform: translate(-50%, -50%);
				font-size: 1.8em;
			}
	
			&.active {
				background: ${props => props.theme.primaryColor[0]};
			}
		}
	}

	.interest-error {
		width: 100%;
		text-align: center;

		color: ${props => props.theme.textColor[1]};
		background: ${props => props.theme.errorColor};
		padding: 1em;

		span {
			font-size: 1.2em;
		}
	}
`;