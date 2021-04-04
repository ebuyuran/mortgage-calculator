import styled from 'styled-components';
import MortgageCalculator from './MortgageCalculator/MortgageCalculator';

const AppContainer = styled.div`
  width: 48em;
  border-radius: .3em;
`;

function App() {
  return (
    <AppContainer>
      <MortgageCalculator />
    </AppContainer>
  );
}

export default App;
