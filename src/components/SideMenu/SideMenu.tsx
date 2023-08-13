import { Button } from "@/components/Buttom/Button";
import { Home, Shapes } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

const SideMenu = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <aside className="p-4 w-48 flex-none">
      <nav>
        <Link href={"/"} className="w-full block my-1" tabIndex={-1}>
          <Button
            variant={"text"}
            className="px-2 w-full"
            contentClassName="gap-5"
          >
            <Home /> Home
          </Button>
        </Link>

        <Link href={"/ingredients"} className="w-full block my-2" tabIndex={-1}>
          <Button
            variant={"text"}
            className="px-2 w-full"
            contentClassName="gap-5"
          >
            <Shapes /> Ingredients
          </Button>
        </Link>

        {/* <Button icon={} ></Button> */}
      </nav>
    </aside>
  );
};

export default SideMenu;
