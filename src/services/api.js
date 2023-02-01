import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {'Accept': 'application/json'}
})
const getServices = () => {
    return api.get('/services');
}
const getEmployee = () => {
    return api.get('/employee');
}

const getEmployById = (id) => {
    return api.get(`/employee/${id}`)
}

const addBooking = async (data) => {
    const obj = await getEmployById(data.employId); 
    data.id = new Date().getTime();
    obj.data.schedule.push(data);
    return api.put(`/employee/${data.employId}`, {...obj.data});
}

const deleteBooking = async (bookingId, employId) => {
    const obj = await getEmployById(employId); 
    const filteredList = obj.data.schedule.filter(obj => obj.id !== bookingId);
    obj.data.schedule = filteredList;
    return api.put(`/employee/${employId}`, {...obj.data});
}

const uploadImg = (images) => {
    return api.post('/gallery', images)
}

const deleteImg = (imgId) => {
    console.log(imgId)
    return api.delete(`/gallery/${imgId}`)
}

const getGallery = () => {
    return api.get('gallery');
}

export { getServices, getEmployee, addBooking, deleteBooking, getEmployById, uploadImg, getGallery, deleteImg};