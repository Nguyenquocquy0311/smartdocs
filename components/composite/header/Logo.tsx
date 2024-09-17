import { routes } from "@/constant/routes";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push(routes.home);
  }

  return (
    <div className="flex space-x-4 items-center cursor-pointer logo-font" onClick={redirectToHome}>
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" draggable="false" alt="logo" width={36} />
      <span className="font-bold text-xl text-black">SMARTDOCS</span>
    </div>
  )
}

export default Logo;
