import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Employee from "../components/employee/employee";
import Scheduler from "../components/scheduler/scheduler";
import {
  getEmployee,
  getEmployById,
  addBooking,
  deleteBooking,
} from "../services/api";
import Spinner from "../components/spinner/spinner";

const Calendar = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmploy, setSelectedEmploy] = useState();
  const [selectedDate, setSelectedDate] = useState([]);
  const [bookingData, setBookingData] = useState();
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const { service } = useParams();

  useEffect(() => {
    async function getEmployeeData() {
      try {
        setLoading(true);
        const employee = await getEmployee();
        if (employee.status === 200) {
          const filterEmployee = employee.data.filter(
            (obj) => obj.service === service
          );
          setEmployeeData(filterEmployee);
        } else {
          console.log(employee);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getEmployeeData();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedEmploy) {
      setLoading(true);
      getEmployById(selectedEmploy.id)
        .then((res) => {
          setLoading(false);
          const filteredData = res.data.schedule.filter((obj) => {
            const date = new Date(obj.selectedDate);
            const selectedDateObj = new Date(selectedDate);
            return date.toDateString() === selectedDateObj.toDateString();
          });
          setBookingData(filteredData);
        })
        .catch((error) => {
          setLoading(false);
          alert("Atentie, nu s-a putut prelua data, incercati din nou !");
          console.log(error);
        });
    }
  }, [selectedDate, selectedEmploy, rerender]);

  const handleSelectEmploy = (employ) => {
    setSelectedEmploy(employ);
  };

  const handleSaveBooking = (saveData) => {
    if (!saveData.employId) {
      alert("Selecteaza angajat !");
      return;
    }
    if (!Array.isArray(saveData.timeRange) || saveData.timeRange.length !== 2) {
      alert("Selecteaza interval orar !");
      return;
    }
    setLoading(true);
    addBooking(saveData)
      .then(() => {
        setRerender((state) => !state);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Atentie, nu s-a salvat, incercati din nou !");
        console.log(error);
      });
  };

  const handleDeleteSchedule = (id) => {
    console.log(id);
    deleteBooking(id, selectedEmploy?.id).then(() =>
      setRerender((state) => !state)
    );
  };

  return (
    <>
      <div className="row m-4">
        <div className="col-md-2">
          <Employee employeeList={employeeData} onSelect={handleSelectEmploy} />
        </div>
        <div className="col-md-6">
          <Scheduler
            data={{
              selectedEmployName: selectedEmploy?.fullName,
              selectedEmployId: selectedEmploy?.id,
            }}
            onSave={handleSaveBooking}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </div>
        <div className="col-md-4">
          {bookingData?.map((schedule) => (
            <div className="calendar-schedule-list" key={schedule.id}>
              <button
                className="btn btn-close btn-close-white"
                style={{ float: "right" }}
                onClick={() => handleDeleteSchedule(schedule.id)}
              ></button>
              <p>{schedule.timeRange.join("-")}</p>
              <p>{schedule.comment}</p>
            </div>
          ))}
        </div>
      </div>
      {loading && <Spinner global />}
    </>
  );
};

export default Calendar;
