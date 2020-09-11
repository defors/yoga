window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    function hideTabs(butt, cont, buttParent) {

       let tab = document.querySelectorAll(butt),
        tabContent = document.querySelectorAll(cont),
        info = document.querySelector(buttParent);
   
        
      function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
      }
        
      hideTabContent(1);

      function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')){
           tabContent[b].classList.remove('hide');
           tabContent[b].classList.add('show');
        }
      }

      info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
               if (target == tab[i]) {
                   hideTabContent(0);
                   showTabContent(i);
                   break;
                }
            }
        }
      });
    }

    hideTabs('.info-header-tab', '.info-tabcontent', '.info-header');

    
    // Timer
    
    let deadline = '2020-12-25';

    function getTimeRemaining(endtime) {
      let t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor(t / 1000 % 60),
          minutes = Math.floor(t / 1000 / 60 % 60),
          hours = Math.floor(t / 1000 / 60 / 60);
          

          return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
          };
    }

    function getClock(id, endtime) {
      let timer = document.getElementById(id),
          seconds = timer.querySelector('.seconds'),
          minutes = timer.querySelector('.minutes'),
          hours = timer.querySelector('.hours'),
          setTimer = setInterval(updateClock, 1000);

          
         
      function updateClock() {
          let t = getTimeRemaining(endtime);
          
          if (t.seconds < 10) {
            seconds.textContent = '0' + t.seconds;
          } else {
            seconds.textContent = t.seconds;
          }
          
          if (t.minutes < 10) {
          minutes.textContent = '0' + t.minutes;
          } else {
            minutes.textContent =  t.minutes;
          }


          if (t.hours < 10) {
            hours.textContent = '0' + t.hours;
          } else {
          hours.textContent = t.hours;
          }
          
          if (t.total <= 0) {
            clearInterval(setTimer);
              seconds.textContent = '00';
              minutes.textContent = '00';
              hours.textContent = '00';
          }
 
      }
    }

      getClock('timer', deadline);

      
      // Modal window

      let moreBtn = document.querySelector('.more'),
          overlay = document.querySelector('.overlay'),
          close = document.querySelector('.popup-close');
          


      function showModel(target) {    
        target.addEventListener('click', function() {
          overlay.style.display = 'block';
          this.classList.add('more-splash');
          document.body.style.overflow = 'hidden';
      });

        close.addEventListener('click', function() {
          overlay.style.display = 'none';
          target.classList.remove('more-splash');
          document.body.style.overflow = '';
      });
    } 

      showModel(moreBtn);

      let descriptionBtn = document.querySelectorAll('.description-btn');

      descriptionBtn.forEach(function(btn) {
        showModel(btn);
      });
     

   // FORM

  let Message = {
      loading: "Загрузка...",
      succsses: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Произошла ошибка!"
  };

  
  let form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');

      statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);
        
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function() {
            if(request.readyState < 4) {
                statusMessage.innerHTML = Message.loading;
            } else if (request.readyState === 4) {
                statusMessage.innerHTML = Message.succsses;
            } else {
                statusMessage.innerHTML = Message.failure;
            }
        });
       
          for (let i = 0; i < input.length; i++) {
            input[i].value = '';
          }
    });


    let contact = document.querySelector('#form'),
        contactInput = contact.querySelectorAll('input');

        contact.addEventListener('submit', function(event) {
          event.preventDefault();
          contact.appendChild(statusMessage);
          
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  
          let formData = new FormData(contact);

          let obj = {};
          formData.forEach(function(value, key) {
            obj[key] = value;
          });
          
          let json = JSON.stringify(obj);
          request.send(json);
  
          request.addEventListener('readystatechange', function() {
              if(request.readyState < 4) {
                  statusMessage.innerHTML = Message.loading;
              } else if (request.readyState === 4) {
                  statusMessage.innerHTML = Message.succsses;
              } else {
                  statusMessage.innerHTML = Message.failure;
              }
          });
         
            for (let i = 0; i < contactInput.length; i++) {
              contactInput[i].value = '';
            }
      });
});


