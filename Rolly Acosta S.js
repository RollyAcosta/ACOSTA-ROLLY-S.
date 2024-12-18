const users = [{ username: "admin", password: "admin123" }]; // Store user credentials for authentication
const categories = { // Store available categories and their items
  Pasta: [
    { name: "Spaghetti", price: 125 },
    { name: "Pancit", price: 120 },
    { name: "Macaroni", price: 110 }
  ],
  Desserts: [
    { name: "Chocolate Cake", price: 50 },
    { name: "Halo-halo", price: 40 },
    { name: "Ice Cream", price: 30 }
  ],
  Drinks: [
    { name: "Coke", price: 30 },
    { name: "Lemonade", price: 30 },
    { name: "Water", price: 20 }
  ]
};
let cart = []; // Initialize the cart as an empty array

// Function to authenticate a seller by comparing username and password
function authenticateSeller(username, password) {
  return users.some(user => user.username === username && user.password === password); // Check if user exists
}

// Function to sort items within a category (Bubble Sort)
function sortItems(items) {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (items[j].name > items[j + 1].name) {
        [items[j], items[j + 1]] = [items[j + 1], items[j]]; // Swap if names are in the wrong order
      }
    }
  }
  return items; // Return sorted items
}

// Seller actions function
function sellerActions() {
  while (true) {
    const action = prompt("\nOptions: LOGOUT, ADD, REMOVE\nChoose an action:").toUpperCase(); // Seller action prompt
    if (action === "LOGOUT") return; // If seller logs out, exit the loop

    if (action === "ADD" || action === "REMOVE") {
      // Seller can add or remove items
      const category = prompt("\nCategories: Pasta, Desserts, Drinks\nEnter a category to update:").trim();
      if (!categories[category]) {
        alert("Invalid category."); // If category is invalid, alert the user and continue
        continue;
      }

      if (action === "ADD") { // Adding an item
        while (true) {
          const name = prompt("Enter item name:").trim();
          const price = parseFloat(prompt("Enter price per item:"));
          categories[category].push({ name, price }); // Add item to the selected category
          alert("Item added.");

          const cont = prompt("Add another item? (yes/no):").toLowerCase();
          if (cont !== "yes") break; // Stop if user doesn't want to add more
        }
      } else if (action === "REMOVE") { // Removing an item
        while (true) {
          const name = prompt("Enter item name to remove:").trim();
          const items = categories[category].filter(item => item.name !== name); // Filter out item by name

          if (items.length === categories[category].length) {
            alert("Item not found."); // Alert if item wasn't found
          } else {
            categories[category] = items; // Update the category without the removed item
            alert("Item removed.");
          }

          const cont = prompt("Remove another item? (yes/no):").toLowerCase();
          if (cont !== "yes") break; // Stop if user doesn't want to remove more
        }
      }
    }
  }
}

// Customer actions function
function customerActions() {
  while (true) {
    const action = prompt("\nOptions: ORDER, CART, CANCEL\nChoose an action:").toUpperCase(); // Customer action prompt

    if (action === "CANCEL") return; // Exit if customer cancels

    if (action === "ORDER") {
      // Ordering an item
      const category = prompt("\nCategories: Pasta, Desserts, Drinks\nChoose a category:").trim();
      if (!categories[category] || categories[category].length === 0) {
        alert("Invalid category or no items available.");
        continue;
      }

      const sortedItems = sortItems(categories[category]); // Sort items in the category
      let menu = `Items in ${category}:\n`;
      sortedItems.forEach((item, index) => {
        menu += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`; // Display items with prices
      });
      const choice = parseInt(prompt(menu + "Choose an item (number):")) - 1; // Get item choice from customer
      if (choice < 0 || choice >= sortedItems.length) {
        alert("Invalid choice.");
        continue;
      }

      const quantity = parseInt(prompt("Enter quantity:")); // Get quantity
      const item = sortedItems[choice];
      cart.push({ name: item.name, price: item.price, quantity }); // Add item to cart
      alert("Item added to cart.");
    } else if (action === "CART") {
      // View and manage the cart
      while (true) {
        let cartSummary = "\nCart:\n";
        let totalPrice = 0;
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity; // Calculate total for each item
          totalPrice += itemTotal;
          cartSummary += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}\n`; // Show item summary
        });
        cartSummary += `Total Price: $${totalPrice.toFixed(2)}`;

        const cartAction = prompt(cartSummary + "\nOptions: PRINT, ADD, REMOVE, CANCEL\nChoose an action:").toUpperCase();

        if (cartAction === "CANCEL") break; // Exit if customer cancels

        if (cartAction === "PRINT") {
          // Print the cart (receipt)
          let receipt = "\nReceipt:\n";
          cart.forEach(item => {
            const itemTotal = item.price * item.quantity; // Calculate total for each item
            receipt += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}\n`; // Print each item
          });
          receipt += `Total Price: $${totalPrice.toFixed(2)}`;
          alert(receipt); // Show receipt
          cart = []; // Clear the cart after printing
          break;
        }

        if (cartAction === "ADD") break; // Continue if customer wants to add more items

        if (cartAction === "REMOVE") {
          // Remove an item from the cart
          const name = prompt("Enter the item name to remove:").trim();
          cart = cart.filter(item => item.name !== name); // Filter out the item to remove
          alert("Item removed.");
        } else {
          alert("Invalid option."); // Alert for invalid option
        }
      }
    }
  }
}

// Main program function
function main() {
  while (true) {
    const userType = prompt("\nWelcome to the Kiosk!\nAre you a 1.SELLER or 2.CUSTOMER?").toUpperCase();

    if (userType === "1.SELLER") {
      // Seller login
      const username = prompt("Enter username:").trim();
      const password = prompt("Enter password:").trim();
      if (authenticateSeller(username, password)) {
        alert("Welcome, Seller!");
        sellerActions(); // Call seller actions if login is successful
      } else {
        alert("Invalid credentials.");
      }
    } else if (userType === "2.CUSTOMER") {
      // Customer section
      alert("\nWelcome, Customer!\nCategories: Pasta, Desserts, Drinks");
      customerActions(); // Call customer actions
    } else {
      alert("Invalid input. Please choose 1.SELLER or 2.CUSTOMER.");
    }
  }
}

// Run the program
main();
