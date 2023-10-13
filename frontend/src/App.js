import './App.css';
import ImageViewer from './components/ImageViewer';
import AddBid from './components/AddBid';
import AuctionBar from './components/AuctionBar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom" ;
import AddComment from './components/addComment';
import AllComments from './components/AllComments';
import Bootstarp from "bootstrap"
import AuctionHistory from './components/AuctionHistory';
import ItemDescription from './components/itemDescription';
function App() {
  return (
    
    <div className="App">
      <Router>
      <ImageViewer/>
      <AuctionBar/>
      <Routes>
          <Route path = "/add" exact Component={AddBid}/>
      </Routes>
    </Router>
    <ItemDescription/>
    <AddComment/>
    <AllComments/>
    <AuctionHistory/>
    </div>
    
  );
}

export default App;