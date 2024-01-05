import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function Bookingscreen() {
    const { roomid } = useParams();
    const location = useLocation();
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fromdate = new URLSearchParams(location.search).get("fromdate");
    const todate = new URLSearchParams(location.search).get("todate");
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const fromDateObj = parseDate(fromdate);
    const toDateObj = parseDate(todate);
    const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
    const totaldays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const totalamount = totaldays * room.rentperday;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.post(`${BASE_URL}/api/rooms/getroombyid`, { roomid })).data;
                setRoom(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData().catch((error) => {
            console.error('Unhandled promise rejection:', error);
        });
    }, [roomid]);


    async function onToken(token) {
        console.log(token)
        try {
            
            if (!currentUserData) {
                console.error('User data not found in localStorage');
                return;
            }

            const bookingDetails = {
                room,
                userid: currentUserData._id,
                fromdate,
                todate,
                totalamount,
                totaldays,
                token
            };
            setLoading(true);
            const result = await axios.post(`${BASE_URL}/api/bookings/bookroom`, bookingDetails);
            setLoading(false);
            Swal.fire('Congratulations, Your room is booked', 'success').then(result=>{
                window.location.href='/bookings'
            })

            // Handle the result as needed

        } catch (error) {
            console.error('Error booking room:', error);
            setLoading(false);
            Swal.fire('Opps, Something went wrong', 'error');
        }
    }

    return (
        <div className='m-5'>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <div>
                    <div className='row justify-content-center mt-5 bs'>
                        <div className='col-md-5'>
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} alt={room.name} className='bigimg' />
                        </div>
                        <div className='col-md-5'>
                            <div style={{ textAlign: 'right' }}>
                                <h1>Booking Details</h1>
                                <hr />
                                <p>Name: {currentUserData.name}</p>
                                <p>From Date: {fromdate}</p>
                                <p>To Date: {todate}</p>
                                <p>Max Count: {room.maxcount}</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days: {totaldays} </p>
                                <p>Rent Per Day: {room.rentperday}</p>
                                <p>Total Amount: {totalamount}</p>
                            </div>

                            <div style={{ float: 'right' }}>
                                <StripeCheckout
                                    amount={totalamount * 100}
                                    token={onToken}
                                    currency='INR'
                                    stripeKey="pk_test_51OUx0nSIqRzwwcrTKU1ooD1Nml8NUJMTj6xOe59wkBrGLcfu5h5D5F7YRYijD0y9ax3Jy6sQZ8tQjhe0qgPZVKgK00dib6c1aH">


                                    <button className='btn btn-primary'>
                                        Pay Now
                                    </button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
