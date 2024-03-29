function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    setTimeout(() => {
      document.getElementById('popup').style.opacity = '1';
    }, 10);
  

  
  
    }
    function closePopup() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('popup').style.display = 'none';
        }, 300);
      }
    