const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button id={person.id} name={person.name} onClick={handleDelete}>delete</button>
      </div>
    )}
  </div>
)

export default Persons