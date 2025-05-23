import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CampaignDetail from "./Pages/CampaignDetail";
import CreateCampaign from "./Pages/CreateCampaign";
import About from "./Pages/About";
import Campaigns from "./Pages/Campaigns";
import HowItWorks from "./Pages/HowItWorks";
import MyCampaigns from "./Pages/MyCampaigns";
import ScrollToTop from "./Components/ScrollToTop";
import Modal from "./Components/Modal";
import { useContext } from "react";
import { MainContext } from "./Context/MainContext";

function App() {

  const { modalState, hideModal } = useContext(MainContext);
  return (
    <BrowserRouter>
      <div className="bg-gray-950">
        <Navbar />
        <ScrollToTop />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/my-campaigns" element={<MyCampaigns />} />
          </Routes>
        </div>
        <Footer />

        <Modal
          isOpen={modalState.isOpen}
          onClose={hideModal}
          title={modalState.title}
          message={modalState.message}
          actionText={modalState.actionText}
          onAction={modalState.onAction}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;
