// src/directory/DirectoryApp.jsx

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function DirectoryApp() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMembers() {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('active', true)
        .order('business_name')

      if (error) {
        console.error('Error loading members:', error)
        setLoading(false)
        return
      }

      setMembers(data ?? [])
      setLoading(false)
    }

    loadMembers()
  }, [])

  if (loading) {
    return <p>Loading members...</p>
  }

  return (
    <main>
      {members.map((member) => (
        <h2 key={member.id}>{member.business_name}</h2>
      ))}
    </main>
  )
}

export default DirectoryApp