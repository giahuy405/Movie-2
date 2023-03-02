import Home from '../features/Booking/Home'
import Detail from '../features/Booking/Detail'
import Seats from '../features/Booking/Seats'
import Signin from '../features/Auth/Signin'
import Signup from '../features/Auth/Signup'
import Profile from '../features/Auth/Profile'
export const routes = [
    { path: '/', component: Home, isPrivate: 0, redirectPath: '/signin' },
    { path: '/detail/:id', component: Detail }, 
    { path: '/seats/:id', component: Seats },
    { path: '/signin', component: Signin, isAuth: true, redirectPath: '/' },
    { path: '/signup', component: Signup },
    { path: '/profile', component: Profile },
]