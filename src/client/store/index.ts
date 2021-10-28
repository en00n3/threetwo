import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import createRootReducer from "../reducers";
import socketIO from "socket.io-client";
import socketIoMiddleware from "redux-socket.io-middleware";
const socketHostURI = `${process.env.HOSTNAME}:3001` || `http://localhost:3001`;
const io = socketIO(socketHostURI);
export const history = createBrowserHistory();
const configureStore = (initialState) => {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(socketIoMiddleware(io), thunk, routerMiddleware(history)),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
  return store;
};
export default configureStore;
