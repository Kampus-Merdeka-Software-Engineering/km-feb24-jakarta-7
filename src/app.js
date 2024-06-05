window.alert('belum kelar ygy :(')


// Mendapatkan semua tautan dan bagian yang akan diamati
const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('article');

// Fungsi untuk memperbarui tautan aktif
function setActiveLink(id) {
  links.forEach(link => {
    if (link.dataset.id === id) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Event listener untuk tautan
links.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = link.dataset.id;
    const targetSection = document.getElementById(targetId);

    // Scroll ke bagian yang dituju
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Set tautan aktif
    setActiveLink(targetId);
  });
});

// Membuat observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, {
  threshold: 0.5 // Memastikan 50% bagian terlihat sebelum dianggap berada di tampilan
});

// Mengamati setiap bagian
sections.forEach(section => {
  observer.observe(section);
});


/* COUNT animation */
const counts = document.querySelectorAll('.count');
const speed = 50;

counts.forEach((counter) => {
    function updateCount() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText);
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = formatNumber(target);
        }
    }

    updateCount();
});

function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'jt';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'rb';
    } else {
        return number.toLocaleString('en-US');
    }
}



/* generate card element */
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('team-cards-container');

  fetch("./data/data_team.json") 
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          data.forEach(member => {
              const card = document.createElement('div');
              card.classList.add('team-card');

              const cardImage = document.createElement('div');
              cardImage.classList.add('card-image');
              cardImage.style.backgroundImage = `url(${member.image})`;

              const cardContent = document.createElement('div');
              cardContent.classList.add('card-content');

              const name = document.createElement('h4');
              name.textContent = member.name;

              const position = document.createElement('p');
              position.textContent = member.position;

              const social = document.createElement('div');
              social.classList.add('card-social');

              const socialLinks = [
                  { platform: 'linkedin', url: member.social.linkedin },
                  { platform: 'instagram', url: member.social.instagram },
                  { platform: 'twitter', url: member.social.twitter }
              ];

              socialLinks.forEach(socialLink => {
                  const div = document.createElement('div');
                  const a = document.createElement('a');
                  a.href = socialLink.url;
                  a.innerHTML = `<i class="fa-brands fa-${socialLink.platform}"></i>`;
                  div.appendChild(a);
                  social.appendChild(div);
              });

              cardContent.appendChild(name);
              cardContent.appendChild(position);
              cardContent.appendChild(social);

              card.appendChild(cardImage);
              card.appendChild(cardContent);

              container.appendChild(card);
          });
      })
      .catch(error => {
          console.error('Fetch error:', error);
      });
});
