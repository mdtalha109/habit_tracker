import { signOut } from "firebase/auth"
import Button from "../ui/Button"
import { auth } from "infrastructure/firebase"

const Navbar = () => {
    return (
        <nav className="flex justify-around p-4 border shadow-md items-center bg-white">
            <div className="primary_text_gradient">Habit Tracker</div>
            <div>
                <Button className="hover:bg-secondary b-0" onClick={async() => await signOut(auth)}>Logout</Button>
            </div>
        </nav>
    )
}

export default Navbar