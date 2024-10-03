import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Map,
  Shapes,
  BookA,
  Baby,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../redux/branchSlice";
import LoadingPage from "../Loading/loading";
import ErrorPage from "../Error/error";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BranchesPage = () => {
  const dispatch = useDispatch();
  const { branches, success, loading, error } = useSelector(
    (state) => state.branch
  );
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    if (!success && !loading) {
      dispatch(fetchBranches());
    }
  }, [success, loading, dispatch]);

  if (loading === true) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Branches</h1>
          <p className="text-xl text-light-blue-300">
            Discover Mt Zion College campuses across Zimbabwe
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            className="flex items-center bg-light-blue-500 text-white px-4 py-2 rounded-md hover:bg-light-blue-600 transition-colors duration-300"
          >
            {viewMode === "list" ? (
              <Map className="mr-2" />
            ) : (
              <Users className="mr-2" />
            )}
            {viewMode === "list" ? "Map View" : "List View"}
          </button>
        </div>
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        ) : (
          <BranchesMap branches={branches} />
        )}
      </div>
    </div>
  );
};

const BranchCard = ({ branch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={branch.image ? branch.image : "/images/logo.png"}
        alt={branch.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {branch.name}
        </h2>
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <MapPin size={18} className="mr-2 text-blue-400" />
          <span>{branch.location}</span>
        </div>
        <div className="flex items-center">
            <BookOpen size={18} className="mr-2 text-blue-400" />
            <span>{branch.grades}Form 1 - 4</span>
          </div>
          </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center ">
            <Users size={18} className="mr-2 text-blue-400" />
            <span>{branch.students} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={18} className="mr-2 text-blue-400" />
            <span>{branch.grades}7 Grades</span>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <Link to={`/branches/${branch.id}/grades`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition duration-300 flex items-center"
            >
              <Baby size={18} className="mr-2 text-blue-400" /> Primary
            </motion.button>
          </Link>

          <Link to={`/branches/${branch.id}/forms`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition duration-300 flex items-center"
            >
              <BookA size={18} className="mr-2 text-blue-400" /> Secondary
            </motion.button>
          </Link>
        </div>
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {branch.desscription}
          </p>
        </motion.div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full py-2 bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition-colors duration-300"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp size={18} />
            </>
          ) : (
            <>
              <span className="mr-2">Learn More</span>
              <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const BranchesMap = ({ branches }) => {
  const [geocodedBranches, setGeocodedBranches] = useState([]);
  const center = [-19.015438, 29.154857]; // Approximate center of Zimbabwe

  useEffect(() => {
    const geocodeBranches = async () => {
      const geocoded = await Promise.all(
        branches.map(async (branch) => {
          if (branch.latitude && branch.longitude) {
            return branch;
          }
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                branch.location
              )}, Zimbabwe`
            );
            const data = await response.json();
            if (data && data[0]) {
              return {
                ...branch,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
              };
            }
          } catch (error) {
            console.error(`Error geocoding ${branch.name}:`, error);
          }
          return branch;
        })
      );
      setGeocodedBranches(geocoded);
    };

    geocodeBranches();
  }, [branches]);

  return (
    <div style={{ height: "600px", width: "100%", borderRadius: "10px" }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geocodedBranches.map((branch) => {
          if (
            typeof branch.latitude === "number" &&
            typeof branch.longitude === "number"
          ) {
            return (
              <Marker
                key={branch.id}
                position={[branch.latitude, branch.longitude]}
              >
                <Popup>
                  <div>
                    <h3>{branch.name}</h3>
                    <p>{branch.location}</p>
                    <p>{branch.students} students</p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default BranchesPage;
