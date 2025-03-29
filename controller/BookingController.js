import moment from "moment";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import ItemModel from "../models/items.model.js";

// import getAllBookingRoService from 'mongoose-aggregate-paginate-v2';

// ════════════════════════════║  API TO BOOKING RO SERVICE  ║═════════════════════════════════//

export async function bookingRoService(req, res) {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      address,
      serviceType,
      preferredDate,
      additionalInfo,
      createdBy="Citizen"
    } = req.body;

    // Basic validation
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !address ||
      !serviceType ||
      !preferredDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // Generate a simple unique application number (RO-YYYYMMDD-RAND)
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD format
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const applicationNo = `RO-${formattedDate}-${randomNum}`;

    // Creating a booking entry in the database
    const booking = await Booking.create({
      fullName,
      phoneNumber,
      email,
      address,
      serviceType,
      preferredDate,
      additionalInfo,
      applicationNo,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Booking successfully created!",
      applicationNo: applicationNo,
      data: booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while creating booking",
      error: err.message,
    });
  }
}

// ════════════════════════════║  GET ALL BOOKING RO SERVICE  ║═════════════════════════════════//

export async function getAllBookingRoService(req, res) {
  try {
    const { page = 1, limit = 10 ,q} = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    let query = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          __v: 0,
        
        },
      },
    ];

    if (q) {
      query.push({
        $match: {
          $or: [
            { email: { $regex: new RegExp(q, "i") } },
            { fullName: { $regex: new RegExp(q, "i") } },
            { phoneNumber: { $regex: new RegExp(q, "i") } },
            
          ],
        },
      });
    }

    // Using aggregate with pagination
    const bookings = await Booking.aggregatePaginate(
      Booking.aggregate([
        ...query,
        {
          $lookup: {
            from: "users",
            localField: "technicianId",
            foreignField: "_id",
            as: "technician",
          },
        },
        {
          $unwind: {
            path: "$technician",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]),
      options
    );

    return res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
      error: err.message,
    });
  }
}

// ════════════════════════════║  FIND BOOKING RO SERVICE BY ID  ║═════════════════════════════════//

export async function findBookingRoService(req, res) {
  try {
    const { id } = req.params;
    const bookingData = await Booking.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "technicianId",
          foreignField: "_id",
          as: "technician",
        },
      },
      {
        $lookup: {
          from: "tbl_service_mstrs",
          localField: "serviceType",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: {
          path: "$technician",
          preserveNullAndEmptyArrays: true,
        },
      },
      
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: bookingData[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching booking",
      error: err.message,
    });
  }
}

// ════════════════════════════║  UPDATE BOOKING RO SERVICE BY ID  ║═════════════════════════════════//

export async function updateBookingRoService(req, res) {
  try {
    const { id } = req.params;
    const { technicianId, aasignDate, assignTime, ...otherUpdates } = req.body;

    // if same id not assign to other technician
    // if (technicianId) {
    //   const booking = await Booking.findById(id);
    //   if (booking.technicianId) {
    //     return res.status(200).json({
    //       success: false,
    //       message: "This booking is already assigned to a technician",
    //     });
    //   }
    // }

    // // Ensure there's some data to update
    // if (Object.keys(req.body).length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No update data provided",
    //   });
    // }

    // Create an update object
    const updateData = { ...otherUpdates };

    // If technician details are provided, include them in update
    updateData.technicianId = technicianId;
    updateData.assignDate = assignDate ?? moment().format("YYYY-MM-DD");
    updateData.aasigntime = assignTime ?? moment().format("HH:mm:ss");

    // Find and update booking
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while updating booking",
      error: err.message,
    });
  }
}

//delete

export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    return res.status(200).json({
      success: true,
      message: " deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}

//TRACK BOOKING BY APPLICATION NO

export async function findBookingByApplicationNo(req, res) {
  try {
    const { applicationNo } = req.body;

    // Validate input
    if (!applicationNo) {
      return res.status(400).json({
        success: false,
        message: "Application number is required",
      });
    }

    // Find booking by application number and populate technician details
    const booking = await Booking.findOne({ applicationNo }).populate(
      "technicianId",
      "fullName phoneNumber expertise"
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found for this application number",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching booking",
      error: err.message,
    });
  }
}

// get booking list by technicianId and join technicianId with aggregate
export async function getBookingListByTechnicianId(req, res) {
  const { page = 1, limit = 10, q } = req.query;
  try {
    const options = { page, limit };

    let query = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ];

    // if (q) {
    //   query.push({
    //     $match: {
    //       $or: [
    //         { email: { $regex: new RegExp(q, 'i') } },
    //         { fullName: { $regex: new RegExp(q, 'i') } },
    //         { 'role.roleName': { $regex: new RegExp(q, 'i') } },
    //         { 'ulb.ulbName': { $regex: new RegExp(q, 'i') } }
    //       ]
    //     }
    //   });
    // }

    const aggregate = Booking.aggregate([
      { $match: { technicianId: new mongoose.Types.ObjectId(req.user?._id) } },
      {
        $lookup: {
          from: "users",
          localField: "technicianId",
          foreignField: "_id",
          as: "technician",
        },
      },
      {
        $unwind: {
          path: "$technician",
          preserveNullAndEmptyArrays: true,
        },
      },
      ...query,
    ]);

    const getAllBookings = await Booking.aggregatePaginate(aggregate, options);

    if (!getAllBookings) {
      return res.status(200).json({
        success: true,
        message: "No record found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully.",
      data: getAllBookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}


// save ItemModel in booking model
export async function PayBookingItem(req, res) {
  try {
    const { bookingId, items } = req.body;
    const booking = await Booking.findOne({
      _id: new mongoose.Types.ObjectId(bookingId),
      status: "Pending",
    });
    if (!booking) {
      return res.status(200).json({
        success: false,
        message: "Booking not found",
      });
    }

    // items is an array of objects and save ItemModel

    const savedItems = await ItemModel.insertMany(items);

    if (!savedItems) {
      return res.status(200).json({
        success: false,
        message: "Item model not saved",
      });
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(bookingId) },
      { $set: { 
        paymentStatus: "Paid",
        status: "Completed",
       } },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(200).json({
        success: false,
        message: "Booking not updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item model saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}
