import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./store/store"
import {Home,SignupPage,LoginPage,AllPostsPage,PostPage,CreatePostPage,EditPostPage} from "./pages"
import AuthLayout from './components/AuthLayout.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={(
        <AuthLayout>
          <Home/>
        </AuthLayout>
      )}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='posts' element={(
        <AuthLayout>
          <AllPostsPage/>
        </AuthLayout>
      )}/>
      <Route path='create-post' element={(
        <AuthLayout>
          <CreatePostPage/>
        </AuthLayout>
      )}/>
      <Route path='/post/:slug' element={(
        <AuthLayout>
          <PostPage/>
        </AuthLayout>
      )}/>
      <Route path='/edit-post/:slug' element={(
        <AuthLayout>
          <EditPostPage/>
        </AuthLayout>
      )}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
