const express = require("express");
const router = express.Router();
const Room = require('../models/room');
const Booking = require('../models/boooking');
const stripe = require('stripe')('sk_test_51OUx0nSIqRzwwcrTM3e0KgpVjE2ZfBXfvK51UErSmpa43TRSQVQ9YkgDoRLZeGqnYEoNbGAvsaPbvOztuJonB2C100XVeUsLy4')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
    const { room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token } = req.body

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '1234'
        })

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id })

        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: userid, status: booking.status });

        await roomtemp.save();

        res.send('Room Booked Sucessfully')
    } catch (error) {
        return res.status(400).json({ error })
    }
})


router.post("/getbookingsbyuserid", async (req, res) => {
    const  userid = req.body.userid;


    try {
        const bookings = await Booking.find({userid: userid})
        res.send(bookings)
    } catch(error){
        return res.status(400).json({error});
    }
})


// router.post("/cancelbooking", async(req, res) =>{
//     try{
//         const bookingitem = await Booking.findOne({_id: bookingid})
//         bookingitem.status = 'cancelled';
//         await bookingitem.save();
//         const room = await Room.findOne({_id: roomid})

//         const bookings = room.currentbookings;

//         const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
//         room.currentbookings = temp


//         await room.save();

//         res.send('Your booking sucessfully');
//     } catch(error){
//         return res.status(400).json({error});
//     }
// })

module.exports = router;