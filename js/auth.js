document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (simulated)
    let isLoggedIn = false;
    let currentUser = null;
    
    // DOM elements
    const authPrompt = document.getElementById('auth-prompt');
    const reviewFormContainer = document.getElementById('review-form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userGreeting = document.createElement('div');
    
    // Check auth status on load
    function checkAuthStatus() {
      // In a real app, you would check cookies/localStorage/tokens here
      const fakeToken = localStorage.getItem('fakeAuthToken');
      
      if (fakeToken) {
        isLoggedIn = true;
        currentUser = JSON.parse(localStorage.getItem('fakeUserData'));
        updateUI();
      }
    }
    
    // Update UI based on auth status
    function updateUI() {
      if (isLoggedIn && currentUser) {
        // Hide auth buttons and prompt
        document.querySelectorAll('.auth-btn').forEach(btn => {
          btn.style.display = 'none';
        });
        
        authPrompt.style.display = 'none';
        reviewFormContainer.style.display = 'block';
        
        // Show user greeting
        userGreeting.textContent = `Привет, ${currentUser.name}!`;
        userGreeting.style.marginLeft = 'auto';
        userGreeting.style.marginRight = '20px';
        userGreeting.style.fontWeight = '500';
        document.querySelector('.header__auth').prepend(userGreeting);
      } else {
        // Show auth buttons and prompt
        document.querySelectorAll('.auth-btn').forEach(btn => {
          btn.style.display = 'inline-block';
        });
        
        authPrompt.style.display = 'block';
        reviewFormContainer.style.display = 'none';
        
        // Remove user greeting if exists
        if (userGreeting.parentNode) {
          userGreeting.parentNode.removeChild(userGreeting);
        }
      }
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
    
            // Validation
            if (!email || !password) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
    
            if (!validateEmail(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
    
            if (password.length < 6) {
                alert('Пароль должен содержать не менее 6 символов');
                return;
            }
    
            // Simulate successful login
            isLoggedIn = true;
            currentUser = {
                name: email.split('@')[0],
                email: email,
                phone: '+7 (123) 456-78-90'
            };
    
            localStorage.setItem('fakeAuthToken', 'fake-jwt-token');
            localStorage.setItem('fakeUserData', JSON.stringify(currentUser));
    
            updateUI();
    
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                }, 300);
            }
    
            alert('Вы успешно вошли в систему!');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const name = document.getElementById('reg-name').value.trim();
            const phone = document.getElementById('reg-phone').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const confirm = document.getElementById('reg-confirm').value.trim();
    
            // Validation
            if (!name || !phone || !email || !password || !confirm) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
    
            if (!validateEmail(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
    
            if (!validatePhone(phone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
    
            if (password !== confirm) {
                alert('Пароли не совпадают');
                return;
            }
    
            if (password.length < 6) {
                alert('Пароль должен содержать не менее 6 символов');
                return;
            }
    
            // Simulate successful registration
            isLoggedIn = true;
            currentUser = {
                name: name,
                email: email,
                phone: phone
            };
    
            localStorage.setItem('fakeAuthToken', 'fake-jwt-token');
            localStorage.setItem('fakeUserData', JSON.stringify(currentUser));
    
            updateUI();
    
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                }, 300);
            }
    
            alert('Регистрация прошла успешно! Добро пожаловать!');
        });
    }
    
    function logout() {
      isLoggedIn = false;
      currentUser = null;
      localStorage.removeItem('fakeAuthToken');
      localStorage.removeItem('fakeUserData');
      updateUI();
    }
    
    checkAuthStatus();
    
    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value;
        const rating = document.getElementById('review-rating').value;
        const text = document.getElementById('review-text').value;
        
        if (!name || !rating || !text) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        
        // Create new review element
        const reviewsGrid = document.querySelector('.reviews-grid');
        const newReview = document.createElement('div');
        newReview.className = 'review-card animate-slide-up';
        
        // Generate stars HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
          starsHtml += i <= rating ? '★' : '☆';
        }
        
        // Set current date
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}.${month}.${year}`;
        
        newReview.innerHTML = `
          <div class="review-header">
            <div class="review-author">${name}</div>
            <div class="review-rating">${starsHtml}</div>
          </div>
          <p class="review-text">${text}</p>
          <div class="review-date">${dateStr}</div>
        `;
        
        // Add to the beginning of reviews
        reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);
        
        // Reset form
        this.reset();
        document.getElementById('review-rating').value = '0';
        document.querySelectorAll('.star').forEach(star => {
          star.textContent = '☆';
          star.classList.remove('active');
        });
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Спасибо за ваш отзыв!';
        successMsg.style.color = '#2ecc71';
        successMsg.style.marginTop = '20px';
        successMsg.style.textAlign = 'center';
        this.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
        }, 2000);
      });
    }
    
    // Login/register links in auth prompt
    const loginLinks = document.querySelectorAll('.login-link');
    const registerLinks = document.querySelectorAll('.register-link');
    const loginModal = document.getElementById('auth-modal');
    const registerModal = document.getElementById('reg-modal');
    
    loginLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        setTimeout(() => {
          loginModal.classList.add('show');
        }, 10);
        document.body.classList.add('no-scroll');
      });
    });
    
    registerLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
        setTimeout(() => {
          registerModal.classList.add('show');
        }, 10);
        document.body.classList.add('no-scroll');
      });
    });
  });
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation function (already in main.js, but ensure it's here too)
function validatePhone(phone) {
    const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
}