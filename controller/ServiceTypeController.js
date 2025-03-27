import ServiceType from '../models/service.model.js';
import Joi from 'joi';
// ════════════════════════════║  API TO Create Service   ║═════════════════════════════════//
export async function CreateServiceType(req, res) {
  const { serviceTypeName, description } = req.body;

  try {
    const schema = Joi.object({
      serviceTypeName: Joi.string()
        .required()
        .min(1)
        .max(50)
        .label('serviceTypeName is not more than 50 characters'),
      description: Joi.string().required()
    });
    const newServiceType = new ServiceType({
      serviceTypeName,
      description
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(200)
        .json({ message: error.details[0].message, success: false });
    }
    await newServiceType.save();

    return res.status(201).json({
      success: true,
      message: 'Created successfully.',
      newServiceType
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// ════════════════════════════║  API TO Get All Service   ║═════════════════════════════════//
export const GetAllServiceType = async (req, res) => {
  const { page = 1, limit = 10, q } = req.query;
  const options = { page, limit };
  try {
    let query = [
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $project: {
          __v: 0
        }
      }
    ];

    if (q) {
      query.push({
        $match: {
          $or: [
            { serviceTypeName: { $regex: new RegExp(q, 'i') } },
            { description: { $regex: new RegExp(q, 'i') } }
          ]
        }
      });
    }

    const aggregate = ServiceType.aggregate(query);
    const serviceTypes = await ServiceType.aggregatePaginate(aggregate, options);

    if (!serviceTypes) {
      return res.status(400).json({
        success: true,
        message: 'No record found!'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Fetched successfully.',
      data: serviceTypes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ════════════════════════════║  API TO Get Service By Id ║═════════════════════════════════//
export const GetServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const Service = await ServiceType.findById(id);

    if (!Service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Get Service by id successfully.',
      data: Service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ════════════════════════════║  API TO Update Service By Id ║═════════════════════════════════//
export const UpdateService = async (req, res) => {
  const { serviceTypeName, description } = req.body;
  const { id } = req.params;

  try {
    const Service = await ServiceType.findById(id);

    if (!Service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    await ServiceType.findByIdAndUpdate(id, {
      serviceTypeName,
      description
    });

    return res.status(200).json({
      success: true,
      message: 'Updated successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ════════════════════════════║  API TO Delete Service By Id ║═════════════════════════════════//
export const DeleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const Service = await ServiceType.findById(id);

    if (!Service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    await ServiceType.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ════════════════════════════║  API TO Update Service Status By Id ║═════════════════════════════════//
export async function UpdateserviceTypestatus(req, res) {
  const { id } = req.params;
  const status = await ServiceType.findOne({ _id: id });
  try {
    const ServiceDetails = await ServiceType.findOneAndUpdate(
      { _id: id },
      {
        // if status is 1, then change to 0, and vice
        status: status?.status == 1 ? 0 : 1
      },
      { new: true }
    );

    if (!ServiceDetails) {
      return res.status(200).json({
        success: false,
        message: 'Service not found'
      });
    }
    return res.status(200).json({
      success: true,
      message:
        ServiceDetails?.status == 1 ? 'Service is Activated' : 'Service is Deactivated',
      data: ServiceDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// ════════════════════════════║  API TO Update Service Status By Id ║═════════════════════════════════//



