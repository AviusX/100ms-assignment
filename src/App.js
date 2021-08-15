import Characters from './screens/Characters/Characters';
import CharacterDetails from './screens/CharacterDetails/CharacterDetails';

import { Switch, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence exitBeforeEnter>
        <Switch key={location.key} location={location}>
          <Route path="/:name" exact>
            <CharacterDetails />
          </Route>
          <Route path="/" exact>
            <Characters />
          </Route>
        </Switch>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
