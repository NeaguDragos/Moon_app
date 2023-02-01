import "./employee.css";

const Employee = ({ employeeList, onSelect }) => {
  return (
    employeeList.map((data, index) => (
    <div key={data.id + index} className="employee-container" onClick={() => onSelect(data)}>
       <img
        className="employee-avatar"
        alt="Avatar"
        src={data?.photo}
      />
      <div className="employee-detail">
        <div>{data?.fullName}</div>
        <div>{data?.phone}</div>
      </div>
    </div>
     ))
  );
};
export default Employee;
