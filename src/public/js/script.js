const btnNew = document.getElementById('btn-new');
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const btnSaveForm = document.getElementById('btn-save');
const form = document.getElementById('form');

let option = '';
let idForm = '';

const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');
const inputLink = document.getElementById('inputLink');

btnNew.addEventListener('click', () => {
  option = 'new';
  btnSaveForm.textContent = 'New Post';
  inputTitle.value = '';
  inputContent.value = '';
  inputLink.value = '';
  myModal.show();
});

document.addEventListener('click', (event) => {
  if (event.target.matches('#btn-delete')) {
    const article = event.target.closest('.col-4');
    const idArticle = article.dataset.id;

    fetch(`http://localhost:3000/api/posts/${idArticle}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        article.remove();
      }
    }).catch(err => {
      console.error(err);
    });
  }
});

document.addEventListener('click', (event) => {
  if (event.target.matches('#btn-edit')) {
    const article = event.target.closest('.col-4');

    const idArticle = article.dataset.id;
    const linkEdit = article.children[0].children[0].src;
    const titleEdit = article.children[0].children[1].children[0].textContent;
    const contentEdit = article.children[0].children[1].children[1].textContent;

    idForm = idArticle;
    inputTitle.value = titleEdit.trim();
    inputContent.value = contentEdit.trim();
    inputLink.value = linkEdit.trim();
    option = 'edit';
    btnSaveForm.textContent = 'Edit Post';
    myModal.show();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (option === 'new') {
    const newPost = {
      title: inputTitle.value,
      content: inputContent.value,
      link: inputLink.value
    };

    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(res => {
      if (res.ok) {
        alert('Post created successfully');
        myModal.hide();
        location.reload();
      }
    })
      .catch((err) => {
        console.error(err);
      });
  }

  if (option === 'edit') {
    const newPost = {
      title: inputTitle.value,
      content: inputContent.value,
      link: inputLink.value
    };

    fetch(`http://localhost:3000/api/posts/${idForm}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(res => {
      if (res.ok) {
        alert('Post edited successfully');
        myModal.hide();
        location.reload();
      }
    });
  }
});
