import "./App.css";
import { useState, useEffect } from "react";
import { getDashboard } from "./services/api";
import { getHistory } from "./services/api";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UploadSection from "./components/UploadSection";
import WallDetails from "./components/WallDetails";
import CustomEstimate from "./components/CustomEstimate";
import AnalysisResult from "./components/AnalysisResult";
import CostEstimation from "./components/CostEstimation";
import History from "./components/History";
import Footer from "./components/Footer";

function App() {
const [wallDetails, setWallDetails] = useState({

    wallLength:"",
    wallWidth:"",
    crackLength:"",
    crackWidth:"",
    crackDepth:"",

    wallLengthUnit:"ft",
    wallWidthUnit:"ft",
    crackLengthUnit:"ft",
    crackWidthUnit:"ft",
    crackDepthUnit:"ft",
    
    wallType: "Interior Wall",
    wallMaterial: "Brick",
    putty: "Single coat putty",
    existingPaintType: "Emulsion Paint",
    paintType: "Economy-Waterproof",
    coatType: "Single",
    surfaceCoating: "None"


});
const [customEstimate, setCustomEstimate] = useState({
  enabled: false,
  cementPrice: "",
  puttyPrice: "",
  primerPrice: "",
  paintPrice: "",
  thinnerPrice: "",
});
const [result, setResult] = useState(null);
const [history, setHistory] = useState([]);
const [originalImage, setOriginalImage] = useState("");
const [detectedImage, setDetectedImage] = useState("");
const [loading, setLoading] = useState(false);
const [analyzeHandler, setAnalyzeHandler] = useState(null);
const [dashboard, setDashboard] = useState({
  total_reports: 0,
  low: 0,
  medium: 0,
  high: 0,
});
const loadDashboard = async () => {
  try {
    const data = await getDashboard();
    console.log("Dashboard Data:", data);
    setDashboard(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadDashboard();
  loadHistory();
}, [result]);
const loadHistory = async () => {
  try {
    const data = await getHistory();
    setHistory(data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <Sidebar />

      <main className="main">
        <Header />
     <Dashboard dashboard={dashboard} />
        <UploadSection
  wallDetails={wallDetails}
  customEstimate={customEstimate}
  result={result}
  setResult={setResult}
  originalImage={originalImage}
  setOriginalImage={setOriginalImage}
  loading={loading}
  setLoading={setLoading}
  setAnalyzeHandler={setAnalyzeHandler}
  loadDashboard={loadDashboard}
  loadHistory={loadHistory}
/>
        <WallDetails
  wallDetails={wallDetails}
  setWallDetails={setWallDetails}
/>
       <CustomEstimate
  customEstimate={customEstimate}
  setCustomEstimate={setCustomEstimate}
  analyzeHandler={analyzeHandler}
  loading={loading}
/>
        <AnalysisResult result={result} />
        <CostEstimation
  result={result}
  wallDetails={wallDetails}
  originalImage={originalImage}
   detectedImage={result?.detected_image}

/>
        <History
  history={history}
  loadHistory={loadHistory}
/>
        <Footer />
      </main>
    </>
  );
}

export default App;