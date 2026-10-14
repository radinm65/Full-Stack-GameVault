import './app.css'
import { RouterProvider } from 'react-router'
// import { Provider } from 'react'
import router from '../routes/routes'

function App() {

  return (
    <>
      {/* <Provider store = {}> */}
        <RouterProvider router={router}/>
      {/* </Provider> */}
    </>
  )
}

export default App
