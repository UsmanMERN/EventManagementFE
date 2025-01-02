import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default'); // Replace with your upload preset

    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djvukamo0/image/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: false // This is important
        }
      );
      console.log(response.data.secure_url)
      setFormData(prevState => ({
        ...prevState,
        image: response.data.secure_url
      }));
      toast.success('Event image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/createEvent", formData);
      // console.log("Event posted successfully:", response.data);
      // Optional: Reset form or redirect
      setFormData({
        title: "",
        optional: "",
        description: "",
        organizedBy: "",
        eventDate: "",
        eventTime: "",
        location: "",
        ticketPrice: 0,
        image: '',
        likes: 0
      });
      toast.success('Event posted successfully');
    } catch (error) {
      console.error("Error posting event:", error);
      toast.error('Error posting event');
    }
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Post an Event</h1></div>

      <form onSubmit={handleSubmit} className='flex flex-co'>
        <div className='flex flex-col gap-5'>
          <label className='flex flex-col'>
            Title:
            <input
              type="text"
              name="title"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Optional:
            <input
              type="text"
              name="optional"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              value={formData.optional}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Description:
            <textarea
              name="description"
              className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Organized By:
            <input
              type="text"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              name="organizedBy"
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Event Date:
            <input
              type="date"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Event Time:
            <input
              type="time"
              name="eventTime"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              value={formData.eventTime}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Location:
            <input
              type="text"
              name="location"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Ticket Price:
            <input
              type="number"
              name="ticketPrice"
              className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
              value={formData.ticketPrice}
              onChange={handleChange}
            />
          </label>
          <label className='flex flex-col'>
            Image:
            <input
              type="file"
              name="image"
              className=' rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none'
              onChange={handleImageUpload}
              disabled={loading}
            />
          </label>
          <button className='primary' type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}