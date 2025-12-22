type review = {
    id: number;
    text: string;
    author: string;
    reviewImages?: string[];
    image?: string;
}

export const reviews: review[] = [
    {
        id: 1,
        text: "Very satisfied with my dine in at this restaurant. The menu is huge and the food is authentic, I would definitely come again to have this happy experience",
        author: "Cheyenne Brennan",
        reviewImages: [
            "/images/reviews/3.jpeg",
            "/images/reviews/4.jpeg",
            "/images/reviews/5.jpeg",
        ]

    },
    {
        id: 2,
        text: "Recommended by a friend and it did not disappoint! Lots of food and spice was just perfect! Ordered butter chicken (which is my favorite!) Lamb Vindaloo which is the red one, super spicy only option is medium or hot! And 3rd was chicken tikka hariyala (green) cooked in mint cilantro which is excellent! We also had the warm Indian spiced tea and it was chefs kiss!! Will be back for sure!",
        author: "Jennifer Nelson",
        reviewImages: [
            "/images/reviews/1.jpeg",
            "/images/reviews/2.jpeg"
        ]
    },
    {
        id: 3,
        text: "Amazing food, amazing and quick service, great hospitality, an immaculate experience. Thanks to AJ for being a great host",
        author: "Ashish Avadhani",
        reviewImages: []
    }
];
