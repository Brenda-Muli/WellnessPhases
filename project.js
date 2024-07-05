document.addEventListener('DOMContentLoaded', () => {
 // Function to display phases when the menstrual phase link is clicked
  const initializeSubMenu = () => {
   const subMenu = document.getElementById('sub-menu');
   const menstrualPhaseLink = document.getElementById('menstrual-phase-link');

  if (subMenu && menstrualPhaseLink) {
    subMenu.style.display = 'none';
    menstrualPhaseLink.addEventListener('click', (event) => {
      event.preventDefault();
      subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
    });

  // Close submenu if clicking outside
    document.addEventListener('click', (event) => {
      if (event.target !== menstrualPhaseLink && !menstrualPhaseLink.contains(event.target)) {
        subMenu.style.display = 'none';
      }
    });
  } else {
    console.error('SubMenu or Menstrual Phase Link not found');
  }
};

  initializeSubMenu();

  // Function to add slide-in animation to the main content heading
  const initializeMainContentAnimation = () => {
    const mainContentHeading = document.querySelector('#main-content h1');
    if (mainContentHeading) {
      mainContentHeading.classList.add('slide-in');
    } else {
      console.error('Main Content Heading not found');
    }
  };

  initializeMainContentAnimation();

  // Function to redirect to menstruation page on 'Get Started' button click
  const initializeGetStartedButton = () => {
    const getStarted = document.getElementById('get-started');
    if (getStarted) {
      getStarted.addEventListener('click', () => {
        window.location.href = 'menstruation.html';
      });
    } else {
      console.error('Get Started button not found');
    }
  };

  initializeGetStartedButton();

  // Function to redirect to home page on logo click
  const initializeLogoClick = () => {
    const logo = document.getElementById('logo');
    if (logo) {
      logo.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    } else {
      console.error('Logo not found');
    }
  };

  initializeLogoClick();

  // Function to navigate to specific phase pages
  const initializePhaseNavigation = () => {
  const navigateToPhase = (phase) => {
    console.log(`Navigating to ${phase}.html`);
    window.location.href = `${phase}.html`;
  };

  const navigationLinks = document.querySelectorAll('.phase-link');
  navigationLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const phase = link.dataset.phase;
      navigateToPhase(phase);
    });
  });
};

  initializePhaseNavigation();

  // Function to handle image clicks to display food suggestions
  const initializeImageClicks = () => {
  const handleImageClick = async (event) => {
    const imageItem = event.currentTarget;
    const category = imageItem.id;
    const phase = document.body.dataset.phase;
    try {
      await displayFoodSuggestions(phase, category);
      document.querySelector('.controls').style.display = 'block';
    } catch (error) {
      console.error('Error handling image click:', error);
    }
  };

  const imageItems = document.querySelectorAll('.image-item');
  imageItems.forEach(item => {
    item.addEventListener('click', handleImageClick);
  });
};

  initializeImageClicks();

  // Function to clear food suggestions when clicking outside
  const initializeOutsideClickHandler = () => {
  document.addEventListener('click', (event) => {
    const foodSuggestions = document.getElementById('foodSuggestions');
    const controls = document.querySelector('.controls');
    if (controls && !controls.contains(event.target) && !foodSuggestions.contains(event.target)) {
      controls.style.display = 'none';
    }
  });
};

  initializeOutsideClickHandler();

  // Function to initialize the slider
  const initializeSlider = () => {
    const foodItems = document.querySelectorAll('#foodSuggestions .food-item');
    let currentIndex = 0;

    const showItem = (index) => {
      foodItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
      });
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % foodItems.length;
      showItem(currentIndex);
    };

    const showPrevious = () => {
      currentIndex = (currentIndex - 1 + foodItems.length) % foodItems.length;
      showItem(currentIndex);
    };

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', showNext);
      prevButton.addEventListener('click', showPrevious);
    }

    showItem(currentIndex);
  };

  initializeSlider();

  // Function to display feedback 
  const initializeFeedbackSlider = () => {
  const feedbackItems = document.querySelectorAll('.feedback-item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentFeedbackIndex = 0;

  const showFeedback = (startIndex) => {
    feedbackItems.forEach((item, index) => {
      if (index >= startIndex && index < startIndex + 2) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  const changeFeedback = (n) => {
    currentFeedbackIndex += n * 2;
    const numItems = feedbackItems.length;
    if (currentFeedbackIndex < 0) {
      currentFeedbackIndex = numItems - 2; 
    } else if (currentFeedbackIndex >= numItems) {
      currentFeedbackIndex = 0;
    }
    showFeedback(currentFeedbackIndex);
  };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => changeFeedback(-1));
      nextBtn.addEventListener('click', () => changeFeedback(1));
    }

    showFeedback(currentFeedbackIndex);
  };

  initializeFeedbackSlider();

  // Function to handle search form submission
  const initializeSearchForm = () => {
    const phasesButton = document.getElementById('button-phases');
    const searchPhase = document.getElementById('search-phase');

  if (phasesButton) {
    phasesButton.addEventListener('click', (event) => {
      event.preventDefault(); 

    const searchQuery = searchPhase.value.toLowerCase().trim();

    switch (true) {
      case searchQuery.includes('menstrual'):
        window.location.href = 'menstruation.html';
        break;
      case searchQuery.includes('ovulation'):
        window.location.href = 'ovulation.html';
        break;
      case searchQuery.includes('follicular'):
        window.location.href = 'follicular.html';
        break;
      case searchQuery.includes('luteal'):
        window.location.href = 'luteal.html';
        break;
      default:
        window.location.href = 'index.html';
        break;
    }
    });
    } else {
      console.error('Search button not found');
    }
  };

  initializeSearchForm();

  // Function to send details of user to my email
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (contactForm && nameInput && emailInput && messageInput) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const email = emailInput.value;
      const message = messageInput.value;

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (result.success) {
          alert(result.message);
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Unable to send message.');
      }
    });
  } else {
    console.error('Contact form elements not found.');
  }

});