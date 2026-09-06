import AdminMemberList from './AdminMemberList'

function AdminDashboard({
  members,
  onToggleActive,
  onDeleteMember,
  onAddMember,
}) {
  return (
    <main>
      <header>
        <h1>IVCC Business Membership Manager</h1>
      </header>

      <section>
        <button
          type="button"
          onClick={onAddMember}
        >
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