import { cn } from "@/utils";
import { Button } from "../ui/button";
import { House, Flag, Library } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router";

function Navbar() {
    return (
        <header
            className={cn([
                "sticky",
                "top-0",
                "h-16",
                "backdrop-blur-sm",
                "select-none",
                "border-b-[1px]",
                "flex",
                "items-center",
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
                    <Link
                        to={"/"}
                        className={cn(["flex", "gap-3", "items-center"])}
                    >
                        <img
                            alt="logo"
                            width={49}
                            height={49}
                            decoding={"async"}
                            src={"/logo.svg"}
                            draggable={false}
                            className={cn(["drop-shadow-md"])}
                        />
                        <h1 className={cn(["text-xl", "font-semibold"])}>
                            CdsCTF
                        </h1>
                    </Link>
                    <div className={cn(["flex", "gap-3", "items-center"])}>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            className={"font-semibold"}
                        >
                            <House />
                            主页
                        </Button>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            className={"font-semibold"}
                        >
                            <Library />
                            题库
                        </Button>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            className={"font-semibold"}
                        >
                            <Flag />
                            比赛
                        </Button>
                    </div>
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/elabosak233.png" />
                        <AvatarFallback>Ela</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}

Navbar.displayName = "Navbar";

export { Navbar };
