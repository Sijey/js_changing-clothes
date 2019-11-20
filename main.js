const initialState = {
  items: ['Hat', 'Belt', 'Apron', 'Cardigan', 'Dress', ' Earrings', 'Fur coat', 'Gloves'],
  index: null,
  inputValue: null,
};

const GET_ITEM_VALUE = 'get_item_value';
const GET_INPUT_VALUE = 'get_input_value';
const SET_INPUT_VALUE = 'set_input_value';

const getItemValue = (index, value) => {
  return {
    type: GET_ITEM_VALUE,
    value,
    index,
  }
};

const getInputValue = (value) => {
  return {
    type: GET_INPUT_VALUE,
    value,
  }
};

const setInputValue = (value) => {
  return {
    type: SET_INPUT_VALUE,
    value,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_VALUE:
      return {
        ...state,
        index: action.index,
        inputValue: action.value,
      };
    case GET_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value,
      };
    case SET_INPUT_VALUE:
      if (action.value === 'Enter' && state.inputValue.trim() !== '') {
        return {
          ...state,
          items: [...state.items].map((item, index) => {
            if (index === state.index) {
              return item = state.inputValue;
            } else {
              return item;
            }
          }),
          index: null,
        }
      }
      if (action.value === 'Enter' && state.inputValue.trim() === '') {
        return {
          ...state,
          items: [...state.items].filter((item, index) => index !== state.index),
          index: null,
        }
      }
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

const render = () => {
  const state = store.getState();
  const list = document.querySelector('.list');
  list.innerHTML = '';

  for (const item of state.items) {
    if (state.items.indexOf(item) !== state.index) {
      const listItem = document.createElement('LI');
      const editButton = document.createElement('BUTTON');

      listItem.textContent = item;
      listItem.append(editButton);
      editButton.textContent = 'Edit';
      list.append(listItem);
      editButton.addEventListener('click', () => {
        store.dispatch(getItemValue(state.items.indexOf(item), item))
      });
    } else {
      const input = document.createElement('INPUT');

      input.value = state.inputValue;
      list.append(input);
      input.focus();
      input.addEventListener('input', (event) => {
        store.dispatch(getInputValue(event.target.value))
      });
      input.addEventListener('keydown', (event) => {
        store.dispatch(setInputValue(event.key))
      })
    }
  }
};

store.subscribe(() => {
  render();
});

render();
