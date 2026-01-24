import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const changeName = (event) => {
    setNewName(event.target.value);
  };
  const changePhone = (event) => {
    setNewPhone(event.target.value);
  };
  const submit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName.trim(),
      number: newPhone.trim(),
    };
    if (!persons.map((person) => person.name).includes(personObject.name)) {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
        setType("success")
        setMessage(`Added ${personObject.name} successfully`);
        setTimeout(() => setMessage(null), 5000);
      });
    } else {
      const existingPerson = persons.find((p) => p.name === personObject.name);
      const updatedPerson = { ...existingPerson, number: personObject.number };

      personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : response.data,
            ),
          );
          setType("success")
          setMessage(`Number for ${personObject.name} changed successfully`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setType("error")
          setMessage(`${personObject.name} was already removed from server`);

          setTimeout(() => setMessage(null), 5000);
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
        });
      setNewName("");
      setNewPhone("");
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;
    personService.remove(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type}/>
      <PersonForm
        onSubmit={submit}
        newName={newName}
        newPhone={newPhone}
        onNameChange={changeName}
        onPhoneChange={changePhone}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
