import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';


const { TabPane } = Tabs;

function Profilescreen() {


    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {

        if (!user) {
            window.location.href = '/login';
        }

    }, [])

    return (
        <div className='mt-3 mx-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>

                    <br />

                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>

    )
}

export default Profilescreen;


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
                console.log(response.data);  // Log the data to see the structure
                setBookings(response.data);  // Set the data, assuming it's an array
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchBookings();
    }, [user._id]);

    // async function cancelBoooking(bookingid, roomid){
    //     try{
    //         setLoading(true);
    //         const result = (await axios.post("/api/bookings/cancelbooking", {bookingid, roomid})).data
    //         console.log(result);
    //         setLoading(false);
    //     }catch(error){
    //         console.log(error)
    //         setLoading(false);
    //     }
    // }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<Loader/>)}
                    {bookings && bookings.map(booking => (
                        <div key={booking._id} className='bs'>
                            <b><h1>{booking.room}</h1></b>
                            <hr />
                            <h1><b>Booking Id:</b> {booking._id}</h1>
                            <h1><b>Check In</b>: {booking.fromdate}</h1>
                            <h1><b>Check Out:</b> {booking.todate}</h1>
                            <h1><b>Amount</b>: {booking.totalamount}</h1>
                            <h1><b>Status:</b> {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</h1>

                            <div className='text-right'>
                                {/* <button className='btn btn-primary' onClick={cancelBoooking(booking._id, booking.roomid)}>Cancel Booking</button> */}
                                <button className='btn btn-primary' >Cancel Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
