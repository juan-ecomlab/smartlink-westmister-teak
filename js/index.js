const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (email, client) => {
    const item = {
        email,
        client
    }

    const urlLambda = "https://u57njg43jj.execute-api.sa-east-1.amazonaws.com/"

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        };
        fetch(urlLambda, options)
        .then(data => {
            if(!data.ok) {
                throw Error(data.status)
            }
            return data.json()
        }).then(email => {
            console.log(email)
        }).catch(e => {
            console.log(e);
            });
}

window.addEventListener('load', () => {
    $('email').addEventListener('focus', () => {
        $('error').innerText = ""
    })

    $('email').addEventListener('blur', () => {
        $("email").classList.remove("borde")
    })

    $('email').addEventListener('keydown', () => {
        $('error').innerText = ""
    })

    $("form").addEventListener("submit", event => {
        event.preventDefault()
        let error = false
        let form = $('form');

        if(!emailRegex.test($('email').value)){
            error = true
            $('error').innerText = "*You must enter a valid email address"
            $("form").elements[0].value = ""
        }

        if(!error) {
            agregarEmail(form.elements[0].value, "westminster")
            Swal.fire({
                title: "The email was sent <b><br> to: " + form.elements[0].value + "</b><br><br>Please check your inbox.",
                imageUrl: "img/WM Logo White.svg",
                background: "#7f645c",
                imageAlt: "Regalo",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2500,
                timerProgressBar: true,
                customClass: {
                    title: "title",
                    popup: "alerta",
                    image: "imgAlerta"
                  }
              });
            $("form").elements[0].value = ""
        }
    })

})