document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        let targetId = this.getAttribute('href').substring(1); 
        let targetElement = document.getElementById(targetId); 
        
        targetElement.scrollIntoView({ behavior: 'smooth' }); 
      });
    });
  });
