import { useState } from 'react';
import { Content } from '@runtime';

export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>This a Layout Component!1qw235</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 2)}>点击++</button>
      </div>
      <Content />
    </div>
  );
}
