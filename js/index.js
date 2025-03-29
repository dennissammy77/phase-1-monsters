document.addEventListener('DOMContentLoaded',()=>{
    const movieLimit = 2;
    let movieListPage = 1;
    // load 50 monsters
    document.getElementById("forward").addEventListener("click",()=>{
        movieListPage++;
        displayMovies();
    });
    document.getElementById("back").addEventListener("click",()=>{
        if(movieListPage !== 1 ){
            movieListPage--;
            displayMovies();
        }
    });

    function displayMovies(){
        const monsterContainer = document.getElementById("monster-container");
        monsterContainer.innerHTML=''
        fetch(`http://localhost:3000/monsters/?_limit=${movieLimit}&_page=${movieListPage}`).then((response)=>response.json()).then((data)=>{
            data.map((monster)=>{
                const monsterData = document.createElement('div');
                monsterData.innerHTML=`
                    <h1>${monster.name}</h1>
                    <strong>${monster.age}</strong>
                    <p>Bio: ${monster.description}</p>
                `
                monsterContainer.appendChild(monsterData)
            })
        }).catch((err)=>{
            console.log(err)
        });
    };
    displayMovies()
    // load form
    document.getElementById("create-monster").innerHTML=`
        <form id="create-monster-form">
            <input name="name" id="name"  type="text" placeholder="name"/>
            <input name="age" id="age"  type="number" placeholder="age" min="0"/>
            <input name="description" id="description"  type="text" placeholder="description"/>
            <button type="submit">Create Monster Button</button>
        </form>
    `
    document.getElementById("create-monster-form").addEventListener("submit",(e)=>{
        e.preventDefault()
        const name = document.getElementById('name').value.trim()
        const age = document.getElementById('age').value.trim()
        const description = document.getElementById('description').value.trim()
        const requestOptions ={
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({ name, age, description })
        };
        if(!name || !isNaN(age) || !description) return alert('All inputs required!')
        fetch("http://localhost:3000/monsters",requestOptions).then((response)=>{
            response.json()
            alert('Success')
        }).catch((err)=>{
            console.log(err)
        })
    })
})