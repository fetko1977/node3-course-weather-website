const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('form input')
const getLocationButton = document.querySelector('#get-location')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        console.log(response);
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

getLocationButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    getLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        
        fetch('/weather-by-cordinates?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude).then((response) => {
            response.json().then((data) => {
                if (data.error) {

                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
                getLocationButton.removeAttribute('disabled')
            })
        })
    })
})