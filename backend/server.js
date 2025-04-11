const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// product data
let products = [
  // Smartphones
  {
    id: 1,
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    description: 'Apple’s latest flagship with A17 Pro chip and titanium design.',
    price: '₹1,59,900',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },
  {
    id: 2,
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    description: '6.8" QHD+ AMOLED, Snapdragon 8 Gen 3, 200MP camera.',
    price: '₹1,29,999',
    deliveryEstimate: '3-5 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'Limited Stock',
  },
  {
    id: 3,
    brand: 'Xiaomi',
    name: '14 Pro',
    description: 'Leica optics, Snapdragon 8 Gen 3, fast charging.',
    price: '₹69,999',
    deliveryEstimate: '2-3 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },
  {
    id: 4,
    brand: 'Vivo',
    name: 'X100 Pro',
    description: 'Flagship camera and performance at value pricing.',
    price: '₹89,999',
    deliveryEstimate: '2-3 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },
  {
    id: 5,
    brand: 'OnePlus',
    name: '12',
    description: 'Powerful performance with clean UI and 100W fast charging.',
    price: '₹64,999',
    deliveryEstimate: '3-5 business days',
    returnPolicy: 'Returnable within 15 days.',
    status: 'In Stock',
  },

  // Laptops
  {
    id: 6,
    brand: 'HP',
    name: 'Spectre x360',
    description: 'Premium 2-in-1 laptop with Intel i7 and OLED display.',
    price: '₹1,39,999',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'In Stock',
  },
  {
    id: 7,
    brand: 'Lenovo',
    name: 'Legion 5 Pro',
    description: 'Gaming beast with Ryzen 7, RTX 4070, and QHD display.',
    price: '₹1,49,000',
    deliveryEstimate: '3-6 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'Limited Stock',
  },
  {
    id: 8,
    brand: 'ASUS',
    name: 'Zenbook 14 OLED',
    description: 'Ultra-thin, lightweight with stunning OLED display.',
    price: '₹94,999',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'In Stock',
  },

  // Furniture
  {
    id: 9,
    brand: 'Urban Ladder',
    name: 'Study Table',
    description: 'Solid wood modern desk with storage.',
    price: '₹8,999',
    deliveryEstimate: '5-8 business days',
    returnPolicy: 'Returnable within 5 days.',
    status: 'In Stock',
  },
  {
    id: 10,
    brand: 'Wakefit',
    name: 'Ergonomic Chair',
    description: 'Adjustable mesh chair for long working hours.',
    price: '₹5,499',
    deliveryEstimate: '3-5 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },

  // Sneakers
  {
    id: 11,
    brand: 'Nike',
    name: 'Air Max 90',
    description: 'Iconic sneakers with air-cushioned comfort.',
    price: '₹11,995',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'In Stock',
  },
  {
    id: 12,
    brand: 'Adidas',
    name: 'Ultraboost Light',
    description: 'Lightweight and responsive running shoes.',
    price: '₹14,999',
    deliveryEstimate: '3-6 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'Limited Stock',
  },
  {
    id: 13,
    brand: 'Puma',
    name: 'RS-X Efekt',
    description: 'Chunky sole retro-style sneakers for everyday wear.',
    price: '₹7,999',
    deliveryEstimate: '2-5 business days',
    returnPolicy: 'Returnable within 5 days.',
    status: 'In Stock',
  },
  {
    id: 14,
    brand: 'LG',
    name: '6.5 kg Front Load Washing Machine',
    description: 'Inverter direct drive, 1200 RPM, 10-year motor warranty.',
    price: '₹29,499',
    deliveryEstimate: '3-5 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'In Stock',
  },
  {
    id: 15,
    brand: 'Voltas',
    name: '1.5 Ton Inverter Split AC',
    description: 'Copper condenser, 5-star energy rating, turbo cooling.',
    price: '₹38,990',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'Limited Stock',
  },
  {
    id: 16,
    brand: 'Apple',
    name: 'Watch Series 9 GPS',
    description: '45mm display, blood oxygen and ECG apps, S9 chip.',
    price: '₹44,900',
    deliveryEstimate: '2-3 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'In Stock',
  },
  {
    id: 17,
    brand: 'Noise',
    name: 'ColorFit Icon Buzz',
    description: 'Bluetooth calling, heart rate monitor, 7-day battery.',
    price: '₹1,799',
    deliveryEstimate: '2-5 business days',
    returnPolicy: 'Returnable within 5 days.',
    status: 'In Stock',
  },
  {
    id: 18,
    brand: 'Prestige',
    name: 'Induction Cooktop - PIC 20.0',
    description: '1200 watts, push-button control, auto voltage adjust.',
    price: '₹1,849',
    deliveryEstimate: '3-6 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },
  {
    id: 19,
    brand: 'Pigeon',
    name: 'Non-Stick Cookware Set (3 pcs)',
    description: 'Gas stove compatible, soft-touch handles.',
    price: '₹1,299',
    deliveryEstimate: '4-6 business days',
    returnPolicy: 'Returnable within 5 days.',
    status: 'In Stock',
  },
  {
    id: 20,
    brand: 'Philips',
    name: 'Beard Trimmer BT3221',
    description: 'Corded/cordless use, 20 length settings, 90 min runtime.',
    price: '₹1,799',
    deliveryEstimate: '2-4 business days',
    returnPolicy: 'Returnable within 7 days.',
    status: 'In Stock',
  },
  {
    id: 21,
    brand: 'Dyson',
    name: 'Supersonic Hair Dryer',
    description: 'Fast drying, intelligent heat control, premium design.',
    price: '₹34,900',
    deliveryEstimate: '3-5 business days',
    returnPolicy: 'Returnable within 10 days.',
    status: 'Limited Stock',
  },
];
// FAQs
const faqs = [
  {
    question: "What is the return policy?",
    answer: "You can return most items within 7 to 10 days of delivery. Electronics may have brand-specific rules.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 2-5 business days depending on your location and product availability.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, COD is available on most items under ₹50,000.",
  },
  {
    question: "Are products covered by warranty?",
    answer: "Yes, all electronics are covered by manufacturer warranty as per product description.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking link via SMS and email.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: "Yes, you can cancel your order within 2 hours of placing it, unless it's already shipped."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Debit/Credit Cards, Net Banking, Wallets like Paytm & PhonePe, and COD."
  },
  {
    question: "Is there any delivery charge?",
    answer: "We offer free delivery on orders above ₹499. For orders below that, a small delivery fee of ₹49 applies."
  },
  {
    question: "Do I need to create an account to place an order?",
    answer: "No, guest checkout is available. But having an account lets you track orders and access offers easily."
  },
  {
    question: "How do I return an item?",
    answer: "Log in, go to 'My Orders', select the item, and click on 'Return'. Follow the steps provided."
  },
  {
    question: "Will I get a refund after returning?",
    answer: "Yes, refunds are processed within 5-7 business days after the returned item passes inspection."
  },
  {
    question: "Are there any discounts for first-time buyers?",
    answer: "Absolutely! First-time buyers can use code **WELCOME100** to get ₹100 off on orders above ₹999."
  },
  {
    question: "Do you deliver to all locations in India?",
    answer: "We deliver to 20,000+ pin codes across India. Some remote areas may have limited service."
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer: "Yes, exchanges are allowed for size or color issues on eligible items within 7 days."
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer: "Contact us within 48 hours with pictures of the damage, and we’ll arrange a replacement or refund ASAP."
  }
];

// Get FAQs
app.get('/api/faqs', (req, res) => {
  res.json(faqs);
});

// Chat route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Please provide a valid message to continue the conversation.' });
  }

  const lowerMsg = message.toLowerCase();

  // Try to match products based on user query
  const matchedProducts = products.filter(p => {
    return (
      lowerMsg.includes(p.name.toLowerCase()) ||
      lowerMsg.includes(p.brand.toLowerCase()) ||
      lowerMsg.includes(p.description.toLowerCase())
    );
  });

  const relevantProducts = matchedProducts.length > 0 ? matchedProducts : products;

  const productInfo = relevantProducts.map(p => (
    `📦 ${p.brand} ${p.name}\n` +
    `- Description: ${p.description}\n` +
    `- Price: ${p.price}\n` +
    `- Delivery: ${p.deliveryEstimate}\n` +
    `- Return Policy: ${p.returnPolicy}\n` +
    `- Status: ${p.status}\n`
  )).join('\n');

  const prompt = `
You are a friendly, helpful AI assistant for an Indian online shopping website.

The customer asked: "${message}"

Use the product details below to answer in a warm, natural tone. Avoid repeating greetings like "hello" unless its the start of a conversation.

Product Catalog:
${productInfo}
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ reply: 'Sorry, I’m having trouble fetching the info right now. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});
