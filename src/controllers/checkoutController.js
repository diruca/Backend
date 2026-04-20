const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order');
const Product = require('../models/product');

/**
 * Crea una sessió de checkout a Stripe per a una comanda existent
 */
const createCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.body;
        
        const order = await Order.findById(orderId).populate('items.product');
        
        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
        }

        const line_items = order.items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.product.name,
                    description: item.product.description,
                },
                unit_amount: Math.round(item.price * 100), // Stripe usa cèntims
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            client_reference_id: orderId,
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/success`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/cancel`,
            metadata: {
                orderId: orderId.toString()
            }
        });

        res.status(200).json({ status: 'success', sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error en createCheckoutSession:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

/**
 * Gestiona el webhook de Stripe per confirmar el pagament i actualitzar l'estoc
 */
const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gestionar l'esdeveniment
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.client_reference_id;

        try {
            // 1. Actualitzar estat de la comanda
            const order = await Order.findByIdAndUpdate(orderId, { status: 'paid' }, { new: true });
            
            if (order) {
                console.log(`Comanda ${orderId} marcada com a pagada.`);
                
                // 2. Reduir l'estoc dels productes
                for (const item of order.items) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stock: -item.quantity }
                    });
                }
                console.log(`Estoc actualitzat per a la comanda ${orderId}.`);
            }
        } catch (error) {
            console.error('Error actualitzant comanda/estoc:', error);
        }
    }

    res.json({ received: true });
};

module.exports = {
    createCheckoutSession,
    handleWebhook
};
