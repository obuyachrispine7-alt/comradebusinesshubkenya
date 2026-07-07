 'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  // State for inventory management
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('') //
  const [price, setPrice] = useState('') //
  const [category, setCategory] = useState('STORAGE') //
  const [description, setDescription] = useState('') //
  const [imageUrl, setImageUrl] = useState('') //

  // New States for On-Screen Editing Text Controls
  const [heroTitleInput, setHeroTitleInput] = useState('')
  const [heroSubtitleInput, setHeroSubtitleInput] = useState('')
  const [noticeInput, setNoticeInput] = useState('')

  const ADMIN_PASSWORD = 'comrades_hub_2026'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password!')
    }
  }

  const fetchData = async () => {
    // 1. Fetch inventory items
    const { data: itemData } = await supabase
      .from('household_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (itemData) setItems(itemData)

    // 2. Fetch current site layout texts
    const { data: textData } = await supabase.from('site_settings').select('*')
    if (textData) {
      textData.forEach((row: any) => {
        if (row.key === 'hero_title') setHeroTitleInput(row.value)
        if (row.key === 'hero_subtitle') setHeroSubtitleInput(row.value)
        if (row.key === 'household_notice') setNoticeInput(row.value)
      })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const handleAddItem = async (e: React.FormEvent) => { //
    e.preventDefault() //
    const { error } = await supabase.from('household_items').insert([ //
      { title, price: Number(price), category, description, image_url: imageUrl } //
    ]) //
    
    if (!error) { //
      alert('Product published live!') //
      setTitle(''); setPrice(''); setDescription(''); setImageUrl('') //
      fetchData() //
    }
  }

  const handleDeleteItem = async (id: string) => { //
    if (confirm('Are you sure you want to remove this product?')) { //
      const { error } = await supabase.from('household_items').delete().eq('id', id) //
      if (!error) { //
        alert('Product removed!') //
        fetchData() //
      }
    }
  }

  // Update text values in database handler
  const handleUpdateText = async (key: string, value: string) => {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: value })
      .eq('key', key)

    if (!error) {
      alert('Website text updated successfully!')
    } else {
      alert('Error updating text: ' + error.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-4">
        <div className="bg-[#121212] border border-zinc-800 p-8 rounded-2xl w-full max-w-sm">
          <h1 className="text-xl font-bold mb-2 text-center text-amber-500">Comrades Hub Admin</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Access Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mb-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center text-white" />
            <button type="submit" className="w-full bg-amber-500 text-black font-bold py-3 rounded-xl">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* TEXT ON SCREEN EDIT MANAGER SECTION */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-2xl font-bold text-amber-500 mb-1">Live Interface Text Editor</h2>
          <p className="text-zinc-400 text-sm mb-6">Rewrite headings or subheadings instantly across the homepage without coding.</p>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Main Hero Headline</label>
                <input type="text" value={heroTitleInput} onChange={e => setHeroTitleInput(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-amber-500 focus:outline-none"/>
              </div>
              <button onClick={() => handleUpdateText('hero_title', heroTitleInput)} className="bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-600 transition">Save Headline</button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Hero Subtitle Paragraph</label>
                <textarea value={heroSubtitleInput} onChange={e => setHeroSubtitleInput(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white h-20 resize-none focus:border-amber-500 focus:outline-none"/>
              </div>
              <button onClick={() => handleUpdateText('hero_subtitle', heroSubtitleInput)} className="bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-600 transition">Save Subtitle</button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Household Notice Text Box</label>
                <input type="text" value={noticeInput} onChange={e => setNoticeInput(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-amber-500 focus:outline-none"/>
              </div>
              <button onClick={() => handleUpdateText('household_notice', noticeInput)} className="bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-600 transition">Save Notice</button>
            </div>
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* INVENTORY MANAGEMENT SECTION */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* UPLOAD FORM */}
          <div className="w-full md:w-5/12">
            <h3 className="text-xl font-bold text-amber-500 mb-4">Add Catalog Item</h3> {/* */}
            <form onSubmit={handleAddItem} className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-4"> {/* */}
              <div> {/* */}
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Product Title</label> {/* */}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm" /> {/* */}
              </div> {/* */}
              <div> {/* */}
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Asking Price (KES)</label> {/* */}
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm" /> {/* */}
              </div> {/* */}
              <div> {/* */}
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Category</label> {/* */}
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm"> {/* */}
                  <option value="STORAGE">STORAGE</option> {/* */}
                  <option value="STUDY">STUDY</option> {/* */}
                  <option value="KITCHEN">KITCHEN</option> {/* */}
                </select> {/* */}
              </div> {/* */}
              <div> {/* */}
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Image Link (URL)</label> {/* */}
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm" /> {/* */}
              </div> {/* */}
              <div> {/* */}
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Description</label> {/* */}
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl h-20 text-sm resize-none" /> {/* */}
              </div> {/* */}
              <button type="submit" className="w-full bg-amber-500 text-black font-bold py-3 rounded-xl text-sm">Publish Product Live</button> {/* */}
            </form> {/* */}
          </div>

          {/* ACTIVE MANAGEMENT LIST */}
          <div className="w-full md:w-7/12">
            <h3 className="text-xl font-bold mb-4">Live Catalog Listings ({items.length})</h3> {/* */}
            <div className="space-y-3"> {/* */}
              {items.map((item: any) => ( //
                <div key={item.id} className="bg-[#121212] p-4 rounded-xl border border-zinc-800 flex items-center justify-between gap-4"> {/* */}
                  <div className="flex items-center gap-3"> {/* */}
                    <img src={item.image_url} className="w-10 h-10 object-cover rounded-lg" /> {/* */}
                    <div> {/* */}
                      <p className="font-bold text-sm">{item.title}</p> {/* */}
                      <p className="text-xs text-zinc-400">KES {item.price.toLocaleString()} • <span className="text-amber-500">{item.category}</span></p> {/* */}
                    </div> {/* */}
                  </div> {/* */}
                  <button onClick={() => handleDeleteItem(item.id)} className="bg-red-950/40 text-red-400 px-3 py-1 rounded-xl text-xs">Delete</button> {/* */}
                </div> {/* */}
              ))} {/* */}
            </div> {/* */}
          </div>
        </div>

      </div>
    </div>
  )
}
