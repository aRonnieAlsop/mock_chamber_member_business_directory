function AdminMemberList({
  members,
  onToggleActive,
  onDeleteMember,
}) {
  return (
    <section>
      <h2>Business Members</h2>

      {members.length === 0 ? (
        <p>No business members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.business_name}</strong>

              <span>
                {' — '}
                {member.active ? 'Active' : 'Inactive'}
              </span>

              <div>
                <button type="button">
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onToggleActive(member)}
                >
                  {member.active ? 'Deactivate' : 'Activate'}
                </button>

         <button
  type="button"
  onClick={() => onDeleteMember(member)}
>
  Delete
</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminMemberList