import './app.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommonPage from './features/CommonPage';
import { routes } from './helpers/consts';
import ProductsPage from './features/ProductsPage';
import ErrorPage from './features/ErrorPage';
import ProductPage from './features/ProductPage';


const  App = () => {

  return (
    <Router>
      <Routes>
        <Route path={routes.errorPage} Component={ErrorPage}/>
        <Route path={routes.productPage} Component={ProductPage}/>
        <Route path={routes.productsPage} Component={ProductsPage}/>
        <Route path={routes.commonPage} Component={CommonPage}/>
      </Routes>
    </Router>
  )
}

export default App
