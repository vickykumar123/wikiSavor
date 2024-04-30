# wikiSavor - Food Ordering Application

![image](https://github.com/vickykumar123/wikiSavor/assets/41174782/718014ca-e963-4d4a-af31-7e7ad86ac347)


**wikiSavor**, a cutting-edge food ordering application designed to deliver a seamless experience for both users and developers. Built on the MERN stack with TypeScript, wikiSavor is highly responsive, lightning-fast, and fully optimized.

## Features

- **Highly Responsive**: Enjoy a smooth and intuitive user experience across devices.
- **Reduced Network Load**: Utilizes GraphQL for efficient data fetching, minimizing network load.
- **Optimized Performance**: Fully leverages Redis cache, achieving an optimization rate of 80.5%.
- **Modern Frontend**: Crafted with Tailwind CSS and Shadcn UI for a sleek and stylish interface.
- **Secure Payments**: Seamless integration with Stripe for secure payment processing.
- **Efficient Image Upload**: AWS S3 buckets handle image uploads seamlessly.
- **Secure Authentication**: Auth0 ensures secure and hassle-free authentication for users.

## Architecture

wikiSavor follows a robust architecture to ensure high performance and scalability:

- **Data Handling**: Data is initially written to the database and reads from Redis. Updates are promptly reflected by deleting data from the cache and persisting it in the database.
- **Notification Service**: Implements a real-time notification service using Redis as a message broker for the message queue. Notifications are persisted in the database and retrieved from the queue (up to 10 previous messages).

## Technologies Used

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **TypeScript**: Enhances code readability and maintainability.
- **GraphQL**: Efficiently fetches data, reducing network load.
- **Redis**: Fully utilized for caching to optimize performance.
- **Tailwind CSS**: Modern utility-first CSS framework.
- **Shadcn UI**: UI components for building sleek interfaces.
- **Stripe**: Secure payment gateway for processing transactions.
- **AWS S3**: Reliable storage solution for handling image uploads.
- **Auth0**: Secure authentication and authorization platform.

## Installation

To get started with wikiSavor, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables for Stripe, AWS S3, and Auth0.
4. Run the application using `npm start`.
5. Set up your .env file with the env.example

## Contributing

Contributions are welcome! If you'd like to contribute to wikiSavor.



---

