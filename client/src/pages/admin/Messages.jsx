import { useEffect, useState } from 'react'
import { adminAPI } from '../../services/api'
import { useLanguage } from '../../context/LanguageContext'
import toast from 'react-hot-toast'

export default function AdminMessages() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ total: 0, pages: 1, limit: 20 })
  const [selected, setSelected] = useState(null)

  useEffect(() => { load() }, [statusFilter, page])

  async function load() {
    setLoading(true)
    try {
      const { data } = await adminAPI.getContactMessages({ status: statusFilter || undefined, page })
      setMessages(data.messages)
      setPagination(data.pagination)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load messages')
    } finally { setLoading(false) }
  }

  async function markResolved(id) {
    try {
      await adminAPI.updateContactMessageStatus(id, 'resolved')
      toast.success(t({ en: 'Marked resolved', vi: 'Đã đánh dấu giải quyết' }))
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status')
    }
  }

  async function remove(id) {
    if (!confirm(t({ en: 'Delete this message?', vi: 'Xóa tin nhắn này?' }))) return
    try {
      await adminAPI.deleteContactMessage(id)
      toast.success(t({ en: 'Deleted', vi: 'Đã xóa' }))
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete')
    }
  }

  if (loading) return <div className="p-8">{t({ en: 'Loading...', vi: 'Đang tải...' })}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t({ en: 'Contact Messages', vi: 'Tin nhắn liên hệ' })}</h1>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }} className="border rounded px-3 py-2">
          <option value="">{t({ en: 'All', vi: 'Tất cả' })}</option>
          <option value="new">{t({ en: 'New', vi: 'Mới' })}</option>
          <option value="resolved">{t({ en: 'Resolved', vi: 'Đã xử lý' })}</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t({ en: 'From', vi: 'Từ' })}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t({ en: 'Subject', vi: 'Chủ đề' })}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t({ en: 'Status', vi: 'Trạng thái' })}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t({ en: 'Actions', vi: 'Hành động' })}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map(m => (
              <tr key={m.id}>
                <td className="px-6 py-4 text-sm">{m.name}</td>
                <td className="px-6 py-4 text-sm">{m.email}</td>
                <td className="px-6 py-4 text-sm">{m.subject}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${m.status === 'new' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{m.status}</span>
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => setSelected(m)}>{t({ en: 'View', vi: 'Xem' })}</button>
                  {m.status !== 'resolved' && (
                    <button className="text-green-600 hover:text-green-900 mr-3" onClick={() => markResolved(m.id)}>{t({ en: 'Resolve', vi: 'Giải quyết' })}</button>
                  )}
                  <button className="text-red-600 hover:text-red-900" onClick={() => remove(m.id)}>{t({ en: 'Delete', vi: 'Xóa' })}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(pagination.pages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}>{i + 1}</button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-2">{selected.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">{selected.name} &lt;{selected.email}&gt;</p>
            <div className="text-gray-800 whitespace-pre-wrap">{selected.message}</div>
            <div className="mt-6 text-right">
              <button className="px-3 py-2 border rounded mr-2" onClick={() => setSelected(null)}>{t({ en: 'Close', vi: 'Đóng' })}</button>
              {selected.status !== 'resolved' && (
                <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => { markResolved(selected.id); setSelected(null) }}>{t({ en: 'Resolve', vi: 'Giải quyết' })}</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
