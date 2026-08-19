import { Router, Request, Response, NextFunction } from 'express';
import { ContactsRepository, ContactSubmission, DriverApplication } from '../config/db';
import { validateBody, contactValidationSchema, driverValidationSchema } from '../middleware/validation';
import crypto from 'crypto';

const router = Router();

// POST submit contact inquiry
router.post('/', validateBody(contactValidationSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;
    const id = crypto.randomUUID();

    const submission: ContactSubmission = {
      id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
      createdAt: new Date().toISOString()
    };

    await ContactsRepository.saveSubmission(submission);

    res.status(201).json({
      status: 'success',
      message: 'Inquiry submitted successfully',
      data: { id }
    });
  } catch (error) {
    next(error);
  }
});

// POST submit driver application
router.post('/driver', validateBody(driverValidationSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;
    const id = crypto.randomUUID();

    const application: DriverApplication = {
      id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      badgeNumber: payload.badgeNumber,
      council: payload.council,
      vehicleModel: payload.vehicleModel,
      message: payload.message || '',
      createdAt: new Date().toISOString()
    };

    await ContactsRepository.saveDriverApplication(application);

    res.status(201).json({
      status: 'success',
      message: 'Driver application submitted successfully',
      data: { id }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
