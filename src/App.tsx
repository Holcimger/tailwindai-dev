import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar";
import DataBase from "./data/dataBase"; // Renamed import
import NotFoundPage from "./pages/NotFoundPage"; // Import the 404 component

import "./App.css";

function App() {
  const [loadedData, setLoadedData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [uniqueData, setuniqueData] = useState<string[] | null>(null);

  const handleDataLoadedInApp = (allData: any[], uniqueData: string[]) => {
    setLoadedData(allData);
    setuniqueData(uniqueData);

    // console.log("All Data loaded in App:", allData);
    // console.log("Unique Models in App:", uniqueData);
  };

  // Determine which data to pass to HomePage: loaded data or initial data
  // Helper function to get filtered data for DetailPage
  const getFilteredDataForDetailPage = (id: string) => {
    const machineIndex = uniqueData.indexOf(id);
    return loadedData ? loadedData[machineIndex] : null; // Extract specific data by ID
  };

  const DetailPageWrapper = () => {
    const { id } = useParams(); // Get the `id` from the route
    // console.log('id :>> ', id);
    const filteredData = getFilteredDataForDetailPage(id); // Filter the data by ID
    return <DetailPage data={filteredData} />;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col max-h[100vh]">
        <Navbar />
        <div className={`corporate_border`}></div>
        <DataBase onDataLoaded={handleDataLoadedInApp} />{" "}
        {/* Pass the callback */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage data={uniqueData} />} />{" "}
            {/* Pass the dynamic data */}
            <Route path="/detail/:id" element={<DetailPageWrapper />} />
            {/* Catch-all route for any other path */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
