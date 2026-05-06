import { useRef, useState } from 'react'
import api from '../api/axios'

export default function ImageUpload({ url, onSuccess, shape = 'rounded-xl', size = 'w-24 h-24', placeholder = '📷', fieldName = 'image' }) {
  const inputRef = useRef()
  const [preview, setPreview] = useState(url || null)
  const [loading, setLoading] = useState(false)

  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)

    setLoading(true)
    const formData = new FormData()
    formData.append(fieldName, file)

    try {
      const { data } = await api.post(onSuccess.uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      onSuccess.callback(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`relative group cursor-pointer ${size} ${shape} overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center`}
      onClick={() => inputRef.current.click()}>
      {preview ? (
        <img src={preview} alt="preview" className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl text-gray-300">{placeholder}</span>
      )}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center">
        <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">Modifier</span>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  )
}
