# Common Goods

A small React marketplace for browsing everyday objects, viewing product details, and managing a persistent cart.

## Run locally

```bash
npm install
npm run dev
```

Production checks are available with `npm run build` and `npm run lint`.

## Structure

- `src/App.jsx` contains the layout and routed page components.
- `src/data/products.js` contains the hardcoded product catalog.
- `src/context/CartContext.jsx` owns cart state and reducer actions.
- `src/App.css` and `src/index.css` contain the responsive visual system.

## Cart architecture

`CartProvider` wraps the routed app, so the Navbar, product cards, details page, cart, and checkout all read from one state source through `useCart()`. `useReducer` handles add, remove, quantity updates, and clear actions. An effect serializes every cart change to `localStorage`, and the provider restores that value when the app starts.

React Router handles `/`, `/products/:id`, and `/cart`. Unknown product IDs render a friendly not-found state. Checkout uses native required-field validation plus a success state; it is intentionally a demo with no payment processing.
