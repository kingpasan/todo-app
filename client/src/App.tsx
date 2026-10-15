import { useEffect, useState } from "react";

type PingResponse = {
  status: string;
  message: string;
};

const App = () => {
  const [ping, setPing] = useState<PingResponse | null>(null);

  useEffect(() => {
    fetch("/api/ping")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json() as Promise<PingResponse>;
      })
      .then(setPing)
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Todo App - Pasan Semage</h1>
      <p>{ping?.message ?? "Connecting to API..."}</p>
    </main>
  );
};

export default App;
