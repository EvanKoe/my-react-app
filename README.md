This is my very first react native app. I made it during my intership (Yabe) in order to learn react before working with them.

> This app has not been tested on IOS.

# Installation

First, install the dependecies :
`yarn add`

After having plugged your phone to your computer (and made it available through ADB), launch the project with expo (you must have Expo Go installed on your phone) :
`yarn android` or `yarn start --android` (both do the same thing)

Enjoy the app !

# Login

To log in, you must have a Yabe account (you cannot create it through the application for the time being, just go [here]('www.dev.yabe.co/register')).

# GraphQL

The GraphQL page does a query to the Yabe API (dev.tabe.co/graphql) to get emails and firstnames of existing dev users. It may vary according to your authorizations (emails require admin account).

# UseEffect

The useEffect page uses the useEffect() hook to fetch the Dog Pictures API. It will load a random dog picture at startup and everytime you press 'generate'.

# Anime

The Anime page is a playground to learn animations from the 'Animated' library (from 'react-native' package). It is curretly under development.

