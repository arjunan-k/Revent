import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import EventsPage, { Loader as EventsLoader } from './pages/Events';
import EventDetailPage, { Loader as EventDetailLoader, action as DeleteEventAction } from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootPage from './pages/RootPage';
import EventsRoot from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import { action as manipulateEventAction }  from './components/EventForm'
import NewsletterPage, { action as NewsLetterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'events', 
        element: <EventsRoot />, 
        children: [
          {
            index: true, 
            element: <EventsPage />, 
            loader: EventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: EventDetailLoader, 
            children: [
              {index: true, element: <EventDetailPage />, action: DeleteEventAction},
              {path: "edit", element: <EditEventPage />, action: manipulateEventAction},
            ]
          },
          {path: "new", element: <NewEventPage />, action: manipulateEventAction},
        ]
      },
      {path: 'newsletter', element: <NewsletterPage />, action: NewsLetterAction}
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>;
};

export default App;