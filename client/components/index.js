/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Background} from './Background'
export {default as Navbar} from './NavBar/Navbar'
export {default as UserHome} from './Home/user-home'
export {Login, Signup} from './Login-Signup/auth-form'
//export {default as LoginModal} from './Login-Signup/LoginModal'
//export {default as SignupModal} from './Login-Signup/SignupModal'
export {default as HomePage} from './Home/HomePage'
export {default as SingleProduct} from './Products/SingleProduct'
export {default as AllProducts} from './Products/AllProducts'
export {default as CartPage} from './Cart/CartPage'
