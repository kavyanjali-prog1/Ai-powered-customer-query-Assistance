const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const products = require('./products');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thecodexcipher@gmail.com',
    pass: 'upibhbkdvhbclinc',
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptionsToSupport = {
    from: email,
    to: 'thecodexcipher@gmail.com',
    subject: subject || 'New Message from ShopMate AI Contact Form',
    text: `
        Hello ShopMate AI Support Team,

        You have received a new message from a user via the ShopMate AI contact form!

        👤 Name: ${name}
        📧 Email: ${email}

        📝 Message:
        ${message}
        `,
  };

  transporter.sendMail(mailOptionsToSupport, (error, info) => {
    if (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
    console.log('Support email sent:', info.response);
  });

  const mailOptionsToUser = {
    from: 'kavyanjali.koripudi2004@gmail.com',
    to: email,
    subject: 'Thank you for reaching out to ShopMate AI!',
    text: `
      Hello ${name},

      Thank you for contacting ShopMate AI! We have received your message and our support team will get back to you shortly.

      Here's a summary of your message:
      
      Subject: ${subject || 'No Subject'}
      Message: ${message}

      This is a system-generated message. Please do not reply to this email.

      We appreciate your feedback and will assist you soon!

      Best regards,
      The ShopMate AI Team
    `,
  };


  transporter.sendMail(mailOptionsToUser, (error, info) => {
    if (error) {
      console.error('Failed to send greeting email to user:', error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
    console.log('Greeting email sent to user:', info.response);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FAQs
const faqs = [
  {
    question: "Where is my order? / How do I track it?",
    answer: "Once your order is shipped, you’ll receive a tracking link via SMS and email."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 2-5 business days depending on your location and product availability."
  },
  {
    question: "Do you deliver everywhere in India?",
    answer: "Yes, we deliver to over 20,000 pin codes across India. Some remote areas may have limited service."
  },
  {
    question: "Is there any delivery charge?",
    answer: "Orders above ₹499 have free delivery. For orders below that, a small delivery fee of ₹49 applies."
  },
  {
    question: "What’s the return policy?",
    answer: "Most items can be returned within 7 to 10 days of delivery. Electronics may have brand-specific rules."
  },
  {
    question: "How do I return an item?",
    answer: "Log in, go to 'My Orders', select the item, and click on 'Return'. Follow the steps provided."
  },
  {
    question: "Can I exchange instead of returning?",
    answer: "Yes, exchanges are allowed for size or color issues on eligible items within 7 days."
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: "Yes, you can cancel your order within 2 hours of placing it, unless it's already shipped."
  },
  {
    question: "When will I get my refund?",
    answer: "Refunds are processed within 5-7 business days after the returned item passes inspection."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Debit/Credit Cards, Net Banking, Wallets like Paytm & PhonePe, and COD."
  },
  {
    question: "Is Cash on Delivery available?",
    answer: "Yes, COD is available on most items under ₹50,000."
  },
  {
    question: "Are there any discounts for first-time buyers?",
    answer: "Absolutely! First-time buyers can use code **WELCOME100** to get ₹100 off on orders above ₹999."
  },
  {
    question: "Do I need to create an account to place an order?",
    answer: "No, guest checkout is available. But having an account lets you track orders and access offers easily."
  },
  {
    question: "What should I do if I receive a damaged or wrong product?",
    answer: "Contact us within 48 hours with pictures of the damage, and we’ll arrange a replacement or refund ASAP."
  },
  {
    question: "Are products covered by warranty?",
    answer: "Yes, all electronics are covered by manufacturer warranty as per product description."
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
