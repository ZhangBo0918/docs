import { useState } from 'react';

export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>This a Layout Component!1qw2</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 2)}>点击++</button>
      </div>
    </div>
  );
}
