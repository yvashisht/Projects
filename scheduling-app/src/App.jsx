import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import './App.css';
import { useDbData } from "./utilities/firebase"

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useJsonQuery } from './utilities/fetch';
// const queryClient = new QueryClient();

const Main = () => {
  const [data, error] = useDbData('/');

  // Assuming useDbData returns null or undefined while loading
  if (!data && !error) return <h1>Loading user data...</h1>;
  if (error) return <h1>Error loading user data: {error.message || JSON.stringify(error)}</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <>
      <Banner title={data.title} />
      <CourseList courses={data.courses} />
    </>
  );
};


const App = () => {

  return (
    // <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
    // </QueryClientProvider>
  );
};

export default App;
