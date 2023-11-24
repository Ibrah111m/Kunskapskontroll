const contactList = document.getElementById('contact-list');
const errorMessage = document.getElementById('error-message');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

let nameFieldOnly = false; // Deklarerar en ny variebl som håller reda på ifall
// namefeild är det enda fältet som kan ändras. Om namefeild är true betyder det att endast namnfält kan
// ändras och om det är false kan både namn och telefon fältet ändras.

// Skapar en funktion för att skapa input-element och konfigurera dess egenskaper
function createInput(type, value, readonly) { 
  const input = document.createElement('input'); // Skapar ett nytt input elemnt
  input.type = type;
  input.value = value; // Sätter värdet för input-elementet 
  input.readOnly = readonly; // anger om det ska vara skrivskyddat (readonly)
  return input; // retunerar det skapade input-elementet
}

// Skapat en funktion för namn och telefon

function createContact(name, phone) {
  const listItem = document.createElement('li'); // skapar en ny listpunkt för varje kontakt.
  const nameField = createInput('text', name, true); // Input fält för namn
  const phoneField = createInput('text', phone, true);// Input fält för telefon
// Skapar en knapp för "Ändra"
  const editButton = document.createElement('button'); 
  editButton.textContent = 'Ändra';
  editButton.addEventListener('click', () => { // Validering för click.
    if (!nameField.value || !phoneField.value) { // kollar om något av fälten är tomma.
        errorMessage.textContent = 'Får ej skapa tom kontakt'; // Felmeddelande om något fält är tomt.
        setTimeout(() =>{ // Skapar en timeout för errormessage.
            errorMessage.innerHTML = "";
            
        }, 3000); // tar bort error message efter 3 sekunder.
        return; // Avbryter funktionen om något fält är ej ifyllt.
      }
      
    errorMessage.textContent = ''; // Rensar felmeddlandet om inga problem finns.

// Ändrar läsbarheten för input-fälten.
    nameFieldOnly = !nameField.readOnly; 
    nameField.readOnly = !nameField.readOnly; 
    phoneField.readOnly = !phoneField.readOnly; 
    editButton.textContent = nameField.readOnly ? 'Ändra' : 'Spara';

  });

  // Skapar ett element för att kunna radera när man klickar på knappen.
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Radera';
  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.append(nameField, phoneField, editButton, deleteButton); //

  contactList.appendChild(listItem); // 
}
// Jag hämtar först create button ifrån html, och lägger till en
// Händelselyssnare för click händelsen, vilket menas med att när
//detta element klickas på så kommmer den angivna funktionen att köras 
// vilket i detta fall är en arrow function som tar ett event
// eventet preventdefault används för att förhindra standard beteendet 
// Vilket i detta fall skulle vara att förmuläret skickas eller att sidan laddas om.
document.getElementById('create-button').addEventListener('click', (event) => {
  event.preventDefault();


// villkorsats som kontrolllerar om värdet i
// nameInput eller phoneinput är falskt, ifall något fält är tomt eller inte innehåller nåhot värde
  if (!nameInput.value || !phoneInput.value) {
    errorMessage.textContent = 'Får ej skapa tom kontakt'; // Om fältet är tomt kommer detta meddelande uppp
    setTimeout(() =>{ // Sätter en timeout för errormessage.
        errorMessage.innerHTML = "";
        
    }, 5000); // Error message försvinner efter 5 sekunder.
  } else { // om ingen av fälten är tomma så kommer det köras. 
    errorMessage.textContent = ''; // Här sätts textinnehållet i elementet som har id error messages till en tom sträng,det gör man för att man vill att eventuella felmeddaldne ska försvinna.
    createContact(nameInput.value, phoneInput.value); // Här ropar jag på funktionen createcontact som har värderna (nameinput o phoneInput som argument, som då kommer skapa en ny kontakt med dessa värden till listan.
    nameInput.value = ''; // Nollställs så att användaren kan ange nya värden 
    phoneInput.value = '';// Nollställs som ovan här oxå
  }
}); 
// Ropar på elementet delete-button från html filen, händelselyssnare för click elementet vilket betyder att när man klickar 
// På detta kommer den angivna funktionen att köras vilket är en arrow function.   
document.getElementById('delete-button').addEventListener('click', () => {
  contactList.innerHTML = ''; // Här sätts html elemntet contactlist till en tom sträng 
  // som sedan kommer tömma listan från alla sina element
}); 
