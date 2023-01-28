import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>User App</h1>
        <NavLink to="/users">Users List Page</NavLink>
        <Switch>
          <Route path="/users" component={UsersLayout} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  return (
    <>
      <h2>MainPage</h2>
    </>
  );
}

function UsersLayout() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h2>Users Layout</h2>
      <NavLink to="/">Main Page</NavLink>
      <Switch>
        <Route path={path + "/:userId/profile"} component={UserProfilePage} />
        <Route path={path + "/:userId/edit"} component={EditUserPage} />
        <Route path={path} exact component={UsersListPage} />
        <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
      </Switch>
    </div>
  );
}

function UsersListPage() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h3>User Page</h3>
      <ul>
        {new Array(5).fill("").map((_, i) => (
          <li key={"user_list" + i}>
            <NavLink to={`${path}/${i}`}>User {i}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <h2>User Page</h2>
      <ul>
        <li>
          <NavLink to="/users">Users List page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit this user</NavLink>
        </li>
      </ul>
      <p>user ID: {userId}</p>
    </div>
  );
}

function EditUserPage() {
  const { userId } = useParams();
  return (
    <div>
      <h2> Edit User Page</h2>
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>User profile Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}> Another User</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}> Users List page</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default App;
