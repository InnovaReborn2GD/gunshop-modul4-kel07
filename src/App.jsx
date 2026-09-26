import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  function addToCart(gun) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.name === gun.name)

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentCart, { ...gun, quantity: 1 }]
    })
  }

  function updateQuantity(name, quantity) {
    setCart((currentCart) =>
      quantity === 0
        ? currentCart.filter((item) => item.name !== name)
        : currentCart.map((item) => (item.name === name ? { ...item, quantity } : item)),
    )
  }

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <main className="main">
        {tab === 'Catalog' && (
          <Catalog cart={cart} onAddToCart={addToCart} onUpdateQuantity={updateQuantity} />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      <Footer />
    </div>
  )
}

export default App