import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ cart, onAddToCart, onUpdateQuantity }) {
  const [filter, setFilter] = useState('All')
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const types = ['All', ...new Set(GUNS.map((gun) => gun.type))]
  const visibleGuns = filter === 'All' ? GUNS : GUNS.filter((gun) => gun.type === filter)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleCheckout(event) {
    event.preventDefault()
    setCheckoutComplete(true)
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed
          with its type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <div className="catalog-controls">
            <label htmlFor="type-filter">Type</label>
            <select id="type-filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
              {types.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <span className="count">{visibleGuns.length} pieces</span>
          </div>
        </div>

        <ul className="stock">
          {visibleGuns.map((gun) => (
            <GunCard key={gun.name} gun={gun} onAddToCart={onAddToCart} />
          ))}
        </ul>
      </section>

      <section className="checkout" aria-labelledby="checkout-title">
        <div className="list-head">
          <h2 id="checkout-title">Checkout</h2>
          <span className="count">{cart.length} item types</span>
        </div>
        {checkoutComplete ? (
          <div className="order-success">Order received. We will contact you to confirm the details.</div>
        ) : cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Open a product to add it.</p>
        ) : (
          <form className="checkout-form" onSubmit={handleCheckout}>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.name}>
                  <div><strong>{item.name}</strong><span>{item.type} · ${item.price.toLocaleString()}</span></div>
                  <input
                    aria-label={`Quantity for ${item.name}`}
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(event) => onUpdateQuantity(item.name, Number(event.target.value))}
                  />
                </li>
              ))}
            </ul>
            <div className="checkout-total"><span>Total</span><strong>${total.toLocaleString()}</strong></div>
            <label>Full name<input required name="name" /></label>
            <label>Email<input required type="email" name="email" /></label>
            <button className="checkout-button" type="submit">Place order</button>
          </form>
        )}
      </section>
    </>
  )
}

export default Catalog