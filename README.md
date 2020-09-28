# Handling Tabs using Page URL and React-Router-Dom

## Introduction
Tabs are critical elements for grouping similar data in Web applications. 
However, most implementations of tabs in React use the React State to maintain the active tab. 
This has the limitation of:
* inability to maintain the active tab on refreshing the page. 
* a lot hassle to redirect to a specific tab

Learn how to maintain your active tab using URL Parameters, leveraging React Router Dom, overcoming the above limitation.

This guide assumes that you are familiar with React, React Hooks, React Router Dom, Bootstrap and Reactstrap.

## Setup

Setup is split into two steps:
* Setting Up the URL-Managed-Tabs React App
* Install Reactstrap


### Setting Up the URL-Managed-Tabs React App

Use Create-React-App,    a scaffold that lets you create react apps with no build configurations.

Ensure you have `create-react-app` installed on your machine. If not, you can install by running the following:

```bash
npm install -g create-react-app
```

Once it is installed, to create the app, run the following:

```bash
npx create-react-app url-managed-tabs
```

The above command creates a react app with the name `url-managed-tabs`

Navigate to your project's root directory. 

```bash
cd url-managed-tabs
```

Your folder structure should be like this:

```
url-managed-tabs/    
    node_modules/
    public/
    src/   
    	App.css
        App.js
        App.test.js
        index.css
        index.js
        logo.svg
        serviceWorker.js
        setupTests.js
    package.json
    README.md
    yarn.lock
```

To start your app, run the following:

```bash
yarn start
```

### Install Reactstrap

First, install bootstrap, a pre-requisite for the Reactstrap package

```bash
npm install --save bootstrap
```

Then install the Reactstrap package

```bash
npm install --save reactstrap
```

Import Bootstrap CSS in the `src/index.js` file

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
``` 


## Development

The development will be split into the following steps:
* Create the tabs
* Install React-Router-Dom
* Create a Route with an Optional Parameter using React Router Dom
* Refactor the tabs to use the URL active_page parameter 

### Create the tabs
Open the App.js file. Clear everything inside.

Then, create an object called `tabs`, defining the title and content of all the tabs.

```jsx
import React from 'react';
import {Row, Col} from 'reactstrap';

function App() {
    const tabs = {
            "draft": {
                title: "Draft",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-info">Draft Tasks</h4>
                        </Col>
                    </Row>
                )
            },
            "in_progress": {
                title: "In Progress",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-primary">In Progress Tasks</h4>
                        </Col>
                    </Row>
                )
            },
            "completed": {
                title: "Completed",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-success">Completed Tasks</h4>
                        </Col>
                    </Row>
                )
            }
        }


    return (
        <React.Fragment/>
    );
}

export default App;
```


* Create the tabs by iterating through the tabs object.
* Use `useState` React hook to add `activeTab` property to the React State of the `App` Component. Initialize the `activeTab` property with your preferred tab property name, in this case, `in_progress`.
* Define `toggle` function to handle change of activeTab on clicking the NavLinks.

```jsx
import React from 'react';
import {Row, Col} from 'reactstrap';

function App() {
    const tabs = {
        "draft": {
            title: "Draft",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-info">Draft Tasks</h4>
                    </Col>
                </Row>
            )
        },
        "in_progress": {
            title: "In Progress",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-primary">In Progress Tasks</h4>
                    </Col>
                </Row>
            )
        },
        "completed": {
            title: "Completed",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-success">Completed Tasks</h4>
                    </Col>
                </Row>
            )
        }
    }

    const [activeTab, setActiveTab] = useState('in_progress');
    
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="row p-4">
            <div className="col-lg-12">
                <h2 className="mb-4">Tasks</h2>

                <Nav tabs>
                    {
                        Object.entries(tabs).map((tab) => (
                            <NavItem key={tab[0]}>
                                <NavLink
                                    className={activeTab === tab[0] ? "active" : ""}
                                    onClick={() => {
                                        toggle(tab[0]);
                                    }}
                                    role="button"
                                >
                                    {tab[1].title}
                                </NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>

                <TabContent activeTab={activeTab}>
                    {
                        Object.entries(tabs).map((tab) => (
                            <TabPane key={tab[0]} tabId={tab[0]}>
                                {tab[1].content}
                            </TabPane>
                        ))
                    }
                </TabContent>
            </div>
        </div>
    );
}

export default App;
```

### Install React Router Dom
```bash
npm install --save react-router-dom
```
React Router is a routing library for React. React Router Dom is the dom binding package for React Router. 


### Create a Route with an Optional Parameter using React Router Dom

Instead of just loading the `App` component directly in our `index.js`, define a route for the `App` component;

Change the `index.js` to this

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route path="/:active_tab?" component={App}/>
          </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

`/:active_tab?` means that whenever the route on the browser is `/` then the component to be loaded is `App`. The route can also take an parameter, though not mandatory. For example, 
* `/` - the **active_tab** parameter will be _undefined_
* `/in_progress` - the **active_tab** parameter will be _in_progress_

So let's take advantage of the above and ensure we can maintain our active tabs even on refreshing the page.

### Refactor the tabs to use the URL active_page parameter 
So:
* Create a variable to hold the default active tab 
    ```jsx
    const DEFAULT_ACTIVE_TAB = "in_progress";
    ```
* The URL Parameter can be accessed using React Router Dom's `useParams` hook: 
    ```jsx
    const {active_tab} = useParams();
    ```
* Do away with `activeTab` state variable. 
Initialize history variable with React Router Dom's `useHistory` hook, which is used for navigation.
    ```jsx
    const history = useHistory();
    ```
* Default the `active_tab` parameter to the set `DEFAULT_ACTIVE_TAB` if not `active_tab` is specified on the URL.
    ```jsx
    useEffect(() => {
        if(!active_tab){
            history.push(`/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);
    ```
* Refactor the `toggle` function to the route to the specified tab on click of a NavLink, thereby updating the `active_tab` URL parameter.
    ```jsx
    const toggle = tab => {
     if (active_tab !== tab) {
          history.push(`/${tab}`);
     }
    }
    ```

* Refactor all initial instances of `activeTab` to `active_tab`. And the final code should look like this:
    ```jsx
    import React, {useEffect} from 'react';
    import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
    import {useParams, useHistory} from "react-router-dom"
    
    function App() {
        const DEFAULT_ACTIVE_TAB = "in_progress";
        const tabs = {
            "draft": {
                title: "Draft",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-info">Draft Tasks</h4>
                        </Col>
                    </Row>
                )
            },
            "in_progress": {
                title: "In Progress",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-primary">In Progress Tasks</h4>
                        </Col>
                    </Row>
                )
            },
            "completed": {
                title: "Completed",
                content: (
                    <Row className="p-2">
                        <Col sm="12" className="p-2">
                            <h4 className="text-success">Completed Tasks</h4>
                        </Col>
                    </Row>
                )
            }
        }
    
        const {active_tab} = useParams();
        const history = useHistory();
        
        useEffect(() => {
            if(!active_tab){
                history.push(`/${DEFAULT_ACTIVE_TAB}`);
            }
        }, []);
    
        const toggle = tab => {
           if (active_tab !== tab) {
                history.push(`/${tab}`);
           }
        }
    
        return (
            <div className="row p-4">
                <div className="col-lg-12">
                    <h2 className="mb-4">Tasks</h2>
    
                    <Nav tabs>
                        {
                            Object.entries(tabs).map((tab) => (
                                <NavItem key={tab[0]}>
                                    <NavLink
                                        className={active_tab === tab[0] ? "active" : ""}
                                        onClick={() => {
                                            toggle(tab[0]);
                                        }}
                                        role="button"
                                    >
                                        {tab[1].title}
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </Nav>
    
                    <TabContent activeTab={active_tab}>
                        {
                            Object.entries(tabs).map((tab) => (
                                <TabPane key={tab[0]} tabId={tab[0]}>
                                    {tab[1].content}
                                </TabPane>
                            ))
                        }
                    </TabContent>
                </div>
            </div>
        );
    }
    
    export default App;
    ```

## Conclusion
There you have it. The active tab is now maintain using the `active_tab` URL Parameter. You can now share a link to access a specific tab e.g `/completed` to redirect to the page with the Completed tab active.
You are now familiar with some of the benefit of Optional Parameters on Routes using React Router Dom, go ahead and explore other instance this could be useful in your React Apps.
