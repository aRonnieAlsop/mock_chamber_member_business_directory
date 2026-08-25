import DirectoryApp from './directory/DirectoryApp'
import AdminGate from './admin/AdminGate'

function App() {
  const path = window.location.pathname

  if (path.startsWith('/admin')) {
    return <AdminGate />
  }

  return <DirectoryApp />
}

export default App