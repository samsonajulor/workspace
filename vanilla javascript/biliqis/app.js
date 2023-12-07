document.addEventListener('DOMContentLoaded', () => {
  const dataForm = document.getElementById('dataForm');
  const dataInput = document.getElementById('dataInput');
  const dataList = document.getElementById('dataList');

  // Load existing data from Local Storage
  loadFromLocalStorage();

  dataForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = dataInput.value.trim();

    // Validate data entry
    if (!data) {
      alert('Please enter valid data.');
      return;
    }

    // Save data to Local Storage
    saveToLocalStorage(data);

    // Clear input and update the displayed data
    dataInput.value = '';
    loadFromLocalStorage();
  });

  // Function to save data to Local Storage
  function saveToLocalStorage(data) {
    let existingData = JSON.parse(localStorage.getItem('appData')) || [];
    existingData.push(data);
    localStorage.setItem('appData', JSON.stringify(existingData));
  }

  // Function to load and display data from Local Storage
  function loadFromLocalStorage() {
    dataList.innerHTML = '';
    let existingData = JSON.parse(localStorage.getItem('appData')) || [];

    existingData.forEach((data, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <span>${data}</span>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="deleteData(${index})">Delete</button>
            `;
      dataList.appendChild(listItem);
    });
  }

  // Function to delete data from Local Storage
  window.deleteData = function (index) {
    let existingData = JSON.parse(localStorage.getItem('appData')) || [];
    existingData.splice(index, 1);
    localStorage.setItem('appData', JSON.stringify(existingData));
    loadFromLocalStorage();
  };

  // Function to edit data
  window.editData = function (index) {
    let existingData = JSON.parse(localStorage.getItem('appData')) || [];
    const newData = prompt('Edit data:', existingData[index]);

    // Validate edited data
    if (newData !== null && newData.trim() !== '') {
      existingData[index] = newData.trim();
      localStorage.setItem('appData', JSON.stringify(existingData));
      loadFromLocalStorage();
    }
  };
});
