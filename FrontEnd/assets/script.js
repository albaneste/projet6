document.addEventListener("DOMContentLoaded", (event) => {

    let imagesapi

    async function getWork() {
        const photos = await fetch('http://localhost:5678/api/works')
        const photosJson = await photos.json()
        imagesapi = photosJson
        displayImage(photosJson)
        console.log(photosJson)
    }


    const gallery = document.querySelector(".gallery")

    function displayImage(images) {
        gallery.innerHTML = "";
        images.forEach(image => {
            let figure = document.createElement("figure")
            let img = document.createElement("img")
            let figcaption = document.createElement("figcaption")

            img.src = image.imageUrl
            img.alt = image.title
            figcaption.innerText = image.title

            figure.appendChild(img)
            figure.appendChild(figcaption)
            gallery.appendChild(figure)
        });

    }


    async function getCategories() {
        const categories = await fetch('http://localhost:5678/api/categories')
        const categoriesJson = await categories.json()
        displayCategories(categoriesJson)

    }

    const categoriesdiv = document.querySelector(".categories")

    function displayCategories(categories) {
        let tous = document.createElement("button")
        tous.innerText = "Tous"
        tous.addEventListener("click", function () {
            displayImage(imagesapi)
        })
        categoriesdiv.appendChild(tous)

        categories.forEach(categorie => {
            let button = document.createElement("button")
            button.innerText = categorie.name
            button.addEventListener("click", function () { filtre(categorie.id) })


            categoriesdiv.appendChild(button)
        })
    }

    function filtre(filtreid) {
        console.log(imagesapi)
        const imagesfiltered = imagesapi.filter(image =>
            image.categoryId == filtreid
        )

        displayImage(imagesfiltered)

    }

    const token = localStorage.getItem('token');

    function getUser() {
        const login = document.querySelector('.login');
        const logout = document.querySelector('.logout');
        const banner = document.querySelector('.banner');
        const modifier = document.querySelector('.modifier');
        const close = document.querySelector('.close')
        const modal = document.querySelector('.modal')

        if (token !== null) {

            logout.addEventListener("click", function () {
                localStorage.clear();
                location.reload();
            })

            logout.classList.remove("hide");
            login.classList.add("hide");
            banner.classList.remove("hide");
            modifier.classList.remove("hide");
            categoriesdiv.parentNode.removeChild(categoriesdiv);


            modifier.addEventListener("click", function () {
                modal.style.display = "block"
                getModalWork()
            })

            banner.addEventListener("click", function () {
                modal.style.display = "block"
            })

            close.addEventListener("click", function () {
                modal.style.display = "none"
            })

        }

    }

    async function getModalWork() {
        const photos = await fetch('http://localhost:5678/api/works')
        const photosJson = await photos.json()
        displayModalImage(photosJson)
    }

    const modalgallery = document.querySelector(".modal-gallery")

    function displayModalImage(images) {
        modalgallery.innerHTML = "";
        images.forEach(image => {
            let figure = document.createElement("figure")
            let img = document.createElement("img")
            let trash = document.createElement("div")
            let trashicon = document.createElement("i")
            trashicon.classList.add("fa-solid", "fa-trash-can")

            trash.addEventListener("click", function () {
                deleteImage(image.id)
                
            })


            img.src = image.imageUrl
            img.alt = image.title
            trash.classList.add("trash")
            trash.appendChild(trashicon)
            figure.appendChild(trash)
            figure.appendChild(img)
            modalgallery.appendChild(figure)
        });

    }

    async function deleteImage(imageid) {
        console.log(token)
        await fetch("http://localhost:5678/api/works/"+ imageid, {
            method: 'DELETE',
            headers: {
                Accept: "*/*",
                Authorization: "Bearer " + token,
            },   

        }) 


    }





















    getCategories()
    getWork()
    getUser()
});