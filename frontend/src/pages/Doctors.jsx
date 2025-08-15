import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors = [] } = useContext(AppContext);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleSpecialityClick = (name) => {
    if (speciality === name) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${name}`);
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 bg-white">
      <p className="text-gray-600 text-sm">Browse through the doctors specialist.</p>

      <button
        className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? 'bg-primary text-white' : ''
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
      </button>

      <div className="flex flex-col sm:flex-row gap-10 mt-6">
        {/* Sidebar Filters */}
        <div className="flex flex-col gap-4 w-full sm:w-64">
          {specialties.map((name) => (
            <button
              key={name}
              onClick={() => handleSpecialityClick(name)}
              className={`text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-md text-left transition-all duration-200 ${
                speciality === name ? "bg-blue-100 font-semibold" : "bg-white hover:bg-gray-100"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-[#f1f5ff] border border-blue-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="h-64 flex justify-center items-center overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-black text-base font-semibold">
                  Dr. {item.name.replace(/^Dr\.?\s*/i, "")}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
