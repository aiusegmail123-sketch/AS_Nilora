# AS NILORA — Jewellery Portfolio

A static HTML, CSS and JavaScript portfolio. It does not include cart, checkout, payments, PHP, or a database.

## Run locally
1. Extract this complete folder.
2. Open the `AS-NILORA-PORTFOLIO` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Keep the `assets` folder, `products.js`, and `script.js` in their current locations.

## Product image galleries
- Each product card opens its own photo gallery.
- On phones, swipe right-to-left for the next image and left-to-right for the previous image.
- On desktop, use the arrow buttons or keyboard arrow keys.
- Product images are stored in `assets/images/` by category.

## Replace the logo
Replace `assets/images/as-nilora-logo.jpeg` with your new logo. Keep the same filename, or update the image path in `index.html`.

## Add or replace product photos
1. Put the new photos in `assets/images/` inside the matching category folder.
2. Open `products.js`.
3. Find the product entry and update its `images` list with the correct relative paths.
4. Each product object has `id`, `category`, `name`, and `images`.
5. To add another product, copy one product object and change its ID, category, name, and image paths.

Example:
```js
{
  "id": "bracelet-05",
  "category": "Bracelets",
  "name": "Bracelet Design 5",
  "images": [
    "assets/images/Bracelets/bracelet-05-1.jpeg",
    "assets/images/Bracelets/bracelet-05-2.jpeg"
  ]
}
```

## Add official contact details
Open `script.js` and edit `SHOP_DETAILS` at the top:
- `whatsappNumber`: country code + phone number, digits only (India example: `919876543210`)
- `instagramUsername`: Instagram username without `@`
- `email`: official email address

Leave any field empty if it is not ready yet.

## Publish using GitHub Pages
1. Create or open a GitHub repository.
2. Upload all files and folders from this project (not just `index.html`).
3. In the repository, open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish and open the URL it provides.

A GitHub Pages URL is public, but appearing in Google search results can take time and is not guaranteed immediately. A custom domain can be connected later.

## Image grouping note
The original ZIP included nested WhatsApp ZIPs. Their photos have been extracted into the matching category folders. Some image batches appear to contain multiple angles, while some contain single photos. Please review product names and groupings before publishing; you can rename the generic “Design” labels in `products.js`.
