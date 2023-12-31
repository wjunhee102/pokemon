import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/not-found";
import PokemonPage from "./pages/pokemon";
import PokemonDetailPage from "./pages/pokemon-detail";
import Redirect from "./components/redirect";
import SearchResultPage from "./pages/search-result";

const router = createBrowserRouter([
  { path: "/", Component: () => <Redirect to="/pokemon" /> },
  { path: "*", Component: NotFound },
  { path: "/ko", Component: () => <Redirect to="/pokemon" /> },
  { path: "/pokemon", Component: () => <PokemonPage language="ko" /> },
  { path: "/pokemon/:pokemonname", Component: () => <PokemonDetailPage language="ko" /> },
  { path: "/search/:pokemonid", Component: () => <SearchResultPage language="ko" /> },
  { path: "/en", Component: () => <Redirect to="/en/pokemon" /> },
  { path: "/en/pokemon", Component: () => <PokemonPage language="en" /> },
  { path: "/en/pokemon/:pokemonname", Component: () => <PokemonDetailPage language="en" /> },
  { path: "/en/search/:pokemonid", Component: () => <SearchResultPage language="en" /> },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
