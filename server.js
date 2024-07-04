import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/Photosapi', express.static(path.join(__dirname, 'Photosapi')));

// Sample data for carbohydrates, proteins, and vitamins for each phase
const foods = {
  follicular: {
    proteins: [
      { name: 'Chicken', imageUrl: 'chicken.jpg'},
      { name: 'Eggs' , imageUrl: 'eggs.jpg'},
      { name: 'fish', imageUrl: 'fish.jpg'},
      { name: 'Greek Yogurt', imageUrl: 'greekyoghurt.jpg' },
      { name: 'chickpeas', imageUrl: 'chichkpeas.jpg' },
    ],
    carbohydrates: [
      { name: 'Oats', imageUrl: 'oats.jpg' },
      { name: 'Quinoa' , imageUrl: 'quinoa.jpg'},
      { name: 'Sweet Potatoes' , imageUrl: 'sweetpotatoes.jpg'},

    ],
    vitamins: [
      { name: 'Citrus' , imageUrl: 'citrus.jpeg'},
      { name: 'Oranges', imageUrl: 'oranges.jpg' },
      { name: 'Bell Peppers' , imageUrl: 'bellpeppers.jpg'},
      { name: 'Brocolli' , imageUrl: 'brocolli.jpg'},
      { name: 'Leafy greens', imageUrl: 'spinach.jpg' },
      { name: 'Avocados', imageUrl: 'avocados.jpg' },
      { name: 'Nuts', imageUrl: 'nuts.jpg' },
      { name: 'Salad', imageUrl: 'salad.jpg'},
      { name: 'Sunflower seeds', imageUrl: 'sunflowerseeds.jpeg'}
    ],
  },
  ovulation: {
    proteins: [
      { name: 'Salmon' , imageUrl: 'salmon.jpg'},
      { name: 'Chicken', imageUrl: 'chicken.jpg' },
      { name: 'Tofu', imageUrl: 'tofu.jpg' },
      { name: 'Cottage Cheese', imageUrl: 'cottagecheese.jpg' },
      { name: 'Fish', imageUrl: 'fish.webp' },
      
    ],
    healthyfats: [
      { name: 'Avocados', imageUrl: 'avocado.jpg' },
      { name: 'Nuts', imageUrl: 'nuts.jpg' },
      { name: 'Sunflower seeds', imageUrl: 'sunflowerseeds.jpeg'},
      { name: 'Pumpkn seeds', imageUrl: 'pumpkinseeds.jpeg' },
      { name: 'Olive oil', imageUrl: 'oliveoil.jpg' },
      { name: 'Chia Seeds', imageUrl: 'chiaseeds.jpg' },
      
    ],
    vitamins: [
      { name: 'Berries', imageUrl: 'berries.jpg' },
      { name: 'Oranges', imageUrl: 'oranges.jpg'},
      { name: 'Leafy greens', imageUrl: 'spinach.jpg' },
      { name: 'Watermelon' , imageUrl: 'watermelon.jpeg'},
      { name: 'Cucumber' , imageUrl: 'cucumber.jpg'},
      { name: 'Celery' , imageUrl: 'celery.jpg'},
      { name: 'Citrus' , imageUrl: 'citrus.jpg'},
    ],
  },
  luteal: {
    proteins: [
      { name: 'Tofu' , imageUrl: 'tofu.jpg'},
      { name: 'Chickpeas' , imageUrl: 'chickpeas.jpg'},
      { name: 'Chicken', imageUrl: 'chicken.jpg' },
      { name: 'Turkey' , imageUrl: 'turkey.jpg'},
      { name: 'Peanut Butter', imageUrl: 'peanutbutter.jpg' },
    ],
    carbohydrates: [
      { name: 'Whole Grain Bread', imageUrl: 'wholegrainbread.jpg' },
      { name: 'Quinoa', imageUrl: 'quinoa.jpg' },
      { name: 'Pasta' , imageUrl: 'pasta.jpg'},
      { name: 'Brown rice' , imageUrl: 'brownrice.jpg'},
      { name: 'Sweet potatoes' , imageUrl: 'sweetpotatoes.jpg'},
      { name: 'Pumpkins' , imageUrl: 'pumpkin.jpg'},
    ],
    vitamins: [
      { name: 'Leafy Greens' , imageUrl: 'spinach.jpg'},
      { name: 'Avocado' , imageUrl: 'avocado.jpg'},
      { name: 'Bell Peppers', imageUrl: 'bellpeppers.jpg' },
      { name: 'Dark Chocholate', imageUrl: 'darkchochlate.jpg' },
      { name: 'Beets' , imageUrl: 'beets.jpg'},
      { name: 'Oranges', imageUrl: 'oranges.jpg' },
    ],
  },
  menstrual: {
    proteins: [
      { name: 'Beef' , imageUrl: 'beef.jpg'},
      { name: 'Lentils' , imageUrl: 'lentils.jpg'},
      { name: 'Chicken' , imageUrl: 'chicken.jpg'},
      { name: 'Green Peas', imageUrl: 'greengrams.jpg' },
      { name: 'Nuts', imageUrl: 'nuts.jpg' },
      { name: 'Fish', imageUrl: 'fish.jpg' },
      { name: 'Beans', imageUrl: 'beans.jpeg' },
      { name: 'Tofu', imageUrl: 'tofu.jpg' },
    ],
    carbohydrates: [
      { name: 'Sweet Potatoes', imageUrl: 'sweetpotatoes.jpg' },
      { name: 'Brown Rice' , imageUrl: 'brownrice.jpg'},
      { name: 'Pumpkin Soup', imageUrl: 'pumpkin.jpg' },
      
    ],
    vitamins: [
      { name: 'Leafy Greens' , imageUrl: 'spinach.jpg'},
      { name: 'Oranges' , imageUrl: 'oranges.jpg'},
      { name: 'Berries', imageUrl: 'berries.jpg' },
      { name: 'Pineapple' , imageUrl: 'pineapple.jpg'},
      { name: 'Citrus Fruits', imageUrl: 'citrus.jpeg' },
    ],
  },
};

// Define routes
app.get('/api/nutrition/:phase/:category', (req, res) => {
  const { phase, category } = req.params;
  const phaseData = foods[phase];
  if (phaseData && phaseData[category]) {
    res.json(phaseData[category]);
  } else {
    res.status(404).send('Data not found');
  }
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
