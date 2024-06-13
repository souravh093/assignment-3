import { Request, Response } from 'express';
import httpStatus from 'http-status';

const noDataFound = (req: Request, res: Response, data: []) => {
  if (data.length > 1) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
};

export default noDataFound;
