import AdminMemberList from './AdminMemberList'

function AdminDashboard({
  members,
  onToggleActive,
  onDeleteMember,
}) {
  return (
    <main>
      <header>
        <h1>IVCC Business Membership Manager</h1>
      </header>

      <section>
        <button type="button">
          + Add Member
        </button>
      </section>

   <AdminMemberList
  members={members}
  onToggleActive={onToggleActive}
  onDeleteMember={onDeleteMember}
/>
    </main>
  )
}

export default AdminDashboard