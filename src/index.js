let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  getToys();
  
  const name = document.querySelector('input[name="name"]').value;
  const image = document.querySelector('input[name="image"]').value;
  const submit = document.querySelector('input[name="image"]');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    addNewToy(name, image);
  });
});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
      json.forEach(toy => renderToy(toy))
  })
}

function renderToy(toy) {
   const collection = document.getElementById('toy-collection');
   const div = document.createElement('div');
   div.className = "card";
   collection.appendChild(div);

   const h2 = document.createElement('h2');
   h2.innerHTML = toy['name']
   div.appendChild(h2)

   const img = document.createElement('img');
   img.src = toy['image'];
   img.className = 'toy-avatar';
   div.appendChild(img);

   const p = document.createElement('p');
   p.innerHTML = `${toy['likes']} Likes`;
   div.appendChild(p);

   const btn = document.createElement("BUTTON");
   btn.className = 'like-btn';
   btn.innerHTML = 'Like <3';
   div.appendChild(btn);
}

function addNewToy(name, image) {
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          "name": name,
          "image": image,
          "likes": 0
      })
    };
     
  fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        renderToy(object);
      })
      .catch(function(error) {
          document.body.innerHTML = error.message;
      });
  }