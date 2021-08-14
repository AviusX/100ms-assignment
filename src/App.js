import Characters from './screens/Characters/Characters';

import { Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" exact>
          <Characters />
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
