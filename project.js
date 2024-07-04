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

});

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

    // Initialize slider
    initializeSlider();

  } catch (error) {
    console.error('Error fetching food suggestions:', error);
  }
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
      currentFeedbackIndex = numItems - 2; // Display the last two items
    } else if (currentFeedbackIndex >= numItems) {
      currentFeedbackIndex = 0;
    }
    showFeedback(currentFeedbackIndex);
  };

  prevBtn.addEventListener('click', () => changeFeedback(-1));
  nextBtn.addEventListener('click', () => changeFeedback(1));

  showFeedback(currentFeedbackIndex);
};

initializeFeedbackSlider();
// Function to slide in social icons and contact details
const initializeSlideInElements = () => {
  const socialIcons = document.querySelectorAll('.social-icon');
  const contactDetails = document.getElementById('contact-details');

  const slideInElements = () => {
    socialIcons.forEach(icon => {
      icon.style.transform = 'translateX(0)';
      icon.style.opacity = '1';
    });

    contactDetails.style.transform = 'translateX(0)';
    contactDetails.style.opacity = '1';
  };

  const checkScroll = () => {
    const findUsSection = document.getElementById('find-us-section');
    const findUsSectionTop = findUsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (findUsSectionTop < windowHeight * 0.75) {
      slideInElements();
      window.removeEventListener('scroll', checkScroll); // Remove listener once animation has occurred
    }
  };

  window.addEventListener('scroll', checkScroll);
};

initializeSlideInElements();

// Function to handle search form submission
const initializeSearchForm = () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.includes('menstrual')) {
      window.location.href = 'menstrual.html';
    } else if (searchTerm.includes('ovulation')) {
      window.location.href = 'ovulation.html';
    } else if (searchTerm.includes('follicular')) {
      window.location.href = 'follicular.html';
    } else if (searchTerm.includes('luteal')) {
      window.location.href = 'luteal.html';
    } else {
      alert('No relevant page found for your search term.');
   
    }
  });
};

initializeSearchForm();

//function for contact form
const form = document.getElementById('contact-form');

// Add submit event listener to the form
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = 'service_nmgl9u4'; // Replace with your EmailJS service ID
  const templateID = 'template_ycy0u7p'; // Replace with your EmailJS template ID

  // Send email using EmailJS
  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      // Clear form fields
      form.reset();

      // Log the response and show success message
      console.log(res);
      alert('Your message has been sent successfully!');
    })
    .catch((err) => console.error('Error sending email:', err));
});