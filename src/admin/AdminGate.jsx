import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminApp from './AdminApp'

function AdminGate() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getInitialSession() {
      const { data } = await supabase.auth.getSession()

      setSession(data.session)
      setLoading(false)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminApp onLogout={handleLogout} />
}

export default AdminGate