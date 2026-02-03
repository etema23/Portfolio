# How to Add Your Photos to the Gallery

## Step 1: Create the Photos Folder
1. In your project directory (`/Users/ertatema/Portfolio Web/`), create a new folder called `photos`
2. This folder should be at the same level as your `index.html` file

## Step 2: Add Your Photos
1. Copy your photo files into the `photos` folder
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
3. You can name them anything you want (e.g., `hiking.jpg`, `volleyball.png`, `matcha.jpg`)

## Step 3: Update the Photo Data
1. Open `script.js` in your editor
2. Find the `photoData` array (around line 653)
3. Update each photo object with:
   - `src`: The path to your photo (e.g., `'photos/hiking.jpg'`)
   - `caption`: A description of the photo (e.g., `'Me hiking in Albania'`)

## Example:
```javascript
const photoData = [
    {
        src: 'photos/hiking.jpg',  // Your photo filename
        caption: 'Me hiking in Albania'  // Your caption
    },
    {
        src: 'photos/volleyball.jpg',
        caption: 'Playing volleyball with friends'
    },
    // Add more photos as needed...
];
```

## Step 4: Add or Remove Photos
- To add more photos: Add new objects to the `photoData` array
- To remove photos: Delete objects from the `photoData` array
- The gallery will automatically update to show all photos in the array

## Tips:
- Keep photo file sizes reasonable (under 2MB each) for faster loading
- Use descriptive filenames to make it easier to manage
- You can have as many or as few photos as you want!
