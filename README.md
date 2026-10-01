# Project 2 - Marta Interface

## Desciption

In this project, you'll be creating a frontend that graphically displays train information with filtering options. Using your React knowledge, you will implement hooks, props, and state management in this Marta Interface!

## Setting Up

- Fork this repository, set the owner to BoG-Developer-Bootcamp-Fall-26, and name it `project2-f26-yourname`
- Clone the repository onto your local computer
- Navigate to your new project folder and run:
  - `npm create vite@latest -- --no-interactive --template react-ts marta-interface`
- If you want to use TailwindCSS (optional but recommended) in this project, follow the steps below. I've linked the full tailwind setup page [here](https://tailwindcss.com/docs/installation/using-vite) for context, but the below steps from start to finish should work:
  1. From the root directory of your project, run `npm i tailwindcss @tailwindcss/vite`
  2. Change your `vite.config.ts` to the below content. You can just copy and paste this and it will work!
  ```
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from "@tailwindcss/vite";
  
  // https://vite.dev/config/
  export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
  })
  ```
  3. Add `@import "tailwindcss";` to the top of `index.css`. This will add tailwind to your entire application (and components), not just the `App.tsx` page.
  4. You can now use Tailwind classes on anything by adding classes through the `className` prop!
- Create a `pages` and `components` directories in the `src` directory
- Run `npm run dev` to start your web app and access your local build through the URL that pops up in your terminal.
- Remember, you can ignore all the template files in src except `App.tsx` and `App.css`

## Submission

Create a 0.5-2 minute demo video to showcase your project's functionality (this is just so that we don't have to go through and install dependencies / deal with versioning errors for every single exercise, we're still gonna look at your code)!

- **Due Date**: 10/22/2026

## Instructions

In the pages folder, create a page component named `LinesPage.tsx`, this page will display the entire interface. Also, create a component called `TrainList.tsx`. This component should have a prop specifying the line color (i.e. blue, gold, red, or green), and would contain the interface for all trains in the given line. The current line that's being displayed should be stored as a state in the LinesPage component. Here's some barebones code for some idea of what the structure should look like:

```tsx
export default function LinesPage() {
  // initialize some currColor state

  return (
    <div>
      // YOUR JSX CODE
      <NavBar color={currColor} data={stationData} />
      <TrainList color={currColor} data={trainData} />
      // YOUR JSX CODE
    </div>
  );
}
```

Within the TrainList.tsx component, the data should be filtered to only return info for trains that are part of the specific line. For example, for the gold line we only want an array of gold trains.

In the components folder, create a Train.tsx file. In this file you can create the design for an exportable Train component that takes in the data for one train and returns the display for it. To display whether or not a train is On Time or Delayed check if DELAY === "T0S" (if the equality is true, it is on time, and if not, we consider it delayed). Display each of the train components for the specified line (first make sure to import the Train component into the file). Hint: You do not need to display each component manually as the number of trains in a line or subject to change. Instead you can use the map and spread functions you learned in Exercise 4 to take in the props at each index and display a component for each train's props.

We can create a Navbar.tsx file in components. This will contain an exportable navbar display component, which we can import into LinesPage.tsx. The navbar component will be displayed with the props for their specific lines.

We also want four filter buttons to be displayed titled 'Arriving', 'Scheduled', 'Northbound', and 'Southbound' on each of the pages. For the green and blue lines, use 'Eastbound' and 'Westbound' instead of 'Northbound' and 'Southbound'.

### Adding State and Filters

We are going to incorporate state to render the page based on each train line. Currently, we hardcode the line's state, but we want the user to be able to switch between lines on the interface. We do this by adding four buttons that will change state when clicked (one for each line color). Refer to the visual examples below to see how this would look like. Additionally, whenever a user switches between lines, we also want the filter buttons to change (between Northbound/SouthBound and Eastbound/Westbound). This can be done either through conditional rendering or state. For example, the green line should have the buttons "Arriving", "Scheduled", "Eastbound", "Westbound"; whereas gold should have "Arriving", "Scheduled", "Northbound", "Southbound." We recommend passing props into the `TrainList` component to handle these.

### Dynamic data and `useEffect`

For this project, we are calling this URL: "<https://marta-bootcamp-api.vercel.app>". You can get the filtered trains for each line using this link by adding "<https://marta-bootcamp-api.vercel.app/arrivals/{LINE_COLOR}>"; for example, to get the trains from the gold line, call "<https://marta-bootcamp-api.vercel.app/arrivals/gold>".

To get data for stations, you can use "<https://marta-bootcamp-api.vercel.app/stations/{LINE_COLOR}>"; for example, to get the stations from the gold line, you can call "<https://marta-bootcamp-api.vercel.app/stations/gold>".

You can also access mocked data through "<https://marta-bootcamp-api.vercel.app/mock/{api}>" if the MARTA API fails or you would like to test on static data. Example URLs: "<https://marta-bootcamp-api.vercel.app/mock/arrivals/{LINE_COLOR}>" and "<https://marta-bootcamp-api.vercel.app/mock/stations/{LINE_COLOR}>".

*Important note:* Previously, we learned how to call from an API using fetch(); however, React can have issues with rendering using fetch as if the called data has not arrived yet but is being asked to be displayed there will be an issue. To handle this we will incorporate useEffect()! We will have two states added to LinesPage.tsx: loading and data, defaultly set to true and null. Then, we will add useEffect() below like so (where the line in the URL is a variable that changes based on the current state of the line from the line buttons):

```tsx
//ADD MORE CODE TO ACCOUNT FOR LOADING
useEffect(() => {
        fetch("[URL]")
        .then(response => response.json())
        .then(data => setData(data))
      },[])
```

### More filtering

Make it so that when you click on a station in the navbar, it will become highlighted, and the trains displayed are filtered to display only those currently approaching that station, so for Doraville, we only want trains with `{"STATION": "DORAVILLE"}`.

When a button is clicked it will filter the trains by the filter titled on the button. When a button is 'on', and clicked again, the filter will go away. More than one button can be used to filter the data at a time, so make it identifiable that a button is currently "on" (you could do this by making the button color faded if it is on).

As a bonus, once the rest of the code displays successfully, we recommend incorporating conditional rendering so that if the filters used on the trainlist result in an empty list of trains, then display something else to notify the user that there are no trains rather than just displaying an empty page. For example, you could add a "No Current Trains Match Filters" message.

### Two New Pages

Now that we are set up, we want to add two new pages! We will call these `Home.tsx` and `About.tsx`.

In `Home.tsx` you can create a simple MARTA homescreen page up to your own design or follow the designs below that will have the form of a navbar that takes you to the `LinesPage.tsx` for each line with the display for `LinesPage.tsx` being the line that was clicked on in the navbar. There will also be a link to an About page at the top right of the home screen.

In `About.tsx`, you will create a simple page that displays the MARTA map and some basic information about the MARTA's purpose on the page. This page will include a button somewhere linking back to the home page.

### Routing

Install React Router with npm install react-router-dom. Wrap your app once in <BrowserRouter> (in main.tsx or App.tsx), then define your pages with <Routes> and <Route> in App.tsx. Inside your pages, use <Link to="/"> or the useNavigate() hook to move between pages, for example the About page's button back to Home.

## Requirements

- In `src` create two folders: `pages` and `components`.
- Create a Train.tsx component inside the components folder that displays the information for each train, and a TrainList.tsx component that displays the train data for a specified line
- In App.tsx, display the LinesPage.tsx page
- For each line's page, display each train's data by feeding each entry in the filtered array into the Train.tsx component as props.
- Call the MARTA API by fetching from the link provided: "<https://marta-bootcamp-api.vercel.app>"
- Incorporate state buttons to display trains based on each line color (gold, red, green blue)
- Make the navbar functional so that the trains are filtered by one station at a time
- Make the four buttons functional so that the trains are filtered by one or more buttons at a time ("Arriving", "Scheduled", "Northbound/Southbound" or "Eastbound/Westbound")
- **NEW**
  - Create a `Home.tsx` and `About.tsx`.
  - Use React routing to link between `LinesPage.tsx`, `Home.tsx`, and `About.tsx`.
  - When routing from `Home.tsx` to `LinesPage.tsx` there needs to be four separate links titled by line and linking to `LinesPage.tsx` with each line's props.
- Bonus:
  - Conditional rendering for when there are no trains to display
  - Tailwind CSS
  - Responsiveness

## Display Example

These are just example designs for this project! You can follow these designs as closely as you want or come up with your own, **BUT** they must have the required elements and functionalities for this assignment!

### GOLD

<img src="https://github.com/BoG-Dev-Bootcamp-F25/project1-f25/blob/main/assets/gold_page.png" alt="Example Gold Line" width="500"></img>

### GREEN

<img src="https://github.com/BoG-Dev-Bootcamp-F25/project1-f25/blob/main/assets/green_page.png" alt="Example Green Line" width="500"></img>

### HOME

<img src="https://github.com/BoG-Dev-Bootcamp-F25/project1-f25/blob/main/assets/home_page.png" alt="Example of Home Page" width="500"></img>
