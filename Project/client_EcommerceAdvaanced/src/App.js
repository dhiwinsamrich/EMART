import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import ResponsiveAppBar from "./components/Navbar";
// import Members from "./components/Members";
// import MembersDetailPage from "./components/recordDetailpage/MembersDetailPage";
import HomePage from "./Components/HomePage/";
import Sidebar from './Components/Navbar';
 import Invoice from './Components/Invoice';
 import InvoiceDetailPage from './Components/InvoiceDetailPage';
 import InvoiceEditPage from './Components/InvoiceEditPage';
 import TitleBar from "./Components/TitleBar";
 import ProductDetailPage from "./Components/RecordDetailPage/productDetailPage";
 import LaptopPage from "./Components/RecordDetailPage/LaptopPage";
 import MobilePage from "./Components/RecordDetailPage/MobilePage";
 import TelevisionPage from "./Components/RecordDetailPage/TelevisionPage";
 import WashingMachinePage from "./Components/RecordDetailPage/WashingMachinePage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <TitleBar />
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productDetailPage" element={<ProductDetailPage />} />
          <Route path="/LaptopPage" element={<LaptopPage />} />
          <Route path="/MobilePage" element={<MobilePage />} />
          <Route path="/TelevisionPage" element={<TelevisionPage />} />
          <Route path="/WashingMachinePage" element={<WashingMachinePage />} />
          <Route path="/invoices" element={<Invoice />} />
           <Route path="/invoiceDetailPage" element={<InvoiceDetailPage/>}/>
           <Route path="/invoiceEditPage/:id" element={<InvoiceEditPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
