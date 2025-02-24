import { cn } from "@/utils";
import { Button } from "../ui/button";
import { House, Flag, Library, Brush, Sun, Moon, Eclipse } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { useThemeStore } from "@/storages/theme";
import { useConfigStore } from "@/storages/config";

function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const configStore = useConfigStore();

    return (
        <header
            className={cn([
                "sticky",
                "top-0",
                "h-16",
                "bg-background/80",
                "backdrop-blur-sm",
                "select-none",
                "border-b-[1px]",
                "flex",
                "items-center",
                "z-10",
            ])}
        >
            <div
                className={cn([
                    "container",
                    "ml-auto",
                    "mr-auto",
                    "pl-5",
                    "pr-5",
                    "max-w-[1300px]",
                    "flex",
                    "items-center",
                    "justify-between",
                ])}
            >
                <div className={cn(["flex", "gap-10"])}>
                    <Button asChild size={"lg"} className={"px-5"}>
                        <Link
                            to={"/"}
                            className={cn(["flex", "gap-3", "items-center"])}
                        >
                            <Avatar square>
                                <AvatarImage
                                    alt="logo"
                                    width={49}
                                    height={49}
                                    decoding={"async"}
                                    src={"/api/configs/icon"}
                                    className={cn(["drop-shadow-md"])}
                                />
                                <AvatarFallback />
                            </Avatar>
                            <h1 className={cn(["text-xl", "font-semibold"])}>
                                {configStore?.config?.meta?.title}
                            </h1>
                        </Link>
                    </Button>
                    <div
                        className={cn([
                            "hidden",
                            "md:flex",
                            "gap-3",
                            "items-center",
                        ])}
                    >
                        <Button
                            asChild
                            variant={pathname === "/" ? "secondary" : "ghost"}
                            size={"sm"}
                            className={"font-semibold"}
                        >
                            <Link to={"/"}>
                                <House />
                                主页
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={
                                pathname === "/playground"
                                    ? "secondary"
                                    : "ghost"
                            }
                            size={"sm"}
                            className={"font-semibold"}
                        >
                            <Link to={"/playground"}>
                                <Library />
                                练习场
                            </Link>
                        </Button>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            asChild
                            className={"font-semibold"}
                        >
                            <Link to={"/games"}>
                                <Flag />
                                比赛
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className={cn(["flex", "gap-3", "items-center"])}>
                    <AppearanceDropdown />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button icon>
                                <Avatar className={cn("h-8", "w-8")}>
                                    <AvatarImage src="https://github.com/elabosak233.png" />
                                    <AvatarFallback>Ela</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

Navbar.displayName = "Navbar";

function AppearanceDropdown() {
    const { setTheme } = useThemeStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} icon size={"sm"}>
                    <Brush />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <div className={cn(["flex", "h-9", "justify-between"])}>
                    <Button size={"sm"} icon onClick={() => setTheme("light")}>
                        <Sun />
                    </Button>
                    <Separator orientation="vertical" />
                    <Button size={"sm"} icon onClick={() => setTheme("dark")}>
                        <Moon />
                    </Button>
                    <Separator orientation="vertical" />
                    <Button size={"sm"} icon onClick={() => setTheme("system")}>
                        <Eclipse />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { Navbar };
