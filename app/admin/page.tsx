'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  // State for inventory management
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('STORAGE')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // Simple hardcoded pin for your client (Change this to whatever password you want!)
  const ADMIN_PASSWORD = 'comrades_hub_2026'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password!')
    }
  }

  // 1. Fetch active inventory from Supabase
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('household_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems()
    }
  }, [isAuthenticated])

  // 2. Add item handler
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('household_items').insert([
      { 
        title, 
        price: Number(price), 
        category, 
        description, 
        image_url: imageUrl 
      }
    ])
    
    if (!error) {
      alert('Product published live!')
      setTitle(''); setPrice(''); setDescription(''); setImageUrl('')
      fetchItems() // Refresh live display list
    } else {
      alert('Error saving product: ' + error.message)
    }
  }

  // 3. Delete item handler
  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this product from the website permanently?')) {
      const { error } = await supabase.from('household_items').delete().eq('id', id)
      if (!error) {
        alert('Product successfully removed!')
        fetchItems()
      } else {
        alert('Error deleting: ' + error.message)
      }
    }
  }

  // --- PASSWORD LOCK GATE SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-4">
        <div className="bg-[#121212] border border-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <h1 className="text-xl font-bold mb-2 text-center text-amber-500">Comrades Hub Admin</h1>
          <p className="text-zinc-400 text-sm mb-6 text-center">Enter your access code to manage catalog</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Access Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 mb-4 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 text-center text-lg"
            />
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition duration-200">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  // --- FULL MANAGEMENT DASHBOARD SCREEN ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* LEFT COLUMN: UPLOAD FORM */}
        <div className="w-full md:w-5/12">
          <h1 className="text-2xl font-bold text-amber-500 mb-1">Inventory Manager</h1>
          <p className="text-zinc-400 text-sm mb-6">Add new household products live onto the marketplace.</p>
          
          <form onSubmit={handleAddItem} className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Product Title</label>
              <input type="text" placeholder="e.g., Multilayer Shoe Rack" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Asking Price (KES)</label>
              <input type="number" placeholder="1000" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Category Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm">
                <option value="STORAGE">STORAGE</option>
                <option value="STUDY">STUDY</option>
                <option value="KITCHEN">KITCHEN</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Image Direct Link (URL)</label>
              <input type="text" placeholder="https://i.postimg.cc/image.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Description & Condition</label>
              <textarea placeholder="Sturdy metallic frame space-saving profile..." value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl h-24 focus:outline-none focus:border-amber-500 text-sm resize-none"/>
            </div>

            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition duration-200 text-sm">
              Publish Product Live
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ACTIVE ITEMS MANAGEMENT LIST */}
        <div className="w-full md:w-7/12">
          <h2 className="text-2xl font-bold mb-1 text-zinc-100">Live Catalog Listings</h2>
          <p className="text-zinc-400 text-sm mb-6">Currently active listings displayed to visitors ({items.length})</p>
          
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {items.length === 0 ? (
              <p className="text-zinc-500 italic text-sm">No items currently active in the store database.</p>
            ) : (
              items.map((item: any) => (
                <div key={item.id} className="bg-[#121212] p-4 rounded-xl border border-zinc-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image_url} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-zinc-800" />
                    <div>
                      <p className="font-bold text-sm text-zinc-100">{item.title}</p>
                      <p className="text-xs text-zinc-400">KES {item.price.toLocaleString()} • <span className="text-amber-500 font-semibold">{item.category}</span></p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteItem(item.id)} className="bg-red-950/40 text-red-400 border border-red-900/50 px-3 py-1.5 rounded-xl hover:bg-red-600 hover:text-white transition duration-200 text-xs font-semibold">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
