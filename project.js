 // Function to display phases when the menstrual phase link is clicked
document.addEventListener('DOMContentLoaded', () => {
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

// Function to add slide-in animation to the main content heading
  const initializeMainContentAnimation = () => {
  const mainContentHeading = document.querySelector('#main-content h1');
    if (mainContentHeading) {
      mainContentHeading.classList.add('slide-in');
    } else {
      console.error('Main Content Heading not found');
    }
  };

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

// Function to fetch and display food suggestions
  const displayFoodSuggestions = async (phase, category) => {
  try {
  const response = await fetch(`http://localhost:3000/api/nutrition/${phase}/${category}`);
    if (!response.ok) {
    throw new Error('Data not found');
    }
  const data = await response.json();
  const foodSuggestions = document.getElementById('foodSuggestions');
   foodSuggestions.innerHTML = '';

  data.forEach(item => {
  const foodItem = document.createElement('div');
  foodItem.className = 'food-item';

  const foodImage = document.createElement('img');
   foodImage.src = `http://localhost:3000/Photosapi/${item.imageUrl}`;

  const name = document.createElement('p');
   name.textContent = item.name;

  foodItem.appendChild(foodImage);
  foodItem.appendChild(name);
  foodSuggestions.appendChild(foodItem);
      });
//Initialize slider      
      initializeSlider();

    } catch (error) {
      console.error('Error fetching food suggestions:', error);
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

  // Initializing all functions
  initializeSubMenu();
  initializeMainContentAnimation();
  initializeGetStartedButton();
  initializeLogoClick();
  initializePhaseNavigation();
  initializeImageClicks();
  initializeOutsideClickHandler();
});