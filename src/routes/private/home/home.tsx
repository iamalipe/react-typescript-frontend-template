import { ChartAreaInteractive } from "./chart-area-interactive";

const Home = () => {
  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>Private Home Page</h1>
        <ChartAreaInteractive />
      </div>
    </main>
  );
};

export default Home;
