const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('form input')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})