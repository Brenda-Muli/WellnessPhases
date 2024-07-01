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
      { name: 'Lentils', imageUrl: 'lentils.jpg'},
      { name: 'Greek Yogurt', imageUrl: 'greekyoghurt.jpg' },
      { name: 'Almonds', imageUrl: 'nuts.jpg' },
    ],
    carbohydrates: [
      { name: 'Oats', imageUrl: 'oats.jpg' },
      { name: 'Quinoa' , imageUrl: 'quinoa.jpg'},
      { name: 'Sweet Potatoes' , imageUrl: 'sweetpotatoes.jpg'},

    ],
    vitamins: [
      { name: 'Spinach' , imageUrl: 'spinach.jpg'},
      { name: 'Broccoli', imageUrl: 'brocolli.jpg' },
      { name: 'Bell Peppers' , imageUrl: 'bellpeppers.jpg'},
      { name: 'Carrots' , imageUrl: 'carrots.jpg'},
      { name: 'Tomatoes', imageUrl: 'tomatoes.jpg' },
      { name: 'Bananas', imageUrl: 'bananas.jpg' }
    ],
  },
  ovulation: {
    proteins: [
      { name: 'Salmon' , imageUrl: 'salmon.jpg'},
      { name: 'Chicken', imageUrl: 'chicken.jpg' },
      { name: 'Tofu', imageUrl: 'tofu.jpg' },
      { name: 'Cottage Cheese', imageUrl: 'cottagecheese.jpg' },
      { name: 'Chia Seeds', imageUrl: 'chiaseeds.jpg' },
    ],
    carbohydrates: [
      { name: 'Brown Rice', imageUrl: 'brownrice.jpg' },
      { name: 'Sweet Potatoes', imageUrl: 'sweetpotatoes.jpg' },
      { name: 'Quinoa' , imageUrl: 'quinoa.jpg'},
      { name: 'Pumpkin', imageUrl: 'pumpkin.jpg' },
      
    ],
    vitamins: [
      { name: 'Berries', imageUrl: 'berries.jpg' },
      { name: 'Oranges' , imageUrl: 'oranges.jpg'},
      { name: 'Avocado', imageUrl: 'avocado.jpg' },
      { name: 'Mangoes' , imageUrl: 'mangoes.jpg'},
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
    ],
    vitamins: [
      { name: 'Leafy Greens' , imageUrl: 'spinach.jpg'},
      { name: 'Avocado' , imageUrl: 'avocado.jpg'},
      { name: 'Bell Peppers', imageUrl: 'bellpeppers.jpg' },
      { name: 'Cauliflower', imageUrl: 'cauliflower.jpg' },
      { name: 'Beets' , imageUrl: 'beets.jpg'},
      { name: 'Apples', imageUrl: 'apples.jpg' },
    ],
  },
  menstrual: {
    proteins: [
      { name: 'Beef' , imageUrl: 'beef.jpg'},
      { name: 'Lentils' , imageUrl: 'lentils.jpg'},
      { name: 'Chicken' , imageUrl: 'chicken.jpg'},
      { name: 'Green Peas', imageUrl: 'greengrams.jpg' },
      { name: 'Nuts', imageUrl: 'nuts.jpg' },
    ],
    carbohydrates: [
      { name: 'Oats', imageUrl: 'oats.jpg' },
      { name: 'Sweet Potatoes', imageUrl: 'sweetpotatoes.jpg' },
      { name: 'Brown Rice' , imageUrl: 'brownrice.jpg'},
      { name: 'Pumpkin Soup', imageUrl: 'pumpkin.jpg' },
      
    ],
    vitamins: [
      { name: 'Leafy Greens' , imageUrl: 'spinach.jpg'},
      { name: 'Oranges' , imageUrl: 'oranges.jpg'},
      { name: 'Berries', imageUrl: 'berries.jpg' },
      { name: 'Dark Chocholate', imageUrl: 'darkchochlate.jpg' },
      { name: 'Pineapple' , imageUrl: 'pineapple.jpg'},
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
