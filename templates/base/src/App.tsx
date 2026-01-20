import { Providers } from '~/providers';
import { AppRouter } from '~/routes';

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
