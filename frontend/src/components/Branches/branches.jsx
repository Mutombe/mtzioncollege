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
  ArrowLeft
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../Loading/loading";
import ErrorPage from "../Error/error";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const SAMPLE_BRANCHES = [
  {
    id: 1,
    name: "Mt Zion Lochinvar",
    location: "Lochinvar, Harare, Zimbabwe",
    students: 850,
    grades: "Form 1-4",
    description: "Our flagship campus featuring state-of-the-art facilities and a comprehensive academic program.",
    image: "images/mtzion3.jpg",
    latitude: -19.4167,
    longitude: 31.0
  },
  {
    id: 2,
    name: "Dema School",
    location: "Chitungwiza, Zimbabwe",
    students: 720,
    grades: "Form 1-4",
    description: "Modern urban campus specializing in technology and innovation.",
    image: "images/mtzion.png",
    latitude: -17.8292,
    longitude: 31.0522
  },
  {
    id: 3,
    name: "Eyecourt Campus",
    location: "CBD, Harare, Zimbabwe",
    students: 680,
    grades: "Form 1-6",
    description: "Known for excellence in arts and cultural programs.",
    image: "images/mtzion2.jpg",
    latitude: -17.8292,
    longitude: 31.0522
  }
];

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
  const navigate = useNavigate();
  const { success, loading, error } = useSelector(
    (state) => state.branch
  );

  const [branches, setBranches] = useState(SAMPLE_BRANCHES);
  const [viewMode, setViewMode] = useState("list");


  return (
    <div className="min-h-screen pt-20">
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700">
                Our Branches
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                Discover Mt Zion College campuses across Zimbabwe
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            className="flex items-center bg-khaki-700 text-navy-900 px-4 py-2 rounded-md hover:bg-khaki-600 transition-colors duration-300"
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
        src={branch.image}
        alt={branch.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-khaki-300 mb-2">
          {branch.name}
        </h2>
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <MapPin size={18} className="mr-2 text-khaki-700" />
          <span className="">{branch.location}</span>
        </div>
        <div className="flex items-center">
            <BookOpen size={18} className="mr-2 text-khaki-700" />
            <span>{branch.grades}</span>
          </div>
          </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center ">
            <Users size={18} className="mr-2 text-khaki-700" />
            <span>{branch.students} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={18} className="mr-2 text-khaki-700" />
            <span>7 Grades</span>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <Link to={`/branches/${branch.id}/grades`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 bg-khaki-700 text-navy-900 rounded-md hover:bg-navy-600 transition duration-300 flex items-center"
            >
              <Baby size={18} className="mr-2 text-navy-400" /> Primary
            </motion.button>
          </Link>

          <Link to={`/branches/${branch.id}/forms`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 bg-khaki-700 text-navy-900 rounded-md hover:bg-light-blue-600 transition duration-300 flex items-center"
            >
              <BookA size={18} className="mr-2 text-navy-900" /> Secondary
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
            {branch.description}
          </p>
        </motion.div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition-colors duration-300"
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
  const center = [-19.015438, 29.154857];

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
