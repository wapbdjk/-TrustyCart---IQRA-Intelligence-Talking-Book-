import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');

// Ensure data folder and file exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Static Product Images API
const PRODUCT_IMAGES_LIST = [
  {
    id: 'hero',
    titleBn: '১. IQRA ইন্টেলিজেন্ট টকিং বুক ও স্মার্ট টাচ পেন',
    filename: 'iqra_talking_book_main.jpg',
    url: '/images/iqra_talking_book_main.jpg',
  },
  {
    id: 'package',
    titleBn: '২. সম্পূর্ণ প্যাকেজ আনবক্সিং ও গিফট বক্স সেট',
    filename: 'iqra_talking_book_package.jpg',
    url: '/images/iqra_talking_book_package.jpg',
  },
  {
    id: 'detail',
    titleBn: '৩. ইন্টারঅ্যাক্টিভ সাউন্ড পেজ ও স্মার্ট বোতাম',
    filename: 'iqra_talking_book_features.jpg',
    url: '/images/iqra_talking_book_features.jpg',
  },
  {
    id: 'lifestyle',
    titleBn: '৪. শিশুর আনন্দময় স্বতঃস্ফূর্ত শিক্ষা',
    filename: 'iqra_talking_book_child_learning.jpg',
    url: '/images/iqra_talking_book_child_learning.jpg',
  }
];

// Product image download endpoint
app.get('/api/download/:filename', (req: Request, res: Response) => {
  const filename = path.basename(req.params.filename);
  const possiblePaths = [
    path.resolve(__dirname, 'public', 'images', filename),
    path.resolve(__dirname, 'src', 'assets', 'images', filename)
  ];
  
  const found = possiblePaths.find(p => fs.existsSync(p));
  if (found) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'image/jpeg');
    return res.sendFile(found);
  }
  return res.status(404).send('Image file not found');
});

// Product images list
app.get('/api/images', (_req: Request, res: Response) => {
  res.json({ success: true, count: PRODUCT_IMAGES_LIST.length, images: PRODUCT_IMAGES_LIST });
});

interface StoredOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  district: string;
  upazila: string;
  address: string;
  quantity: number;
  unitPrice: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  deliveryInstructions?: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  utmParams?: Record<string, string>;
}

function readOrders(): StoredOrder[] {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

function writeOrders(orders: StoredOrder[]): void {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'TrustyCart Bangladesh Order Server', timestamp: new Date() });
});

// Get orders (for merchant dashboard)
app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = readOrders();
  res.json({ success: true, count: orders.length, orders });
});

// Create new order with strict validation
app.post('/api/orders', (req: Request, res: Response) => {
  const {
    customerName,
    customerPhone,
    district,
    upazila,
    address,
    quantity,
    unitPrice,
    deliveryFee,
    totalAmount,
    deliveryInstructions,
    utmParams
  } = req.body;

  // Validation
  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'গ্রাহকের সঠিক নাম প্রদান করুন।' });
  }

  // Bangladesh mobile validation (01 followed by 3-9 and 8 digits)
  const cleanPhone = String(customerPhone).trim().replace(/\s+/g, '').replace(/[-+]/g, '');
  const bdPhoneRegex = /^(?:88)?(01[3-9]\d{8})$/;
  const match = cleanPhone.match(bdPhoneRegex);

  if (!match) {
    return res.status(400).json({
      success: false,
      message: 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর প্রদান করুন (যেমন: 01712345678)।'
    });
  }

  const validPhone = match[1];

  if (!district || typeof district !== 'string') {
    return res.status(400).json({ success: false, message: 'আপনার জেলা নির্বাচন করুন।' });
  }

  if (!address || typeof address !== 'string' || address.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'ডেলিভারির জন্য সম্পূর্ণ ঠিকানা লিখুন।' });
  }

  const qty = Number(quantity) || 1;
  const price = Number(unitPrice) || 999;
  const shipping = Number(deliveryFee) || 0;
  const total = Number(totalAmount) || (qty * price + shipping);

  // Generate unique human-readable order ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const datePrefix = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const orderId = `TC-${datePrefix}-${randomSuffix}`;

  const newOrder: StoredOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customerName: customerName.trim(),
    customerPhone: validPhone,
    district: district.trim(),
    upazila: (upazila || '').trim(),
    address: address.trim(),
    quantity: qty,
    unitPrice: price,
    deliveryFee: shipping,
    totalAmount: total,
    paymentMethod: 'Cash on Delivery',
    deliveryInstructions: (deliveryInstructions || '').trim(),
    status: 'Pending',
    utmParams: utmParams || {}
  };

  const orders = readOrders();
  orders.unshift(newOrder);
  writeOrders(orders);

  console.log(`[TrustyCart] New order received: ${orderId} | ${validPhone} | ৳${total}`);

  res.status(201).json({
    success: true,
    message: 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।',
    order: newOrder
  });
});

// Update order status
app.patch('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const orders = readOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  orders[index].status = status;
  writeOrders(orders);

  res.json({ success: true, order: orders[index] });
});

// Delete test order
app.delete('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const orders = readOrders();
  const filtered = orders.filter(o => o.id !== id);
  writeOrders(filtered);
  res.json({ success: true, message: 'Order deleted' });
});

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
  const isProd = process.env.NODE_ENV === 'production' || hasDist;

  if (!isProd) {
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn('Vite dev middleware could not be loaded, falling back to static:', err);
      if (hasDist) {
        app.use(express.static(distPath));
        app.get('*', (_req: Request, res: Response) => {
          res.sendFile(path.resolve(distPath, 'index.html'));
        });
      }
    }
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`TrustyCart server running on 0.0.0.0:${PORT} [mode: ${isProd ? 'production' : 'development'}]`);
  });

  server.on('error', (err) => {
    console.error('Server listen error:', err);
  });
}

startServer();
