var menuTitles = document.querySelectorAll('.menu-item > a > .menu-title');
var CategorySelect = document.getElementById('categorySelect');
var articles = undefined;
var categories = undefined;
var selectedClient = undefined;
var fullClientsData = undefined;
var filteredAlexandriaDataByTenants = [];
var clientDTData = [];
var clientsName = [];
let typingTimer;

$(function () {
  $('#search-box').on('input', function() {
    clearTimeout(typingTimer);
    const userInput = $(this).val();
    if (userInput) {
      tenantsSearch(userInput)
    }
});

  $('.tenants').hide();
  $('.newArticleButton').tooltip({
      placement: 'right'
  })
  getCategories()
  $(".newArticleButton").hover(function() {
    $(this).css('cursor', 'pointer');
   });
  $(".newArticleButton").click(function() {
    $('#newArticleModal').modal('show');
  });
  $('.sidebar-content a').css('cursor', 'pointer');
  alexandriaData() 
})

menuTitles.forEach(function (menuTitle) {
    menuTitle.addEventListener('click', function () {
        switch (this.innerText) {
            case "Hi Inbox":
                showTab(".inbox")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Social":
                showTab(".social")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Flow":
                showTab(".flow")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Bot":
                showTab(".bot")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Chat":
                showTab(".chat")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi FAQ":
                showTab(".faq")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Phone":
                showTab(".phone")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Mail":
                showTab(".mail")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Reviews":
                showTab(".reviews")
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Voices":
                showTab(".voices");
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Tenants":
              showTab(".tenants")
              break;
        }
    });
});

function showTab(classname){
  $('.inbox').hide();
  $('.social').hide();
  $('.flow').hide();
  $('.bot').hide();
  $('.chat').hide();
  $('.faq').hide();
  $('.phone').hide();
  $('.mail').hide();
  $('.reviews').hide();
  $('.voices').hide();
  $('.tenants').hide();

  // only selected div
  $(classname).show();
}

async function getArticles(categoryName) {
  $('#loadingModal').modal('show');
 const response = await $.ajax({
   url: "https://hi-support-hub.onrender.com/articles?category=" + categoryName,
   type: 'GET',
   dataType: 'json'
 });
  articles = response;
  $('#loadingModal').modal('hide');
  return articles;
}

async function getCategories() {
 const response = await $.ajax({
   url: "https://hi-support-hub.onrender.com/categories",
   type: 'GET',
   dataType: 'json'
 });
  categories = response;
  for (var i = 0; i < categories.length;i++){
    var option = document.createElement("option");
    option.value = categories[i].id;
    option.text = categories[i].name;
    option.setAttribute("name", categories[i].name)
    CategorySelect.appendChild(option);
  }
  return categories;
}

function renderArticles(category) {
  switch(category){
    case "Hi Inbox":
      var mainDiv = document.querySelector('.inbox');
      break;
    case "Hi Social":
      var mainDiv = document.querySelector('.social');
      break;
    case "Hi Flow":
      var mainDiv = document.querySelector('.flow');
      break;
    case "Hi Bot":
      var mainDiv = document.querySelector('.bot');
      break;
    case "Hi Chat":
      var mainDiv = document.querySelector('.chat');
      break;
    case "Hi FAQ":
      var mainDiv = document.querySelector('.faq');
      break;
    case "Hi Phone":
      var mainDiv = document.querySelector('.phone');
      break;
    case "Hi Mail":
      var mainDiv = document.querySelector('.mail');
      break;
    case "Reviews":
      var mainDiv = document.querySelector('.reviews');
      break;
    case "Voices":
      var mainDiv = document.querySelector('.voices');
      break;
  }
  var accordionHTML = '';
  for (var i = 0; i < articles.length; i++) {
   accordionHTML += `
    <div class="accordion" id="accordion${i}" style="margin-top: 2%; margin-bottom: 2%;">
     <div class="accordion-item">
       <h2 class="accordion-header" id="heading${i}">
         <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
           <strong>${articles[i].title}</strong>
         </button>
       </h2>
       <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordion${i}">
         <div class="accordion-body">
           ${articles[i].content}
         </div>
       </div>
     </div>
    </div>
   `;
   }
  mainDiv.innerHTML = accordionHTML;
}
 $('#newArticleForm').on('submit', function(e) {
  e.preventDefault();
  let newArticle = {
    "categoryId": $('#categorySelect').find(':selected').attr('value'),
    "categoryName": $('#categorySelect').find(':selected').attr('name'),
    "title": document.getElementById('articleTitle').value,
    "message": document.getElementById('message').value
  };
  $.ajax({
    type: "POST",
    url: $(this).attr('action'),
    data: JSON.stringify(newArticle),
    dataType: "json",
    contentType : "application/json"
  });
  $('#newArticleModal').modal('hide');
  const toastLive = document.getElementById('liveToast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
  toastBootstrap.show()
 });
 
function alexandriaData() {
  var settings = {
    "url": "https://app.hiplatform.com/platform/whatsappconnect/1.0/api/management/configuration",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "authorization": "Basic ZHRzMTIxM2NjYTM2LWFjMGEtNGViYS1hODE4LTdkNmMyOTRhMjI1YTp5MTA2aml1a3BiYmR0bjJ3aHQyZA=="
    },
  };
  
  $.ajax(settings).done(function (response) {
     fullClientsData = response.data
     localStorage.setItem('alexandriaData', JSON.stringify(fullClientsData));
  });
}

function tenantsSearch(userInput){
  clientDTData = [];
  clientsName = [];
  typingTimer = setTimeout(function() {
    $('#loadingModal').modal('show');
    $.ajax({
      url: "https://hi-support-hub.onrender.com/tenants?filter=" + userInput,
      type: 'GET',
      success: function(data) {
          for (var i = 0; i < data.Data.length; i++){
            clientsName.push(data.Data[i].name);
          }
          clientDTData.push(data.Data)
          updateResults(userInput)
          $('#loadingModal').modal('hide');
      },
      error: function(error) {
          console.error("Erro na requisição:", error);
      }
  });
  }, 1000);
}

function updateResults(searchTerm) {
  $('#results-list').empty();
  var filteredClients = clientsName.filter(function(client) {
      return client.toLowerCase().includes(searchTerm.toLowerCase());
  });
  filteredClients.forEach(function(client) {
      $('#results-list').append('<li>' + client + '</li>');
  });
  $('#results-list').show();
  var resultsListHeight = $('#results-list')[0].scrollHeight;
  if (resultsListHeight > 150) { 
      $('#results-list').css('max-height', '150px');
  } else {
      $('#results-list').css('max-height', resultsListHeight + 'px');
  }
}

$('#search-box').on('input click', function() {
  var searchTerm = $(this).val();
  updateResults(searchTerm);
  $('#results-list').empty();
});

$(document).on('click', function(e) {
  if (!$(e.target).closest('.custom-select').length) {
      $('#results-list').hide();
  }
});

$('#results-list').on('click', 'li', function() {
  selectedClient = $(this).text();
  $('#search-box').val(selectedClient);
  $('#results-list').hide();
  showAccountData(selectedClient)
});

function showAccountData(selectedClient) {
  filteredAlexandriaDataByTenants = []
  for (var i = 0; i < clientDTData[0].length; i++){
    if (clientDTData[0][i].name == selectedClient){
      $("#accountPlatform").html("<strong>Plataforma </strong>" + clientDTData[0][i].platId);
      $("#accountPrefix").html("<strong>Prefixo </strong>" + clientDTData[0][i].mnemonic);
      $("#accountName").html(clientDTData[0][i].name);
      var cookieData = localStorage.getItem('alexandriaData');
      var cookieJson = JSON.parse(cookieData);
      cookieJson.forEach(element => {
        if (element.tenant.name == clientDTData[0][i].name) {
          filteredAlexandriaDataByTenants.push(element)
        }
      });
      $("#wabaNumbers").html("<strong>Números contratados: </strong>" + filteredAlexandriaDataByTenants.length);
      $("#hsmTemplates").html("<strong>HSM's cadastrados:  </strong>" + "VAZIO");
    } 
  }
  $('.cards').css('display', 'inline-flex');
}

