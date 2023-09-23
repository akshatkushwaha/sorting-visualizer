import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider, Button } from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar() {
    return (
        <>
            <nav className="navbar container mx-auto p-4 flex flex-row justify-between items-center">
                <a className="navbar-brand" href="#">
                    <h1 className="text-2xl font-bold"> Sorting Visualizer</h1>
                </a>
                <div className="flex flex-row items-center">
                    <a className="btn btn-primary flex flex-row" href="#">
                        <GitHubIcon />
                    </a>
                </div>
            </nav>
            <Divider />
        </>
    );
}
