import { useState } from 'react'

function AdminMemberForm({ onCancel }) {
  const [businessName, setBusinessName] = useState('')

  return (
    <main>
      <h2>Add Business Member</h2>

      <form>
        <div>
          <label htmlFor="businessName">
            Business Name
          </label>

          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>

        <button type="button">
          Save Member
        </button>

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </main>
  )
}

export default AdminMemberForm