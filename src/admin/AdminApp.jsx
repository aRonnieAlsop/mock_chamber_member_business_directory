import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function AdminApp({ onLogout }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function loadMembers() {
    setLoading(true)

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('business_name')

    if (error) {
      setMessage(`Error loading members: ${error.message}`)
      setLoading(false)
      return
    }

    setMembers(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadMembers()
  }, [])

async function deleteTestMember() {
  const testMember = members.find(
    (member) => member.business_name === 'CRUD Test Business Updated'
  )

  if (!testMember) {
    setMessage('Updated test member not found.')
    return
  }

  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', testMember.id)

  if (error) {
    setMessage(`Delete failed: ${error.message}`)
    return
  }

  setMessage('Member deleted.')
  await loadMembers()
}

  return (
    <main>
      <h1>Chamber Admin</h1>

      <button type="button" onClick={onLogout}>
        Log out
      </button>

      <h2>CRUD Test</h2>

   <button type="button" onClick={deleteTestMember}>
  Delete Test Member
</button>

      {message && <p>{message}</p>}

      <h2>Members</h2>

      {loading && <p>Loading members...</p>}

      {!loading && (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.business_name}</strong>
              {' — '}
              {member.active ? 'Active' : 'Inactive'}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default AdminApp
