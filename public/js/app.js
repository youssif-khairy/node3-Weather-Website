const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault() //don't refresh
    
    const location = search.value

    message1.textContent='Loading...'
     message2.textContent=''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error)
                {
                    message1.textContent=data.error
                    message2.textContent=''
                    return 
                }
            message1.textContent=data.name
            message2.textContent=data.forecast
        })
    })//browser api,then is part of another api called promises
    

})


