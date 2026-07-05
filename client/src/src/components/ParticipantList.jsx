function ParticipantList({ participants }) {
    return (
      <div style={{ marginTop: "20px" }}>
        <h3>👥 Participants</h3>
  
        {participants.length === 0 ? (
          <p>No participants yet</p>
        ) : (
          <ul>
            {participants.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default ParticipantList;