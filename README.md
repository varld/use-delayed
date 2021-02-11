# Use Delayed

A React hook for delaying a value.

## Install

```bash
# yarn
yarn add use-delayed

# npm
npm install --save use-delayed
```

## Usage

```tsx
import useDelayed from 'use-delayed';

let Component = () => {
  let [count, setCount] = useState(0);

  // This has the same value as count, 
  // but value changes will be delayed by 500 ms
  let delayedCount = useDelayed(count, 500);

  return (
    <div>
      Count: {count}, Delayed by 500 ms: {delayedCount}

      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  )
}
```

### Ignore Values

Sometimes it might be useful to set certain values immediately.

```tsx
let delayed = useDelayed(value, 500, ['a', 'b']);
// If value is `a` or `b`, it will be set immediately
```

## License

MIT © [Tobias Herber](https://herber.space)


