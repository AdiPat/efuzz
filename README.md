# efuzz

`efuzz` is an in-memory fuzzy search library for Node.js (TypeScript). It provides a clean and intuitive API for implementing fuzzy searching over datasets.

## Features

- **In-Memory Efficiency**: No external databases or storage dependencies.
- **Customizable Matching**: Define your own thresholds and search algorithms.
- **TypeScript Support**: Fully typed API for better developer experience.
- **Custom Scoring Logic**: Supply your own scoring function to customize the search results as per your requirements.

## Installation

```bash
npm install efuzz
```

## Usage

```typescript
import { efuzz } from "efuzz";

const search = efuzz(["apple", "application", "orange"]);
const results = search("appl", { threshold: 0.6 });
console.log(results); // ["apple", "application"]
```

## Development

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- TypeScript

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/efuzz.git
   cd efuzz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Contributing

Feel free to open issues or submit PRs for improvements or new features.

## License

MIT
