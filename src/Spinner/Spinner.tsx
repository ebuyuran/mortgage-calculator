import styled from 'styled-components';

export function Spinner() {
	const StyledSpinner = styled.div`
		display: block;
		position: absolute;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
		width: 8em;
		height: 8em;

		div {
			position: absolute;
			top: 3.3em;
			width: 1.3em;
			height: 1.3em;
			border-radius: 50%;
			background: ${props => props.theme.textColor};
			animation-timing-function: cubic-bezier(0, 1, 1, 0);

			&:nth-child(1) {
				left: .8em;
				animation: lds-ellipsis1 0.6s infinite;
			}

			&:nth-child(2) {
				left: .8em;
				animation: lds-ellipsis2 0.6s infinite;
			}

			&:nth-child(3) {
				left: 3.2em;
				animation: lds-ellipsis2 0.6s infinite;
			}

			&:nth-child(4) {
				left: 5.6em;
				animation: lds-ellipsis3 0.6s infinite;
			}

			@keyframes lds-ellipsis1 {
				0% {
					transform: scale(0);
				}
				100% {
					transform: scale(1);
				}
			}
			@keyframes lds-ellipsis3 {
				0% {
					transform: scale(1);
				}
				100% {
					transform: scale(0);
				}
			}
			@keyframes lds-ellipsis2 {
				0% {
					transform: translate(0, 0);
				}
				100% {
					transform: translate(2.4em, 0);
				}
			}
		}

	`;

	return (
		<StyledSpinner className={'lds-ellipsis'}>
			<div />
			<div />
			<div />
			<div />
		</StyledSpinner>
	)
}
