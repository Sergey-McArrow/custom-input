

# Custom Input Component with Zustand

This project is a custom input component built using React and Zustand for state management. The component provides a search input field with dynamically filtered results, keyboard event handling, and selection of input items.

## Features

- **Dynamic Input Filtering**: Filters input items based on the user's input and displays suggestions.
- **Keyboard Event Handling**: Supports actions like backspace, acceptable symbols input, and real-time updates in the input field.
- **Zustand for State Management**: Manages the input, found items, and toggle states using Zustand's store.
- **Customizable List of Items**: The component handles the display of filtered items and allows users to select and remove items.
- **Memoized Components**: For performance optimization, components are memoized using `React.memo`.
- **User Interaction**: Clicking, blurring, and typing interactively manage the display and content of the input.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Root](#root)
  - [Input](#input)
  - [List](#list)
  - [ListItems](#listitems)
- [State Management](#state-management)
- [Keyboard Event Handling](#keyboard-event-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository or copy the code.
2. Install the necessary dependencies:

```bash
npm install
```

3. Import the components and use them in your application.

## Usage

To use the components in your project, import them and wrap your application with the `Root` component. Inside the `Root`, include the `Input`, `List`, and `ListItems` components as needed.

```tsx
import InputComponent from './path-to-your-components/InputComponent'

const App = () => {
  return (
    <InputComponent.Root>
      <InputComponent.Input />
      <InputComponent.List>
        <InputComponent.ListItems />
      </InputComponent.List>
    </InputComponent.Root>
  )
}
```

### Components

#### Root

The `Root` component provides the context to manage the state of the input, items, and suggestions using Zustand. It should wrap all other components in your application.

```tsx
<InputComponent.Root>
  {children}
</InputComponent.Root>
```

#### Input

The `Input` component is responsible for capturing user input, handling keyboard events, and managing the input's state. It listens for keypresses, processes acceptable symbols, and updates the input and items state accordingly.

```tsx
<InputComponent.Input />
```

#### List

The `List` component is responsible for displaying the filtered suggestions. It will show the list only when the `open` state is `true` and there are items to display.

```tsx
<InputComponent.List>
  <InputComponent.ListItems />
</InputComponent.List>
```

#### ListItems

The `ListItems` component renders each filtered item in the list, allowing users to select an item, which is then added to the input. It handles the `onMouseDown` event to add an item to the store and reset the found items.

```tsx
<InputComponent.ListItems />
```

### State Management

State management is handled using `Zustand`. The store contains several actions and state values:
- `input`: Stores the current input value.
- `items`: Stores the selected input items.
- `foundItems`: Holds the list of filtered suggestions based on user input.
- `open`: A boolean that toggles the display of the suggestion list visibility.

Actions:
- `setInput`: Updates the input value.
- `toggleOpen`: Toggles the state of the suggestion list visibility.
- `setFoundItems`: Updates the filtered items based on the input.
- `addItem`: Adds a new item to the selected items.
- `removeItem`: Removes a specific item from the selected items.
- `removeLastItem`: Removes the last item in the selected list.
- `clearItems`: Clears all selected items.

### Keyboard Event Handling

The `handleKey` function is responsible for managing keyboard input. It handles specific key events:
- **Backspace**: Removes the last character from the input and updates the items.
- **Acceptable Symbols**: Filters the input to allow only valid characters and symbols based on the `isAcceptableSymbol` function.

### Example Usage of Keyboard Handling

```tsx
const handleKey = useCallback((e: KeyboardEvent) => {
  const { key } = e;
  if (key === "Backspace") {
    removeLastItem();
  } else if (isAcceptableSymbol(key)) {
    addItem(key);
  }
}, [input]);
```

### Contributing

Feel free to fork this repository, submit pull requests, or open issues to help improve the project.

### License

This project is licensed under the MIT License.

