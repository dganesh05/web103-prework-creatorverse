import './App.css'
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import EditCreator from './pages/EditCreator';
import ViewCreatorPage from './pages/ViewCreatorPage';


function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creators/:id', element: <ViewCreatorPage /> },
    { path: '/edit-creator/:id', element: <EditCreator /> }
  ]);

  return (
    <div className="App">
      <header>
        <h1>Creatorverse</h1>
      </header>
      <main>
        {routes}
      </main>
    </div>
  )
}

export default App
