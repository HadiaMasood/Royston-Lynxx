import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(
  process.cwd(),
  process.env.DATABASE_FILE_PATH || './data/db.json'
);

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export interface Booking {
  ref: string;
  routeType: 'one-way' | 'return';
  pickup: string;
  dropoff: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string | null;
  returnTime: string | null;
  passengers: number;
  luggage: number;
  vehicleClass: string;
  vehicleImage: string;
  price: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  flightNumber?: string;
  specialRemarks?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface DriverApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  badgeNumber: string;
  council: string;
  vehicleModel: string;
  message: string;
  createdAt: string;
}

interface DatabaseSchema {
  bookings: Booking[];
  contacts: ContactSubmission[];
  drivers: DriverApplication[];
}

const defaultSchema: DatabaseSchema = {
  bookings: [],
  contacts: [],
  drivers: [],
};

// Read Database
export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      writeDb(defaultSchema);
      return defaultSchema;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading database file, using empty default:', error);
    return defaultSchema;
  }
}

// Write Database
export function writeDb(data: DatabaseSchema): void {
  try {
    // Write atomically (write to temp file then rename is best practice, but JSON write is fine here)
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync(dbPath, dataString, 'utf8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Repository Helper Functions
export const BookingsRepository = {
  getAll: (): Booking[] => {
    return readDb().bookings;
  },
  
  getByRef: (ref: string): Booking | undefined => {
    return readDb().bookings.find(b => b.ref.toLowerCase() === ref.toLowerCase());
  },
  
  save: (booking: Booking): void => {
    const db = readDb();
    const existingIndex = db.bookings.findIndex(b => b.ref === booking.ref);
    if (existingIndex > -1) {
      db.bookings[existingIndex] = booking;
    } else {
      db.bookings.push(booking);
    }
    writeDb(db);
  },

  updateStatus: (ref: string, status: 'Confirmed' | 'Pending' | 'Cancelled'): boolean => {
    const db = readDb();
    const existing = db.bookings.find(b => b.ref.toLowerCase() === ref.toLowerCase());
    if (existing) {
      existing.status = status;
      writeDb(db);
      return true;
    }
    return false;
  }
};

export const ContactsRepository = {
  saveSubmission: (contact: ContactSubmission): void => {
    const db = readDb();
    db.contacts.push(contact);
    writeDb(db);
  },
  
  saveDriverApplication: (driver: DriverApplication): void => {
    const db = readDb();
    db.drivers.push(driver);
    writeDb(db);
  }
};
