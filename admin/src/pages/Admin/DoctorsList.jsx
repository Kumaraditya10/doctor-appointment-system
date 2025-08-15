import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import DoctorCard from "../../components/DoctorCard";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken]); // run again only when token changes

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
