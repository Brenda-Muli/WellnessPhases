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

// Function to display food suggestions based on phase and category
const displayFoodSuggestions = async (phase, category) => {
  const url = `http://localhost:3000/api/nutrition/${phase}/${category}`;
  try {
    const response = await fetch(url);
    console.log(`Fetch request to ${url} responded with status ${response.status}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    const foodSuggestions = document.getElementById('foodSuggestions');
    foodSuggestions.innerHTML = ''; 
    
    data.forEach(food => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
        <img src="Photosapi/${food.imageUrl}" alt="${food.name}">
        <p>${food.name}</p>
      `;
      foodSuggestions.appendChild(foodItem);
    });

  // Ensure controls are visible after updating food suggestions
    document.querySelector('.controls').style.display = 'block';

  // Initialize slider after updating food suggestions
    initializeSlider();

  } catch (error) {
    console.error('Error displaying food suggestions:', error);
  }
};

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

// Function to handle clicks outside food suggestions to hide controls
const initializeOutsideClickHandler = () => {
  document.addEventListener('click', (event) => {
    const controls = document.querySelector('.controls');
    const foodSuggestions = document.getElementById('foodSuggestions');
    if (controls && !controls.contains(event.target) && !foodSuggestions.contains(event.target)) {
      controls.style.display = 'none';
    }
  });
};

// Initialization
initializeImageClicks();
initializeOutsideClickHandler();

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


});
  

