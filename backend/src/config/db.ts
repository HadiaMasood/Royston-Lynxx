import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

dotenv.config();

// Determine database file path.
// If DATABASE_FILE_PATH in env ends with .json, we change it to .sqlite for SQLite
let rawDbPath = process.env.DATABASE_FILE_PATH || './data/db.sqlite';
if (process.env.VERCEL) {
  rawDbPath = '/tmp/db.sqlite';
} else if (rawDbPath.endsWith('.json')) {
  rawDbPath = rawDbPath.replace(/\.json$/, '.sqlite');
}

const dbPath = path.resolve(process.cwd(), rawDbPath);

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('[Database] Could not connect to SQLite database:', err.message);
  } else {
    console.log(`[Database] Connected to SQLite database at: ${dbPath}`);
  }
});

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

// Database helper wrappers to use native Promises (preventing callback hell & supporting async/await)
export function dbRun(sql: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error('[Database Error] dbRun failed:', err.message, 'SQL:', sql);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function dbGet<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        console.error('[Database Error] dbGet failed:', err.message, 'SQL:', sql);
        reject(err);
      } else {
        resolve(row as T | undefined);
      }
    });
  });
}

export function dbAll<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('[Database Error] dbAll failed:', err.message, 'SQL:', sql);
        reject(err);
      } else {
        resolve(rows as T[]);
      }
    });
  });
}

// Initialize tables and run migrations if needed
export async function initDb(): Promise<void> {
  // Create bookings table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS bookings (
      ref TEXT PRIMARY KEY,
      routeType TEXT NOT NULL,
      pickup TEXT NOT NULL,
      dropoff TEXT NOT NULL,
      pickupDate TEXT NOT NULL,
      pickupTime TEXT NOT NULL,
      returnDate TEXT,
      returnTime TEXT,
      passengers INTEGER NOT NULL,
      luggage INTEGER NOT NULL,
      vehicleClass TEXT NOT NULL,
      vehicleImage TEXT NOT NULL,
      price REAL NOT NULL,
      passengerName TEXT NOT NULL,
      passengerEmail TEXT NOT NULL,
      passengerPhone TEXT NOT NULL,
      flightNumber TEXT,
      specialRemarks TEXT,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  // Create contacts table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  // Create drivers table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS drivers (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      badgeNumber TEXT NOT NULL,
      council TEXT NOT NULL,
      vehicleModel TEXT NOT NULL,
      message TEXT,
      createdAt TEXT NOT NULL
    )
  `);

  // Migrate data from existing JSON database if present and SQLite is empty
  await migrateFromJson();
}

async function migrateFromJson(): Promise<void> {
  const jsonDbPath = path.resolve(dbDir, 'db.json');
  if (!fs.existsSync(jsonDbPath)) {
    return;
  }

  try {
    const bookingsCount = await dbGet<{ count: number }>('SELECT COUNT(*) as count FROM bookings');
    const contactsCount = await dbGet<{ count: number }>('SELECT COUNT(*) as count FROM contacts');
    const driversCount = await dbGet<{ count: number }>('SELECT COUNT(*) as count FROM drivers');

    // Only migrate if SQLite tables are empty
    if (
      bookingsCount?.count === 0 &&
      contactsCount?.count === 0 &&
      driversCount?.count === 0
    ) {
      console.log('[Database Migration] SQLite tables are empty. Migrating existing data from db.json...');
      const dataRaw = fs.readFileSync(jsonDbPath, 'utf8');
      const data = JSON.parse(dataRaw);

      if (data.bookings && Array.isArray(data.bookings)) {
        console.log(`[Database Migration] Migrating ${data.bookings.length} bookings...`);
        for (const b of data.bookings) {
          await dbRun(
            `INSERT INTO bookings (
              ref, routeType, pickup, dropoff, pickupDate, pickupTime, 
              returnDate, returnTime, passengers, luggage, vehicleClass, 
              vehicleImage, price, passengerName, passengerEmail, 
              passengerPhone, flightNumber, specialRemarks, status, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              b.ref, b.routeType, b.pickup, b.dropoff, b.pickupDate, b.pickupTime,
              b.returnDate, b.returnTime, b.passengers, b.luggage, b.vehicleClass,
              b.vehicleImage, b.price, b.passengerName, b.passengerEmail,
              b.passengerPhone, b.flightNumber || '', b.specialRemarks || '', b.status, b.createdAt
            ]
          );
        }
      }

      if (data.contacts && Array.isArray(data.contacts)) {
        console.log(`[Database Migration] Migrating ${data.contacts.length} contact submissions...`);
        for (const c of data.contacts) {
          await dbRun(
            `INSERT INTO contacts (id, name, email, phone, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [c.id, c.name, c.email, c.phone, c.subject, c.message, c.createdAt]
          );
        }
      }

      if (data.drivers && Array.isArray(data.drivers)) {
        console.log(`[Database Migration] Migrating ${data.drivers.length} driver applications...`);
        for (const d of data.drivers) {
          await dbRun(
            `INSERT INTO drivers (id, firstName, lastName, email, phone, badgeNumber, council, vehicleModel, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [d.id, d.firstName, d.lastName, d.email, d.phone, d.badgeNumber, d.council, d.vehicleModel, d.message || '', d.createdAt]
          );
        }
      }

      console.log('[Database Migration] Migration from db.json completed successfully.');
    }
  } catch (error) {
    console.error('[Database Migration Error] Failed to migrate from db.json:', error);
  }
}

// Repository Helper Functions (re-implemented to run SQL query promises)
export const BookingsRepository = {
  getAll: async (): Promise<Booking[]> => {
    return await dbAll<Booking>('SELECT * FROM bookings ORDER BY createdAt DESC');
  },
  
  getByRef: async (ref: string): Promise<Booking | undefined> => {
    return await dbGet<Booking>('SELECT * FROM bookings WHERE LOWER(ref) = LOWER(?)', [ref]);
  },
  
  save: async (booking: Booking): Promise<void> => {
    const existing = await dbGet<Booking>('SELECT ref FROM bookings WHERE ref = ?', [booking.ref]);
    if (existing) {
      await dbRun(
        `UPDATE bookings SET 
          routeType = ?, pickup = ?, dropoff = ?, pickupDate = ?, pickupTime = ?, 
          returnDate = ?, returnTime = ?, passengers = ?, luggage = ?, vehicleClass = ?, 
          vehicleImage = ?, price = ?, passengerName = ?, passengerEmail = ?, 
          passengerPhone = ?, flightNumber = ?, specialRemarks = ?, status = ?
         WHERE ref = ?`,
        [
          booking.routeType, booking.pickup, booking.dropoff, booking.pickupDate, booking.pickupTime,
          booking.returnDate, booking.returnTime, booking.passengers, booking.luggage, booking.vehicleClass,
          booking.vehicleImage, booking.price, booking.passengerName, booking.passengerEmail,
          booking.passengerPhone, booking.flightNumber || '', booking.specialRemarks || '', booking.status,
          booking.ref
        ]
      );
    } else {
      await dbRun(
        `INSERT INTO bookings (
          ref, routeType, pickup, dropoff, pickupDate, pickupTime, 
          returnDate, returnTime, passengers, luggage, vehicleClass, 
          vehicleImage, price, passengerName, passengerEmail, 
          passengerPhone, flightNumber, specialRemarks, status, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.ref, booking.routeType, booking.pickup, booking.dropoff, booking.pickupDate, booking.pickupTime,
          booking.returnDate, booking.returnTime, booking.passengers, booking.luggage, booking.vehicleClass,
          booking.vehicleImage, booking.price, booking.passengerName, booking.passengerEmail,
          booking.passengerPhone, booking.flightNumber || '', booking.specialRemarks || '', booking.status, booking.createdAt
        ]
      );
    }
  },

  updateStatus: async (ref: string, status: 'Confirmed' | 'Pending' | 'Cancelled'): Promise<boolean> => {
    const existing = await dbGet<{ ref: string }>('SELECT ref FROM bookings WHERE LOWER(ref) = LOWER(?)', [ref]);
    if (existing) {
      await dbRun('UPDATE bookings SET status = ? WHERE LOWER(ref) = LOWER(?)', [status, ref]);
      return true;
    }
    return false;
  }
};

export const ContactsRepository = {
  saveSubmission: async (contact: ContactSubmission): Promise<void> => {
    await dbRun(
      `INSERT INTO contacts (id, name, email, phone, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [contact.id, contact.name, contact.email, contact.phone, contact.subject, contact.message, contact.createdAt]
    );
  },
  
  saveDriverApplication: async (driver: DriverApplication): Promise<void> => {
    await dbRun(
      `INSERT INTO drivers (id, firstName, lastName, email, phone, badgeNumber, council, vehicleModel, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [driver.id, driver.firstName, driver.lastName, driver.email, driver.phone, driver.badgeNumber, driver.council, driver.vehicleModel, driver.message, driver.createdAt]
    );
  }
};
