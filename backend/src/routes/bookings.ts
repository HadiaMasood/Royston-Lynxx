import { Router, Request, Response, NextFunction } from 'express';
import { BookingsRepository, Booking } from '../config/db';
import { validateBody, bookingValidationSchema } from '../middleware/validation';

const router = Router();

// GET all bookings (Admin/Debug view)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await BookingsRepository.getAll();
    res.json({ status: 'success', data: bookings });
  } catch (error) {
    next(error);
  }
});

// GET single booking by reference
router.get('/:ref', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ref } = req.params;
    if (!ref) {
      res.status(400).json({ status: 'error', message: 'Booking reference is required' });
      return;
    }

    const booking = await BookingsRepository.getByRef(ref);
    if (!booking) {
      res.status(404).json({ status: 'error', message: `Booking with reference ${ref} not found` });
      return;
    }

    res.json({ status: 'success', data: booking });
  } catch (error) {
    next(error);
  }
});

// POST create booking
router.post('/', validateBody(bookingValidationSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;
    
    // Generate secure reference if not provided by client
    // Expected format: QH-123456 (matching frontend QH-XXXXXX pattern)
    const ref = payload.ref || `QH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: Booking = {
      ref,
      routeType: payload.routeType,
      pickup: payload.pickup,
      dropoff: payload.dropoff,
      pickupDate: payload.pickupDate,
      pickupTime: payload.pickupTime,
      returnDate: payload.returnDate || null,
      returnTime: payload.returnTime || null,
      passengers: payload.passengers,
      luggage: payload.luggage,
      vehicleClass: payload.vehicleClass,
      vehicleImage: payload.vehicleImage,
      price: payload.price,
      passengerName: payload.passengerName,
      passengerEmail: payload.passengerEmail,
      passengerPhone: payload.passengerPhone,
      flightNumber: payload.flightNumber || '',
      specialRemarks: payload.specialRemarks || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    await BookingsRepository.save(newBooking);

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    next(error);
  }
});

// POST cancel booking
router.post('/:ref/cancel', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ref } = req.params;
    if (!ref) {
      res.status(400).json({ status: 'error', message: 'Booking reference is required' });
      return;
    }

    const updated = await BookingsRepository.updateStatus(ref, 'Cancelled');
    if (!updated) {
      res.status(404).json({ status: 'error', message: `Booking with reference ${ref} not found` });
      return;
    }

    const booking = await BookingsRepository.getByRef(ref);
    res.json({
      status: 'success',
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

export default router;
