
export type Category =
    | "Appetizers"
    | "Soups"
    | "Tandoor"
    | "Vegetarian Entrees"
    | "Non-Vegetarian Entrees"
    | "Biryani & Rice"
    | "Breads"
    | "Desserts"
    | "Drinks"
    | "Kids Meals";

export interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: string;
    category: Category;
    isVegetarian?: boolean;
    isSpicy?: boolean;
    isGlutenFree?: boolean; // Inferred or placeholder
    hasSpiceLevel?: boolean; // Controls if spice level option is shown
}

export interface CartItem {
    uniqueId: string;
    menuItem: MenuItem;
    quantity: number;
    customization?: {
        spiceLevel?: string;
        instructions?: string;
    };
}

export const menuItems: MenuItem[] = [
    // APPETIZERS
    { id: "app-1", name: "Masala Pappad", description: "Roasted lentil chips topped with onions, tomatoes, and chili lemon salt", price: "$6.95", category: "Appetizers", isVegetarian: true },
    { id: "app-2", name: "Vegetarian Samosa (2pcs)", description: "Crisp turnovers stuffed with potatoes and peas", price: "$7.95", category: "Appetizers", isVegetarian: true, hasSpiceLevel: false },
    { id: "app-3", name: "Aloo Tikki", description: "Potato patties fried with Indian spices", price: "$7.95", category: "Appetizers", isVegetarian: true },
    { id: "app-4", name: "Mix Veg Platter", description: "Chef's selection of appetizers", price: "$15.95", category: "Appetizers", isVegetarian: true },
    { id: "app-5", name: "Manchurian", description: "Choice of one: Cauliflower / Mushroom / Babycorn / Paneer in a rich home made indo Chinese garlic sauce", price: "$14.95", category: "Appetizers", isVegetarian: true },
    { id: "app-6", name: "Pakoras", description: "Choice of one: Onion / Chili / Paneer / Mix Veg. Pakora choice of any one vegetable dip into chickpea flour batter infused with Indian spices deep fried", price: "$8.95", category: "Appetizers", isVegetarian: true },
    { id: "app-7", name: "Paneer / Paneer 65", description: "Crispy paneer tossed in spicy indo chinese sauce", price: "$14.95", category: "Appetizers", isVegetarian: true },
    { id: "app-8", name: "Chicken / Lamb Samosa", description: "Crisp turnover stuffed with choice of meat", price: "$9.95", category: "Appetizers" },
    { id: "app-9", name: "Chicken Manchurian", description: "Marinated in seasoning, tossed in Manchurian sauce", price: "$14.95", category: "Appetizers" },
    { id: "app-10", name: "Chili Chicken", description: "Battered chicken, sauteed onions and green peppers tossed in a spicy chili sauce", price: "$14.95", category: "Appetizers", isSpicy: true },
    { id: "app-11", name: "Szechuan Chicken", description: "Fried chicken sauteed in Szechuan pepper sauce", price: "$14.95", category: "Appetizers", isSpicy: true },
    { id: "app-12", name: "Lemon Pepper Chicken", description: "Marinated with lemon pepper seasoning, sauteed/cooked", price: "$14.95", category: "Appetizers" },
    { id: "app-13", name: "Coconut Fried Shrimp", description: "Coated with coconut flakes", price: "$15.95", category: "Appetizers" },
    { id: "app-14", name: "Apollo Fish", description: "Seasoned with lemon, battered and tossed in a creamy chili sauce", price: "$15.95", category: "Appetizers" },
    { id: "app-15", name: "Chili Fish", description: "Marinated, fried and tossed in chili sauce with onions and green peppers", price: "$15.95", category: "Appetizers", isSpicy: true },
    { id: "app-16", name: "Chicken 65", description: "Hyderabadi style, tossed in creamy chili sauce", price: "$14.95", category: "Appetizers", isSpicy: true },

    // SOUPS
    { id: "soup-1", name: "Tomato Soup", price: "$7.95", category: "Soups", isVegetarian: true },
    { id: "soup-2", name: "Manchow Soup", description: "Indo Chinese soup with ginger, garlic and chilies, garnished with fried noodles", price: "$7.95", category: "Soups", isVegetarian: true },
    { id: "soup-3", name: "Corn Soup", price: "$7.95", category: "Soups", isVegetarian: true },
    { id: "soup-4", name: "Mulligatawny Soup", description: "Lentil soup made with creamy coconut milk and special house spices", price: "$7.95", category: "Soups", isVegetarian: true },
    { id: "soup-5", name: "Chicken Corn Soup", description: "Chicken and corn simmered in broth and garnished with egg white", price: "$8.95", category: "Soups" },
    { id: "soup-6", name: "Madras Lamb / Goat Soup", description: "Lamb or goat in broth with Indian spices", price: "$9.95", category: "Soups" },
    { id: "soup-7", name: "Seafood Mulligatawny Soup", description: "Chef's selection of seafood simmered in lentil and coconut broth", price: "$9.95", category: "Soups" },

    // TANDOOR
    { id: "tan-1", name: "Chicken Tikka", description: "Marinated overnight in seasoned yogurt", price: "$18.95", category: "Tandoor" },
    { id: "tan-2", name: "Chicken Tikka Hariyali", description: "Marinated in mint cilantro yogurt", price: "$18.95", category: "Tandoor" },
    { id: "tan-3", name: "Malai Tikka", description: "Chicken marinated in seasoned cream", price: "$18.95", category: "Tandoor" },
    { id: "tan-4", name: "Tandoori Chicken", description: "Marinated in lemon yogurt, baked in a traditional clay pot", price: "$18.95", category: "Tandoor" },
    { id: "tan-5", name: "Chicken Seekh Kabab", description: "Minced Chicken, marinated with ginger, chilies, and mint skewered", price: "$18.95", category: "Tandoor" },
    { id: "tan-6", name: "Lamb Boti", description: "Tender lamb marinated in a spicy yogurt", price: "$19.95", category: "Tandoor" },
    { id: "tan-7", name: "Lamb Seekh Kabab", description: "Minced Lamb, marinated w/lemon, chilies, and mint", price: "$19.95", category: "Tandoor" },
    { id: "tan-8", name: "Lamb Chops Tender", description: "Lamp chops flavored with chef's special marinated with Indian spices", price: "$28.95", category: "Tandoor" },
    { id: "tan-9", name: "Mixed Tandoor Platter", description: "Tandoori Chicken, Chicken Tikka, Lamb Seekh Kabab and Shrimp Tikka", price: "$23.95", category: "Tandoor" },
    { id: "tan-10", name: "Pomfret Fish", description: "Whole fish, marinated overnight in a rich seasoned cream sauce, contains bones", price: "$23.95", category: "Tandoor" },
    { id: "tan-11", name: "Paneer Tikka", description: "Indian cheese marinated and cooked with onions and green peppers", price: "$18.95", category: "Tandoor", isVegetarian: true },

    // VEGETARIAN ENTREES
    { id: "veg-1", name: "Chana Masala", description: "Spiced Chickpeas", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-2", name: "Chana Saag", description: "Chickpeas cooked in a spiced spinach gravy", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-3", name: "Mixed Vegetable Masala", description: "Sauteed in spiced gravy", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-4", name: "Vegetable Jalfrezi", description: "Seasoned and cooked in house special sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-5", name: "Vegetable Vindaloo", description: "Simmered in hot and sour tomato-based sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true, isSpicy: true },
    { id: "veg-6", name: "Navratan Korma", description: "Vegetables cooked in creamy onion sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-7", name: "Eggplant Curry", description: "Simmered in a peanut and sesame sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-8", name: "Vegetable Makhani", description: "Mixed veg in a rich and sour tomato-based gravy", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-9", name: "Malai Kofta", description: "Potato & paneer balls deep fried & coated with malai & added gravy", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-10", name: "Kadai Paneer", description: "Paneer sauteed with onion, bell peppers, onion tomato gravy", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-11", name: "Mushroom Saag", description: "Mushrooms cooked in a creamy spinach sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-12", name: "Aloo Saag", description: "Potatoes cooked in a creamy spinach sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-13", name: "Paneer Vindaloo", description: "Cottage cheese & vegetables cooked in a spicy & sour sauce", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true, isSpicy: true },
    { id: "veg-14", name: "Paneer Burji", description: "Grated Paneer cooked in a tomato, onion, methi, creamy gravy", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-15", name: "Shahi Paneer", description: "Cottage cheese cooked in rich tomato sauce with exotic spices", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-16", name: "Matar Paneer", description: "Homemade Cheese & green peas, in cream nut sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-17", name: "Aloo Gobi Masala", description: "Potato & Cauliflower cooked with onion, tomato, spices", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-18", name: "Baigan Bartha", description: "Roasted eggplant mashed and cooked with onion, tomato, garlic and spices", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-19", name: "Palak Paneer", description: "Indian cheese cooked in a creamy spinach sauce", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-20", name: "Paneer Tikka Masala", description: "Marinated Indian Cottage Cheese cooked with rich onion and tomato sauce", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-21", name: "Paneer Butter Masala", description: "Indian Cottage Cheese simmered with rich tomato/butter sauce", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-22", name: "Dal Makhani", description: "Lentils cooked in a rich cream sauce", price: "$15.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-23", name: "Dal Tadka", description: "Lentils simmered in tomato broth", price: "$13.95", category: "Vegetarian Entrees", isVegetarian: true },
    { id: "veg-24", name: "Methi Malai Mutter", price: "$17.95", category: "Vegetarian Entrees", isVegetarian: true },

    // NON-VEGETARIAN ENTREES (Chicken, Goat, Lamb, Seafood)
    { id: "nv-1", name: "Chicken Curry", description: "Cooked in tomato, onion, and spices", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-2", name: "Chicken Madras", description: "Cubed chicken cooked with coconut and ground South Indian spices", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-3", name: "Chicken Jalfrezi", description: "Tossed with bell peppers and chilis", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-4", name: "Chicken Palak", description: "Cooked in a rich, creamy spinach sauce", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-5", name: "Andhra Chicken Curry", description: "Marinated with roasted spices, simmered in an onion & tomato sauce", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-6", name: "Gongura Chicken", description: "Cooked in sour gongura leaves", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-7", name: "Chicken Vindaloo", description: "Cooked in a sauce made of chili, garlic & spices", price: "$18.95", category: "Non-Vegetarian Entrees", isSpicy: true },
    { id: "nv-8", name: "Butter Chicken", description: "Tandoor baked & simmered in rich creamy tomato sauce", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-9", name: "Chicken Tikka Masala", description: "Sauteed and simmered in tikka masala gravy", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-10", name: "Chicken Shahi Korma", description: "Chicken & onion simmered in cream based sauce", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-11", name: "Kadai Chicken", description: "Chicken sauteed with onion, bell peppers, onions & tomato gravy", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-12", name: "Chicken Chettinad", description: "South Indian Chicken w/dry roasted spice", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-13", name: "Chicken Kotta Curry", description: "4 pcs", price: "$18.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-14", name: "Chicken Rogan Josh", description: "Chicken with rich curry sauce", price: "$18.95", category: "Non-Vegetarian Entrees" },

    { id: "nv-15", name: "Goat/Lamb Madras", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-16", name: "Goat/Lamb Vindaloo", description: "Choice of meat cooked in a garlic & chili-based curry sauce", price: "$19.95", category: "Non-Vegetarian Entrees", isSpicy: true },
    { id: "nv-17", name: "Goat/Lamb Rogan Josh", description: "Choice of meat simmered in rich curry sauce", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-18", name: "Goat/Lamb Korma", description: "Choice of meat sauteed in an onion/cream sauce", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-19", name: "Goat/Lamb Bhuna", description: "Choice of meat cooked with onions, tomatoes, garlic and aromatic spices", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-20", name: "Goat/Lamb Curry", description: "Slow cooked in a gravy made with onions, tomatoes, garlic, and ginger", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-21", name: "Lamb Kofta Curry", description: "4 pcs", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-22", name: "Goat/Lamb Kadai", price: "$19.95", category: "Non-Vegetarian Entrees" },

    { id: "nv-23", name: "Fish/Shrimp Malabar", description: "Seasoned in spices, sautéed in coconut oil", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-24", name: "Fish/Shrimp Madras Curry", description: "Sautéed in herbs, finished with tamarind", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-25", name: "Fish/Shrimp Tikka Masala", description: "Simmered in pepper seasoned cream sauce", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-26", name: "Fish/Shrimp Vindaloo", description: "Simmered in garlic-chili sauce", price: "$19.95", category: "Non-Vegetarian Entrees", isSpicy: true },
    { id: "nv-27", name: "Fish/Shrimp Korma", description: "Marinated w/ground spices, simmered with potatoes", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-28", name: "Fish/Shrimp Makhani", description: "Simmered in a tangy cream sauce", price: "$19.95", category: "Non-Vegetarian Entrees" },
    { id: "nv-29", name: "Fish/Shrimp Kadai", description: "Sauteed with green peppers, onions", price: "$19.95", category: "Non-Vegetarian Entrees" },

    // BIRYANI / FRIED RICE / NOODLES
    { id: "rice-1", name: "Vegetable Biryani/Rice/Noodles", price: "$15.95", category: "Biryani & Rice", isVegetarian: true },
    { id: "rice-2", name: "Egg Biryani/Rice/Noodles", price: "$15.95", category: "Biryani & Rice" },
    { id: "rice-3", name: "Mushroom Biryani/Rice/Noodles", price: "$15.95", category: "Biryani & Rice", isVegetarian: true },
    { id: "rice-4", name: "Chicken Biryani/Rice/Noodles", price: "$18.95", category: "Biryani & Rice" },
    { id: "rice-5", name: "Goat Biryani/Rice/Noodles", price: "$19.95", category: "Biryani & Rice" },
    { id: "rice-6", name: "Lamb Biryani/Rice/Noodles", price: "$19.95", category: "Biryani & Rice" },
    { id: "rice-7", name: "Fish Biryani/Rice/Noodles", price: "$19.95", category: "Biryani & Rice" },
    { id: "rice-8", name: "Shrimp Biryani/Rice/Noodles", price: "$19.95", category: "Biryani & Rice" },

    // BREADS
    { id: "bread-1", name: "Plain Naan", price: "$2.95", category: "Breads", isVegetarian: true },
    { id: "bread-2", name: "Butter Naan", price: "$2.95", category: "Breads", isVegetarian: true },
    { id: "bread-3", name: "Garlic Naan", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-4", name: "Chili Naan", price: "$3.95", category: "Breads", isVegetarian: true, hasSpiceLevel: true },
    { id: "bread-5", name: "Bullet Naan", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-6", name: "Onion Naan", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-7", name: "Roasted Potato Naan", price: "$4.95", category: "Breads", isVegetarian: true },
    { id: "bread-8", name: "Peshwari Naan", price: "$4.95", category: "Breads", isVegetarian: true },
    { id: "bread-9", name: "Cheese Naan", price: "$4.95", category: "Breads", isVegetarian: true },
    { id: "bread-10", name: "Paneer Naan", price: "$4.95", category: "Breads", isVegetarian: true },
    { id: "bread-11", name: "Roti - Plain", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-12", name: "Roti - Butter", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-13", name: "Paratha - Plain", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-14", name: "Paratha - Lachha", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-15", name: "Paratha - Aloo", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-16", name: "Paratha - Gobi", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-17", name: "Paratha - Paneer", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-18", name: "Puri", price: "$3.95", category: "Breads", isVegetarian: true },
    { id: "bread-19", name: "Chapati 2 pcs", price: "$5.95", category: "Breads", isVegetarian: true },

    // DESSERTS
    { id: "des-1", name: "Kheer Rice Pudding", price: "$5.95", category: "Desserts", isVegetarian: true },
    { id: "des-2", name: "Gulab Jamun", price: "$5.95", category: "Desserts", isVegetarian: true },
    { id: "des-3", name: "Rasmalai", price: "$5.95", category: "Desserts", isVegetarian: true },
    { id: "des-4", name: "Carrot Halwa", price: "$5.95", category: "Desserts", isVegetarian: true },

    // DRINKS
    { id: "drk-1", name: "Indian Coffee", price: "$4.95", category: "Drinks", isVegetarian: true },
    { id: "drk-2", name: "Tea", price: "$4.95", category: "Drinks", isVegetarian: true },
    { id: "drk-3", name: "Mango Lassi", price: "$5.95", category: "Drinks", isVegetarian: true },
    { id: "drk-4", name: "Salt Lassi", price: "$5.95", category: "Drinks", isVegetarian: true },
    { id: "drk-5", name: "Sweet Lassi", price: "$5.95", category: "Drinks", isVegetarian: true },
    { id: "drk-6", name: "Fresh Lime Soda", price: "$4.95", category: "Drinks", isVegetarian: true },
    { id: "drk-7", name: "Sodas", price: "$2.95", category: "Drinks", isVegetarian: true },
    { id: "drk-8", name: "Bottled Water", price: "$2.95", category: "Drinks", isVegetarian: true },
    { id: "drk-9", name: "Iced Tea", price: "$3.95", category: "Drinks", isVegetarian: true },

    // KIDS MEALS
    { id: "kid-1", name: "Chicken Nuggets with Fries", price: "$9.95", category: "Kids Meals" },
    { id: "kid-2", name: "Chicken or Paneer Wrap w Fries", price: "$10.95", category: "Kids Meals" },
    { id: "kid-3", name: "Fries", price: "$4.95", category: "Kids Meals", isVegetarian: true },
];

export const categories: Category[] = [
    "Appetizers",
    "Soups",
    "Tandoor",
    "Vegetarian Entrees",
    "Non-Vegetarian Entrees",
    "Biryani & Rice",
    "Breads",
    "Desserts",
    "Drinks",
    "Kids Meals"
];
