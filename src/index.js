import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'


import App from './App';
import BaseLayout from './components/layout/BaseLayout';
import Hooks from './components/Hooks';
import Classes from './components/Classes';
import reducer from './reducers/reducerTemplate';


const saveToLocalStorage = (reduxGlobalState) => {
    //serialization = converting js object to a string
    try{
      const serializeState = JSON.stringify(reduxGlobalState);
      localStorage.setItem('state', serializeState)
    }
    catch(e){
      console.log(e)
    }
}


const loadFromLocalStorage = (params) => {
    const serializeState = localStorage.getItem('state');

    if(serializeState === null){
      return undefined;
    }
    else{
      return JSON.parse(serializeState);; //returns JS object representing local storage
    }
}

const persistedState = loadFromLocalStorage();




//initializing redux store
//requires reducer, second arg is DevTools
let store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(()=>{
  saveToLocalStorage(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/hooks" component={Hooks}/>
            <Route exact path="/classes" component={Classes}/>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
