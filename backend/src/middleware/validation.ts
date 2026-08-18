import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Zod Schemas
export const bookingValidationSchema = z.object({
  routeType: z.enum(['one-way', 'return']),
  pickup: z.string().min(1, 'Pickup location is required'),
  dropoff: z.string().min(1, 'Dropoff location is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  returnDate: z.string().nullable().optional(),
  returnTime: z.string().nullable().optional(),
  passengers: z.number().int().min(1, 'At least 1 passenger is required'),
  luggage: z.number().int().nonnegative('Luggage count cannot be negative'),
  vehicleClass: z.string().min(1, 'Vehicle class is required'),
  vehicleImage: z.string().min(1, 'Vehicle image is required'),
  price: z.number().nonnegative('Price cannot be negative'),
  passengerName: z.string().min(1, 'Passenger name is required'),
  passengerEmail: z.string().email('Invalid email address'),
  passengerPhone: z.string().min(1, 'Passenger phone number is required'),
  flightNumber: z.string().optional(),
  specialRemarks: z.string().optional(),
});

export const contactValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export const driverValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  badgeNumber: z.string().min(1, 'Badge number is required'),
  council: z.string().min(1, 'Licensing council is required'),
  vehicleModel: z.string().min(1, 'Vehicle model details are required'),
  message: z.string().optional(),
});

// Middleware factory function
export const validateBody = (schema: z.ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.warn(`[Validation Error] ${req.method} ${req.url} failed validation:`, error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        })));
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
