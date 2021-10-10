# Playground

## Inspiration

Recent events, such as the COVID-19 pandemic in particular, have revealed drastic inequities and tragic disparities between communities of differing social and economic status. We find this unacceptable. Families of all socioeconomic classes should be provided with adequate resources to maximize their potential. We thought there was no better place to start than childhood education, focusing on toddlers and infants. Games and toys that develop fine motor skills essential to writing and simple tasks are generally not priorities for families that lack the access and resources to acquire them. Therefore, making an application that enables the next generation to learn their most fundamental and imperative skills was, in our view, of utmost importance.

## What it does

Playground is based on the common childhood toy where kids are challenged to fit blocks of particular shapes into their corresponding holes. We converted this game to a virtual format that allows the user to "pick up" the blocks with their hands and "place" them in the correct hole all through their computer screen. After logging in, the player can raise their hand to navigate the screen using a small black cursor. To pick up the designated shape (with a red background color), they simply hover over and clench their fist into a ball with their knuckles facing up and their backhand facing themselves. This corresponds to a click-like function that picks up the block. Once the block is placed in the correct hole, a new block is highlighted red and the same process is repeated until all blocks are assigned to their corresponding holes.

## How we built it

For the frontend, we used React and Bootstrap. When the user first starts the frontend, they are first met with a login and signup page, where first-time users can create an account to use the application, and returning users can simply login to access the application. Once the user logs in, they are met with a personalized user interface where the central game of the application is housed. The user interface was designed to be as intuitive and user-friendly as possible. Users can simply hold their hand up to their webcam to begin interacting with the application, and the users are allowed slight margins of error to allow the game to run as smoothly as possible. The user may also log out of the application at any time they choose by using the logout button located conveniently at the top of the page.

The backend consisted of entirely JavaScript. In particular, for the computer vision aspects of the project, we used a Google TensorFlow ML algorithm in conjunction with the finger-pose library to track the user's hand in their webcam and identify specific hand gestures. The coordinates and associated gesture of the user's hand are continuously sent to and analyzed in JS and change the frontend accordingly. Our team chose to use Google's Firebase service to store users who sign up for the application and serves as a cross reference to authenticate user logins.

## Challenges we ran into

As part of our deconstruction of the problem and distribution of different responsibilities, we chose to split the work between user login, obtaining the necessary information from our computer vision models, and creating the game but with a mouse as a control rather than the vision. While this was extremely efficient, integrating the three separate programs proved incredibly challenging. Additionally, when customizing the computer vision algorithms, tweaking various variable and weights was tedious, as we had to find a balance between over and under recognition of hand gestures. Overall, these problems and the numerous others we confronted may have delayed our completion and caused some frustration, they allowed us to better understand the problem and develop key critical thinking skills.

## Accomplishments that we're proud of

We are most proud of our persistence through uniquely trying problems to achieve a very ambitious task. We successfully factored the problem into smaller components that we then completed individually and brought together to make a functioning game.

## What we learned

While we each had unique experiences with our respective parts of the project, generally, our knowledge expanded in specific topics including computer vision, Firebase data management, as well as React.js. We fervently believe that this project enabled us to find a way to assist others while building important skills and having valuable experiences.

## What's next for Playground

As we look to the future of our project, we plan on continuing our development by implementing new games and more features that will enable the project to more efficiently and comprehensively assist growing toddlers, infants, and families with limited resources. We also hope to improve our computer vision models to ultimately create a smoother user experience, as well as collecting user performance statistics that are stored for each user to ultimately give parents and medical providers a way to track the progress of their toddlers and infants as they continue to sharpen their fine motor skills, problem-solving skills, and others.

## Demo Image

![alt text](https://github.com/abi-kothapalli/Playground/blob/main/frontend/public/demo.png?raw=true)
