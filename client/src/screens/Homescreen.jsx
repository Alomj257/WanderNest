import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, setduplicaterooms] = useState([]);

    const [searchkey, setsearchkey] = useState('');
    const [type, settype] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                setRooms(data);
                setduplicaterooms(data);
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
    }, []);

    function filterByDates(dates) {
        // Check if dates is null or not properly initialized
        if (!dates || dates.length !== 2 || !dates[0] || !dates[1]) {
            // Handle the case when dates is not valid
            return;
        }

        const fromDate = dates[0].toDate();
        const toDate = dates[1].toDate();

        const fromDateStr = moment(fromDate).format("DD-MM-YYYY");
        const toDateStr = moment(toDate).format("DD-MM-YYYY");

        setfromdate(fromDateStr);
        settodate(toDateStr);

        var temprooms = [];
        for (const room of duplicaterooms) {
            var availability = true;

            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY").toDate();
                    const bookingToDate = moment(booking.todate, "DD-MM-YYYY").toDate();

                    if (
                        (fromDate > bookingToDate || toDate < bookingFromDate) &&
                        (fromDateStr !== booking.fromdate && toDateStr !== booking.todate)
                    ) {
                        availability = true;
                    } else {
                        availability = false;
                        break; // No need to check further if not available
                    }
                }
            }

            if (availability === true || room.currentbookings.length === 0) {
                temprooms.push(room);
            }
        }

        setRooms(temprooms);
    }

    function filterBySearch() {
        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms);
    }

    function filterByType(e) {
        settype(e);
        if (e !== 'all') {
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
            setRooms(temprooms);
        } else {
            setRooms(duplicaterooms);
        }
    }


    return (
        <div className='container'>
            <div className='row mt-5 bs justify-content-center text-center'>
                <div className="col-md-3">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDates} />
                </div>
                <div className="col-md-3">
                    <input type="text" className='form-control' placeholder='search rooms' value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
                </div>
                <div className="col-md-3">
                    <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non delux">Non Delux</option>
                    </select>
                </div>
            </div>


            <div className='row justify-content-center mt-7'>
                {loading ? (
                    <h1><Loader /></h1>
                ) : (
                    rooms.map((room) => (
                        <div key={room._id} className='col-md-9 mt-4'>
                            <Room room={room} fromdate={fromdate} todate={todate} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Homescreen;
