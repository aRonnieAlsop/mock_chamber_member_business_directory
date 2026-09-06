import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminDashboard from './AdminDashboard'
import AdminMemberForm from './AdminMemberForm'

function AdminApp({ onLogout }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [view, setView] = useState('dashboard')

  async function loadMembers() {
    setLoading(true)

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('business_name')

    if (error) {
      console.error('Error loading members:', error)
      setMessage(`Error loading members: ${error.message}`)
      setLoading(false)
      return
    }

    setMembers(data ?? [])
    setLoading(false)
  }

  async function handleToggleActive(member) {
    const { error } = await supabase
      .from('members')
      .update({
        active: !member.active,
      })
      .eq('id', member.id)

    if (error) {
      console.error('Error changing member status:', error)
      setMessage(`Could not change member status: ${error.message}`)
      return
    }

    await loadMembers()
  }

  async function handleDeleteMember(member) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${member.business_name}"?\n\nThis cannot be undone.\n\nIf the business may return, choose Deactivate instead.`
    )

    if (!confirmed) {
      return
    }

    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', member.id)

    if (error) {
      console.error('Error deleting member:', error)
      setMessage(`Could not delete member: ${error.message}`)
      return
    }

    await loadMembers()
  }

  useEffect(() => {
    loadMembers()
  }, [])

  if (loading) {
    return <p>Loading members...</p>
  }

  if (message) {
    return <p>{message}</p>
  }

  if (view === 'add-member') {
    return (
      <AdminMemberForm
        onCancel={() => setView('dashboard')}
      />
    )
  }

  return (
    <>
      <button type="button" onClick={onLogout}>
        Log out
      </button>

      <AdminDashboard
        members={members}
        onToggleActive={handleToggleActive}
        onDeleteMember={handleDeleteMember}
        onAddMember={() => setView('add-member')}
      />
    </>
  )
}

export default AdminApp