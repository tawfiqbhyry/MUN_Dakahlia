export default function (next, store) {
  if (!store.state.isAuthenticated) {
    next("/home");
  } else {
    next();
  }
}
